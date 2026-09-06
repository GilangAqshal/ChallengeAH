import React, { useState, useEffect, useRef } from "react";
import GunBot from "./GunBot";

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
  Denmark: "dk",
  Belgium: "be",
  Polandia: "pl",
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
    nomor: 29,
    nama: "KAI HAVERTZ",
    negara: "Germany",
    posisi: "Forwards",
    foto: getPlayerImage("havertz.png"),
  },

  // On Loan
  {
    nomor: 22,
    nama: "ETHAN NWANERI",
    negara: "England",
    posisi: "OnLoan",
    foto: getPlayerImage("nwaneriBVB.png"),
  },
  {
    nomor: 35,
    nama: "TOMMY SETFORD",
    negara: "England",
    posisi: "OnLoan",
    foto: getPlayerImage("setford.png"),
  },
  // Transfer List
  {
    nomor: 21,
    nama: "FABIO VIEIRA",
    negara: "Portugal",
    posisi: "Transfer",
    foto: getPlayerImage("vieraHamburg.png"),
  },
  {
    nomor: 19,
    nama: "LEADRO TROSSARD",
    negara: "Belgium",
    posisi: "Transfer",
    foto: getPlayerImage("trossard.png"),
  },
  {
    nomor: 9,
    nama: "GABRIEL JESUS",
    negara: "Brazil",
    posisi: "Transfer",
    foto: getPlayerImage("gabjesBarca.png"),
  },
  {
    nomor: 11,
    nama: "GABRIEL MARTINELLI",
    negara: "Brazil",
    posisi: "Transfer",
    foto: getPlayerImage("martinelliHILAL.png"),
  },
  {
    nomor: 16,
    nama: "CHRISTIAN NORGARD",
    negara: "Denmark",
    posisi: "Transfer",
    foto: getPlayerImage("norgardEverton.png"),
  },
  {
    nomor: 28,
    nama: "JAKUB KIWIOR",
    negara: "Polandia",
    posisi: "Transfer",
    foto: getPlayerImage("norgardEverton.png"),
  },
];

// ==========================================
// TOKEN WARNA & GAYA GLOBAL
// ==========================================
const WARNA = {
  merah: "#EF0107",
  merahGelap: "#B90000",
  navy: "#061922",
  emas: "#9C824A",
  abu: "#64748b",
  bgHalus: "#f8fafc",
};

// Style global (grid 3 kolom tetap, navbar, scrollbar, dsb) — dipasang lewat <style> tag
// karena proyek ini pakai inline style, bukan file CSS terpisah.
const GlobalStyle = () => (
  <style>{`
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; }

    /* ===== GRID SKUAD: SELALU 3 KOLOM, RESPONSIVE ===== */
    .grid-skuad {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(8px, 2vw, 20px);
    }

    .kartu-pemain {
      width: 100%;
      aspect-ratio: 16 / 10;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      padding: clamp(8px, 1.6vw, 16px);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
    }

    .kartu-pemain .nomor-punggung {
      font-size: clamp(13px, 2.6vw, 22px);
      font-weight: 800;
      color: #111;
      line-height: 1;
    }

    .kartu-pemain .nama-pemain {
      font-size: clamp(9px, 1.6vw, 14px);
      font-weight: bold;
      color: #222;
      margin-top: 4px;
      max-width: 70%;
      text-transform: uppercase;
      line-height: 1.2;
    }

    .kartu-pemain .info-negara {
      font-size: clamp(8px, 1.3vw, 12px);
      color: #444;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .kartu-pemain .info-negara img {
      width: clamp(12px, 2vw, 18px);
      height: auto;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      object-fit: cover;
    }

    .kartu-pemain .foto-pemain {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 88%;
      width: auto;
      max-width: 65%;
      object-fit: contain;
      z-index: 1;
      transition: all 0.3s ease;
    }

    @media (max-width: 480px) {
      .kartu-pemain .nama-pemain { max-width: 62%; }
    }

    /* ===== NAVBAR ===== */
    .navbar-link {
      position: relative;
      color: #f4f4f4;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      padding: 6px 2px;
      opacity: 0.85;
      transition: opacity 0.2s ease;
    }
    .navbar-link:hover { opacity: 1; }
    .navbar-link::after {
      content: "";
      position: absolute;
      left: 0; bottom: -4px;
      width: 0%;
      height: 2px;
      background: #ffffff;
      transition: width 0.25s ease;
    }
    .navbar-link:hover::after { width: 100%; }

    /* ===== TOMBOL FLOATING CHAT ===== */
    .tombol-chat-float {
      position: fixed;
      right: 22px;
      bottom: 22px;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border: none;
      background: ${WARNA.merah};
      color: white;
      font-size: 24px;
      box-shadow: 0 8px 24px rgba(239,1,7,0.4);
      cursor: pointer;
      z-index: 60;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .tombol-chat-float:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 28px rgba(239,1,7,0.5);
    }

    .panel-chat {
      position: fixed;
      right: 22px;
      bottom: 92px;
      width: min(360px, calc(100vw - 44px));
      max-height: min(560px, calc(100vh - 140px));
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.25);
      z-index: 60;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: munculPanel 0.22s ease;
    }

    @keyframes munculPanel {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .kartu-pemain, .tombol-chat-float, .panel-chat { transition: none; animation: none; }
    }
  `}</style>
);

