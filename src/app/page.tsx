import {
  getTokenRanking,
  getFearGreed,
  getFuturesMarket,
  getDefiRanking,
} from "@/lib/surf-client";
import { PriceCard } from "@/components/price-card";
import { FearGreedGauge } from "@/components/fear-greed-gauge";
import { FuturesTable } from "@/components/futures-table";
import { DefiRanking } from "@/components/defi-ranking";

export const revalidate = 300; // 每 5 分钟重新生成

export default async function Dashboard() {
  const [tokens, fearGreed, futures, defi] = await Promise.all([
    getTokenRanking(8),
    getFearGreed(),
    getFuturesMarket(),
    getDefiRanking(8),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Surf Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Real-time crypto market data powered by{" "}
            <a
              href="https://asksurf.ai"
              className="text-blue-400 hover:text-blue-300"
              target="_blank"
            >
              Surf API
            </a>
          </p>
        </div>
        <a
          href="https://github.com/build-with-surf/dashboard-template"
          className="text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 rounded-lg px-3 py-1.5 transition-colors"
          target="_blank"
        >
          View Source
        </a>
      </div>

      {/* Fear & Greed + Top Tokens */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-1">
          <FearGreedGauge
            value={fearGreed.value}
            classification={fearGreed.classification}
          />
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {tokens.slice(0, 6).map((token) => (
            <PriceCard
              key={token.symbol}
              rank={token.rank}
              name={token.name}
              symbol={token.symbol}
              price={token.price_usd}
              change24h={token.change_24h_pct}
              marketCap={token.market_cap_usd}
              volume24h={token.volume_24h_usd}
            />
          ))}
        </div>
      </div>

      {/* Futures + DeFi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <FuturesTable data={futures} limit={10} />
        </div>
        <div className="lg:col-span-1">
          <DefiRanking data={defi} limit={8} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        Data from{" "}
        <a href="https://docs.asksurf.ai" className="text-zinc-500 hover:text-zinc-400">
          Surf API
        </a>
        {" · "}
        <a
          href="https://github.com/build-with-surf"
          className="text-zinc-500 hover:text-zinc-400"
        >
          Build with Surf
        </a>
        {" · "}
        Auto-refreshes every 5 minutes
      </footer>
    </main>
  );
}
