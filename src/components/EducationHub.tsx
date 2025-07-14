import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  TreePine, 
  Recycle, 
  Zap, 
  Car, 
  Home,
  ShoppingBag,
  Droplets
} from "lucide-react";

export const EducationHub = () => {
  const categories = [
    {
      id: "basics",
      title: "Carbon Footprint Basics",
      icon: <Lightbulb className="w-5 h-5" />,
      articles: [
        {
          title: "What is a Carbon Footprint?",
          content: "A carbon footprint is the total amount of greenhouse gases produced directly and indirectly by human activities. It's measured in units of carbon dioxide equivalent (CO₂e). Understanding your carbon footprint is the first step toward reducing your environmental impact.",
          tips: [
            "Track your daily activities that produce emissions",
            "Focus on the biggest impact areas first",
            "Small changes can add up to big differences"
          ]
        },
        {
          title: "Why Shopping Choices Matter",
          content: "Consumer choices drive demand for products, influencing how they're made, packaged, and shipped. By choosing products with lower carbon footprints, you're voting with your wallet for a more sustainable future.",
          tips: [
            "Look for products with minimal packaging",
            "Choose locally sourced items when possible",
            "Consider the entire lifecycle of products"
          ]
        }
      ]
    },
    {
      id: "products",
      title: "Product Impact",
      icon: <ShoppingBag className="w-5 h-5" />,
      articles: [
        {
          title: "Electronics and Energy Efficiency",
          content: "Electronic devices have varying carbon footprints based on their energy efficiency, manufacturing processes, and materials used. Energy Star certified products can use 20-50% less energy than standard models.",
          tips: [
            "Look for Energy Star certification",
            "Choose devices with longer lifespans",
            "Consider refurbished electronics",
            "Unplug devices when not in use"
          ]
        },
        {
          title: "Food Choices and Climate",
          content: "Food production accounts for about 26% of global greenhouse gas emissions. Plant-based foods generally have lower carbon footprints than animal products. Local and organic foods can also reduce environmental impact.",
          tips: [
            "Try 'Meatless Monday' or reduce meat consumption",
            "Choose organic when possible",
            "Buy seasonal, local produce",
            "Reduce food waste"
          ]
        }
      ]
    },
    {
      id: "transportation",
      title: "Transportation Impact",
      icon: <Car className="w-5 h-5" />,
      articles: [
        {
          title: "Shipping and Delivery Choices",
          content: "How products reach you matters. Faster shipping often means more carbon emissions due to less efficient transportation methods. Consolidating orders and choosing slower shipping can reduce your impact.",
          tips: [
            "Choose standard shipping over expedited",
            "Consolidate multiple orders",
            "Look for carbon-neutral shipping options",
            "Consider pickup options"
          ]
        }
      ]
    },
    {
      id: "home",
      title: "Home & Lifestyle",
      icon: <Home className="w-5 h-5" />,
      articles: [
        {
          title: "Household Products and Sustainability",
          content: "Household items like cleaning products, personal care items, and appliances have varying environmental impacts. Concentrated formulas, refillable containers, and multi-purpose products can reduce waste and emissions.",
          tips: [
            "Choose concentrated formulas",
            "Look for refillable options",
            "Buy multi-purpose products",
            "Choose products with minimal packaging"
          ]
        }
      ]
    }
  ];

  const quickFacts = [
    {
      icon: <TreePine className="w-6 h-6 text-success" />,
      fact: "One tree can absorb about 48 pounds of CO₂ per year",
      detail: "That's equivalent to driving about 100 miles in an average car"
    },
    {
      icon: <Zap className="w-6 h-6 text-warning" />,
      fact: "LED bulbs use 75% less energy than incandescent bulbs",
      detail: "They also last 25 times longer, reducing replacement waste"
    },
    {
      icon: <Recycle className="w-6 h-6 text-accent" />,
      fact: "Recycling one aluminum can saves enough energy to run a TV for 3 hours",
      detail: "Aluminum can be recycled indefinitely without losing quality"
    },
    {
      icon: <Droplets className="w-6 h-6 text-primary" />,
      fact: "A reusable water bottle can save 1,460 plastic bottles per year",
      detail: "That's preventing about 12 kg of CO₂ emissions annually"
    }
  ];

  const carbonCalculator = {
    activities: [
      { name: "Driving 1 mile", co2: 0.4, unit: "kg CO₂" },
      { name: "Washing machine load", co2: 0.6, unit: "kg CO₂" },
      { name: "1 hour of TV watching", co2: 0.1, unit: "kg CO₂" },
      { name: "Eating 1 beef burger", co2: 2.6, unit: "kg CO₂" },
      { name: "1 plastic water bottle", co2: 0.1, unit: "kg CO₂" },
      { name: "Overnight phone charging", co2: 0.01, unit: "kg CO₂" }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lightbulb className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Education Hub</h1>
            <p className="text-muted-foreground">Learn how to reduce your environmental impact</p>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Climate Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickFacts.map((fact, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
                <div className="p-2 bg-background rounded-full flex-shrink-0">
                  {fact.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{fact.fact}</p>
                  <p className="text-xs text-muted-foreground mt-1">{fact.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Carbon Calculator Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Carbon Footprint Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Compare the carbon footprint of common activities to understand the impact of your choices:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {carbonCalculator.activities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm">{activity.name}</span>
                <Badge variant="outline" className="text-xs">
                  {activity.co2} {activity.unit}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Educational Content Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Learn More</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  {category.icon}
                  <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                
                {category.articles.map((article, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{article.content}</p>
                      
                      <div>
                        <h4 className="font-medium mb-2">💡 Action Tips:</h4>
                        <ul className="space-y-1">
                          {article.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <span className="text-success mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-success/10 to-primary/10">
        <CardContent className="p-8 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold">Ready to Make a Difference?</h3>
            <p className="text-muted-foreground">
              Knowledge is power. Now that you understand the impact of your choices, 
              start making more sustainable decisions with every purchase.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-success text-success-foreground px-4 py-2">
                Start Shopping Sustainably
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};