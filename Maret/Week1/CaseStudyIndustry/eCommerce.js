const cart = [
  { name: "Mouse", price: 50000 },
  { name: "Keyboard", price: 75000 }
];

const total = cart
  .reduce((sum, item) => sum + item.price, 0);

let finalPrice = total;

if (total > 100000) {
  finalPrice = total * 0.1 ;
}

console.log(finalPrice);
// Ekspektasi: 112500