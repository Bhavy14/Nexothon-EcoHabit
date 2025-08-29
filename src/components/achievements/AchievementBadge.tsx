import { ReactNode } from 'react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const AchievementBadge = ({ 
  title, 
  description, 
  icon, 
  unlocked, 
  progress = 0, 
  maxProgress = 100 
}: AchievementBadgeProps) => {
  const progressPercentage = maxProgress > 0 ? (progress / maxProgress) * 100 : 0;

  return (
    <div className={`achievement-card ${unlocked ? 'border-success/50 bg-success/5' : 'opacity-60'}`}>
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
        unlocked ? 'success-gradient text-white shadow-[var(--shadow-success)]' : 'bg-muted text-muted-foreground'
      }`}>
        {icon}
      </div>
      
      <h3 className={`text-lg font-semibold mb-2 ${unlocked ? 'text-success' : 'text-muted-foreground'}`}>
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      {!unlocked && maxProgress > 0 && (
        <div className="w-full">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{progress}</span>
            <span>{maxProgress}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
      )}
      
      {unlocked && (
        <div className="streak-badge">
          ✨ Unlocked!
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;