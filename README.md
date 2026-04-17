# Wallet App

Mobile-first wallet UI: transaction list, balance and points summary, and per-transaction detail. Client-side only—data ships as static JSON.

## Tech stack

| Layer | Choice |
|--------|--------|
| Runtime | React 18 |
| Language | TypeScript (strict) |
| Build | Vite 5 |
| Styling | Tailwind CSS 3, PostCSS |
| Icons | Font Awesome (React + solid + brands) |
| Routing | None—screen state in `App.tsx` |

## Getting started

**Requirements:** Node.js 18+ (LTS recommended), npm.

```bash
npm install
npm start
```

Dev server: [http://localhost:5173](http://localhost:5173) (Vite default port).

```bash
npm run build
npm run preview
```

`preview` serves the production build locally for smoke checks.

## Project structure

```
src/
├── App.tsx                 # List / detail screen state
├── index.tsx               # Entry
├── index.css               # Tailwind entry + global base
├── types/index.ts          # Shared types (e.g. Transaction)
├── data/transactions.json  # Sample transactions
├── utils/
│   ├── date.ts             # Relative / short date formatting
│   └── points.ts           # Season-based daily points + display helper
├── components/
│   ├── CardBalanceBlock.tsx
│   ├── DailyPointsBlock.tsx
│   ├── NoPaymentDueBlock.tsx
│   ├── TransactionIcon.tsx
│   └── TransactionRow.tsx
└── screens/
    ├── TransactionsList.tsx
    └── TransactionDetail.tsx
```

Root config: `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `index.html`.
