import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/stores/cartStore";
import { 
  ShoppingCart, 
  Leaf, 
  Star, 
  TrendingDown, 
  Package, 
  Truck,
  Shield,
  Heart,
  X 
} from "lucide-react";

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

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  alternatives: Product[];
}

const getCarbonLevel = (footprint: number) => {
  if (footprint <= 5) return { level: "Low", color: "success", icon: "🌱" };
  if (footprint <= 15) return { level: "Medium", color: "warning", icon: "⚠️" };
  return { level: "High", color: "destructive", icon: "🔴" };
};

const generateProductDetails = (product: Product) => {
  const details = {
    specifications: [
      { label: "Category", value: product.category },
      { label: "Carbon Footprint", value: `${product.carbonFootprint} kg CO₂` },
      { label: "Price", value: `$${product.price}` },
      { label: "Eco Rating", value: product.carbonFootprint <= 5 ? "⭐⭐⭐⭐⭐" : product.carbonFootprint <= 15 ? "⭐⭐⭐" : "⭐⭐" },
    ],
    sustainability: {
      materials: product.carbonFootprint <= 5 ? "Recycled and sustainable materials" : "Standard materials with some recycled content",
      packaging: "Minimal, recyclable packaging",
      shipping: "Carbon-neutral shipping available",
      certifications: product.carbonFootprint <= 5 ? ["Energy Star", "Carbon Neutral", "Recyclable"] : ["Standard Quality"]
    },
    whyGreener: product.carbonFootprint <= 5 
      ? "This product uses renewable energy in manufacturing and sustainable materials, resulting in significantly lower carbon emissions."
      : product.carbonFootprint <= 15
      ? "While not the greenest option, this product incorporates some eco-friendly practices in its production."
      : "This product has a higher carbon footprint due to energy-intensive manufacturing and materials. Consider the suggested alternatives for a lower environmental impact."
  };
  
  return details;
};

export const ProductDetailModal = ({ 
  isOpen, 
  onClose, 
  product, 
  alternatives 
}: ProductDetailModalProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCartStore();
  
  if (!product) return null;
  
  const carbonLevel = getCarbonLevel(product.carbonFootprint);
  const details = generateProductDetails(product);
  const displayProduct = selectedProduct || product;
  const isAlternative = selectedProduct && selectedProduct.id !== product.id;

  const handleAddToCart = () => {
    if (isAlternative && selectedProduct) {
      addItem(product, selectedProduct);
    } else {
      addItem(product);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Product Details</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Header */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={displayProduct.image}
                  alt={displayProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop&crop=center`;
                  }}
                />
              </div>
              
              {/* Alternative Selection */}
              {alternatives.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Choose Your Option:</h4>
                  <div className="space-y-2">
                    <Button
                      variant={!selectedProduct ? "default" : "outline"}
                      onClick={() => setSelectedProduct(null)}
                      className="w-full justify-start text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{product.name}</span>
                        <Badge variant="outline">{product.carbonFootprint} kg CO₂</Badge>
                      </div>
                    </Button>
                    
                    {alternatives.map((alt) => (
                      <Button
                        key={alt.id}
                        variant={selectedProduct?.id === alt.id ? "default" : "outline"}
                        onClick={() => setSelectedProduct(alt)}
                        className="w-full justify-start text-left"
                      >
                        <div className="flex items-center space-x-2">
                          <Leaf className="w-4 h-4 text-success" />
                          <span>{alt.name}</span>
                          <Badge className="bg-success text-success-foreground">
                            {alt.carbonFootprint} kg CO₂
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline">{displayProduct.category}</Badge>
                  {isAlternative && (
                    <Badge className="bg-success text-success-foreground">
                      <Leaf className="w-3 h-3 mr-1" />
                      Eco Alternative
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold mb-3">{displayProduct.name}</h1>
                <p className="text-muted-foreground text-lg mb-4">{displayProduct.description}</p>
                
                <div className="flex items-center space-x-6 mb-6">
                  <div>
                    <div className="text-3xl font-bold">${displayProduct.price}</div>
                    <div className="text-sm text-muted-foreground">Price</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCarbonLevel(displayProduct.carbonFootprint).icon}</span>
                    <div>
                      <div className="font-bold text-lg">{displayProduct.carbonFootprint} kg CO₂</div>
                      <Badge 
                        className={`${
                          getCarbonLevel(displayProduct.carbonFootprint).color === "success" ? "bg-success text-success-foreground" :
                          getCarbonLevel(displayProduct.carbonFootprint).color === "warning" ? "bg-warning text-warning-foreground" :
                          "bg-destructive text-destructive-foreground"
                        }`}
                      >
                        {getCarbonLevel(displayProduct.carbonFootprint).level} Impact
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Carbon Savings */}
                {isAlternative && selectedProduct && (
                  <Card className="bg-success/5 border-success mb-6">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-success/20 rounded-full">
                          <TrendingDown className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <h4 className="font-semibold">You'll Save</h4>
                          <p className="text-success font-bold">
                            {(product.carbonFootprint - selectedProduct.carbonFootprint).toFixed(1)} kg CO₂
                            <span className="text-sm font-normal ml-1">
                              ({((product.carbonFootprint - selectedProduct.carbonFootprint) / product.carbonFootprint * 100).toFixed(1)}% reduction)
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button onClick={handleAddToCart} size="lg" className="w-full">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {details.specifications.map((spec, index) => (
                      <div key={index}>
                        <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                        <dd className="font-medium">{spec.value}</dd>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sustainability" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Environmental Impact</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium flex items-center space-x-2">
                        <Package className="w-4 h-4" />
                        <span>Materials & Packaging</span>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{details.sustainability.materials}</p>
                      <p className="text-sm text-muted-foreground">{details.sustainability.packaging}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Certifications</span>
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {details.sustainability.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center space-x-2">
                        <Leaf className="w-4 h-4" />
                        <span>Why This Choice Matters</span>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{details.whyGreener}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Shipping Information</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Standard Shipping</span>
                      <span className="font-medium">Free (5-7 days)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="font-medium">$9.99 (2-3 days)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbon-Neutral Shipping</span>
                      <span className="font-medium text-success">+$2.00</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-lg">
                    <p className="text-sm text-success">
                      ♻️ All packaging is recyclable and made from recycled materials
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="font-medium">4.8 out of 5</span>
                    <span className="text-sm text-muted-foreground">(324 reviews)</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-success pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">Sarah M.</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Love that I can see the environmental impact! Made it easy to choose the greener option."
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-success pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">Mike R.</span>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                          ))}
                          <Star className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Great quality and the carbon footprint info helped me make a better choice for the planet."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};