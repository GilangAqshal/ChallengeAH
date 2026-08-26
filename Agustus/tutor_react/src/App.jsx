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
    foto: getPlayerImage("konsa.jpg"),
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
// NAVBAR & HEADER
// ==========================================
const Header = () => (
  <header
    style={{
      backgroundColor: "#EF0107",
      color: "white",
      padding: "20px 0",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      marginBottom: "30px",
    }}
  >
    <h1 style={{ margin: 0, fontSize: "28px", letterSpacing: "2px" }}>
      🔴 ARSENAL FAN PORTAL
    </h1>
    <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "14px" }}>
      Victoria Concordia Crescit
    </p>
  </header>
);

// ==========================================
// CARD PEMAIN (BENDERA ASLI + EFEK HOVER)
// ==========================================
const PlayerCard = ({ pemain }) => {
  const [isHovered, setIsHovered] = useState(false);
  const countryCode = countryCodeMap[pemain.negara] || "gb";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "250px",
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
            maxWidth: "120px",
            textTransform: "uppercase",
            lineHeight: "1.2",
          }}
        >
          {pemain.nama}
        </div>
      </div>

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
// SKUAD PEMAIN ARSENAL
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
    <div style={{ marginBottom: "40px" }}>
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <h2 style={{ color: "#EF0107", marginBottom: "10px" }}>
          🔴 ARSENAL SQUAD
        </h2>
        <input
          type="text"
          placeholder="Cari nama pemain atau negara..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          style={{
            padding: "12px 16px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
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
                borderBottom: "2px solid #EF0107",
                paddingBottom: "8px",
                textTransform: "uppercase",
                color: "#333",
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
// JADWAL ARSENAL
// ==========================================
const mockJadwalArsenal = [
  {
    idEvent: "1",
    strLeague: "Premier League",
    intRound: "1",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Wolverhampton",
    dateEvent: "2024-08-17",
    strVenue: "Emirates Stadium",
  },
  {
    idEvent: "2",
    strLeague: "Premier League",
    intRound: "2",
    strHomeTeam: "Aston Villa",
    strAwayTeam: "Arsenal",
    dateEvent: "2024-08-24",
    strVenue: "Villa Park",
  },
  {
    idEvent: "3",
    strLeague: "Premier League",
    intRound: "3",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Brighton",
    dateEvent: "2024-08-31",
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
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "#fff",
        height: "fit-content",
      }}
    >
      <h3
        style={{
          color: "#EF0107",
          marginTop: 0,
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        📅 Jadwal Pertandingan
      </h3>
      {loading ? (
        <p>Memuat jadwal...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {jadwal.slice(0, 3).map((event, index) => (
            <div
              key={event.idEvent || index}
              style={{
                border: "1px solid #edf2f7",
                borderRadius: "8px",
                padding: "12px",
                backgroundColor: "#f8fafc",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {event.strLeague}{" "}
                {event.intRound ? `• Round ${event.intRound}` : ""}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "6px 0",
                  color: "#1e293b",
                }}
              >
                {event.strHomeTeam} vs {event.strAwayTeam}
              </div>
              <div style={{ fontSize: "12px", color: "#475569" }}>
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
// FORM KOMENTAR
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
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "#fff",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#1e293b",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        💬 Diskusi Fans
      </h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "10px", marginTop: "15px" }}
      >
        <input
          type="text"
          placeholder="Tulis pendapatmu tentang Arsenal..."
          value={inputTeks}
          onChange={(e) => setInputTeks(e.target.value)}
          style={{
            padding: "10px 14px",
            flex: "1",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 18px",
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
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            {listKomentar.map((komentar, index) => (
              <li key={index} style={{ marginBottom: "6px", color: "#334155" }}>
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
// DAFTAR TUGAS FANS
// ==========================================
const DaftarTugas = () => {
  const [tugas, setTugas] = useState([
    "Nonton Pertandingan",
    "Beli Jersey Terbaru",
  ]);

  const hapusTugas = (indexHapus) => {
    setTugas(tugas.filter((_, index) => index !== indexHapus));
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#1e293b",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        📝 Catatan Fans
      </h3>
      {tugas.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Semua catatan selesai! 🎉
        </p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {tugas.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <span style={{ color: "#334155", fontSize: "14px" }}>{item}</span>
              <button
                onClick={() => hapusTugas(index)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
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
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <Header />

      <main
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 40px" }}
      >
        {/* SECTION SKUAD PEMAIN UTAMA */}
        <SkuadPemain />

        {/* SECTION DUA KOLOM: JADWAL & FEATURE LAIN */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          <JadwalArsenal />
          <div>
            <FormKomentar />
            <DaftarTugas />
          </div>
        </div>
      </main>

      <footer
        style={{
          backgroundColor: "#061922",
          color: "#94a3b8",
          textAlign: "center",
          padding: "20px",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} Arsenal Fan Application. Built with React.
      </footer>
    </div>
  );
};

export default App;
