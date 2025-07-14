import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { ComparisonModal } from "@/components/ComparisonModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, BarChart3, ShoppingCart, TreePine } from "lucide-react";
import productsData from "@/data/products.json";

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

const Index = () => {
  const [products] = useState<Product[]>(productsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [carbonFilter, setCarbonFilter] = useState<string | null>(null);
  const [comparisonProduct, setComparisonProduct] = useState<Product | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique categories
  const availableCategories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))),
    [products]
  );

  // Get carbon level for filtering
  const getCarbonLevel = (footprint: number) => {
    if (footprint <= 5) return "Low";
    if (footprint <= 15) return "Medium";
    return "High";
  };

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);
      
      const matchesCarbon = !carbonFilter || 
                           getCarbonLevel(product.carbonFootprint) === carbonFilter;
      
      return matchesSearch && matchesCategory && matchesCarbon;
    });
  }, [products, searchQuery, selectedCategories, carbonFilter]);

  // Get alternatives for comparison
  const getAlternatives = (product: Product): Product[] => {
    return product.alternatives
      .map(altId => products.find(p => p.id === altId))
      .filter(Boolean) as Product[];
  };

  const handleCompare = (product: Product) => {
    setComparisonProduct(product);
    setIsComparisonOpen(true);
  };

  const handleViewAlternatives = (product: Product) => {
    const alternatives = getAlternatives(product);
    if (alternatives.length > 0) {
      setComparisonProduct(product);
      setIsComparisonOpen(true);
    }
  };

  // Calculate total potential savings
  const totalSavings = useMemo(() => {
    return products.reduce((total, product) => {
      const alternatives = getAlternatives(product);
      if (alternatives.length > 0) {
        const bestAlt = alternatives.reduce((best, alt) => 
          alt.carbonFootprint < best.carbonFootprint ? alt : best
        );
        return total + (product.carbonFootprint - bestAlt.carbonFootprint);
      }
      return total;
    }, 0);
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <TreePine className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">EcoCart</h1>
                <p className="text-sm text-muted-foreground">Shop Smarter, Impact Less</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-success" />
                <span>Potential Savings: {totalSavings.toFixed(1)} kg CO₂</span>
              </Badge>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Discover the Carbon Impact of Your Shopping
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Make informed choices with real-time carbon footprint data and eco-friendly alternatives for every product.
            </p>
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg">{products.length}</h3>
                  <p className="text-sm text-muted-foreground">Eco-Analyzed Products</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg">{availableCategories.length}</h3>
                  <p className="text-sm text-muted-foreground">Product Categories</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    {products.filter(p => p.alternatives.length > 0).length}
                  </h3>
                  <p className="text-sm text-muted-foreground">Green Alternatives</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar
            onSearch={setSearchQuery}
            onCategoryFilter={setSelectedCategories}
            onCarbonFilter={setCarbonFilter}
            selectedCategories={selectedCategories}
            carbonFilter={carbonFilter}
            availableCategories={availableCategories}
          />
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
            </h3>
            {(searchQuery || selectedCategories.length > 0 || carbonFilter) && (
              <Badge variant="secondary">
                Filtered Results
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCompare={handleCompare}
              onViewAlternatives={handleViewAlternatives}
              isCompactView={viewMode === "list"}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-muted/20 rounded-full w-fit mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
                setCarbonFilter(null);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </main>

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        product={comparisonProduct}
        alternatives={comparisonProduct ? getAlternatives(comparisonProduct) : []}
      />
    </div>
  );
};

export default Index;
