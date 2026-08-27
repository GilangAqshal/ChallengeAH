import React, { useState, useRef, useEffect } from "react";

// ==========================================
// KNOWLEDGE BASE & LOGIKA PENCARIAN CERDAS
// ==========================================
const getBotResponse = (userMessage, dataPemain = [], dataJadwal = []) => {
  const query = userMessage.toLowerCase().trim();

  // 1. PENCARIAN DATA PEMAIN SPESIFIK (Dinamis dari Data Skuad)
  const namaPemainDitemukan = dataPemain.find(
    (p) =>
      query.includes(p.nama.toLowerCase()) ||
      p.nama
        .toLowerCase()
        .split(" ")
        .some((part) => part.length > 3 && query.includes(part)),
  );

  if (namaPemainDitemukan) {
    if (
      query.includes("pergi") ||
      query.includes("pindah") ||
      query.includes("transfer") ||
      query.includes("al-hilal") ||
      query.includes("al hilal")
    ) {
      return `Saat ini **${namaPemainDitemukan.nama}** masih resmi terdaftar sebagai pemain Arsenal (No. ${namaPemainDitemukan.nomor}) di posisi ${namaPemainDitemukan.posisi}. Belum ada konfirmasi resmi mengenai kepindahannya!`;
    }
    if (query.includes("nomor") || query.includes("no")) {
      return `Nomor punggung **${namaPemainDitemukan.nama}** di Arsenal adalah **${namaPemainDitemukan.nomor}**.`;
    }
    if (query.includes("posisi") || query.includes("main di")) {
      return `**${namaPemainDitemukan.nama}** bermain di posisi **${namaPemainDitemukan.posisi}**.`;
    }
    if (query.includes("negara") || query.includes("asal")) {
      return `**${namaPemainDitemukan.nama}** berasal dari **${namaPemainDitemukan.negara}**.`;
    }
    return `**${namaPemainDitemukan.nama}** adalah pemain Arsenal (No. Punggung ${namaPemainDitemukan.nomor}) yang bermain sebagai ${namaPemainDitemukan.posisi} dari negara ${namaPemainDitemukan.negara}.`;
  }

  // 2. GREETING / SAPAAN (Pastikan tidak salah tangkap kata lain)
  const exactGreetings = [
    "halo",
    "hai",
    "hi",
    "helo",
    "pagi",
    "siang",
    "malam",
  ];
  if (exactGreetings.some((g) => query === g || query.startsWith(g + " "))) {
    return "Halo Gooner! 🔴⚪ Ada yang bisa **gunBot** bantu seputar Arsenal hari ini?";
  }

  // 3. PENCARIAN JADWAL (Dinamis dari Data Jadwal)
  if (
    query.includes("jadwal") ||
    query.includes("lawan") ||
    query.includes("tanding") ||
    query.includes("berikutnya") ||
    query.includes("next")
  ) {
    if (dataJadwal.length > 0) {
      const nextMatch = dataJadwal[0];
      return `Pertandingan terdekat Arsenal adalah melawan **${nextMatch.strHomeTeam === "Arsenal" ? nextMatch.strAwayTeam : nextMatch.strHomeTeam}** pada tanggal **${nextMatch.dateEvent}** di **${nextMatch.strVenue || "Emirates Stadium"}**.`;
    }
    return "Jadwal pertandingan dapat kamu lihat pada panel Jadwal Pertandingan di sebelah kiri!";
  }

  // 4. PERTANYAAN KHUSUS SEPUTAR KLUBS & MANAJER
  if (
    query.includes("pelatih") ||
    query.includes("manajer") ||
    query.includes("arteta")
  ) {
    return "Manajer Arsenal saat ini adalah **Mikel Arteta**.";
  }
  if (
    query.includes("stadion") ||
    query.includes("stadium") ||
    query.includes("kandang")
  ) {
    return "Stadion kandang Arsenal adalah **Emirates Stadium** di London Utara.";
  }
  if (query.includes("kapten") || query.includes("captain")) {
    return "Kapten utama Arsenal saat ini adalah **Martin Ødegaard** (No. 8).";
  }
  if (
    query.includes("trofi") ||
    query.includes("juara") ||
    query.includes("invincibles")
  ) {
    return "Arsenal memegang rekor trofi **FA Cup terbanyak (14 kali)** dan pernah menjuarai Premier League tanpa terkalahkan (**The Invincibles 2003/04**).";
  }

  // 5. DEFAULT BOT RESPONSE (Jika data tidak ditemukan)
  return `Maaf, gunBot tidak menemukan informasi spesifik untuk "${userMessage}". Kamu bisa menanyakan nama pemain (seperti *Martinelli, Saka, Rice*), jadwal tanding, atau info klub lainnya!`;
};

// ==========================================
// KOMPONEN CHATBOT
// ==========================================
const GunBot = ({ dataPemain = [], dataJadwal = [] }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! Saya **gunBot (TheGunnersBot)** 🤖🔴. Silakan tanyakan apa saja seputar Arsenal atau pemainnya!",
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const currentTime = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, time: currentTime },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      // Mengirim dataPemain dan dataJadwal ke fungsi pencari data
      const botReply = getBotResponse(userText, dataPemain, dataJadwal);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
          time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "420px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#EF0107",
          color: "white",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            color: "#EF0107",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          🤖
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: "14px" }}>
            gunBot (TheGunnersBot)
          </h4>
          <span style={{ fontSize: "11px", opacity: 0.85 }}>
            Online • Smart Assistant
          </span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          backgroundColor: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender === "user" ? "#EF0107" : "#fff",
                color: msg.sender === "user" ? "#fff" : "#1e293b",
                padding: "10px 14px",
                borderRadius: "10px",
                fontSize: "13px",
                border: msg.sender === "bot" ? "1px solid #e2e8f0" : "none",
              }}
            >
              {msg.text}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#94a3b8",
                marginTop: "3px",
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            >
              {msg.time}
            </div>
          </div>
        ))}
        {isTyping && (
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            gunBot sedang mencari data...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        style={{
          display: "flex",
          padding: "10px",
          backgroundColor: "#fff",
          borderTop: "1px solid #e2e8f0",
          gap: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Tanya gunBot seputar Arsenal..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            outline: "none",
            fontSize: "13px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#EF0107",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 14px",
            fontWeight: "bold",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default GunBot;
