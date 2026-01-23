// src/utils/analytics.js

export const DAY = 24 * 60 * 60 * 1000;

/**
 * Builds a 30-day time series for charting
 * @param {Array} items - data array
 * @param {string} dateKey - date field name
 */
export function buildLast30DaysSeries(dateKey, items = []) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const map = {};
  const labels = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today.getTime() - i * DAY);
    const key = d.toISOString().slice(0, 10);
    map[key] = 0;
    labels.push(key);
  }

  items.forEach((item) => {
    if (!item?.[dateKey]) return;

    const date = new Date(item[dateKey]);
    date.setHours(0, 0, 0, 0);

    const key = date.toISOString().slice(0, 10);
    if (map[key] !== undefined) {
      map[key]++;
    }
  });

  return {
    labels,
    data: labels.map((d) => map[d]),
  };
}
