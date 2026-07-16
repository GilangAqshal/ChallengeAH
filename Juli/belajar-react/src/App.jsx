import React from "react";

// const App = () => {
//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1>Selamat Datang di Belajar React!</h1>
//       {/* Tempatkan komponen tantangan kamu di bawah sini */}
//     </div>
//   );
// };

const Produk = ({ namaProduk }) => {
  return (
    <div className="card">
      <h2>This is {namaProduk}!</h2>
      <p>
        Produk {namaProduk} sangat amat aman untuk pemula karena bagus untuk
        membangun massa otot
      </p>
    </div>
  );
};

// Komponen Utama (Parent Component)
const App = () => {
  return (
    <div>
      <Produk namaProduk="Muscle Fisrt Creatine" />
    </div>
  );
};
export default App;
