const players = [
  { name: "Bird", hp: 40 },
  { name: "Hero", hp: 80 },
  { name: "Boss", hp: 100 }
];

const strong = players
  .filter(p => p.hp > 50)
  .map(p => p.name);

console.log(strong);
// Ekspektasi: ["Hero", "Boss"]