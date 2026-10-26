
from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
import base64

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 15 * 1024 * 1024  # 15 MB

MIN_AREA = 500

RENTANG_WARNA = {
    "Merah": [
        (np.array([0, 90, 60]), np.array([10, 255, 255])),
        (np.array([170, 90, 60]), np.array([179, 255, 255]))
    ],
    "Hijau": [
        (np.array([35, 50, 40]), np.array([85, 255, 255]))
    ],
    "Oranye": [
        (np.array([11, 90, 60]), np.array([24, 255, 255]))
    ]
}

WARNA_GARIS = {
    "Merah": (0, 0, 255),
    "Hijau": (0, 255, 0),
    "Oranye": (0, 165, 255)
}


def encode_gambar(citra):
    sukses, buffer = cv2.imencode(".jpg", citra)

    if not sukses:
        raise ValueError("Gagal mengubah gambar menjadi format JPEG.")

    return base64.b64encode(buffer).decode("utf-8")


def proses_gambar(file_bytes):
    # Baca gambar yang diunggah langsung dari memori
    array_gambar = np.frombuffer(file_bytes, dtype=np.uint8)
    citra_asli = cv2.imdecode(array_gambar, cv2.IMREAD_COLOR)

    if citra_asli is None:
        raise ValueError("File bukan gambar yang valid.")

    # Resize agar pemrosesan lebih ringan
    tinggi, lebar = citra_asli.shape[:2]
    skala = min(1.0, 1200 / max(tinggi, lebar))

    if skala < 1:
        citra_asli = cv2.resize(
            citra_asli,
            (int(lebar * skala), int(tinggi * skala)),
            interpolation=cv2.INTER_AREA
        )

    # Preprocessing
    citra_blur = cv2.GaussianBlur(citra_asli, (5, 5), 0)
    citra_hsv = cv2.cvtColor(citra_blur, cv2.COLOR_BGR2HSV)

    hasil = citra_asli.copy()
    mask_gabungan = np.zeros(citra_hsv.shape[:2], dtype=np.uint8)

    kernel = np.ones((5, 5), np.uint8)
    statistik = {}
    semua_kontur = []

    # Segmentasi setiap warna
    for nama, rentang in RENTANG_WARNA.items():
        mask = np.zeros(citra_hsv.shape[:2], dtype=np.uint8)

        for batas_bawah, batas_atas in rentang:
            mask_warna = cv2.inRange(
                citra_hsv, batas_bawah, batas_atas
            )
            mask = cv2.bitwise_or(mask, mask_warna)

        # Mengurangi noise dan menutup lubang kecil
        mask = cv2.morphologyEx(
            mask, cv2.MORPH_OPEN, kernel, iterations=1
        )
        mask = cv2.morphologyEx(
            mask, cv2.MORPH_CLOSE, kernel, iterations=2
        )

        mask_gabungan = cv2.bitwise_or(mask_gabungan, mask)

        kontur, _ = cv2.findContours(
            mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )

        objek_valid = [
            objek for objek in kontur
            if cv2.contourArea(objek) >= MIN_AREA
        ]

        statistik[nama] = {
            "jumlah": len(objek_valid),
            "persentase": 0.0
        }

        for objek in objek_valid:
            semua_kontur.append((nama, objek))

    # Gambar kotak dan label objek
    nomor_warna = {"Merah": 0, "Hijau": 0, "Oranye": 0}

    for nama, objek in semua_kontur:
        nomor_warna[nama] += 1
        x, y, w, h = cv2.boundingRect(objek)

        cv2.rectangle(
            hasil, (x, y), (x + w, y + h),
            WARNA_GARIS[nama], 2
        )

        cv2.putText(
            hasil,
            f"{nama} {nomor_warna[nama]}",
            (x, max(y - 8, 20)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            WARNA_GARIS[nama],
            2
        )

    # Menghitung jumlah dan persentase
    total = sum(item["jumlah"] for item in statistik.values())

    for item in statistik.values():
        if total > 0:
            item["persentase"] = round(
                item["jumlah"] / total * 100, 2
            )

    # Informasi ringkasan pada gambar hasil
    cv2.rectangle(hasil, (0, 0), (350, 115), (30, 30, 30), -1)

    y_teks = 25

    for nama, item in statistik.items():
        teks = f'{nama}: {item["jumlah"]} ({item["persentase"]:.2f}%)'

        cv2.putText(
            hasil, teks, (12, y_teks),
            cv2.FONT_HERSHEY_SIMPLEX, 0.6,
            WARNA_GARIS[nama], 2
        )
        y_teks += 30

    cv2.putText(
        hasil, f"Total: {total} cabai", (12, 105),
        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2
    )

    # Mask gabungan untuk visualisasi
    hasil_mask = cv2.cvtColor(mask_gabungan, cv2.COLOR_GRAY2BGR)

    return {
        "statistik": statistik,
        "total": total,
        "hasil": encode_gambar(hasil),
        "mask": encode_gambar(hasil_mask)
    }


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/analyze", methods=["POST"])
def analyze():
    if "gambar" not in request.files:
        return jsonify({"error": "Silakan pilih gambar terlebih dahulu."}), 400

    file = request.files["gambar"]

    if not file.filename:
        return jsonify({"error": "Nama file tidak ditemukan."}), 400

    ekstensi = file.filename.rsplit(".", 1)[-1].lower()

    if ekstensi not in {"jpg", "jpeg", "png", "webp", "bmp"}:
        return jsonify({"error": "Gunakan file JPG, PNG, WEBP, atau BMP."}), 400

    try:
        file_bytes = file.read()

        if not file_bytes:
            return jsonify({"error": "File gambar kosong."}), 400

        hasil = proses_gambar(file_bytes)
        return jsonify(hasil)

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception:
        app.logger.exception("Pemrosesan gambar gagal")
        return jsonify({
            "error": "Terjadi kesalahan saat memproses gambar."
        }), 500


@app.errorhandler(413)
def file_terlalu_besar(error):
    return jsonify({"error": "Ukuran gambar maksimal 15 MB."}), 413


if __name__ == "__main__":
    app.run(debug=True)
