// Contoh simulasi fetching data dari API dengan async/await
// const ambilDataUser = async () => {
//   try {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/users/1",
//     );
//     const data = await response.json();
//     console.log(`User ditemukan: ${data.name}`);
//   } catch (error) {
//     console.error("Terjadi error saat mengambil data:", error);
//   }
// };

// ambilDataUser();

// Contoh simulasi fetching data dari API dengan async/await
// Tantangan 6
const getProducts = async () => {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/products?limit=5",
    );
    const data = await response.json();
    console.log(`User ditemukan: ${data.name}`);
  } catch (error) {
    console.error("Terjadi error saat mengambil data:", error);
  }
};

getProducts();
