const cart = [
    { item: "Keyboard", price: 300000 },
    { item: "Mouse", price: 150000 },
    { item: "Monitor", price: 1500000 }
];

let totalPrice = 0;
for (let i = 0; i < cart.length; i++) {
    // ??? : Tambahkan harga setiap item ke totalPrice
    totalPrice += cart[i].price;
}

console.log(totalPrice); // Ekspektasi: 1950000