function process(a, b, callback) {
  return callback(a, b);
}

const result = process(10, 5, (x, y) => x - y);

console.log(result);
// Ekspektasi: 5