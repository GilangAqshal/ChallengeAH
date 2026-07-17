import React from "react";

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

// Komponen Utama (Parent Component)
const App = () => {
  return (
    <div>
      <Produk namaProduk="Muscle Fisrt Creatine" harga="170.000" />
      {/* <Produk harga="Rp.170.000" /> */}
    </div>
  );
};
export default App;

// const App = () => {
//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1>Selamat Datang di Belajar React!</h1>
//       {/* Tempatkan komponen tantangan kamu di bawah sini */}
//     </div>
//   );
// };
