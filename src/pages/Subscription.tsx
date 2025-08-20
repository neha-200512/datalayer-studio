import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Crown, Users, Zap } from "lucide-react";

const Subscription = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("free"); // Mock current plan

  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "forever",
      icon: Users,
      description: "Perfect for researchers and students",
      features: [
        { name: "Access to public datasets", included: true },
        { name: "Basic query builder", included: true },
        { name: "CSV downloads (up to 10,000 rows)", included: true },
        { name: "API access (1,000 requests/month)", included: true },
        { name: "Dataset analysis insights", included: false },
        { name: "Premium datasets", included: false },
        { name: "Unlimited downloads", included: false },
        { name: "Priority support", included: false }
      ],
      popular: false
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹999",
      period: "per month",
      icon: Crown,
      description: "For professionals and organizations",
      features: [
        { name: "Access to public datasets", included: true },
        { name: "Basic query builder", included: true },
        { name: "CSV downloads (up to 10,000 rows)", included: true },
        { name: "API access (1,000 requests/month)", included: true },
        { name: "Dataset analysis insights", included: true },
        { name: "Premium datasets", included: true },
        { name: "Unlimited downloads", included: true },
        { name: "Priority support", included: true }
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      icon: Zap,
      description: "For large organizations and institutions",
      features: [
        { name: "All Premium features", included: true },
        { name: "Custom data ingestion", included: true },
        { name: "White-label solutions", included: true },
        { name: "Dedicated support", included: true },
        { name: "Custom SLA", included: true },
        { name: "On-premise deployment", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Bulk API access", included: true }
      ],
      popular: false
    }
  ];

  const usageStats = {
    apiRequests: { used: 347, limit: 1000 },
    downloads: { used: 12, limit: currentPlan === 'free' ? 50 : 999999 },
    premiumDatasets: { used: 0, limit: currentPlan === 'premium' ? 999999 : 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Choose Your Plan</h1>
          <p className="text-muted-foreground mt-2">Access India's comprehensive microdata with flexible pricing</p>
        </div>

        {/* Current Usage */}
        <Card className="mospi-card p-6">
          <h3 className="font-semibold mb-4">Current Usage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Requests</span>
                <span>{usageStats.apiRequests.used} / {usageStats.apiRequests.limit.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(usageStats.apiRequests.used / usageStats.apiRequests.limit) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Downloads</span>
                <span>{usageStats.downloads.used} / {currentPlan === 'free' ? usageStats.downloads.limit : '∞'}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: currentPlan === 'free' ? `${(usageStats.downloads.used / usageStats.downloads.limit) * 100}%` : '12%' }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Premium Access</span>
                <span>{currentPlan === 'premium' ? 'Unlimited' : 'Not Available'}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${currentPlan === 'premium' ? 'bg-green-500' : 'bg-muted'}`}
                  style={{ width: currentPlan === 'premium' ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = plan.id === currentPlan;
            
            return (
              <Card key={plan.id} className={`mospi-card p-6 relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period !== "pricing" && (
                      <span className="text-muted-foreground text-sm">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />  
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {isCurrentPlan ? (
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      Current Plan
                    </Badge>
                  ) : (
                    <Button 
                      className="w-full mospi-btn"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => {
                        if (plan.id === 'enterprise') {
                          alert('Contact sales for enterprise pricing');
                        } else {
                          alert(`Upgrading to ${plan.name} plan (Demo)`);
                          setCurrentPlan(plan.id);
                        }
                      }}
                    >
                      {plan.id === 'enterprise' ? 'Contact Sales' : `Upgrade to ${plan.name}`}
                    </Button>
                  )}
                  
                  {isCurrentPlan && currentPlan !== 'free' && (
                    <Button variant="outline" className="w-full" size="sm">
                      Manage Subscription
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* FAQ */}
        <Card className="mospi-card p-6">
          <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">What datasets are included in Premium?</h4>
              <p className="text-sm text-muted-foreground">Premium includes access to restricted datasets like detailed household expenditure surveys, employment surveys with sensitive information, and other datasets requiring special access permissions.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your current billing period.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Do you offer academic discounts?</h4>
              <p className="text-sm text-muted-foreground">Yes, we offer special pricing for educational institutions and researchers. Contact us with your academic credentials for more information.</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Subscription;