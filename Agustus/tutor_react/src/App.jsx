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
