/**
 * dates.js — Utilidades de fechas y rachas
 * Extraído de HabitOS.html para futura refactorización modular
 */

/** Devuelve la fecha de hoy como string ISO: "2026-05-27" */
export function todayKey() {
  return new Date().toISOString().split('T')[0];
}

/** Racha actual de un hábito (días consecutivos hacia atrás) */
export function getStreak(habitId, completions) {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const k = d.toISOString().split('T')[0];
    if (completions[k]?.[habitId]) streak++;
    else if (i > 0) break;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

/** Mejor racha histórica de un hábito */
export function getBestStreak(habitId, completions) {
  let best = 0, cur = 0;
  for (const date of Object.keys(completions).sort()) {
    if (completions[date][habitId]) { cur++; best = Math.max(best, cur); }
    else cur = 0;
  }
  return best;
}
