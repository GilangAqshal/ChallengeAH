const age = 18;
const money = 90000;
const ticketPrice = 75000;

if (age >= 17) {
    if (money >= ticketPrice) {
        console.log("Tiket berhasil dibeli!");
    } else {
        console.log("Uang kurang!");
    }
} else {
    console.log("Umur belum cukup!");
}