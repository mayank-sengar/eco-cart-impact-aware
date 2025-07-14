import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingDown, 
  Target, 
  Award, 
  Calendar,
  Leaf,
  BarChart3,
  TreePine,
  Recycle
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const Dashboard = () => {
  const { getCarbonSavings } = useCartStore();
  const currentSavings = getCarbonSavings();
  
  // Mock user data - in a real app this would come from a user store/API
  const userData = {
    totalSavings: 127.3 + currentSavings,
    monthlyGoal: 150,
    ecoScore: 85,
    treesEquivalent: Math.floor((127.3 + currentSavings) / 10),
    milesOffset: Math.floor((127.3 + currentSavings) * 2.3),
    achievementsUnlocked: 7,
    streakDays: 23,
    rank: "Eco Champion"
  };

  const achievements = [
    { id: 1, name: "First Steps", description: "Made your first eco-friendly purchase", icon: "🌱", unlocked: true },
    { id: 2, name: "Carbon Saver", description: "Saved 50kg of CO₂", icon: "🌿", unlocked: true },
    { id: 3, name: "Eco Warrior", description: "Saved 100kg of CO₂", icon: "🌳", unlocked: true },
    { id: 4, name: "Planet Protector", description: "30 day eco shopping streak", icon: "🏆", unlocked: true },
    { id: 5, name: "Green Champion", description: "Influenced 5 friends to shop eco", icon: "⭐", unlocked: true },
    { id: 6, name: "Climate Hero", description: "Saved 200kg of CO₂", icon: "🦸", unlocked: false },
    { id: 7, name: "Earth Guardian", description: "1 year of eco shopping", icon: "🌍", unlocked: false },
  ];

  const monthlyProgress = (userData.totalSavings / userData.monthlyGoal) * 100;

  const impactComparisons = [
    {
      title: "Trees Planted Equivalent",
      value: userData.treesEquivalent,
      unit: "trees",
      icon: <TreePine className="w-6 h-6 text-success" />,
      description: "Your carbon savings equal planting this many trees"
    },
    {
      title: "Car Miles Offset",
      value: userData.milesOffset,
      unit: "miles",
      icon: <Recycle className="w-6 h-6 text-accent" />,
      description: "Equivalent to not driving this many miles"
    },
    {
      title: "Eco Score",
      value: userData.ecoScore,
      unit: "/100",
      icon: <Target className="w-6 h-6 text-primary" />,
      description: "Your overall sustainability rating"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-success/10 rounded-full">
            <Award className="w-8 h-8 text-success" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Your Eco Dashboard</h1>
            <p className="text-muted-foreground">Track your environmental impact and achievements</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-6">
          <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
            {userData.rank}
          </Badge>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{userData.streakDays} day streak</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-success/20 rounded-full w-fit mx-auto mb-4">
              <TrendingDown className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-success">{userData.totalSavings.toFixed(1)} kg</h3>
            <p className="text-sm text-muted-foreground">Total CO₂ Saved</p>
            {currentSavings > 0 && (
              <p className="text-xs text-success mt-1">+{currentSavings.toFixed(1)} kg from current cart</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">{monthlyProgress.toFixed(0)}%</h3>
            <p className="text-sm text-muted-foreground mb-3">Monthly Goal Progress</p>
            <Progress value={monthlyProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {(userData.monthlyGoal - userData.totalSavings).toFixed(1)} kg to reach {userData.monthlyGoal} kg goal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold">{userData.achievementsUnlocked}</h3>
            <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
          </CardContent>
        </Card>
      </div>

      {/* Impact Comparisons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Your Environmental Impact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactComparisons.map((impact, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="p-4 bg-muted/20 rounded-full w-fit mx-auto">
                  {impact.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{impact.value}</h3>
                  <p className="text-sm font-medium">{impact.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{impact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`${
                  achievement.unlocked 
                    ? 'bg-success/5 border-success/20' 
                    : 'bg-muted/20 border-muted'
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h4 className={`font-semibold ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-xs mt-1 ${achievement.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <Badge variant="outline" className="mt-2 text-xs border-success text-success">
                      Unlocked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10">
        <CardContent className="p-8 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold">Keep Making a Difference!</h3>
            <p className="text-muted-foreground">
              Every eco-friendly choice counts. Continue shopping sustainably to unlock more achievements 
              and increase your positive environmental impact.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="flex items-center space-x-2">
                <Leaf className="w-4 h-4" />
                <span>Shop Eco Products</span>
              </Button>
              <Button variant="outline">
                Share Your Impact
              </Button>
              <Button variant="outline">
                Invite Friends
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};