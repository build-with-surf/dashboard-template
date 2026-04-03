import { cn } from "@/lib/utils";

interface FearGreedGaugeProps {
  value: number;
  classification: string;
}

export function FearGreedGauge({ value, classification }: FearGreedGaugeProps) {
  const getColor = (v: number) => {
    if (v <= 25) return "text-red-500";
    if (v <= 45) return "text-orange-500";
    if (v <= 55) return "text-yellow-500";
    if (v <= 75) return "text-lime-500";
    return "text-emerald-500";
  };

  const getBarColor = (v: number) => {
    if (v <= 25) return "bg-red-500";
    if (v <= 45) return "bg-orange-500";
    if (v <= 55) return "bg-yellow-500";
    if (v <= 75) return "bg-lime-500";
    return "bg-emerald-500";
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h3 className="text-sm font-medium text-zinc-400 mb-4">Fear & Greed Index</h3>
      <div className="flex items-end gap-4 mb-4">
        <span className={cn("text-5xl font-bold", getColor(value))}>{value}</span>
        <span className={cn("text-lg font-medium mb-1", getColor(value))}>
          {classification}
        </span>
      </div>
      <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getBarColor(value))}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-zinc-600 mt-1">
        <span>Extreme Fear</span>
        <span>Extreme Greed</span>
      </div>
    </div>
  );
}
