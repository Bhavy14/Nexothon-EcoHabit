import { Droplets, Zap, Recycle, TreePine, Calendar, Trophy, Target } from 'lucide-react';
import EcoMetricCard from '@/components/dashboard/EcoMetricCard';
import AchievementBadge from '@/components/achievements/AchievementBadge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const ecoMetrics = [
    {
      title: 'Water Saved',
      value: '2,450',
      unit: 'liters',
      icon: <Droplets className="w-6 h-6" />,
      trend: '+12% this week',
      gradient: 'eco-gradient'
    },
    {
      title: 'CO₂ Reduced',
      value: '185',
      unit: 'kg',
      icon: <TreePine className="w-6 h-6" />,
      trend: '+8% this week',
      gradient: 'forest-gradient'
    },
    {
      title: 'Energy Saved',
      value: '340',
      unit: 'kWh',
      icon: <Zap className="w-6 h-6" />,
      trend: '+15% this week',
      gradient: 'nature-gradient'
    },
    {
      title: 'Plastic Avoided',
      value: '67',
      unit: 'items',
      icon: <Recycle className="w-6 h-6" />,
      trend: '+22% this week',
      gradient: 'success-gradient'
    }
  ];

  const achievements = [
    {
      title: 'First Steps',
      description: 'Complete your first eco-habit',
      icon: <Target className="w-8 h-8" />,
      unlocked: true
    },
    {
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: <Calendar className="w-8 h-8" />,
      unlocked: true
    },
    {
      title: 'Eco Champion',
      description: 'Complete 100 total habits',
      icon: <Trophy className="w-8 h-8" />,
      unlocked: false,
      progress: 67,
      maxProgress: 100
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="eco-gradient text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, Eco Warrior! 🌱
            </h1>
            <p className="text-xl text-white/90 mb-8">
              You're making a real difference for our planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/habits">Log Today's Habits</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/streaks">View Streaks</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Current Streak */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 streak-badge text-lg px-6 py-3">
            <span>🔥</span>
            <span>5-Day Streak</span>
          </div>
          <p className="text-muted-foreground mt-2">Keep it going! You're on fire!</p>
        </div>

        {/* Eco Impact Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Eco Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoMetrics.map((metric, index) => (
              <EcoMetricCard key={index} {...metric} />
            ))}
          </div>
        </section>

        {/* Today's Challenge */}
        <section className="mb-12">
          <div className="eco-card p-8 text-center nature-gradient">
            <h3 className="text-2xl font-bold text-white mb-4">Today's AI Challenge</h3>
            <p className="text-white/90 text-lg mb-6">
              Try using a reusable water bottle today instead of buying plastic bottles. 
              You could save up to 3 plastic bottles! 🌊
            </p>
            <Button className="bg-white text-primary hover:bg-white/90">
              Accept Challenge
            </Button>
          </div>
        </section>

        {/* Recent Achievements */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
            <Button asChild variant="outline">
              <Link to="/achievements">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementBadge key={index} {...achievement} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;