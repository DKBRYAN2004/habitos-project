# ⚡ HabitOS

> Habit Tracker premium de un solo archivo. Dark Neon Glassmorphism,
> sistema de progresión Solo Leveling, cronómetro de enfoque, frases
> motivacionales diarias y modo offline.

![Version](https://img.shields.io/badge/version-3.0.0-cyan)
![Stack](https://img.shields.io/badge/stack-HTML%20%2B%20CSS%20%2B%20JS-purple)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Demo rápida

Abre `public/HabitOS.html` en cualquier navegador moderno. No requiere
servidor, instalación ni conexión a internet.

---

## Características

| Módulo | Descripción |
|--------|-------------|
| 🏠 Dashboard | Progreso diario, frase motivacional, barra semanal |
| ⚡ Hábitos | CRUD completo, positivos y negativos, colores y emojis |
| 📅 Calendario | Vista mensual + heatmap anual estilo GitHub |
| 📊 Estadísticas | Tasa de éxito, rachas, rendimiento por categoría |
| 📝 Journal | Estado de ánimo, energía 1–10, notas diarias |
| 🏆 Logros | 27 insignias + Mapa de Rangos Solo Leveling |
| ⏱ Cronómetro | Cuenta regresiva o libre, recordatorio al terminar |
| ⚙️ Configuración | Temas, exportar JSON/CSV/Excel, formulario offline |

---

## Sistema de Rangos Solo Leveling

```
Rango E  (Nv 1–9)    🪨  XP/nv = nivel × 100
Rango D  (Nv 10–24)  🗡️  XP/nv = nivel × 250
Rango C  (Nv 25–44)  💎  XP/nv = nivel × 500
Rango B  (Nv 45–69)  🛡️  XP/nv = nivel × 1,000
Rango A  (Nv 70–99)  👑  XP/nv = nivel × 2,000
Rango S  (Nv 100–149)🌌  XP/nv = nivel × 4,000
Nacional (Nv 150+)   ✨  Nivel máximo
```

---

## Persistencia de datos

Los datos se guardan en el **localStorage del navegador** bajo la clave
`habitos_v3`. No hay backend ni base de datos.

Para sincronizar entre dispositivos:
1. Dispositivo A → Configuración → Exportar JSON
2. Dispositivo B → Configuración → Importar → selecciona el .json

Para usar sin internet días seguidos:
1. Configuración → Descargar formulario offline (.html)
2. Complétalo cada día sin internet
3. Al volver online: Importar el .json generado

---

## Despliegue

### GitHub Pages (recomendado — gratis)

```bash
# 1. Clona o forkea este repositorio
git clone https://github.com/tu-usuario/habitos-project.git

# 2. Ve a Settings → Pages → Source: Deploy from branch → main / docs
# 3. GitHub Pages servirá public/HabitOS.html automáticamente
```

### Vercel (gratis — plan Hobby)

```bash
# Conecta el repo en vercel.com/new
# Framework preset: Other
# Output directory: public
# Deploy → listo
```

### Netlify (gratis)

Arrastra la carpeta `public/` al dashboard de Netlify. En 10 segundos
tienes la URL lista.

### Cloudflare Pages (gratis — CDN global)

```bash
# Conecta repo → Build command: (vacío) → Output: public
```

---

## Estructura del proyecto

```
habitos-project/
├── public/
│   └── HabitOS.html          ← App completa (autónoma)
├── src/
│   ├── components/           ← Para futura refactorización modular
│   ├── pages/                ← Vistas principales
│   ├── styles/               ← CSS separado por módulo
│   ├── services/             ← localStorage, importación, exportación
│   ├── utils/                ← Funciones auxiliares (fechas, XP, etc.)
│   └── config/               ← Constantes, rangos, frases
├── docs/
│   └── CHANGELOG.md          ← Historial completo de cambios
├── .github/
│   └── workflows/
│       └── deploy.yml        ← CI/CD automático a GitHub Pages
├── .gitignore
└── README.md
```

---

## Futura refactorización (roadmap)

Cuando quieras separar el código en módulos:

```
src/config/
  ranks.js          ← SL_RANKS, LEVELS
  quotes.js         ← DAILY_QUOTES
  achievements.js   ← Lista de logros

src/services/
  storage.js        ← load(), save(), exportJSON(), importJSON()
  xp.js             ← gainXP(), computeLevel(), checkPenalty()

src/utils/
  dates.js          ← todayKey(), getStreak(), getBestStreak()
  export.js         ← exportCSV(), exportXLSX(), downloadOfflineForm()

src/components/
  HabitItem.js      ← Tarjeta individual de hábito
  CalendarGrid.js   ← Cuadrícula del calendario
  TimerModal.js     ← Módulo cronómetro
  XPBar.js          ← Barra de experiencia

src/pages/
  Dashboard.js
  Habits.js
  Calendar.js
  Stats.js
  Journal.js
  Achievements.js
  Settings.js
```

---

## Licencia

MIT — úsalo, modifícalo y compártelo libremente.
