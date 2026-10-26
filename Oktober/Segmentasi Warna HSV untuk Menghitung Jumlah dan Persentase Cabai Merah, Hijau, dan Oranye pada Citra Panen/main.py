
import cv2
import numpy as np
import matplotlib.pyplot as plt
import os
import csv
from pathlib import Path

# ==========================================
# 1. KONFIGURASI
# ==========================================

FOLDER_DATASET = "dataset"
FOLDER_HASIL = "hasil"

# Luas minimum kontur agar dianggap sebagai objek cabai.
# Sesuaikan dengan resolusi dan ukuran cabai pada foto.
MIN_AREA = 500

EKSTENSI = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}

os.makedirs(FOLDER_HASIL, exist_ok=True)

# Rentang HSV OpenCV:
# Hue: 0-179, Saturation: 0-255, Value: 0-255

RENTANG_WARNA = {
    "Merah": [
        (np.array([0, 90, 60]), np.array([10, 255, 255])),
        (np.array([170, 90, 60]), np.array([179, 255, 255]))
    ],
    "Oranye": [
        (np.array([11, 90, 60]), np.array([24, 255, 255]))
    ],
    "Hijau": [
        (np.array([35, 50, 40]), np.array([85, 255, 255]))
    ]
}

# ==========================================
# 2. PREPROCESSING
# ==========================================

def preprocessing(citra):
    # Resize jika gambar terlalu besar
    tinggi, lebar = citra.shape[:2]
    skala = min(1.0, 1200 / max(tinggi, lebar))

    if skala < 1.0:
        citra = cv2.resize(
            citra,
            (int(lebar * skala), int(tinggi * skala)),
            interpolation=cv2.INTER_AREA
        )

    # Mengurangi noise menggunakan Gaussian Blur
    citra_blur = cv2.GaussianBlur(citra, (5, 5), 0)

    # Konversi BGR menjadi HSV
    citra_hsv = cv2.cvtColor(citra_blur, cv2.COLOR_BGR2HSV)

    return citra, citra_hsv


# ==========================================
# 3. SEGMENTASI WARNA HSV
# ==========================================

def segmentasi_warna(citra_hsv, rentang):
    mask_total = np.zeros(
        citra_hsv.shape[:2],
        dtype=np.uint8
    )

    for batas_bawah, batas_atas in rentang:
        mask = cv2.inRange(
            citra_hsv,
            batas_bawah,
            batas_atas
        )

        mask_total = cv2.bitwise_or(mask_total, mask)

    # Operasi morfologi untuk mengurangi noise
    kernel = np.ones((5, 5), np.uint8)

    mask_total = cv2.morphologyEx(
        mask_total,
        cv2.MORPH_OPEN,
        kernel,
        iterations=1
    )

    mask_total = cv2.morphologyEx(
        mask_total,
        cv2.MORPH_CLOSE,
        kernel,
        iterations=2
    )

    return mask_total


# ==========================================
# 4. DETEKSI DAN PENGHITUNGAN OBJEK
# ==========================================

