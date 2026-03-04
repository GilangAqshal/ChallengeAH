const donations = [0, 5000, -100, 2000, 0, 3000];

const total = donations
  .filter(n => n > 0)
  .reduce((sum, n) => n += sum, 0);

console.log(total);
// Ekspektasi: 10000