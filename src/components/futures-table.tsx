import { cn, formatUSD, formatPercent } from "@/lib/utils";
import type { FuturesData } from "@/lib/surf-client";

interface FuturesTableProps {
  data: FuturesData[];
  limit?: number;
}

export function FuturesTable({ data, limit = 10 }: FuturesTableProps) {
  const items = data.slice(0, limit);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-400">Futures Market</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-zinc-500 border-b border-zinc-800/50">
              <th className="text-left p-3 font-medium">Symbol</th>
              <th className="text-right p-3 font-medium">Funding Rate</th>
              <th className="text-right p-3 font-medium">Long/Short</th>
              <th className="text-right p-3 font-medium">Open Interest</th>
              <th className="text-right p-3 font-medium">24h Volume</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const frPositive = item.funding_rate > 0;
              return (
                <tr
                  key={item.symbol}
                  className="border-b border-zinc-800/30 hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="p-3 font-medium text-white">{item.symbol}</td>
                  <td
                    className={cn(
                      "p-3 text-right font-mono",
                      frPositive ? "text-emerald-400" : "text-red-400"
                    )}
                  >
                    {formatPercent(item.funding_rate * 100)}
                  </td>
                  <td className="p-3 text-right text-zinc-300">
                    {item.long_short_ratio.toFixed(2)}
                  </td>
                  <td className="p-3 text-right text-zinc-300">
                    {formatUSD(item.open_interest)}
                  </td>
                  <td className="p-3 text-right text-zinc-300">
                    {formatUSD(item.volume_24h)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
