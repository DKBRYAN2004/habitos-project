/**
 * storage.js — Capa de persistencia en localStorage
 * Extraído de HabitOS.html para futura refactorización modular
 */
const STORAGE_KEY = 'habitos_v3';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    habits:         state.habits,
    completions:    state.completions,
    journal:        state.journal,
    xp:             state.xp,
    lastActiveDate: state.lastActiveDate,
    penalties:      state.penalties || 0,
    penaltyLog:     state.penaltyLog || [],
  }));
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
