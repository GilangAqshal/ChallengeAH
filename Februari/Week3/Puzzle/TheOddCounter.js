let count = 0;

for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        count = count + 1;
    }
}

console.log(`Total angka ganjil ada: ${count}`); // Ekspektasi: 5