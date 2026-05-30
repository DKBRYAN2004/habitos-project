# src/ — Módulos para futura refactorización

Este directorio contiene los módulos extraídos de `HabitOS.html`
listos para ser usados si en el futuro se migra a React + Vite u otro
framework con bundler.

## Estructura

```
src/
├── config/
│   ├── ranks.js          ← SL_RANKS, computeLevel, getRankForLevel
│   └── quotes.js         ← DAILY_QUOTES (275 frases motivacionales)
├── services/
│   ├── storage.js        ← loadState, saveState, clearState
│   └── export.js         ← exportJSON, exportCSV, exportXLSX
├── utils/
│   ├── dates.js          ← todayKey, getStreak, getBestStreak
│   └── xp.js             ← gainXP, checkPenalty
├── components/           ← Componentes UI (pendiente)
└── pages/                ← Páginas (pendiente)
```

## Uso actual

La versión actual de la app es el archivo `public/HabitOS.html`,
un único archivo autónomo. Los módulos en `src/` son la base para
una futura migración sin romper la funcionalidad existente.
