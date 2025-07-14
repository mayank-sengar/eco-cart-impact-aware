import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, Plus, Minus, Trash2, Leaf, TrendingDown } from "lucide-react";

export const CartSidebar = () => {
  const {
    items,
    isOpen,
    toggleCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalCarbonFootprint,
    getTotalItems,
    getCarbonSavings,
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalCarbon = getTotalCarbonFootprint();
  const totalItems = getTotalItems();
  const carbonSavings = getCarbonSavings();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-4 h-4" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Your EcoCart</span>
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems} items</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Carbon Impact Summary */}
          {totalItems > 0 && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Carbon Impact</span>
                  <span className="font-bold text-lg">{totalCarbon.toFixed(1)} kg CO₂</span>
                </div>
                
                {carbonSavings > 0 && (
                  <div className="flex items-center justify-between text-success">
                    <div className="flex items-center space-x-1">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm font-medium">You're Saving</span>
                    </div>
                    <span className="font-bold">{carbonSavings.toFixed(1)} kg CO₂</span>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  That's equivalent to driving {(totalCarbon * 2.3).toFixed(0)} miles in an average car
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cart Items */}
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-2">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">Add some eco-friendly products to get started!</p>
              </div>
            ) : (
              items.map((item) => {
                const displayProduct = item.selectedAlternative || item.product;
                const isAlternative = !!item.selectedAlternative;
                
                return (
                  <Card key={`${item.product.id}-${item.selectedAlternative?.id || 'original'}`}>
                    <CardContent className="p-4">
                      <div className="flex space-x-3">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={displayProduct.image}
                            alt={displayProduct.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center`;
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-sm leading-tight">
                                {displayProduct.name}
                              </h4>
                              {isAlternative && (
                                <Badge variant="outline" className="mt-1 text-xs">
                                  <Leaf className="w-3 h-3 mr-1" />
                                  Eco Alternative
                                </Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.product.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-medium text-sm">
                                ${(displayProduct.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {(displayProduct.carbonFootprint * item.quantity).toFixed(1)} kg CO₂
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="space-y-4">
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Carbon Footprint</span>
                  <span className="font-medium">{totalCarbon.toFixed(1)} kg CO₂</span>
                </div>
                
                {carbonSavings > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Carbon Savings</span>
                    <span className="font-medium">-{carbonSavings.toFixed(1)} kg CO₂</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={clearCart} className="flex-1">
                    Clear Cart
                  </Button>
                  <Button variant="outline" onClick={toggleCart} className="flex-1">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};