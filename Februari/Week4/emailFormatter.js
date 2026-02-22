const employees = ["Gilang", "Rian", "Adit"];
const emails = employees.map(name => {
    // ??? : Ubah nama jadi lowercase dan tambahkan domain
    return name.toLowerCase() + "@company.com";
});
console.log(emails); // Ekspektasi: ["gilang@company.com", "rian@company.com", "adit@company.com"]