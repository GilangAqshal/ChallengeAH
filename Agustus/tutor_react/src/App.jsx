import React, { useState } from "react";

const FormKomentar = () => {
  // State 1: Menampung teks yang sedang diketik user di input
  const [inputTeks, setInputTeks] = useState("");

  // State 2: Menampung list komentar yang sudah dikirim (berupa Array)
  const [listKomentar, setListKomentar] = useState([]);

  // Fungsi saat tombol/form disubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman reload otomatis
    if (inputTeks.trim() === "") return; // Jangan masukkan jika input kosong

    // 🧩 PUZZLE 1:
    // Masukkan 'inputTeks' ke dalam array 'listKomentar'.
    // Hint: Gunakan Spread Operator (...) untuk menggabungkan array lama dengan teks baru
    // Contoh bentuknya: setListKomentar([...listKomentar, inputTeks]);
    setListKomentar([...listKomentar, inputTeks]);
    // Reset isi input teks jadi kosong lagi setelah dikirim
    setInputTeks("");
  };

  return (
    <div
      style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd" }}
    >
      <h3>Beri Komentar / Opini:</h3>

      <form onSubmit={handleSubmit}>
        {/* 🧩 PUZZLE 2: 
            Koneksikan input ini ke state 'inputTeks'.
            1. Pasang 'value' mengarah ke 'inputTeks'
            2. Pasang 'onChange' untuk update state saat ada yang diketik (e.target.value)
        */}
        <input
          type="text"
          placeholder="Tulis opini kamu di sini..."
          value={inputTeks}
          onChange={(e) => setInputTeks(e.target.value)}
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 15px" }}>
          Kirim
        </button>
      </form>

      <h4 style={{ marginTop: "15px" }}>Daftar Komentar:</h4>
      <ul>
        {/* 🧩 PUZZLE 3: 
            Looping array 'listKomentar' menggunakan .map() untuk menampilkan tiap komentar di tag <li>.
            Gunakan 'index' sebagai key uniknya.
        */}
        {listKomentar.map((komentar, index) => (
          <li key={index}>{komentar}</li>
        ))}
      </ul>
    </div>
  );
};

const DaftarTugas = () => {
  const [tugas, setTugas] = useState(["Belajar React", "Push ke GitHub"]);

  // Fungsi untuk menghapus tugas berdasarkan indeks
  const hapusTugas = (indexHapus) => {
    // 🧩 PUZZLE 1: Filter array untuk membuang item dengan index yang dipilih
    const tugasBaru = tugas.filter((_, index) => index !== indexHapus);
    setTugas(tugasBaru);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Daftar Tugas Hari Ini:</h3>

      {/* 🧩 PUZZLE 2: Tampilkan pesan jika tugas kosong (length === 0) */}
      {tugas.length === 0 ? (
        <p>Belum ada tugas, santai dulu! 🎉</p>
      ) : (
        <ul>
          {tugas.map((item, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {item}{" "}
              {/* 🧩 PUZZLE 3: Panggil fungsi hapusTugas saat tombol diklik */}
              <button onClick={() => hapusTugas(index)}>Hapus ❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      {/* <Produk namaProduk="Creatine" harga="175.000" /> */}
      <FormKomentar />
      <DaftarTugas />
    </div>
  );
};
export default App;
