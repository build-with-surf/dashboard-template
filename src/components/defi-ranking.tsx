import { formatUSD } from "@/lib/utils";
import type { DefiProtocol } from "@/lib/surf-client";

interface DefiRankingProps {
  data: DefiProtocol[];
  limit?: number;
}

export function DefiRanking({ data, limit = 10 }: DefiRankingProps) {
  const items = data.slice(0, limit);
  const maxTvl = items[0]?.tvl || 1;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <h3 className="text-sm font-medium text-zinc-400 mb-4">DeFi TVL Ranking</h3>
      <div className="space-y-3">
        {items.map((protocol, i) => (
          <div key={protocol.name} className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 w-5 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white truncate">
                  {protocol.name}
                  {protocol.symbol && (
                    <span className="text-zinc-500 ml-1 text-xs">{protocol.symbol}</span>
                  )}
                </span>
                <span className="text-sm text-zinc-300 ml-2 shrink-0">
                  {formatUSD(protocol.tvl)}
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500/60 rounded-full"
                  style={{ width: `${(protocol.tvl / maxTvl) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
