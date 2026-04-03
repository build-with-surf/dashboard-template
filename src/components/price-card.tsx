import { cn, formatUSD, formatPercent } from "@/lib/utils";

interface PriceCardProps {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

export function PriceCard({
  rank,
  name,
  symbol,
  price,
  change24h,
  marketCap,
  volume24h,
}: PriceCardProps) {
  const isPositive = change24h > 0;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">#{rank}</span>
          <span className="font-semibold text-white">{symbol}</span>
          <span className="text-xs text-zinc-400">{name}</span>
        </div>
        <span
          className={cn(
            "text-sm font-medium px-2 py-0.5 rounded",
            isPositive
              ? "text-emerald-400 bg-emerald-400/10"
              : "text-red-400 bg-red-400/10"
          )}
        >
          {formatPercent(change24h)}
        </span>
      </div>
      <div className="text-2xl font-bold text-white mb-3">
        {formatUSD(price)}
      </div>
      <div className="flex justify-between text-xs text-zinc-500">
        <span>MCap: {formatUSD(marketCap)}</span>
        <span>Vol: {formatUSD(volume24h)}</span>
      </div>
    </div>
  );
}
