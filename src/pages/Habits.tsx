import { useState } from 'react';
import { Droplets, Recycle, Zap, TreePine, ShoppingBag, Car } from 'lucide-react';
import HabitCard from '@/components/habits/HabitCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Habit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  streak: number;
}

const Habits = () => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Save Water',
      description: 'Take shorter showers and turn off tap while brushing teeth',
      icon: <Droplets className="w-6 h-6" />,
      completed: false,
      streak: 5
    },
    {
      id: '2',
      title: 'Recycle Waste',
      description: 'Properly sort and recycle paper, plastic, and glass',
      icon: <Recycle className="w-6 h-6" />,
      completed: true,
      streak: 12
    },
    {
      id: '3',
      title: 'Reduce Plastic',
      description: 'Use reusable bags and avoid single-use plastics',
      icon: <ShoppingBag className="w-6 h-6" />,
      completed: false,
      streak: 3
    },
    {
      id: '4',
      title: 'Energy Saving',
      description: 'Turn off lights and unplug devices when not in use',
      icon: <Zap className="w-6 h-6" />,
      completed: true,
      streak: 8
    },
    {
      id: '5',
      title: 'Green Transport',
      description: 'Walk, bike, or use public transport instead of driving',
      icon: <Car className="w-6 h-6" />,
      completed: false,
      streak: 2
    },
    {
      id: '6',
      title: 'Plant Care',
      description: 'Water your plants and care for your green space',
      icon: <TreePine className="w-6 h-6" />,
      completed: false,
      streak: 7
    }
  ]);

  const handleToggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completed;
        
        // Show toast notification
        if (newCompleted) {
          toast({
            title: "Habit completed! 🎉",
            description: `Great job on completing "${habit.title}"!`,
          });
        }
        
        return {
          ...habit,
          completed: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Daily Eco Habits</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Track your daily environmental actions and build sustainable habits
          </p>
          
          {/* Progress Summary */}
          <div className="eco-card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Today's Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completedToday} of {totalHabits} habits completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-success">{completionRate}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="success-gradient h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Habits List */}
        <div className="space-y-4 mb-8">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              {...habit}
              onToggle={handleToggleHabit}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="eco-button">
            Log All Completed Habits
          </Button>
          <Button variant="outline" size="lg">
            Add Custom Habit
          </Button>
        </div>

        {/* Tips Section */}
        <div className="mt-12 eco-card p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">💡 Daily Eco Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-accent/20 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Water Conservation</h4>
              <p className="text-sm text-muted-foreground">
                A 5-minute shorter shower can save up to 25 gallons of water!
              </p>
            </div>
            <div className="p-4 bg-accent/20 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Energy Efficiency</h4>
              <p className="text-sm text-muted-foreground">
                Unplugging devices can reduce your energy bill by up to 10%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habits;