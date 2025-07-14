import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Leaf, X, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

interface ComparisonModalProps {
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

const ComparisonCard = ({ product, isAlternative = false }: { product: Product; isAlternative?: boolean }) => {
  const carbonLevel = getCarbonLevel(product.carbonFootprint);
  
  return (
    <Card className={`${isAlternative ? 'border-success ring-2 ring-success/20' : 'border-border'}`}>
      <CardContent className="p-6">
        {isAlternative && (
          <div className="flex items-center space-x-2 mb-4">
            <Leaf className="w-4 h-4 text-success" />
            <Badge className="bg-success text-success-foreground">Greener Alternative</Badge>
          </div>
        )}
        
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center`;
              }}
            />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold text-xl">${product.price}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-lg">{carbonLevel.icon}</span>
                <div>
                  <div className="font-semibold">{product.carbonFootprint} kg CO₂</div>
                  <Badge 
                    variant="outline"
                    className={`text-xs ${
                      carbonLevel.color === "success" ? "border-success text-success" :
                      carbonLevel.color === "warning" ? "border-warning text-warning" :
                      "border-destructive text-destructive"
                    }`}
                  >
                    {carbonLevel.level} Impact
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ComparisonModal = ({ 
  isOpen, 
  onClose, 
  product, 
  alternatives 
}: ComparisonModalProps) => {
  if (!product) return null;

  const bestAlternative = alternatives.reduce((best, alt) => 
    alt.carbonFootprint < best.carbonFootprint ? alt : best
  , alternatives[0]);

  const carbonSavings = bestAlternative ? 
    ((product.carbonFootprint - bestAlternative.carbonFootprint) / product.carbonFootprint * 100).toFixed(1) : 0;

  const getCarbonBarWidth = (footprint: number) => {
    const maxFootprint = Math.max(product.carbonFootprint, ...alternatives.map(a => a.carbonFootprint));
    return (footprint / maxFootprint) * 100;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Carbon Footprint Comparison</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Stats */}
          {bestAlternative && (
            <Card className="bg-success/5 border-success">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/20 rounded-full">
                      <TrendingDown className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Potential Carbon Savings</h4>
                      <p className="text-sm text-muted-foreground">
                        By choosing the greener alternative
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-success">{carbonSavings}%</div>
                    <div className="text-sm text-muted-foreground">
                      -{(product.carbonFootprint - bestAlternative.carbonFootprint).toFixed(1)} kg CO₂
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Visual Comparison Chart */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-4">Carbon Footprint Comparison</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm font-semibold">{product.carbonFootprint} kg CO₂</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-destructive rounded-full h-3 transition-all duration-500"
                      style={{ width: `${getCarbonBarWidth(product.carbonFootprint)}%` }}
                    />
                  </div>
                </div>
                
                {alternatives.map((alt) => (
                  <div key={alt.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-success">{alt.name}</span>
                      <span className="text-sm font-semibold">{alt.carbonFootprint} kg CO₂</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-success rounded-full h-3 transition-all duration-500"
                        style={{ width: `${getCarbonBarWidth(alt.carbonFootprint)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Comparison Cards */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Product Details</h4>
            
            <ComparisonCard product={product} />
            
            {alternatives.map((alternative) => (
              <ComparisonCard 
                key={alternative.id} 
                product={alternative} 
                isAlternative={true}
              />
            ))}
          </div>

          {/* Did You Know Section */}
          <Card className="bg-accent/5 border-accent">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-accent/20 rounded-full flex-shrink-0">
                  <Leaf className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">💡 Did You Know?</h4>
                  <p className="text-muted-foreground">
                    {bestAlternative && (
                      <>
                        Choosing {bestAlternative.name} over {product.name} can save approximately{" "}
                        <span className="font-semibold text-success">
                          {(product.carbonFootprint - bestAlternative.carbonFootprint).toFixed(1)} kg of CO₂
                        </span>{" "}
                        emissions. That's equivalent to driving{" "}
                        <span className="font-semibold">
                          {((product.carbonFootprint - bestAlternative.carbonFootprint) * 2.3).toFixed(0)} fewer miles
                        </span>{" "}
                        in an average car!
                      </>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};