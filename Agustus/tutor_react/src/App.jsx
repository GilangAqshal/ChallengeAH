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

const mockJadwalArsenal = [
  {
    idEvent: "1",
    strLeague: "Premier League",
    intRound: "1",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Wolverhampton",
    dateEvent: "2024-08-17",
    strTime: "14:00:00",
    strVenue: "Emirates Stadium",
  },
  {
    idEvent: "2",
    strLeague: "Premier League",
    intRound: "2",
    strHomeTeam: "Aston Villa",
    strAwayTeam: "Arsenal",
    dateEvent: "2024-08-24",
    strTime: "16:30:00",
    strVenue: "Villa Park",
  },
  {
    idEvent: "3",
    strLeague: "Premier League",
    intRound: "3",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Brighton",
    dateEvent: "2024-08-31",
    strTime: "11:30:00",
    strVenue: "Emirates Stadium",
  },
  {
    idEvent: "4",
    strLeague: "Premier League",
    intRound: "4",
    strHomeTeam: "Tottenham",
    strAwayTeam: "Arsenal",
    dateEvent: "2024-09-15",
    strTime: "13:00:00",
    strVenue: "Tottenham Hotspur Stadium",
  },
  {
    idEvent: "5",
    strLeague: "Premier League",
    intRound: "5",
    strHomeTeam: "Manchester City",
    strAwayTeam: "Arsenal",
    dateEvent: "2024-09-22",
    strTime: "15:30:00",
    strVenue: "Etihad Stadium",
  },
  {
    idEvent: "6",
    strLeague: "Premier League",
    intRound: "6",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Leicester City",
    dateEvent: "2024-09-28",
    strTime: "14:00:00",
    strVenue: "Emirates Stadium",
  },
  {
    idEvent: "7",
    strLeague: "Premier League",
    intRound: "7",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Southampton",
    dateEvent: "2024-10-05",
    strTime: "14:00:00",
    strVenue: "Emirates Stadium",
  },
  {
    idEvent: "8",
    strLeague: "Premier League",
    intRound: "8",
    strHomeTeam: "Bournemouth",
    strAwayTeam: "Arsenal",
    dateEvent: "2024-10-19",
    strTime: "16:30:00",
    strVenue: "Vitality Stadium",
  },
  {
    idEvent: "9",
    strLeague: "Premier League",
    intRound: "9",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Liverpool",
    dateEvent: "2024-10-27",
    strTime: "16:30:00",
    strVenue: "Emirates Stadium",
  },
  {
    idEvent: "10",
    strLeague: "Premier League",
    intRound: "10",
    strHomeTeam: "Newcastle United",
    strAwayTeam: "Arsenal",
    dateEvent: "2024-11-02",
    strTime: "12:30:00",
    strVenue: "St. James' Park",
  },
];

const JadwalArsenal = () => {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchJadwalArsenal = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=133604",
        );

        const data = await res.json();

        if (data && data.events && data.events.length > 0) {
          // Gabungkan data asli API di posisi paling atas + sisanya dari mock data
          const mergedData = [...data.events, ...mockJadwalArsenal];
          setJadwal(mergedData);
        } else {
          setJadwal(mockJadwalArsenal);
        }
      } catch (err) {
        // Jika API error/gagal, tetap pakai mock data
        setJadwal(mockJadwalArsenal);
      } finally {
        setLoading(false);
      }
    };

    fetchJadwalArsenal();
  }, []);

  // Potong 5 data pertama jika showAll bernilai false
  const jadwalDitampilkan = showAll ? jadwal : jadwal.slice(0, 5);

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "1px solid #aaa",
        borderRadius: "8px",
        maxWidth: "600px",
        fontFamily: "sans-serif",
      }}
    >
      <h3 style={{ color: "#ef0109", marginBottom: "15px" }}>
        🔴 Jadwal Pertandingan Arsenal All
      </h3>

      {loading && <p>Memuat jadwal pertandingan...</p>}

      {!loading && (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {jadwalDitampilkan.map((event, index) => (
              <div
                key={event.idEvent || index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "12px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {/* Nama Kompetisi & Pekan */}
                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {event.strLeague}{" "}
                  {event.intRound ? `• Round ${event.intRound}` : ""}
                </div>

                {/* Matchup */}
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{event.strHomeTeam}</span>
                  <span
                    style={{
                      backgroundColor: "#EF0107",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    VS
                  </span>
                  <span>{event.strAwayTeam}</span>
                </div>

                {/* Tanggal & Waktu */}
                <div style={{ fontSize: "13px", color: "#444" }}>
                  📅 {event.dateEvent} | ⏰{" "}
                  {event.strTime ? event.strTime.substring(0, 5) : "TBD"} UTC
                </div>
                {event.strVenue && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#777",
                      marginTop: "3px",
                    }}
                  >
                    📍 {event.strVenue}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tombol Toggle pasti dirender karena total data > 5 */}
          {jadwal.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#fff",
                border: "1px solid #EF0107",
                color: "#EF0107",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {showAll
                ? "Sembunyikan (Tampilkan 5 Pertandingan)"
                : `Tampilkan Semua (${jadwal.length} Pertandingan)`}
            </button>
          )}
        </>
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
      <JadwalArsenal />
    </div>
  );
};
export default App;
