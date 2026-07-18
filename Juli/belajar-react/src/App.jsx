// Use state
import React, { useState } from "react";
// tantangan 1
const Produk = ({ namaProduk, harga }) => {
  return (
    <div className="card">
      <h2>This is {namaProduk}!</h2>
      <p>
        Produk {namaProduk} sangat amat aman untuk pemula karena bagus untuk
        membangun massa otot
      </p>
      <br />
      <h2>Bill {harga}!</h2>
      <p>
        Harganya {harga} untuk sebuah {namaProduk}
      </p>
    </div>
  );
};
// tantangan 2
const TombolLike = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={() => setIsLiked(!isLiked)}>
        {/* Gunakan Ternary Operator untuk mengubah teks tombol secara dinamis */}
        {isLiked ? "Sudah disukai ❤️" : "Sukai 🤍"}
      </button>
    </div>
  );
};
//tantangan3
const KeranjangBelanja = () => {
  const cart = [
    { id: 1, item: "Sepatu", qty: 2 },
    { id: 2, item: "Kaos", qty: 3 },
  ];

  return (
    <div>
      <h3>Keranjang Belanja Kamu : </h3>
      <ul>
        {cart.map((produk) => (
          <li key={produk.id} type="none">
            {produk.item} - Jumlah : {produk.qty}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Parent COmponent
const App = () => {
  return (
    <div>
      <Produk namaProduk="Creatine" harga="175.000" />
      <TombolLike />
      <KeranjangBelanja />
    </div>
  );
};
export default App;

// Komponen dasar dan prop

// import React from "react";
// const Produk = ({ namaProduk, harga }) => {
//   return (
//     <div className="card">
//       <h2>This is {namaProduk}!</h2>
//       <p>
//         Produk {namaProduk} sangat amat aman untuk pemula karena bagus untuk
//         membangun massa otot
//       </p>
//       <br />
//       <h2>Bill {harga}!</h2>
//       <p>
//         Harganya {harga} untuk sebuah {namaProduk}
//       </p>
//     </div>
//   );
// };

// Komponen Utama (Parent Component)
// const App = () => {
//   return (
//     <div>
//       <Produk namaProduk="Muscle Fisrt Creatine" harga="170.000" />
//     </div>
//   );
// };
// export default App;

// default
// const App = () => {
//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1>Selamat Datang di Belajar React!</h1>
//       {/* Tempatkan komponen tantangan kamu di bawah sini */}
//     </div>
//   );
// };
