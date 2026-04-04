<p align="right">
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md">中文</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/build-with-surf/.github/main/assets/surf-logo.jpg" width="60" alt="Surf" />
</p>

<h1 align="center">Surf Dashboard Template</h1>

<p align="center">
  Next.js + Surf API on-chain data visualization starter kit<br/>
  Clone, <code>npm run dev</code>, and see it live
</p>


<p align="center">
  [![GitHub stars](https://img.shields.io/github/stars/build-with-surf/dashboard-template?style=flat-square)](https://github.com/build-with-surf/dashboard-template/stargazers) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
</p>

---

## Features

- **Next.js 16** — App Router、Server Components、TypeScript
- **Surf API Client** — Pre-configured API client with TypeScript types and demo data fallback
- **4 Dashboard Components** — Price cards, Fear & Greed gauge, futures table, DeFi TVL ranking
- **Tailwind CSS** — Dark theme, responsive layout
- **Zero-config** — Runs without API Key (uses demo data)

## Quick Start

```bash
git clone https://github.com/build-with-surf/dashboard-template.git
cd dashboard-template
npm install
npm run dev
```

Open http://localhost:3000 to see your dashboard.

### Connect Real Data

```bash
cp .env.example .env.local
# Edit .env.local, add your Surf API Key
# Get API Key: DM @siriusxyzzz on Twitter/X to join developer WeChat group
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (dark theme)
│   └── page.tsx                # Main dashboard page (Server Component)
├── components/
│   ├── price-card.tsx          # Price card
│   ├── fear-greed-gauge.tsx    # Fear & Greed gauge
│   ├── futures-table.tsx       # Futures table
│   └── defi-ranking.tsx        # DeFi TVL ranking
└── lib/
    ├── surf-client.ts          # Surf API client + types
    └── utils.ts                # Formatting utilities
```

## Components

| Component | Data Source | Description |
|------|--------|------|
| `PriceCard` | `/v1/market/ranking` | Token price, 24h change, market cap, volume |
| `FearGreedGauge` | `/v1/market/fear-greed` | Fear & Greed index bar + value |
| `FuturesTable` | `/v1/market/futures` | Funding rate, long/short ratio, open interest, volume |
| `DefiRanking` | `/v1/project/defi-ranking` | TVL ranking with visual proportion bars |

## Customization

### Adding New Components

1. Add new API method in `src/lib/surf-client.ts`
2. Create component in `src/components/`
3. Import in `src/app/page.tsx`

### Available API Endpoints

Surf Data API has 83 endpoints. Full docs at [docs.asksurf.ai](https://docs.asksurf.ai). Community tutorials at [surf-api-docs](https://github.com/build-with-surf/surf-api-docs)。

## Deploy

One-click deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/build-with-surf/dashboard-template&env=SURF_API_KEY&envDescription=Your%20Surf%20API%20Key)

Also deployable to Railway or self-hosted.

## Contributing

- **New components** — Add reusable chart/table components
- **New pages** — Create sub-pages for specific use cases (arbitrage, whale tracking, etc.)
- **Styling** — Improve UI/UX

---

<p align="center">
  <sub><a href="https://github.com/build-with-surf">Build with Surf</a> community project</sub>
</p>
