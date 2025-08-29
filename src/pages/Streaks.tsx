import { useState } from 'react';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon, Flame, Trophy, Target } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

// Mock data for completed dates
const completedDates = [
  new Date(2024, 7, 25),
  new Date(2024, 7, 26),
  new Date(2024, 7, 27),
  new Date(2024, 7, 28),
  new Date(2024, 7, 29),
];

const Streaks = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const currentStreak = 5;
  const longestStreak = 12;
  const totalDays = 25;

  // Check if a date has completed habits
  const isCompletedDate = (date: Date) => {
    return completedDates.some(completedDate => 
      completedDate.toDateString() === date.toDateString()
    );
  };

  // Custom tile content for calendar
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && isCompletedDate(date)) {
      return (
        <div className="flex justify-center mt-1">
          <div className="w-2 h-2 bg-success rounded-full"></div>
        </div>
      );
    }
    return null;
  };

  const milestones = [
    { days: 3, title: 'Getting Started', icon: '🌱', unlocked: true },
    { days: 7, title: 'Week Warrior', icon: '💪', unlocked: true },
    { days: 14, title: 'Two Week Champion', icon: '🏆', unlocked: false },
    { days: 30, title: 'Monthly Master', icon: '👑', unlocked: false },
    { days: 50, title: 'Eco Legend', icon: '🌟', unlocked: false },
    { days: 100, title: 'Planet Protector', icon: '🌍', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Streak Calendar</h1>
          <p className="text-xl text-muted-foreground">
            Track your consistency and celebrate your achievements
          </p>
        </div>

        {/* Streak Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="metric-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-warning/20 rounded-full flex items-center justify-center">
              <Flame className="w-8 h-8 text-warning" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{currentStreak}</h3>
            <p className="text-muted-foreground">Current Streak</p>
            <p className="text-sm text-success mt-1">🔥 On fire!</p>
          </div>

          <div className="metric-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-success/20 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{longestStreak}</h3>
            <p className="text-muted-foreground">Longest Streak</p>
            <p className="text-sm text-muted-foreground mt-1">Personal best!</p>
          </div>

          <div className="metric-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{totalDays}</h3>
            <p className="text-muted-foreground">Total Active Days</p>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="eco-card p-6">
            <div className="flex items-center space-x-2 mb-6">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Habit Calendar</h2>
            </div>
            
            <div className="calendar-container">
              <Calendar
                value={selectedDate}
                onChange={(value) => setSelectedDate(value as Date)}
                tileContent={tileContent}
                className="w-full"
                tileClassName={({ date, view }) => {
                  if (view === 'month' && isCompletedDate(date)) {
                    return 'completed-day';
                  }
                  return '';
                }}
              />
            </div>
            
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Completed days</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <span className="text-muted-foreground">Inactive days</span>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="eco-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Streak Milestones</h2>
            
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-[var(--transition-smooth)] ${
                    milestone.unlocked
                      ? 'bg-success/10 border border-success/20'
                      : 'bg-muted/30 border border-muted'
                  }`}
                >
                  <div className={`text-2xl ${milestone.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {milestone.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      milestone.unlocked ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {milestone.days} day streak
                    </p>
                  </div>
                  
                  {milestone.unlocked && (
                    <div className="text-success font-bold">✓</div>
                  )}
                  
                  {!milestone.unlocked && currentStreak < milestone.days && (
                    <div className="text-sm text-muted-foreground">
                      {milestone.days - currentStreak} more days
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-8 eco-card p-8 text-center nature-gradient">
          <h3 className="text-2xl font-bold text-white mb-4">Keep It Going! 🚀</h3>
          <p className="text-white/90 text-lg mb-6">
            You're just {7 - (currentStreak % 7)} days away from your next weekly milestone!
          </p>
          <p className="text-white/80">
            Consistency is key to building lasting environmental habits. Every day counts!
          </p>
        </div>
      </div>

      {/* Custom Calendar Styles */}
      <style>{`
        .react-calendar {
          width: 100% !important;
          border: none !important;
          background: transparent !important;
          font-family: inherit !important;
        }
        
        .react-calendar__tile {
          background: hsl(var(--muted)) !important;
          border: 1px solid hsl(var(--border)) !important;
          color: hsl(var(--foreground)) !important;
          border-radius: 0.5rem !important;
          margin: 2px !important;
          padding: 0.75rem 0.5rem !important;
          transition: all 0.3s ease !important;
        }
        
        .react-calendar__tile:hover {
          background: hsl(var(--accent)) !important;
          transform: scale(1.05) !important;
        }
        
        .react-calendar__tile--active {
          background: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }
        
        .react-calendar__tile.completed-day {
          background: hsl(var(--success)) !important;
          color: hsl(var(--success-foreground)) !important;
          font-weight: bold !important;
        }
        
        .react-calendar__navigation {
          margin-bottom: 1rem !important;
        }
        
        .react-calendar__navigation button {
          background: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          color: hsl(var(--foreground)) !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem 1rem !important;
          margin: 0 0.25rem !important;
        }
        
        .react-calendar__navigation button:hover {
          background: hsl(var(--accent)) !important;
        }
      `}</style>
    </div>
  );
};

export default Streaks;