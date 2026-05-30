/**
 * ranks.js — Sistema de rangos Solo Leveling
 * Extraído de HabitOS.html para futura refactorización modular
 */
export const SL_RANKS = [
  { rank:'E', min:1,   max:9,   badge:'🪨', title:'El Peor Cazador de la Humanidad',  xpFormula: lvl => lvl * 100 },
  { rank:'D', min:10,  max:24,  badge:'🗡️',  title:'Repercutor del Destino',           xpFormula: lvl => lvl * 250 },
  { rank:'C', min:25,  max:44,  badge:'💎', title:'Incursor de Mazmorras',              xpFormula: lvl => lvl * 500 },
  { rank:'B', min:45,  max:69,  badge:'🛡️',  title:'Líder de Escuadrón',               xpFormula: lvl => lvl * 1000 },
  { rank:'A', min:70,  max:99,  badge:'👑', title:'Conquistador de Portales Rojos',    xpFormula: lvl => lvl * 2000 },
  { rank:'S', min:100, max:149, badge:'🌌', title:'Cazador de Rango S Supremo',        xpFormula: lvl => lvl * 4000 },
  { rank:'N', min:150, max:9999,badge:'✨', title:'Autoridad de la Nueva Era',         xpFormula: () => Infinity },
];

export function getRankForLevel(lvl) {
  return SL_RANKS.find(r => lvl >= r.min && lvl <= r.max) || SL_RANKS[SL_RANKS.length - 1];
}

export function xpForNextLevel(lvl) {
  return getRankForLevel(lvl).xpFormula(lvl);
}

export function computeLevel(totalXP) {
  let lvl = 1, spent = 0;
  while (true) {
    const needed = xpForNextLevel(lvl);
    if (needed === Infinity) return { lvl, spent: totalXP - spent };
    if (totalXP - spent < needed) return { lvl, spent: totalXP - spent };
    spent += needed;
    lvl++;
  }
}