def hitung_cabai(citra, mask, nama_warna):
    hasil = citra.copy()

    kontur, _ = cv2.findContours(
        mask,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    jumlah = 0

    for objek in kontur:
        luas = cv2.contourArea(objek)

        # Abaikan objek yang terlalu kecil
        if luas < MIN_AREA:
            continue

        jumlah += 1

        x, y, w, h = cv2.boundingRect(objek)

        # Kotak pembatas objek
        cv2.rectangle(
            hasil,
            (x, y),
            (x + w, y + h),
            (255, 255, 255),
            2
        )

        # Label warna dan nomor objek
        cv2.putText(
            hasil,
            f"{nama_warna} {jumlah}",
            (x, max(y - 8, 20)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255, 255, 255),
            2
        )

    return jumlah, hasil


# ==========================================
# 5. PROSES SATU CITRA
# ==========================================

def proses_citra(path_gambar):
    citra_asli = cv2.imread(str(path_gambar))

    if citra_asli is None:
        print(f"Gagal membaca gambar: {path_gambar}")
        return None

    citra, citra_hsv = preprocessing(citra_asli)

    hasil_gambar = citra.copy()
    hasil_mask = {}
    jumlah_warna = {}

    # Segmentasi dan deteksi setiap warna
    for nama_warna, rentang in RENTANG_WARNA.items():
        mask = segmentasi_warna(citra_hsv, rentang)

        jumlah, _ = hitung_cabai(
            citra,
            mask,
            nama_warna
        )

        # Gambar kontur objek ke hasil akhir
        kontur, _ = cv2.findContours(
            mask,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        warna_garis = {
            "Merah": (0, 0, 255),
            "Hijau": (0, 255, 0),
            "Oranye": (0, 165, 255)
        }[nama_warna]

        nomor = 0

        for objek in kontur:
            if cv2.contourArea(objek) < MIN_AREA:
                continue

            nomor += 1

            x, y, w, h = cv2.boundingRect(objek)

            cv2.rectangle(
                hasil_gambar,
                (x, y),
                (x + w, y + h),
                warna_garis,
                2
            )

            cv2.putText(
                hasil_gambar,
                f"{nama_warna} {nomor}",
                (x, max(y - 8, 20)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                warna_garis,
                2
            )

        jumlah_warna[nama_warna] = jumlah
        hasil_mask[nama_warna] = mask

    # ======================================
    # 6. MENGHITUNG PERSENTASE
    # ======================================

    total = sum(jumlah_warna.values())

    persentase = {}

    for warna, jumlah in jumlah_warna.items():
        if total > 0:
            persentase[warna] = jumlah / total * 100
        else:
            persentase[warna] = 0.0

    # Tambahkan informasi ke gambar
    y_teks = 30

    for warna in RENTANG_WARNA:
        teks = (
            f"{warna}: {jumlah_warna[warna]} "
            f"({persentase[warna]:.1f}%)"
        )

        cv2.putText(
            hasil_gambar,
            teks,
            (15, y_teks),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 255),
            2
        )

        y_teks += 30

    cv2.putText(
        hasil_gambar,
        f"Total cabai: {total}",
        (15, y_teks),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (255, 255, 255),
        2
    )

    # ======================================
    # 7. SIMPAN HASIL
    # ======================================

    nama_file = path_gambar.stem

    cv2.imwrite(
        f"{FOLDER_HASIL}/{nama_file}_hasil.jpg",
        hasil_gambar
    )

    for warna, mask in hasil_mask.items():
        cv2.imwrite(
            f"{FOLDER_HASIL}/{nama_file}_mask_{warna.lower()}.png",
            mask
        )

    # Tampilkan perbandingan citra dan mask
    citra_rgb = cv2.cvtColor(
        citra,
        cv2.COLOR_BGR2RGB
    )

    hasil_rgb = cv2.cvtColor(
        hasil_gambar,
        cv2.COLOR_BGR2RGB
    )

    fig, axes = plt.subplots(2, 3, figsize=(15, 9))

    axes[0, 0].imshow(citra_rgb)
    axes[0, 0].set_title("Citra Asli / Preprocessing")

    axes[0, 1].imshow(hasil_mask["Merah"], cmap="gray")
    axes[0, 1].set_title("Mask Cabai Merah")

    axes[0, 2].imshow(hasil_mask["Hijau"], cmap="gray")
    axes[0, 2].set_title("Mask Cabai Hijau")

    axes[1, 0].imshow(hasil_mask["Oranye"], cmap="gray")
    axes[1, 0].set_title("Mask Cabai Oranye")

    axes[1, 1].imshow(hasil_rgb)
    axes[1, 1].set_title("Hasil Deteksi dan Penghitungan")

    axes[1, 2].axis("off")
    ringkasan = "\n".join([
        f"{warna}: {jumlah_warna[warna]} buah "
        f"({persentase[warna]:.2f}%)"
        for warna in RENTANG_WARNA
    ])
    ringkasan += f"\n\nTotal: {total} buah"

    axes[1, 2].text(
        0.05, 0.95,
        ringkasan,
        va="top",
        fontsize=12,
        transform=axes[1, 2].transAxes
    )

    for ax in axes.flat:
        ax.axis("off") if ax != axes[1, 2] else None

    plt.tight_layout()

    fig.savefig(
        f"{FOLDER_HASIL}/{nama_file}_visualisasi.png",
        dpi=150
    )

    plt.close(fig)

    # Tampilkan ringkasan ke terminal
    print(f"\nGambar: {path_gambar.name}")
    print("-" * 35)

    for warna in RENTANG_WARNA:
        print(
            f"{warna}: {jumlah_warna[warna]} buah "
            f"({persentase[warna]:.2f}%)"
        )

    print(f"Total: {total} buah")

    # Data untuk CSV
    baris = {"nama_file": path_gambar.name}

    for warna in RENTANG_WARNA:
        baris[f"jumlah_{warna.lower()}"] = jumlah_warna[warna]
        baris[f"persentase_{warna.lower()}"] = round(
            persentase[warna], 2
        )

    baris["total_cabai"] = total

    return baris


# ==========================================
# 8. PROSES SELURUH DATASET
# ==========================================

def main():
    folder = Path(FOLDER_DATASET)

    if not folder.exists():
        print("Folder dataset tidak ditemukan!")
        print("Buat folder dataset dan masukkan foto cabai.")
        return

    daftar_gambar = sorted([
        file for file in folder.iterdir()
        if file.suffix.lower() in EKSTENSI
    ])

    if len(daftar_gambar) == 0:
        print("Tidak ada gambar di folder dataset.")
        return

    if len(daftar_gambar) < 10:
        print(
            f"Peringatan: dataset baru berisi "
            f"{len(daftar_gambar)} gambar. "
            "Tugas mensyaratkan minimal 10 gambar."
        )

    semua_hasil = []

    for gambar in daftar_gambar:
        hasil = proses_citra(gambar)

        if hasil is not None:
            semua_hasil.append(hasil)

    # Ekspor seluruh hasil ke CSV
    if semua_hasil:
        nama_csv = f"{FOLDER_HASIL}/hasil_penghitungan.csv"

        with open(
            nama_csv,
            "w",
            newline="",
            encoding="utf-8-sig"
        ) as file_csv:
            kolom = list(semua_hasil[0].keys())

            writer = csv.DictWriter(
                file_csv,
                fieldnames=kolom
            )

            writer.writeheader()
            writer.writerows(semua_hasil)

        print("\n" + "=" * 40)
        print("SELURUH DATASET SELESAI DIPROSES")
        print(f"Jumlah gambar: {len(semua_hasil)}")
        print(f"Hasil tersimpan di: {FOLDER_HASIL}")
        print(f"Rekap CSV: {nama_csv}")


if __name__ == "__main__":
    main()
