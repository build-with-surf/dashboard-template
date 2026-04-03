/**
 * Surf API Client
 * 封装 Surf Data API 调用，支持服务端和客户端使用
 */

const DATA_API_BASE = process.env.SURF_DATA_API_URL || "https://api.ask.surf/gateway";
const API_KEY = process.env.SURF_API_KEY || "";

interface SurfResponse<T> {
  data: T;
  meta?: {
    cached: boolean;
    credits_used: number;
    limit?: number;
    offset?: number;
    total?: number;
  };
}

async function surfFetch<T>(path: string, params?: Record<string, string>): Promise<T | null> {
  if (!API_KEY) {
    console.warn(`[Surf] No API key set. Skipping: ${path}`);
    return null;
  }

  const url = new URL(`${DATA_API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 300 }, // 缓存 5 分钟
    });

    if (!res.ok) {
      console.error(`[Surf] API error ${res.status}: ${path}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`[Surf] Fetch failed: ${path}`, error);
    return null;
  }
}

// ============ Types ============

export interface TokenRanking {
  rank: number;
  name: string;
  symbol: string;
  price_usd: number;
  change_24h_pct: number;
  market_cap_usd: number;
  volume_24h_usd: number;
  image?: string;
}

export interface FearGreed {
  value: number;
  classification: string;
  timestamp: number;
  price: number;
}

export interface FuturesData {
  symbol: string;
  funding_rate: number;
  long_short_ratio: number;
  open_interest: number;
  volume_24h: number;
  volume_change_24h: number;
}

export interface DefiProtocol {
  name: string;
  symbol?: string;
  tvl: number;
  fees: number;
  revenue: number;
  users?: number;
  logo_url?: string;
}

export interface PricePoint {
  symbol: string;
  timestamp: number;
  value: number;
  metric: string;
}

// ============ Demo Data (used when API key is not set) ============

const DEMO_TOKENS: TokenRanking[] = [
  { rank: 1, name: "Bitcoin", symbol: "BTC", price_usd: 67010, change_24h_pct: 1.2, market_cap_usd: 1340e9, volume_24h_usd: 28e9 },
  { rank: 2, name: "Ethereum", symbol: "ETH", price_usd: 2062, change_24h_pct: 1.6, market_cap_usd: 249e9, volume_24h_usd: 12e9 },
  { rank: 3, name: "Tether", symbol: "USDT", price_usd: 1.0, change_24h_pct: 0.0, market_cap_usd: 184e9, volume_24h_usd: 45e9 },
  { rank: 4, name: "XRP", symbol: "XRP", price_usd: 1.32, change_24h_pct: 1.7, market_cap_usd: 81e9, volume_24h_usd: 3e9 },
  { rank: 5, name: "BNB", symbol: "BNB", price_usd: 587.3, change_24h_pct: 1.1, market_cap_usd: 80e9, volume_24h_usd: 1.5e9 },
  { rank: 6, name: "Solana", symbol: "SOL", price_usd: 80.05, change_24h_pct: 2.2, market_cap_usd: 45e9, volume_24h_usd: 2.8e9 },
  { rank: 7, name: "Dogecoin", symbol: "DOGE", price_usd: 0.09, change_24h_pct: -0.5, market_cap_usd: 14e9, volume_24h_usd: 800e6 },
  { rank: 8, name: "Cardano", symbol: "ADA", price_usd: 0.42, change_24h_pct: -1.2, market_cap_usd: 15e9, volume_24h_usd: 400e6 },
];

const DEMO_FEAR_GREED: FearGreed = { value: 30, classification: "Fear", timestamp: Date.now() / 1000, price: 67010 };

const DEMO_FUTURES: FuturesData[] = [
  { symbol: "BTC", funding_rate: 0.001, long_short_ratio: 0.98, open_interest: 46.7e9, volume_24h: 52e9, volume_change_24h: 5.2 },
  { symbol: "ETH", funding_rate: -0.0016, long_short_ratio: 1.03, open_interest: 27.9e9, volume_24h: 22e9, volume_change_24h: -3.1 },
  { symbol: "SOL", funding_rate: -0.0047, long_short_ratio: 1.0, open_interest: 5.2e9, volume_24h: 8e9, volume_change_24h: 1.4 },
  { symbol: "XRP", funding_rate: 0.0044, long_short_ratio: 0.94, open_interest: 2.5e9, volume_24h: 3e9, volume_change_24h: 0.8 },
  { symbol: "DOGE", funding_rate: 0.001, long_short_ratio: 1.12, open_interest: 1.1e9, volume_24h: 1.5e9, volume_change_24h: -2.0 },
];

const DEMO_DEFI: DefiProtocol[] = [
  { name: "Tether", tvl: 188e9, fees: 15.3e6, revenue: 15.3e6 },
  { name: "Circle", tvl: 79e9, fees: 6.5e6, revenue: 6.5e6 },
  { name: "Aave", symbol: "AAVE", tvl: 40.8e9, fees: 1.2e6, revenue: 169e3 },
  { name: "Lido Finance", symbol: "LDO", tvl: 19.1e9, fees: 1.8e6, revenue: 900e3 },
  { name: "Sky", tvl: 15.1e9, fees: 118e3, revenue: 59e3 },
  { name: "EigenLayer", symbol: "EIGEN", tvl: 11.2e9, fees: 0, revenue: 0 },
  { name: "ether.fi", symbol: "ETHFI", tvl: 8.5e9, fees: 450e3, revenue: 225e3 },
  { name: "Uniswap", symbol: "UNI", tvl: 7.2e9, fees: 3.1e6, revenue: 0 },
];

// ============ API Methods ============

export async function getTokenRanking(limit = 10): Promise<TokenRanking[]> {
  const res = await surfFetch<SurfResponse<TokenRanking[]>>("/v1/market/ranking", {
    limit: String(limit),
  });
  return res?.data ?? DEMO_TOKENS.slice(0, limit);
}

export async function getFearGreed(): Promise<FearGreed> {
  const res = await surfFetch<SurfResponse<FearGreed[]>>("/v1/market/fear-greed");
  if (res?.data?.length) return res.data[res.data.length - 1];
  return DEMO_FEAR_GREED;
}

export async function getFuturesMarket(): Promise<FuturesData[]> {
  const res = await surfFetch<SurfResponse<FuturesData[]>>("/v1/market/futures");
  if (res?.data) return res.data.sort((a, b) => b.open_interest - a.open_interest);
  return DEMO_FUTURES;
}

export async function getDefiRanking(limit = 10): Promise<DefiProtocol[]> {
  const res = await surfFetch<SurfResponse<DefiProtocol[]>>("/v1/project/defi-ranking", {
    metric: "tvl",
    limit: String(limit),
  });
  return res?.data ?? DEMO_DEFI.slice(0, limit);
}

export async function getPriceHistory(
  symbol: string,
  timeRange = "7d"
): Promise<PricePoint[]> {
  const res = await surfFetch<SurfResponse<PricePoint[]>>("/v1/market/price", {
    symbol,
    time_range: timeRange,
  });
  return res?.data ?? [];
}
