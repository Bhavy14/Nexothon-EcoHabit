import { useState } from 'react';
import { Bell, Flame, Leaf, Trophy, Users, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'streak' | 'motivation' | 'achievement' | 'social' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  urgent?: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'streak',
      title: "Don't break your streak! 🔥",
      message: "You're on a 5-day streak! Complete today's habits to keep it going.",
      time: '10 minutes ago',
      read: false,
      urgent: true
    },
    {
      id: '2',
      type: 'motivation',
      title: "Perfect day for cycling! 🚴‍♀️",
      message: "It's a beautiful day outside. Try using your bike instead of driving today!",
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'achievement',
      title: "New Achievement Unlocked! 🏆",
      message: "Congratulations! You've earned the 'Water Saver' badge for saving 1000+ liters.",
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      type: 'social',
      title: "Your friend Sarah completed all habits! 👏",
      message: "Sarah is maintaining her streak. Send her some encouragement!",
      time: '1 day ago',
      read: true
    },
    {
      id: '5',
      type: 'reminder',
      title: "Evening Eco-Tip 💡",
      message: "Remember to unplug devices before bed to save energy overnight.",
      time: '2 days ago',
      read: true
    },
    {
      id: '6',
      type: 'motivation',
      title: "Small actions, big impact! 🌱",
      message: "Your daily habits have already saved 2,450 liters of water this month!",
      time: '3 days ago',
      read: true
    },
    {
      id: '7',
      type: 'streak',
      title: "Streak milestone approaching! ⭐",
      message: "You're just 2 days away from your 7-day streak milestone!",
      time: '3 days ago',
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'streak': return <Flame className="w-5 h-5 text-warning" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-success" />;
      case 'social': return <Users className="w-5 h-5 text-primary" />;
      case 'motivation': return <Leaf className="w-5 h-5 text-success" />;
      case 'reminder': return <Bell className="w-5 h-5 text-accent-foreground" />;
      default: return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay motivated with eco-friendly reminders and updates
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="w-8 h-8 text-primary" />
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </div>
              )}
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Unread Notifications */}
        {unreadCount > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
              <span>Unread</span>
              <span className="text-sm bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            </h2>
            
            <div className="space-y-3">
              {notifications.filter(notif => !notif.read).map((notification) => (
                <div
                  key={notification.id}
                  className={`eco-card p-4 border-l-4 ${
                    notification.urgent ? 'border-l-destructive bg-destructive/5' : 'border-l-primary'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 hover:bg-accent rounded-full transition-[var(--transition-smooth)]"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-4 h-4 text-success" />
                      </button>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 hover:bg-accent rounded-full transition-[var(--transition-smooth)]"
                        title="Delete notification"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Notifications */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">All Notifications</h2>
          
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`eco-card p-4 transition-[var(--transition-smooth)] ${
                  notification.read ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        notification.read ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full inline-block ml-2" />
                        )}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 hover:bg-accent rounded-full transition-[var(--transition-smooth)] opacity-0 group-hover:opacity-100"
                    title="Delete notification"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">All caught up!</h3>
            <p className="text-muted-foreground">
              You have no notifications at the moment.
            </p>
          </div>
        )}

        {/* Eco Tips Section */}
        <section className="mt-12">
          <div className="eco-card p-8 nature-gradient text-center">
            <h3 className="text-2xl font-bold text-white mb-4">💡 Today's Eco Tip</h3>
            <p className="text-white/90 text-lg mb-6">
              Did you know? Switching to LED bulbs can reduce your lighting energy use by 75% 
              and last 25 times longer than traditional bulbs!
            </p>
            <Button className="bg-white text-primary hover:bg-white/90">
              Learn More Eco Tips
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Notifications;