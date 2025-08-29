import { useState } from 'react';
import { User, Mail, Settings, Trophy, Leaf, Droplets, Zap, TreePine, Edit, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AchievementBadge from '@/components/achievements/AchievementBadge';
import EcoMetricCard from '@/components/dashboard/EcoMetricCard';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    joinDate: 'March 2024',
    ecoScore: 82
  });

  const achievements = [
    {
      title: 'First Steps',
      description: 'Complete your first eco-habit',
      icon: <Leaf className="w-8 h-8" />,
      unlocked: true
    },
    {
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: <Trophy className="w-8 h-8" />,
      unlocked: true
    },
    {
      title: 'Water Saver',
      description: 'Save 1000+ liters of water',
      icon: <Droplets className="w-8 h-8" />,
      unlocked: true
    },
    {
      title: 'Energy Efficient',
      description: 'Save 500+ kWh of energy',
      icon: <Zap className="w-8 h-8" />,
      unlocked: true
    },
    {
      title: 'Tree Hugger',
      description: 'Offset 100kg of CO₂',
      icon: <TreePine className="w-8 h-8" />,
      unlocked: false,
      progress: 67,
      maxProgress: 100
    },
    {
      title: 'Eco Champion',
      description: 'Complete 100 total habits',
      icon: <Trophy className="w-8 h-8" />,
      unlocked: false,
      progress: 73,
      maxProgress: 100
    }
  ];

  const ecoImpactStats = [
    {
      title: 'Water Saved',
      value: '2,450',
      unit: 'liters',
      icon: <Droplets className="w-6 h-6" />,
      trend: 'Lifetime total',
      gradient: 'eco-gradient'
    },
    {
      title: 'CO₂ Reduced',
      value: '185',
      unit: 'kg',
      icon: <TreePine className="w-6 h-6" />,
      trend: 'Lifetime total',
      gradient: 'forest-gradient'
    },
    {
      title: 'Energy Saved',
      value: '340',
      unit: 'kWh',
      icon: <Zap className="w-6 h-6" />,
      trend: 'Lifetime total',
      gradient: 'nature-gradient'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In real app, would save to backend
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Your Eco Profile</h1>
          <p className="text-xl text-muted-foreground">
            Track your journey towards a more sustainable lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="eco-card">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 eco-gradient rounded-full flex items-center justify-center text-white text-4xl">
                    🌱
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary-dark transition-[var(--transition-smooth)]">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <CardTitle className="text-xl text-foreground">{userInfo.name}</CardTitle>
                <p className="text-muted-foreground">Eco Warrior since {userInfo.joinDate}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} size="sm" className="flex-1">
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" size="sm" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userInfo.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userInfo.email}</span>
                    </div>
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                )}

                {/* Eco Score */}
                <div className="pt-4 border-t border-border">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Eco Impact Score</h3>
                    <div className="text-3xl font-bold text-success mb-2">{userInfo.ecoScore}%</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="success-gradient h-2 rounded-full transition-all duration-500"
                        style={{ width: `${userInfo.ecoScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Above average eco-warrior!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Eco Impact Summary */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Environmental Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ecoImpactStats.map((stat, index) => (
                  <EcoMetricCard key={index} {...stat} />
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
              <div className="eco-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-success/10 rounded-lg">
                    <div className="w-10 h-10 success-gradient rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Completed all habits today</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-warning/10 rounded-lg">
                    <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center text-white">
                      🔥
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Reached 5-day streak milestone</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-primary/10 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                      🏆
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Unlocked "Water Saver" achievement</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Achievements Grid */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Achievements & Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <AchievementBadge key={index} {...achievement} />
                ))}
              </div>
            </section>

            {/* Settings */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>
              <div className="eco-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Trophy className="w-4 h-4 mr-2" />
                    Goal Configuration
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Leaf className="w-4 h-4 mr-2" />
                    Eco Preferences
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;