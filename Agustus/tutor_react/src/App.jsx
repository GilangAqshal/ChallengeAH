import React, { useState, useEffect } from "react";

// ==========================================
// HELPER BACA GAMBAR PEMAIN DARI ASSETS
// ==========================================
const getPlayerImage = (fileName) => {
  try {
    return new URL(`./assets/player/${fileName}`, import.meta.url).href;
  } catch (err) {
    return "";
  }
};

// ==========================================
// HELPER BENDERA NEGARA (FLAGCDN)
// ==========================================
const getFlagUrl = (countryCode) => {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};

// Map Kode Negara ISO (2 Karakter)
const countryCodeMap = {
  Spain: "es",
  France: "fr",
  England: "gb-eng",
  Ecuador: "ec",
  Brazil: "br",
  Netherlands: "nl",
  Italy: "it",
  Norway: "no",
  Portugal: "pt",
  Sweden: "se",
  Greece: "gr",
  Germany: "de",
};

// ==========================================
// DATA PEMAIN ARSENAL
// ==========================================
const dataPemainArsenal = [
  // --- GOALKEEPERS ---
  {
    nomor: 1,
    nama: "DAVID RAYA",
    negara: "Spain",
    posisi: "Goalkeepers",
    foto: getPlayerImage("david_raya.png"),
  },
  {
    nomor: 13,
    nama: "KEPA ARIZZABALAGA",
    negara: "Spain",
    posisi: "Goalkeepers",
    foto: getPlayerImage("kepa.png"),
  },
  {
    nomor: 30,
    nama: "ILLAN MESLIER",
    negara: "France",
    posisi: "Goalkeepers",
    foto: getPlayerImage("meslier.png"),
  },
  {
    nomor: 35,
    nama: "TOMMY SETFORD",
    negara: "England",
    posisi: "Goalkeepers",
    foto: getPlayerImage("setford.png"),
  },

  // --- DEFENDERS ---
  {
    nomor: 2,
    nama: "WILLIAM SALIBA",
    negara: "France",
    posisi: "Defenders",
    foto: getPlayerImage("saliba.png"),
  },
  {
    nomor: 3,
    nama: "CRISTHIAN MOSQUERA",
    negara: "Spain",
    posisi: "Defenders",
    foto: getPlayerImage("mosquera.png"),
  },
  {
    nomor: 4,
    nama: "BEN WHITE",
    negara: "England",
    posisi: "Defenders",
    foto: getPlayerImage("ben_white.png"),
  },
  {
    nomor: 5,
    nama: "PIERO HINCAPIE",
    negara: "Ecuador",
    posisi: "Defenders",
    foto: getPlayerImage("hincapie.png"),
  },
  {
    nomor: 6,
    nama: "GABRIEL",
    negara: "Brazil",
    posisi: "Defenders",
    foto: getPlayerImage("gabriel.png"),
  },
  {
    nomor: 12,
    nama: "JURRIEN TIMBER",
    negara: "Netherlands",
    posisi: "Defenders",
    foto: getPlayerImage("timber.png"),
  },
  {
    nomor: 15,
    nama: "EZRI KONSA",
    negara: "England",
    posisi: "Defenders",
    foto: getPlayerImage("konsa.png"),
  },
  {
    nomor: 33,
    nama: "RICCARDO CALAFIORI",
    negara: "Italy",
    posisi: "Defenders",
    foto: getPlayerImage("calafiori.png"),
  },
  {
    nomor: 49,
    nama: "MYLES LEWIS-SKELLY",
    negara: "England",
    posisi: "Defenders",
    foto: getPlayerImage("lewis_skelly.png"),
  },

  // --- MIDFIELDERS ---
  {
    nomor: 8,
    nama: "MARTIN ODEGAARD",
    negara: "Norway",
    posisi: "Midfielders",
    foto: getPlayerImage("odegaard.png"),
  },
  {
    nomor: 10,
    nama: "EBERECHI EZE",
    negara: "England",
    posisi: "Midfielders",
    foto: getPlayerImage("eze.png"),
  },
  {
    nomor: 21,
    nama: "FABIO VIEIRA",
    negara: "Portugal",
    posisi: "Midfielders",
    foto: getPlayerImage("vieira.png"),
  },
  {
    nomor: 22,
    nama: "ETHAN NWANERI",
    negara: "England",
    posisi: "Midfielders",
    foto: getPlayerImage("nwaneri.png"),
  },
  {
    nomor: 23,
    nama: "MIKEL MERINO",
    negara: "Spain",
    posisi: "Midfielders",
    foto: getPlayerImage("merino.png"),
  },
  {
    nomor: 36,
    nama: "MARTIN ZUBIMENDI",
    negara: "Spain",
    posisi: "Midfielders",
    foto: getPlayerImage("zubimendi.png"),
  },
  {
    nomor: 39,
    nama: "BRUNO GUIMARAES",
    negara: "Brazil",
    posisi: "Midfielders",
    foto: getPlayerImage("guimaraes.png"),
  },
  {
    nomor: 41,
    nama: "DECLAN RICE",
    negara: "England",
    posisi: "Midfielders",
    foto: getPlayerImage("rice.png"),
  },

  // --- FORWARDS ---
  {
    nomor: 7,
    nama: "BUKAYO SAKA",
    negara: "England",
    posisi: "Forwards",
    foto: getPlayerImage("saka.png"),
  },
  {
    nomor: 9,
    nama: "GABRIEL JESUS",
    negara: "Brazil",
    posisi: "Forwards",
    foto: getPlayerImage("jesus.png"),
  },
  {
    nomor: 11,
    nama: "GABRIEL MARTINELLI",
    negara: "Brazil",
    posisi: "Forwards",
    foto: getPlayerImage("martinelli.png"),
  },
  {
    nomor: 14,
    nama: "VIKTOR GYÖKERES",
    negara: "Sweden",
    posisi: "Forwards",
    foto: getPlayerImage("gyokeres.png"),
  },
  {
    nomor: 17,
    nama: "CHRISTOS TZOLIS",
    negara: "Greece",
    posisi: "Forwards",
    foto: getPlayerImage("tzolis.png"),
  },
  {
    nomor: 20,
    nama: "NONI MADUEKE",
    negara: "England",
    posisi: "Forwards",
    foto: getPlayerImage("madueke.png"),
  },
  {
    nomor: 24,
    nama: "REISS NELSON",
    negara: "England",
    posisi: "Forwards",
    foto: getPlayerImage("nelson.png"),
  },
  {
    nomor: 29,
    nama: "KAI HAVERTZ",
    negara: "Germany",
    posisi: "Forwards",
    foto: getPlayerImage("havertz.png"),
  },
];

