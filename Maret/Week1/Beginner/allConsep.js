const data = [
  { name: "Mic", price: 500 },
  { name: "Camera", price: 1000 }
];

let total = 0;

for (let item of data) {
  if (item.price > 600) {
    total += item.price;
  }
}

console.log(total);
// Ekspektasi: 1000