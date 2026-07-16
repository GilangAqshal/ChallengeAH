// Tantangan 4: Spread & Rest Operator
const cart = { item: "Sepatu", qty: 1 };
const updateCart = { ...cart, qty: 2, notes: "Ukuran 42" };
console.log(updateCart);
