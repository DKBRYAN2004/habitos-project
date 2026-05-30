# HabitOS — Changelog & Documentación Técnica

> Aplicación web de seguimiento de hábitos. Un solo archivo HTML autónomo,
> sin dependencias externas, desplegable en cualquier hosting estático.

---

## Versión 3.0.0 — Actualización Completa

### 1. Sistema de Gamificación Solo Leveling

Se reemplazó el sistema de niveles estático (fijo en 500 XP/nivel) por una
progresión exponencial de 7 rangos inspirada en Solo Leveling.

#### Rangos y progresión

| Rango | Niveles | Título | XP por nivel | Badge |
|-------|---------|--------|--------------|-------|
| E | 1–9 | El Peor Cazador de la Humanidad | nivel × 100 | 🪨 |
| D | 10–24 | Repercutor del Destino | nivel × 250 | 🗡️ |
| C | 25–44 | Incursor de Mazmorras | nivel × 500 | 💎 |
| B | 45–69 | Líder de Escuadrón | nivel × 1.000 | 🛡️ |
| A | 70–99 | Conquistador de Portales Rojos | nivel × 2.000 | 👑 |
| S | 100–149 | Cazador de Rango S Supremo | nivel × 4.000 | 🌌 |
| Nacional | 150+ | Autoridad de la Nueva Era | Nivel máximo | ✨ |

#### Funciones clave (JS)

```js
computeLevel(totalXP)      // Devuelve { lvl, spent } a partir del XP total
getRankForLevel(lvl)       // Devuelve el objeto de rango para un nivel
xpForNextLevel(lvl)        // XP necesaria para pasar al siguiente nivel
updateXPDisplay()          // Renderiza barra, nivel y título en toda la UI
gainXP(n)                  // Suma XP, actualiza display y verifica logros
checkPenalty()             // Aplica penalización si hay 2+ días de inactividad
```

#### Penalización del Sistema

- Se activa si el usuario lleva **2 o más días** sin completar ningún hábito.
- Descuenta el **15 %** del XP acumulado en el nivel actual (sin bajar de nivel).
- Queda registrada en `state.penaltyLog[]` con fecha, monto y motivo.
- Se muestra en la sección Logros → Penalizaciones del Sistema.

---

### 2. Módulo Cronómetro / Temporizador

Botón `⏱ Cronómetro` junto al botón de nuevo hábito en el Dashboard.

#### Modos

| Modo | Descripción |
|------|-------------|
| Cuenta regresiva | El usuario configura minutos y segundos; el timer cuenta hacia 0 |
| Cronómetro libre | Cuenta hacia arriba desde 00:00 |

#### Comportamiento

- Últimos 30 segundos: display parpadea en rojo urgente.
- Al terminar: vibración en móvil (`navigator.vibrate`), banner recordatorio
  para marcar el hábito manualmente como cumplido.
- En móvil el modal sube desde la parte inferior (bottom sheet).
- Botones: Iniciar / Pausar / Continuar / Reiniciar.

---

### 3. Frases Motivacionales Diarias (275 frases)

Cada día del año muestra una frase distinta en el Dashboard, seleccionada
por el número del día del año (`dayOfYear % DAILY_QUOTES.length`).

Las frases cubren 12 temáticas:

1. El valor de empezar y la determinación
2. Resiliencia, esfuerzo y disciplina
3. Identidad, autenticidad y amor propio
4. Superación del fracaso y gestión de pérdidas
5. El tiempo, el presente y el enfoque mental
6. Liderazgo, empatía y relaciones humanas
7. Ambición, éxito y superación profesional
8. Sabiduría, filosofía de vida y desapego
9. Coraje y enfrentar el miedo
10. Propósito de vida, pasión y legado
11. Adaptación al cambio y flexibilidad mental
12. Crecimiento interior, paz mental y maestría

Fuentes: Anime, series, películas y documentales.

El saludo también cambia dinámicamente:
- `☀️ Buenos días` — 00:00–11:59
- `🌤 Buenas tardes` — 12:00–17:59
- `🌙 Buenas noches` — 18:00–23:59

---

### 4. Sistema de Logros Mejorado (27 logros en 6 categorías)

#### Categorías

| Categoría | Logros | Descripción |
|-----------|--------|-------------|
| 🌱 Primeros Pasos | 4 | Crear hábitos (1, 3, 5, 10) |
| 🔥 Rachas | 6 | Rachas de 3, 7, 14, 30, 60 y 100 días |
| ✅ Completados | 5 | 10, 50, 100, 500 completados + Día Perfecto |
| ⭐ XP & Rango | 5 | Hitos de XP y llegada a rangos D, C, B, S |
| 📅 Constancia | 4 | 7, 30, 90 y 365 días de uso |
| 📝 Journal | 3 | 1, 7 y 30 entradas de diario |
| 🛡️ Sin Penalizar | 1 | Nunca recibir una penalización |

#### Mapa de Rangos (Roadmap visual)

Muestra los 7 rangos con estado (completado ✅ / en curso / bloqueado 🔒),
rango de niveles, fórmula de XP y badge.

---

### 5. Exportación de Datos

| Formato | Función JS | Contenido |
|---------|------------|-----------|
| JSON | `exportJSON()` | Backup completo (hábitos, completions, journal, XP, penalizaciones) |
| CSV | `exportCSV()` | Tabla de hábitos con rachas y % cumplimiento |
| Excel (.xls) | `exportXLSX()` | 3 hojas: Resumen, Historial día a día, Journal |

El Excel se genera con XML SpreadsheetML nativo, sin librerías externas.
Compatible con Microsoft Excel, LibreOffice Calc y Google Sheets.

---

