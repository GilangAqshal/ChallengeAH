const products = [
    { name: "HP", price: 2000000 },
    { name: "Earphone", price: 250000 },
    { name: "Case", price: 50000 }
];

const promoProducts = products.filter(product => {
    // ??? : Return TRUE jika harga < 500000
    return product.price < 500000;
});

console.log(promoProducts.length); // Ekspektasi: 2