// ==========================================
// NAVBAR
// ==========================================
const Navbar = ({ onOpenChat }) => {
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  const tautan = [
    { label: "Skuad", href: "#skuad" },
    { label: "Jadwal", href: "#jadwal" },
    { label: "Diskusi Fans", href: "#diskusi" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: WARNA.navy,
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            backgroundColor: WARNA.merah,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          AR
        </div>
        <span
          style={{
            color: "white",
            fontWeight: 700,
            letterSpacing: "1px",
            fontSize: "15px",
          }}
        >
          ARSENAL FAN PORTAL
        </span>
      </div>

      {/* Menu desktop */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "26px" }}
        className="menu-desktop"
      >
        {tautan.map((t) => (
          <a key={t.href} href={t.href} className="navbar-link">
            {t.label}
          </a>
        ))}
        <button
          onClick={onOpenChat}
          style={{
            backgroundColor: WARNA.merah,
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          💬 Tanya GunBot
        </button>
      </div>

      {/* Tombol menu mobile */}
      <button
        onClick={() => setMenuTerbuka(!menuTerbuka)}
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
        }}
        className="tombol-menu-mobile"
        aria-label="Buka menu"
      >
        {menuTerbuka ? "✕" : "☰"}
      </button>

      <style>{`
        @media (max-width: 720px) {
          .menu-desktop { display: none !important; }
          .tombol-menu-mobile { display: block !important; }
        }
      `}</style>

      {menuTerbuka && (
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: 0,
            right: 0,
            backgroundColor: WARNA.navy,
            display: "flex",
            flexDirection: "column",
            padding: "14px 20px",
            gap: "14px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          }}
        >
          {tautan.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="navbar-link"
              onClick={() => setMenuTerbuka(false)}
            >
              {t.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuTerbuka(false);
              onOpenChat();
            }}
            style={{
              backgroundColor: WARNA.merah,
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
            }}
          >
            💬 Tanya GunBot
          </button>
        </div>
      )}
    </nav>
  );
};

// ==========================================
// HERO SECTION
// ==========================================
const Hero = () => (
  <header
    style={{
      background: `linear-gradient(135deg, ${WARNA.merah} 0%, ${WARNA.merahGelap} 100%)`,
      color: "white",
      padding: "56px 20px 44px",
      textAlign: "center",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#ffffff",
        opacity: 0.85,
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "1px",
      }}
    >
      North London Forever
    </p>
    <h1
      style={{
        margin: "10px 0 0",
        fontSize: "clamp(28px, 5vw, 44px)",
        lineHeight: 1.1,
        color: "#ffffff",
      }}
    >
      Rumah digital fans Arsenal
    </h1>
    <p
      style={{
        maxWidth: "560px",
        margin: "14px auto 0",
        color: "#ffffff",
        opacity: 0.9,
        fontSize: "15px",
      }}
    >
      Pantau skuad, jadwal pertandingan terbaru, dan ngobrol bareng fans lain —
      semua dalam satu halaman.
    </p>
  </header>
);