### 6. Sistema Offline — Formulario Descargable

**Problema que resuelve:** el usuario no tiene internet durante días,
pero quiere registrar su progreso y sincronizarlo después.

#### Flujo de uso

```
1. En HabitOS (con internet):
   Configuración → Descargar formulario offline (.html)

2. Sin internet (en cualquier dispositivo):
   Abrir el .html descargado en el navegador
   → Seleccionar fecha
   → Marcar hábitos completados con toggles
   → Elegir estado de ánimo y energía
   → Escribir notas del día
   → Clic "Generar JSON" → Descargar .json

3. De vuelta con internet:
   Configuración → Importar → Seleccionar el .json offline
   → Los datos se fusionan sin sobreescribir el progreso actual
```

El formulario generado incluye exactamente los hábitos activos al momento
de la descarga. Funciona completamente offline (cero peticiones de red).

---

### 7. Importación de Datos

Formatos soportados al importar:

| Formato | Comportamiento |
|---------|----------------|
| `.json` (backup) | Fusión completa: hábitos, completions, journal, XP |
| `.json` (formulario offline) | Detecta `_source: "offline-form"` y fusiona solo ese día |
| `.csv` | Importa nombres de hábitos nuevos como nuevas entradas |

La importación **nunca sobreescribe** datos existentes: agrega días que no
existen localmente y toma el mayor valor de XP entre local e importado.

---

### 8. Correcciones y Mejoras Técnicas

#### Bug: `DAILY_QUOTES` antes de inicialización
- **Causa:** el array se inyectó en un segundo bloque `<script>` que el
  navegador parseaba después de que `renderDashboard()` ya intentaba
  llamar a `renderDailyQuote()`.
- **Solución:** mover el bloque completo al inicio del primer `<script>`,
  antes de cualquier función que lo referencie.

#### Bug: `<script>` sin escapar dentro del template offline
- El HTML del formulario tenía una etiqueta `<script>` literal dentro de
  un template string, que el navegador interpretaba como un bloque real,
  creando un segundo contexto de script con variables no definidas.
- **Solución:** escapar como `<scr"+"ipt>`.

#### Bug: Funciones duplicadas (`importJSON`, `showImportStatus`)
- Dos inyecciones sucesivas dejaron dos definiciones de cada función y
  un `</script>` extra que cerraba el script principal prematuramente.
- **Solución:** detección por posición y eliminación del bloque duplicado.

#### CSS: Vendor prefix warnings
- Añadidas propiedades estándar `background-clip` y `appearance` junto
  a sus versiones `-webkit-` para compatibilidad cruzada.

#### Historial fantasma
- Los hábitos de muestra ya no inyectan 14 días de completions falsas.
  El usuario arranca desde cero el primer día.

#### Reset inteligente
- `resetAll()` ya no borra el localStorage completo. Solo elimina
  completions y journal del mes en curso. Los hábitos y XP se conservan.

---

## Persistencia de Datos

Todos los datos se guardan en `localStorage` bajo la clave `habitos_v3`.

```js
{
  habits: [],          // Array de hábitos
  completions: {},     // { "2026-05-27": { "habitId": true } }
  journal: {},         // { "2026-05-27": { mood, energy, notes } }
  xp: 0,              // XP total acumulado
  lastActiveDate: "",  // Última fecha con al menos 1 hábito completado
  penalties: 0,        // Contador de penalizaciones recibidas
  penaltyLog: []       // Array de { date, amount, reason }
}
```

---

## Stack Técnico

- **HTML5** — estructura semántica
- **CSS3** — Grid, Flexbox, Custom Properties, animaciones, glassmorphism
- **Vanilla JS (ES2020+)** — sin frameworks ni bundlers
- **localStorage** — persistencia local
- **FileReader API** — importación de archivos
- **Blob + URL.createObjectURL** — exportación de archivos
- **navigator.vibrate** — feedback táctil en móvil (progressive enhancement)

**Tamaño final:** ~2,200 líneas en un solo archivo `.html` autónomo.

---

## Preguntas Frecuentes

### ¿Es de paga Vercel para este proyecto?
No. Vercel tiene un **plan gratuito (Hobby)** que soporta proyectos
estáticos sin límite de tiempo. Un archivo HTML sin backend entra
perfectamente en el tier gratuito.

### ¿Cómo se guardan los datos en Vercel?
Los datos se guardan en el **localStorage del navegador del dispositivo**,
no en el servidor. Vercel solo sirve el archivo HTML. Esto significa:

- Los datos son locales a cada dispositivo y navegador.
- Para sincronizar entre teléfono y computadora: usa Exportar JSON en
  un dispositivo e Importar JSON en el otro.
- Para no perder datos: exporta backups regularmente.

### Alternativas a Vercel (todas gratuitas)

| Plataforma | Ventaja | Ideal para |
|------------|---------|------------|
| **Vercel** | Deploy automático desde GitHub, CDN global | Primera opción |
| **Netlify** | Interfaz simple, drag & drop de archivos | Alternativa directa |
| **GitHub Pages** | Integrado en el repo, cero configuración | Minimalista |
| **Cloudflare Pages** | CDN más rápido del mundo, sin límites de ancho de banda | Performance |

Las cuatro opciones son **100 % gratuitas** para proyectos estáticos
personales. GitHub Pages es la más sencilla si ya tienes el repo.

### ¿Funciona bien en móvil?
Sí. La app implementa Mobile-First con:
- Bottom navigation bar en pantallas < 768px
- Modales como bottom sheets en móvil
- Botones con altura mínima de 44px (estándar táctil de Apple/Google)
- Feedback de vibración al completar el cronómetro
- Diseño responsive desde 360px de ancho

