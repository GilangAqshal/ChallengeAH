const products = [
  {
    id: "1",
    name: "shirt",
    price: 1000,
    qty: 3,
  },
  {
    id: "2",
    name: "kemeja",
    price: 1500,
    qty: 5,
  },
  {
    id: "1",
    name: "celana panjang",
    price: 1800,
    qty: 8,
  },
];

// map
const productsSummary = products.map((item) => {
  return {
    summary: `${item.name}, harganya ${item.price}, tersedia sebanyak ${item.qty}`,
  };
});

console.log("origin:", products);
console.log(productsSummary);
console.log("after:", products);

// filter
const filteredProducts = products.filter((item) => item.qty > 3);
console.log("product dengan qty lebih dari 3: ", filteredProducts);

// reduce
const totalPrice = products.reduce((prev, item) => {
  const total = item.qty * item.price + prev;
  return total;
}, 0);
console.log("total price:", totalPrice);
