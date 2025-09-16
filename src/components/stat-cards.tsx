import React from "react";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const StatCards: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
  className = "",
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-neutral-500";
    }
  };

  return (
    <div
      className={`flex-1 min-w-0 border ring-1 ring-black/1 bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border-neutral-100 rounded-xl flex flex-col p-4 gap-4 items-start text-neutral-800 dark:text-neutral-100 dark:border-neutral-800 ${className}`}
    >
      {/* title and icon */}
      <div className="flex gap-2 items-center justify-between w-full font-normal font-sans">
        <h1 className="text-md tracking-wider text-neutral-400">{title}</h1>
        {Icon && <Icon className="size-5" />}
      </div>
      {/* stats */}
      <div className="text-4xl font-sans font-bold tracking-wide">{value}</div>
      {/* stats info like up or down */}
      <div className={`text-xs font-mono ${getTrendColor()}`}>{subtitle}</div>
    </div>
  );
};

export default StatCards;
