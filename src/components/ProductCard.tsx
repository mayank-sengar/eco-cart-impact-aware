import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, TrendingDown, ShoppingCart } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
  onCompare?: (product: Product) => void;
  onViewAlternatives?: (product: Product) => void;
  isCompactView?: boolean;
}

const getCarbonLevel = (footprint: number) => {
  if (footprint <= 5) return { level: "Low", color: "success", icon: "🌱" };
  if (footprint <= 15) return { level: "Medium", color: "warning", icon: "⚠️" };
  return { level: "High", color: "destructive", icon: "🔴" };
};

export const ProductCard = ({ 
  product, 
  onCompare, 
  onViewAlternatives,
  isCompactView = false 
}: ProductCardProps) => {
  const carbonLevel = getCarbonLevel(product.carbonFootprint);
  const hasAlternatives = product.alternatives.length > 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className={`${isCompactView ? 'flex items-center space-x-4' : 'space-y-4'}`}>
          {/* Product Image */}
          <div className={`${isCompactView ? 'w-20 h-20 flex-shrink-0' : 'w-full h-48'} bg-muted rounded-lg overflow-hidden`}>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center`;
              }}
            />
          </div>

          <div className={`${isCompactView ? 'flex-1' : 'space-y-3'}`}>
            {/* Product Info */}
            <div className={`${isCompactView ? 'flex justify-between items-start' : 'space-y-2'}`}>
              <div>
                <Badge variant="outline" className="text-xs mb-2">
                  {product.category}
                </Badge>
                <h3 className={`font-semibold text-foreground ${isCompactView ? 'text-sm' : 'text-lg'}`}>
                  {product.name}
                </h3>
                <p className={`text-muted-foreground ${isCompactView ? 'text-xs' : 'text-sm'} ${isCompactView ? 'line-clamp-1' : 'line-clamp-2'}`}>
                  {product.description}
                </p>
              </div>
              
              <div className={`${isCompactView ? 'text-right' : 'flex justify-between items-center'}`}>
                <span className={`font-bold text-foreground ${isCompactView ? 'text-lg' : 'text-xl'}`}>
                  ${product.price}
                </span>
              </div>
            </div>

            {/* Carbon Footprint */}
            <div className={`${isCompactView ? 'flex items-center justify-between mt-2' : 'space-y-3'}`}>
              <div className={`flex items-center space-x-2 ${isCompactView ? '' : 'justify-center'}`}>
                <span className="text-lg">{carbonLevel.icon}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${isCompactView ? 'text-xs' : ''}`}>
                      {product.carbonFootprint} kg CO₂
                    </span>
                    <Badge 
                      variant={carbonLevel.color === "success" ? "default" : "destructive"}
                      className={`text-xs ${
                        carbonLevel.color === "success" ? "bg-success text-success-foreground" :
                        carbonLevel.color === "warning" ? "bg-warning text-warning-foreground" :
                        "bg-destructive text-destructive-foreground"
                      }`}
                    >
                      {carbonLevel.level} Impact
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex space-x-2 ${isCompactView ? 'flex-col space-y-1 space-x-0' : ''}`}>
                {hasAlternatives && (
                  <Button
                    variant="outline"
                    size={isCompactView ? "sm" : "default"}
                    onClick={() => onViewAlternatives?.(product)}
                    className="flex items-center space-x-1"
                  >
                    <Leaf className="w-4 h-4" />
                    <span className={isCompactView ? 'hidden' : ''}>Greener Options</span>
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size={isCompactView ? "sm" : "default"}
                  onClick={() => onCompare?.(product)}
                  className="flex items-center space-x-1"
                >
                  <TrendingDown className="w-4 h-4" />
                  <span className={isCompactView ? 'hidden' : ''}>Compare</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};