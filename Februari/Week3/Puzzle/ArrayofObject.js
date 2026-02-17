const users = [
    { name: "Gilang", hobbies: ["Coding", "Gaming"] },
    { name: "Figo", hobbies: ["Biking", "Running"] }
];

// ??? : Akses array 'users' index ke-0, lalu ambil 'hobbies' index ke-1
const gilangHobby = users[0].hobbies[1];

console.log(gilangHobby); // Ekspektasi: Gaming