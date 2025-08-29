import { ReactNode } from 'react';

interface EcoMetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: ReactNode;
  trend?: string;
  gradient?: string;
}

const EcoMetricCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  trend,
  gradient = 'eco-gradient'
}: EcoMetricCardProps) => {
  return (
    <div className="metric-card relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-20 h-20 ${gradient} rounded-full opacity-10 transform translate-x-6 -translate-y-6`} />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          {trend && (
            <p className="text-sm text-success font-medium mt-2">{trend}</p>
          )}
        </div>
        
        <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center text-white shadow-[var(--shadow-eco)]`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default EcoMetricCard;