import { useState } from 'react';
import { Check } from 'lucide-react';

interface HabitCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  onToggle: (id: string) => void;
  streak?: number;
}

const HabitCard = ({ 
  id, 
  title, 
  description, 
  icon, 
  completed, 
  onToggle,
  streak = 0
}: HabitCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    onToggle(id);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className={`eco-card p-6 flex items-center justify-between ${isAnimating ? 'animate-pulse' : ''}`}>
      <div className="flex items-center space-x-4 flex-1">
        <div className="w-12 h-12 eco-gradient rounded-xl flex items-center justify-center text-white">
          {icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          {streak > 0 && (
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-xs text-warning font-medium">🔥 {streak} day streak</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleToggle}
        className={`habit-toggle ${completed ? 'completed' : ''}`}
        aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {completed && <Check className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default HabitCard;