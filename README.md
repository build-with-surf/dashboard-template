<p align="right">
  <a href="./README.en.md">English</a> | <a href="./README.md">中文</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/build-with-surf/.github/main/assets/surf-logo.jpg" width="60" alt="Surf" />
</p>

<h1 align="center">Surf 数据看板模板</h1>

<p align="center">
  基于 Next.js + Surf API 的链上数据可视化快速起步模板<br/>
  Clone 后 <code>npm run dev</code> 即可看到效果
</p>

---

## 功能

- **Next.js 16** — App Router、Server Components、TypeScript
- **Surf API Client** — 封装好的 API 客户端，带类型定义和 demo data fallback
- **4 个看板组件** — 价格卡片、恐贪指数仪表盘、期货数据表、DeFi TVL 排名
- **Tailwind CSS** — 深色主题，响应式布局
- **零配置可运行** — 没有 API Key 也能跑（用 demo 数据）

## 快速开始

```bash
git clone https://github.com/build-with-surf/dashboard-template.git
cd dashboard-template
npm install
npm run dev
```

打开 http://localhost:3000 查看看板。

### 接入真实数据

```bash
cp .env.example .env.local
# 编辑 .env.local，填入你的 Surf API Key
# 获取 API Key: 联系 @siriusxyzzz (Twitter/X) 加入开发者微信群
```

## 项目结构

```
src/
├── app/
│   ├── layout.tsx              # 根布局（深色主题）
│   └── page.tsx                # 主看板页面（Server Component）
├── components/
│   ├── price-card.tsx          # 币价卡片
│   ├── fear-greed-gauge.tsx    # 恐贪指数仪表盘
│   ├── futures-table.tsx       # 期货数据表
│   └── defi-ranking.tsx        # DeFi TVL 排名
└── lib/
    ├── surf-client.ts          # Surf API 客户端 + 类型定义
    └── utils.ts                # 格式化工具
```

## 组件说明

| 组件 | 数据源 | 说明 |
|------|--------|------|
| `PriceCard` | `/v1/market/ranking` | 显示币种价格、24h 涨跌、市值、成交量 |
| `FearGreedGauge` | `/v1/market/fear-greed` | 恐贪指数色条 + 数值 |
| `FuturesTable` | `/v1/market/futures` | 资金费率、多空比、未平仓量、成交量 |
| `DefiRanking` | `/v1/project/defi-ranking` | TVL 排名 + 可视化占比条 |

## 自定义

### 添加新组件

1. 在 `src/lib/surf-client.ts` 添加新的 API 方法
2. 在 `src/components/` 创建组件
3. 在 `src/app/page.tsx` 中引入

### 可用 API 端点

Surf Data API 有 83 个端点，完整文档见 [docs.asksurf.ai](https://docs.asksurf.ai)。社区教程见 [surf-api-docs](https://github.com/build-with-surf/surf-api-docs)。

## 部署

支持一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/build-with-surf/dashboard-template&env=SURF_API_KEY&envDescription=Your%20Surf%20API%20Key)

也可以部署到 Railway 或自托管。

## 贡献

- **新组件** — 添加可复用的图表/表格组件
- **新页面** — 为特定场景创建子页面（套利监控、巨鲸追踪等）
- **样式优化** — 改进 UI/UX

---

<p align="center">
  <sub><a href="https://github.com/build-with-surf">Build with Surf</a> 社区项目</sub>
</p>