// ==========================================
// STRIP INFO PENTING (FAKTA KLUB)
// ==========================================
const InfoPenting = () => {
  const fakta = [
    { label: "Berdiri", nilai: "1886" },
    { label: "Kandang", nilai: "Emirates Stadium" },
    { label: "Kapasitas", nilai: "60.704" },
    { label: "Pelatih", nilai: "Mikel Arteta" },
    { label: "Juara Liga", nilai: "13x" },
    { label: "Piala FA", nilai: "14x" },
  ];

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "-28px auto 30px",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "14px",
          boxShadow: "0 12px 30px rgba(6,25,34,0.12)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          overflow: "hidden",
        }}
      >
        {fakta.map((f, i) => (
          <div
            key={f.label}
            style={{
              padding: "16px 12px",
              textAlign: "center",
              borderRight:
                i !== fakta.length - 1 ? "1px solid #eef1f5" : "none",
            }}
          >
            <div
              style={{ fontSize: "16px", fontWeight: 800, color: WARNA.navy }}
            >
              {f.nilai}
            </div>
            <div
              style={{ fontSize: "11px", color: WARNA.abu, marginTop: "3px" }}
            >
              {f.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// CARD PEMAIN (BENDERA ASLI + EFEK HOVER)
// ==========================================
const PlayerCard = ({ pemain }) => {
  const [isHovered, setIsHovered] = useState(false);
  const countryCode = countryCodeMap[pemain.negara] || "gb";

  return (
    <div
      className="kartu-pemain"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
          : "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)",
        border: isHovered ? `1px solid ${WARNA.merah}` : "1px solid #dcdcdc",
        boxShadow: isHovered
          ? "0 10px 20px rgba(239, 1, 7, 0.15)"
          : "0 4px 8px rgba(0, 0, 0, 0.05)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div>
        <div className="nomor-punggung">{pemain.nomor}</div>
        <div className="nama-pemain">{pemain.nama}</div>
      </div>

      <div className="info-negara">
        <img src={getFlagUrl(countryCode)} alt={pemain.negara} />
        <span>{pemain.negara}</span>
      </div>

      <img
        src={pemain.foto}
        alt={pemain.nama}
        className="foto-pemain"
        style={{
          opacity: isHovered ? 1 : 0.35,
          transform: isHovered ? "scale(1.06)" : "scale(1)",
          filter: isHovered ? "brightness(100%)" : "brightness(90%)",
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
    "OnLoan",
    "Transfer",
  ];

  const pemainTersaring = dataPemainArsenal.filter(
    (p) =>
      p.nama.toLowerCase().includes(kataKunci.toLowerCase()) ||
      p.negara.toLowerCase().includes(kataKunci.toLowerCase()),
  );

  return (
    <section
      id="skuad"
      style={{ marginBottom: "40px", scrollMarginTop: "80px" }}
    >
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <h2 style={{ color: WARNA.merah, marginBottom: "10px" }}>
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
                borderBottom: `2px solid ${WARNA.merah}`,
                paddingBottom: "8px",
                textTransform: "uppercase",
                color: "#333",
              }}
            >
              {posisi}
            </h3>

            <div className="grid-skuad">
              {pemainKategori.map((pemain) => (
                <PlayerCard key={pemain.nomor} pemain={pemain} />
              ))}
            </div>
          </div>
        );
      })}

      {pemainTersaring.length === 0 && (
        <p style={{ textAlign: "center", color: WARNA.abu }}>
          Tidak ada pemain yang cocok dengan pencarian "{kataKunci}".
        </p>
      )}
    </section>
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
  {
    idEvent: "4",
    strLeague: "Premier League",
    intRound: "4",
    strHomeTeam: "Tottenham",
    strAwayTeam: "Arsenal",
    dateEvent: "2024-09-15",
    strVenue: "Tottenham Hotspur Stadium",
  },
  {
    idEvent: "5",
    strLeague: "Premier League",
    intRound: "5",
    strHomeTeam: "Manchester City",
    strAwayTeam: "Arsenal",
    dateEvent: "2024-09-22",
    strVenue: "Etihad Stadium",
  },
  {
    idEvent: "6",
    strLeague: "Premier League",
    intRound: "6",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Leicester City",
    dateEvent: "2024-09-28",
    strVenue: "Emirates Stadium",
  },
];

const JadwalArsenal = () => {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchJadwalArsenal = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
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
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    }
  };

  useEffect(() => {
    fetchJadwalArsenal();
    const intervalId = setInterval(() => {
      fetchJadwalArsenal();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const displayedJadwal = showAll ? jadwal : jadwal.slice(0, 3);

  return (
    <div
      id="jadwal"
      style={{
        padding: "20px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "#fff",
        height: "fit-content",
        scrollMarginTop: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ color: WARNA.merah, margin: 0 }}>
          📅 Jadwal Pertandingan
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            color: "#16a34a",
            fontWeight: "bold",
          }}
        >
          <span
            style={{
              height: "8px",
              width: "8px",
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 0 6px #22c55e",
            }}
          ></span>
          REALTIME
        </div>
      </div>

      {loading ? (
        <p style={{ color: "#64748b", fontSize: "14px" }}>Memuat jadwal...</p>
      ) : (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {displayedJadwal.map((event, index) => (
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
                  📅 {event.dateEvent} | 📍{" "}
                  {event.strVenue || "Emirates Stadium"}
                </div>
              </div>
            ))}
          </div>

          {jadwal.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "transparent",
                color: WARNA.merah,
                border: `1px dashed ${WARNA.merah}`,
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "13px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = WARNA.merah;
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = WARNA.merah;
              }}
            >
              {showAll
                ? "▲ Tampilkan Lebih Sedikit"
                : `▼ Show More (${jadwal.length - 3} Lagi)`}
            </button>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "15px",
              paddingTop: "10px",
              borderTop: "1px solid #f1f5f9",
              fontSize: "11px",
              color: "#94a3b8",
            }}
          >
            <span>Update Terakhir: {lastUpdated || "-"}</span>
            <button
              onClick={() => fetchJadwalArsenal(true)}
              disabled={isRefreshing}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#64748b",
                cursor: isRefreshing ? "not-allowed" : "pointer",
                fontSize: "11px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {isRefreshing ? "🔄 Memperbarui..." : "🔄 Refresh"}
            </button>
          </div>
        </>
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
            backgroundColor: WARNA.merah,
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
// CHATBOT MENGAMBANG (MUNCUL SAAT DIPENCET SAJA)
// ==========================================
const ChatbotMengambang = ({ terbuka, onClose }) => {
  const panelRef = useRef(null);

  // Tutup panel saat klik di luar area chat
  useEffect(() => {
    if (!terbuka) return;
    const handleClickLuar = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickLuar);
    return () => document.removeEventListener("mousedown", handleClickLuar);
  }, [terbuka, onClose]);

  if (!terbuka) return null;

  return (
    <div className="panel-chat" ref={panelRef}>
      <div
        style={{
          backgroundColor: WARNA.merah,
          color: "white",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "14px" }}>
          🤖 GunBot Assistant
        </span>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="Tutup chat"
        >
          ✕
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#fff" }}>
        <GunBot />
      </div>
    </div>
  );
};

// ==========================================
// KOMPONEN UTAMA (APP)
// ==========================================
const App = () => {
  const [chatTerbuka, setChatTerbuka] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        backgroundColor: WARNA.bgHalus,
        minHeight: "100vh",
      }}
    >
      <GlobalStyle />

      <Navbar onOpenChat={() => setChatTerbuka(true)} />
      <Hero />
      <InfoPenting />

      <main
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 40px" }}
      >
        <SkuadPemain />

        <div
          id="diskusi"
          style={{
            scrollMarginTop: "80px",
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
          backgroundColor: WARNA.navy,
          color: "#94a3b8",
          textAlign: "center",
          padding: "20px",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} Arsenal Fan Application. Built with React.
      </footer>

      {/* Tombol chat mengambang: chatbot hanya muncul saat dipencet */}
      <button
        className="tombol-chat-float"
        onClick={() => setChatTerbuka((v) => !v)}
        aria-label="Buka chatbot GunBot"
      >
        {chatTerbuka ? "✕" : "💬"}
      </button>
      <ChatbotMengambang
        terbuka={chatTerbuka}
        onClose={() => setChatTerbuka(false)}
      />
    </div>
  );
};

export default App;
