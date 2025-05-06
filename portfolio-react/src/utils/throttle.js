// src/utils/throttle.js
/**
 * Fonction de throttle pour limiter l'exécution d'une fonction
 * @param {Function} func - La fonction à exécuter
 * @param {number} limit - Le délai en millisecondes entre les exécutions
 * @returns {Function} - La fonction throttlée
 */
export const throttle = (func, limit) => {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        return func.apply(this, args);
      }
    };
  };
  