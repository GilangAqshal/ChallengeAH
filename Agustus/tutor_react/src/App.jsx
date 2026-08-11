import React, { useState, useEffect } from "react";

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
        <p>Belum ada tugas, santai duluu! 🎉</p>
      ) : (
        <ul>
          {tugas.map((item, index) => (
            <li
              key={index}
              style={{ marginBottom: "5px" }}
              style={{ listStyle: "none" }}
            >
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

// challenge three
const daftarPemain = [
  // Kiper (Goalkeepers)
  "David Raya",
  "Kepa Arrizabalaga",
  "Illan Meslier",
  "Tommy Setford",
  // Bek (Defenders)
  "William Saliba",
  "Cristhian Mosquera",
  "Ben White",
  "Piero Hincapie",
  "Gabriel Magalhaes",
  "Jurrien Timber",
  "Riccardo Calafiori",
  // Gelandang (Midfielders)
  "Eberechi Eze",
  "Mikel Merino",
  "Ethan Nwaneri",
  "Declan Rice",
  "Martin Zubimendi",
  "Fabio Vieira",
  "Christian Norgaard",
  "Myles Lewis-Skelly",
  // Penyerang (Forwards)
  "Viktor Gyokeres",
  "Bukayo Saka",
  "Martin Odegaard",
  "Gabriel Jesus",
  "Gabriel Martinelli",
  "Christos Tzolis",
  "Noni Madueke",
  "Reiss Nelson",
  "Kai Havertz",
];

const CariPemain = () => {
  const [kataKunci, setKataKunci] = useState("");
  const [dataPemain, setDataPemain] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter list berdasarkan pencarian teks
  const pemainTersaring = daftarPemain.filter((nama) =>
    nama.toLowerCase().includes(kataKunci.toLowerCase()),
  );

  // Fetch data & gambar dari API saat input/list berubah
  useEffect(() => {
    const fetchGambarPemain = async () => {
      if (pemainTersaring.length === 0) {
        setDataPemain([]);
        return;
      }

      setLoading(true);

      // Ambil data dari API TheSportsDB untuk setiap pemain yang tersaring
      const hasilFetch = await Promise.all(
        pemainTersaring.map(async (nama) => {
          try {
            const res = await fetch(
              `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(
                nama,
              )}`,
            );
            const data = await res.json();
            const playerInfo = data.player ? data.player[0] : null;

            return {
              nama: nama,
              foto:
                playerInfo?.strCutout ||
                playerInfo?.strThumb ||
                "https://via.placeholder.com/80?text=No+Image",
            };
          } catch (error) {
            return {
              nama: nama,
              foto: "https://via.placeholder.com/80?text=Error",
            };
          }
        }),
      );

      setDataPemain(hasilFetch);
      setLoading(false);
    };

    // Debounce singkat agar tidak spam fetch tiap ketik 1 huruf
    const timer = setTimeout(() => {
      fetchGambarPemain();
    }, 400);

    return () => clearTimeout(timer);
  }, [kataKunci]);

  return (
    <div
      style={{ marginTop: "20px", padding: "15px", border: "1px solid #aaa" }}
    >
      <h3>Cari Skuad Pemain:</h3>

      <input
        type="text"
        placeholder="Ketik nama pemain..."
        value={kataKunci}
        onChange={(e) => setKataKunci(e.target.value)}
        style={{ padding: "8px", width: "220px", marginBottom: "15px" }}
      />

      {loading ? (
        <p>Memuat foto pemain...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {dataPemain.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                width: "120px",
              }}
            >
              <img
                src={item.foto}
                alt={item.nama}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginTop: "8px",
                }}
              >
                {item.nama}
              </p>
            </div>
          ))}
        </div>
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
      <CariPemain />
    </div>
  );
};
export default App;
