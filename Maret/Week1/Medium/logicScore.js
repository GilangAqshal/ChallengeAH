let score = 0;

const player = {
  alive: true,
  points: 10
};

if (player.alive) {
  score += player.points;
}

console.log(score);
// Ekspektasi: 10