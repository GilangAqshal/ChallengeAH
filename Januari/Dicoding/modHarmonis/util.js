/**
 * TODO:
 * 1. Ekspor fungsi splitString secara named export
 * 2. Ekspor fungsi unique secara default export
 */
export function splitString(string) {
  return Array.from(string);
}
export default function unique(array) {
  return [...new Set(array)];
}
