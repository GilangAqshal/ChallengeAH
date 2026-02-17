const greet = (name) => {
    const user = name || "Guest"; // Gunakan operator OR untuk nilai default
    return `Welcome, ${user}!`;
}

console.log(greet("Gilang")); // Welcome, Gilang!
console.log(greet(""));       // Welcome, Guest!