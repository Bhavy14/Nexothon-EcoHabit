import { useState } from 'react';
import { Trophy, Users, Crown, Medal, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface LeaderboardUser {
  id: string;
  name: string;
  streakPoints: number;
  ecoImpactScore: number;
  rank: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState<'global' | 'family'>('global');
  const [familyCode, setFamilyCode] = useState('');
  const [showJoinFamily, setShowJoinFamily] = useState(false);

  const leaderboardData: LeaderboardUser[] = [
    { id: '1', name: 'EcoMaster Sarah', streakPoints: 2450, ecoImpactScore: 95, rank: 1, avatar: '🌟' },
    { id: '2', name: 'GreenGuru Mike', streakPoints: 2230, ecoImpactScore: 89, rank: 2, avatar: '🌱' },
    { id: '3', name: 'TreeHugger Lisa', streakPoints: 2100, ecoImpactScore: 87, rank: 3, avatar: '🌳' },
    { id: '4', name: 'You', streakPoints: 1890, ecoImpactScore: 82, rank: 4, avatar: '🍃', isCurrentUser: true },
    { id: '5', name: 'ClimateHero Alex', streakPoints: 1750, ecoImpactScore: 78, rank: 5, avatar: '♻️' },
    { id: '6', name: 'PlanetSaver Emma', streakPoints: 1620, ecoImpactScore: 74, rank: 6, avatar: '🌍' },
    { id: '7', name: 'WaterWise Tom', streakPoints: 1480, ecoImpactScore: 69, rank: 7, avatar: '💧' },
    { id: '8', name: 'SolarPowered Luna', streakPoints: 1350, ecoImpactScore: 65, rank: 8, avatar: '☀️' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-warning" />;
      case 2: return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 3: return <Medal className="w-6 h-6 text-warning" />;
      default: return <Star className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const handleJoinFamily = () => {
    if (familyCode.trim()) {
      setShowJoinFamily(false);
      setFamilyCode('');
      // Mock success - in real app would join family group
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Eco Leaderboard</h1>
          <p className="text-xl text-muted-foreground">
            Compete with eco-warriors worldwide and see who's making the biggest impact!
          </p>
        </div>

        {/* Tabs and Family Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-muted p-1 rounded-lg">
            <button
              onClick={() => setSelectedTab('global')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-[var(--transition-smooth)] ${
                selectedTab === 'global'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Global Ranking
            </button>
            <button
              onClick={() => setSelectedTab('family')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-[var(--transition-smooth)] ${
                selectedTab === 'family'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Family Group
            </button>
          </div>

          <div className="flex gap-2">
            <Dialog open={showJoinFamily} onOpenChange={setShowJoinFamily}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Join Family
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join Family Group</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Enter your family's invite code to join their eco-challenge group!
                  </p>
                  <Input
                    placeholder="Enter family code"
                    value={familyCode}
                    onChange={(e) => setFamilyCode(e.target.value)}
                  />
                  <Button onClick={handleJoinFamily} className="w-full">
                    Join Family Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button size="sm" className="eco-button">
              <Users className="w-4 h-4 mr-2" />
              Create Family
            </Button>
          </div>
        </div>

        {/* Current User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="metric-card text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-2xl font-bold text-foreground">#{leaderboardData.find(u => u.isCurrentUser)?.rank}</h3>
            <p className="text-muted-foreground">Your Rank</p>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-2xl font-bold text-foreground">{leaderboardData.find(u => u.isCurrentUser)?.streakPoints}</h3>
            <p className="text-muted-foreground">Streak Points</p>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl mb-2">🌱</div>
            <h3 className="text-2xl font-bold text-foreground">{leaderboardData.find(u => u.isCurrentUser)?.ecoImpactScore}</h3>
            <p className="text-muted-foreground">Eco Impact Score</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="eco-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Rank</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">User</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Streak Points</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Eco Impact</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-t border-border transition-[var(--transition-smooth)] hover:bg-accent/10 ${
                      user.isCurrentUser ? 'bg-success/10 border-success/20' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(user.rank)}
                        <span className="font-semibold text-foreground">#{user.rank}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          {user.isCurrentUser && (
                            <p className="text-sm text-success font-medium">That's you!</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="font-bold text-primary">{user.streakPoints.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        <div className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
                          {user.ecoImpactScore}%
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Family Group Preview */}
        {selectedTab === 'family' && (
          <div className="mt-8 eco-card p-8 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Join a Family Group</h3>
            <p className="text-muted-foreground mb-6">
              Connect with family members to share eco-challenges and compete together!
            </p>
            <Button onClick={() => setShowJoinFamily(true)} className="eco-button">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;