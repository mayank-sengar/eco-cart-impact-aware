import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  carbonFootprint: number;
  description: string;
  alternatives: number[];
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedAlternative?: Product;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, alternative?: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  getTotalCarbonFootprint: () => number;
  getTotalItems: () => number;
  getCarbonSavings: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product: Product, alternative?: Product) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(item => 
          item.product.id === product.id && 
          item.selectedAlternative?.id === alternative?.id
        );
        
        if (existingItemIndex > -1) {
          set({
            items: items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { 
              product, 
              quantity: 1, 
              selectedAlternative: alternative 
            }],
          });
        }
      },
      
      removeItem: (productId: number) => {
        set({
          items: get().items.filter(item => item.product.id !== productId),
        });
      },
      
      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.selectedAlternative?.price || item.product.price;
          return total + (price * item.quantity);
        }, 0);
      },
      
      getTotalCarbonFootprint: () => {
        return get().items.reduce((total, item) => {
          const footprint = item.selectedAlternative?.carbonFootprint || item.product.carbonFootprint;
          return total + (footprint * item.quantity);
        }, 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getCarbonSavings: () => {
        return get().items.reduce((total, item) => {
          if (item.selectedAlternative) {
            const savings = (item.product.carbonFootprint - item.selectedAlternative.carbonFootprint) * item.quantity;
            return total + savings;
          }
          return total;
        }, 0);
      },
    }),
    {
      name: 'ecocart-storage',
    }
  )
);