// ==========================================
// KOMPONEN 1: FORM KOMENTAR
// ==========================================
const FormKomentar = () => {
  const [inputTeks, setInputTeks] = useState("");
  const [listKomentar, setListKomentar] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTeks.trim() === "") return;
    setListKomentar([...listKomentar, inputTeks]);
    setInputTeks("");
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>💬 Beri Komentar / Opini:</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Tulis opini kamu di sini..."
          value={inputTeks}
          onChange={(e) => setInputTeks(e.target.value)}
          style={{
            padding: "10px",
            flex: "1",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#EF0107",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Kirim
        </button>
      </form>
      {listKomentar.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          <h4>Daftar Komentar:</h4>
          <ul style={{ paddingLeft: "20px" }}>
            {listKomentar.map((komentar, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {komentar}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ==========================================
// KOMPONEN 2: DAFTAR TUGAS
// ==========================================
const DaftarTugas = () => {
  const [tugas, setTugas] = useState(["Belajar React", "Upload Foto Pemain"]);

  const hapusTugas = (indexHapus) => {
    const tugasBaru = tugas.filter((_, index) => index !== indexHapus);
    setTugas(tugasBaru);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>📝 Daftar Tugas Hari Ini:</h3>
      {tugas.length === 0 ? (
        <p>Belum ada tugas! 🎉</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {tugas.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>{item}</span>
              <button
                onClick={() => hapusTugas(index)}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Hapus ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ==========================================
// KOMPONEN CARD PEMAIN (BENDERA ASLI + EFEK HOVER)
// ==========================================
const PlayerCard = ({ pemain }) => {
  const [isHovered, setIsHovered] = useState(false);
  const countryCode = countryCodeMap[pemain.negara] || "gb";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "260px",
        height: "140px",
        borderRadius: "12px",
        background: isHovered
          ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
          : "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)",
        border: isHovered ? "1px solid #EF0107" : "1px solid #dcdcdc",
        boxShadow: isHovered
          ? "0 10px 20px rgba(239, 1, 7, 0.15)"
          : "0 4px 8px rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        padding: "15px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#111",
            lineHeight: "1",
          }}
        >
          {pemain.nomor}
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#222",
            marginTop: "6px",
            maxWidth: "130px",
            textTransform: "uppercase",
            lineHeight: "1.2",
          }}
        >
          {pemain.nama}
        </div>
      </div>

      {/* TAMPILAN BENDERA ASLI BESERTA NAMA NEGARA */}
      <div
        style={{
          fontSize: "12px",
          color: "#444",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <img
          src={getFlagUrl(countryCode)}
          alt={pemain.negara}
          style={{
            width: "18px",
            height: "13px",
            borderRadius: "2px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            objectFit: "cover",
          }}
        />
        <span>{pemain.negara}</span>
      </div>

      {/* GAMBAR PEMAIN */}
      <img
        src={pemain.foto}
        alt={pemain.nama}
        style={{
          position: "absolute",
          right: "0px",
          bottom: "0px",
          height: "130px",
          width: "auto",
          objectFit: "contain",
          zIndex: 1,
          opacity: isHovered ? 1 : 0.35,
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          filter: isHovered ? "brightness(100%)" : "brightness(90%)",
          transition: "all 0.3s ease",
        }}
      />
    </div>
  );
};

// ==========================================
// KOMPONEN 3: SKUAD PEMAIN ARSENAL
// ==========================================
const SkuadPemain = () => {
  const [kataKunci, setKataKunci] = useState("");
  const kategoriPosisi = [
    "Goalkeepers",
    "Defenders",
    "Midfielders",
    "Forwards",
  ];

  const pemainTersaring = dataPemainArsenal.filter(
    (p) =>
      p.nama.toLowerCase().includes(kataKunci.toLowerCase()) ||
      p.negara.toLowerCase().includes(kataKunci.toLowerCase()),
  );

  return (
    <div style={{ marginBottom: "30px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#EF0107", marginBottom: "10px" }}>
          🔴 ARSENAL SQUAD
        </h2>
        <input
          type="text"
          placeholder="Cari nama pemain atau negara..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "350px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {kategoriPosisi.map((posisi) => {
        const pemainKategori = pemainTersaring.filter(
          (p) => p.posisi === posisi,
        );
        if (pemainKategori.length === 0) return null;

        return (
          <div key={posisi} style={{ marginBottom: "35px" }}>
            <h3
              style={{
                textAlign: "center",
                letterSpacing: "2px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              {posisi} ⌃
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {pemainKategori.map((pemain) => (
                <PlayerCard key={pemain.nomor} pemain={pemain} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ==========================================
// KOMPONEN 4: JADWAL ARSENAL
// ==========================================
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
];

const JadwalArsenal = () => {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJadwalArsenal = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=133604",
        );
        const data = await res.json();
        if (data && data.events && data.events.length > 0) {
          setJadwal(data.events);
        } else {
          setJadwal(mockJadwalArsenal);
        }
      } catch (err) {
        setJadwal(mockJadwalArsenal);
      } finally {
        setLoading(false);
      }
    };

    fetchJadwalArsenal();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ color: "#EF0107", marginTop: 0 }}>
        📅 Jadwal Pertandingan Arsenal
      </h3>
      {loading ? (
        <p>Memuat jadwal...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {jadwal.slice(0, 3).map((event, index) => (
            <div
              key={event.idEvent || index}
              style={{
                border: "1px solid #eee",
                borderRadius: "6px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div
                style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}
              >
                {event.strLeague}{" "}
                {event.intRound ? `• Round ${event.intRound}` : ""}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  margin: "5px 0",
                }}
              >
                {event.strHomeTeam} vs {event.strAwayTeam}
              </div>
              <div style={{ fontSize: "12px", color: "#444" }}>
                📅 {event.dateEvent} | 📍 {event.strVenue || "Emirates Stadium"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// KOMPONEN UTAMA (APP)
// ==========================================
const App = () => {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <FormKomentar />
      <DaftarTugas />
      <SkuadPemain />
      <JadwalArsenal />
    </div>
  );
};

export default App;
