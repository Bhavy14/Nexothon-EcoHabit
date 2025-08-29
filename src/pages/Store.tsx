import { useState } from 'react';
import { ShoppingBag, Coins, Badge, Palette, Award, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'virtual' | 'eco-product';
  icon: string;
  available: boolean;
  purchased?: boolean;
}

const Store = () => {
  const [userPoints] = useState(1890);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'virtual' | 'eco-product'>('all');
  const { toast } = useToast();

  const storeItems: StoreItem[] = [
    // Virtual Rewards
    {
      id: '1',
      name: 'Golden Leaf Badge',
      description: 'Show off your eco-warrior status with this exclusive badge',
      price: 500,
      category: 'virtual',
      icon: '🍃',
      available: true
    },
    {
      id: '2',
      name: 'Planet Protector Avatar',
      description: 'Unlock a special avatar frame for your profile',
      price: 750,
      category: 'virtual',
      icon: '🌍',
      available: true
    },
    {
      id: '3',
      name: 'Rainbow Trail Effect',
      description: 'Add a colorful trail to your habit completion animations',
      price: 400,
      category: 'virtual',
      icon: '🌈',
      available: true
    },
    {
      id: '4',
      name: 'Eco Champion Title',
      description: 'Display "Eco Champion" on your profile',
      price: 1000,
      category: 'virtual',
      icon: '👑',
      available: true
    },
    
    // Eco Products
    {
      id: '5',
      name: 'Bamboo Water Bottle',
      description: 'Sustainable 500ml bamboo fiber water bottle',
      price: 1200,
      category: 'eco-product',
      icon: '🫗',
      available: true
    },
    {
      id: '6',
      name: 'Mini Desk Plant',
      description: 'Small succulent plant for your workspace',
      price: 800,
      category: 'eco-product',
      icon: '🪴',
      available: true
    },
    {
      id: '7',
      name: 'Organic Cotton Tote Bag',
      description: 'Reusable shopping bag made from organic cotton',
      price: 600,
      category: 'eco-product',
      icon: '👜',
      available: true
    },
    {
      id: '8',
      name: 'Solar Power Bank',
      description: 'Portable solar-powered phone charger',
      price: 2000,
      category: 'eco-product',
      icon: '🔋',
      available: true
    },
    {
      id: '9',
      name: 'Seed Bomb Kit',
      description: 'Wildflower seed bombs to plant anywhere',
      price: 300,
      category: 'eco-product',
      icon: '🌺',
      available: true
    }
  ];

  const filteredItems = storeItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const handlePurchase = (item: StoreItem) => {
    if (userPoints >= item.price) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast({
        title: "Purchase Successful! 🎉",
        description: `You've purchased ${item.name} for ${item.price} points!`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${item.price - userPoints} more points to purchase this item.`,
        variant: "destructive"
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'virtual': return <Badge className="w-4 h-4" />;
      case 'eco-product': return <Leaf className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Eco Rewards Store</h1>
          <p className="text-xl text-muted-foreground">
            Spend your streak points on amazing virtual rewards and eco-friendly products!
          </p>
        </div>

        {/* Points Balance */}
        <div className="eco-card p-6 mb-8 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center">
              <Coins className="w-8 h-8 text-warning" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">{userPoints.toLocaleString()}</h2>
              <p className="text-muted-foreground">Streak Points Available</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Earn more points by completing daily habits and maintaining streaks!
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Items', icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'virtual', label: 'Virtual Rewards', icon: <Badge className="w-4 h-4" /> },
            { id: 'eco-product', label: 'Eco Products', icon: <Leaf className="w-4 h-4" /> }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-[var(--transition-smooth)] ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-[var(--shadow-eco)]'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Store Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="eco-card p-6 hover:scale-105 transition-[var(--transition-bounce)]">
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {getCategoryIcon(item.category)}
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {item.category === 'eco-product' ? 'Eco Product' : 'Virtual Reward'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-warning" />
                    <span className="text-lg font-bold text-foreground">{item.price}</span>
                  </div>
                  
                  <Button
                    onClick={() => handlePurchase(item)}
                    disabled={!item.available || userPoints < item.price}
                    size="sm"
                    className={`${
                      userPoints >= item.price 
                        ? 'eco-button' 
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {userPoints >= item.price ? 'Buy Now' : 'Insufficient Points'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Earn Points */}
        <div className="mt-12 eco-card p-8">
          <div className="text-center mb-6">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">How to Earn More Points</h3>
            <p className="text-muted-foreground">Boost your point balance with these activities:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-semibold text-foreground mb-2">Complete Daily Habits</h4>
              <p className="text-sm text-muted-foreground">Earn 10-50 points per habit completed</p>
            </div>
            
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <div className="text-3xl mb-2">🔥</div>
              <h4 className="font-semibold text-foreground mb-2">Maintain Streaks</h4>
              <p className="text-sm text-muted-foreground">Bonus points for consecutive days</p>
            </div>
            
            <div className="text-center p-4 bg-accent/20 rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-semibold text-foreground mb-2">Unlock Achievements</h4>
              <p className="text-sm text-muted-foreground">Major point rewards for milestones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;