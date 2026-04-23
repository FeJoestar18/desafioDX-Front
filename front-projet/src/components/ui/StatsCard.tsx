import { Card } from './Card';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card hoverable className="flex items-center gap-md">
      <div className="w-[48px] h-[48px] rounded-2xl bg-[#F1F5F9] flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-secondary truncate">{title}</p>
        <div className="flex items-end gap-sm mt-1">
          <h3 className="text-xl font-bold text-text-primary leading-none tracking-tight">{value}</h3>
          
          {trend && (
            <span className={`text-sm font-medium mb-0.5 ${trend.isPositive ? 'text-accent' : 'text-danger'}`}>
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
