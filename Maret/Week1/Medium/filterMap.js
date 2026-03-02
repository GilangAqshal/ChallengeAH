const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers
  .filter(n => n % 2 == 0)
  .map(n => n * 2);

console.log(result);
// Ekspektasi: [4, 8, 12]