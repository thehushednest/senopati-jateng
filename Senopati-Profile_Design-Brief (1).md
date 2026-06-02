# SENOPATI INSTITUTE — PROFIL LEMBAGA 2026
## Design Brief untuk Claude Code (HTML → PDF, Portrait A4) — **v2, konten matang**

> Konten diambil dari versi final ("…_juni_top"). Gaya visual tetap mengikuti referensi premium: **navy + biru elektrik, glassmorphism, render 3D aksen, angka data besar**, ritme gelap–terang, **portrait A4**. Perbedaan utama v2: konten sudah final, portofolio jadi **6 entri**, ada **5 kutipan tokoh**, dan **foto dokumentasi asli jadi citra utama** (render 3D turun jadi aksen).

---

## 0. Penamaan (LOCKED — sudah konsisten)
- **Nama hukum:** Yayasan Senopati Strategic Research
- **Brand:** Senopati Institute
- **Label cover/section:** Senopati Strategic Research
- Jangan gunakan lagi gabungan "Senopati Strategic Research Institute".

---

## 1. Arah Desain
*Premium strategic intelligence.* Navy dalam + biru elektrik, kartu kaca (glassmorphism), garis orbital tipis, angka besar. Wibawa, modern, tepercaya — untuk klien pemerintah & kepolisian. Ritme **slide gelap (dramatis)** ↔ **slide terang (konten)**. Motif pengikat: emblem 3D kaca Senopati (perisai + bilah).

**Beda dari v1:** karena versi matang kaya **foto dokumentasi nyata** (kegiatan, MoU, tim), foto menjadi citra utama dan render 3D dipakai sebagai **aksen** (emblem, ikon, crystal angka). Lihat §8.

---

## 2. Format & Grid
- A4 portrait `210mm × 297mm`; `@page{size:A4 portrait;margin:0}`; tiap `.page` `width:210mm;height:297mm;overflow:hidden;page-break-after:always`.
- Preview 794×1123px @96dpi. Margin aman 16mm; gradient/foto boleh full-bleed.
- Grid 12 kolom, gutter 6mm. `print-color-adjust:exact`.

---

## 3. Warna (tokens)
```css
:root{
  --navy-900:#060f1e; --navy-800:#0a1830; --navy-700:#0e2347;
  --royal:#1c46c9; --blue:#3b7df6; --cyan:#7fd4ff; --peri:#a7b2ef;
  --paper:#f6f9ff; --ice:#e9f0ff; --white:#fff;
  --ink:#0c1830; --muted:#5b6b85;
  --line-d:rgba(255,255,255,.14); --line-l:rgba(12,24,48,.12);
}
```
Gradient cover/dark: `radial-gradient(120% 90% at 75% 15%,#1c46c9,#0e2347 38%,#060f1e)` + glow cyan. Judul: `linear-gradient(180deg,#fff,#c9d8ff)` di `background-clip:text`.

---

## 4. Tipografi (Fontshare)
```html
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=switzer@400,500,600,700&f[]=space-mono@400&display=swap" rel="stylesheet">
```
- Display **Clash Display** (judul, angka) · Body **Switzer** · Mono **Space Mono** (kicker/label/nomor). Fallback Google: Sora + Albert Sans.
- Skala: H1 ~72 · H2 ~46 · angka data ~54 · body 14–15 · kicker 11.

---

## 5. Komponen (resep)
```css
.glass{background:rgba(255,255,255,.06);backdrop-filter:blur(14px);
  border:1px solid rgba(255,255,255,.16);border-radius:18px;
  box-shadow:0 20px 50px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.18);}
.glass-l{background:rgba(255,255,255,.72);backdrop-filter:blur(10px);
  border:1px solid #fff;border-radius:18px;box-shadow:0 18px 40px rgba(20,40,90,.10);}
/* Bingkai foto: rounded 16–18px, 1px border var(--peri) @30%, shadow lembut.
   Foto di slide gelap: overlay linear-gradient(transparent,rgba(6,15,30,.65)) agar teks terbaca. */
```
Garis orbital (SVG arc tipis `--peri`@35%). Pill label berkonektor. **Number callout**: angka Clash 54px gradient biru + caption mono. Numbered marker `01/02…` mono `--peri`.

**Perlakuan foto (penting di v2):** pilih satu — (a) full-color dalam bingkai kaca, atau (b) **duotone navy–cyan** agar menyatu dengan palet. Konsisten satu pendekatan di seluruh dokumen.

---

## 6. Peta Halaman (15 hal.) — konten final

| Hal | Bagian | Ground | Aset/visual | Kutipan |
|----|--------|--------|-------------|---------|
| — | **Cover** | Dark | Foto AI Ready ASEAN (pelajar + Polwan) di balik potongan diagonal navy + emblem | — |
| 1 | **Tentang Yayasan** | Light | Foto kegiatan + teks | *"Knowledge itself is power."* — Francis Bacon |
| 2 | **Latar Belakang** | Dark | Foto seminar AI Ready ASEAN | — |
| 3 | **Visi & Misi** | Dark | 2 foto pelatihan + panel visi/misi | — |
| 4 | **Nilai Dasar** | Dark | 6 baris (Integritas…Positioning) + 2 foto | — |
| 5 | **Legalitas & Identitas** | Light | Intro + tabel 8 baris | — |
| 6 | **Bidang Kegiatan** | Light | Intro "empat poros" + 4 foto/ikon | — |
| 7 | **Layanan Utama** | Light | Intro + 6 layanan | *"The future belongs to those who prepare for it today."* — Malcolm X |
| 8 | **Struktur Organisasi** | Light | Foto tim (MoU) + daftar | — |
| 9 | **Kemitraan & Pendanaan** | Dark | Foto MoU ASEAN Foundation | *"If I have seen further it is by standing on the shoulders of Giants."* — Isaac Newton |
| 10–12 | **Rekam Jejak & Capaian** | mix | 3 spread @2 entri = **6 portofolio** (foto + callout) | — |
| 13 | **Penutup** | Dark | Quote besar | *"However beautiful the strategy, you should occasionally look at the results."* — Winston S. Churchill |
| — | **Back cover** | Dark | Foto + alamat & kontak | — |

> Untuk slide gelap (kutipan), set kutipan ber-style Playfair-italic atau Clash-italic besar warna `--peri`, nama tokot kecil mono.

---

## 7. KONTEN PORTOFOLIO (final, 6 entri) + callout angka

Tampilkan tiap entri: **judul · tag bidang · foto · paragraf · callout angka (bila ada) · peran Senopati**.

**01 · Pelatihan AI Readiness Pelajar SMA di Jawa Tengah (2026)**
Program kolaboratif bersama ASEAN Foundation dan Polda Jawa Tengah untuk memperkuat literasi AI pelajar dan masyarakat. Mencakup *campaign awareness*, *in-depth training*, dan *Training of Trainers*; mendorong literasi AI, etika digital, dan kesiapan generasi muda di era transformasi digital.
→ **CALLOUT: 142.288 penerima manfaat.** Peran Senopati: pelaksana edukasi & pendamping peserta.

**02 · Riset Kepuasan Masyarakat terhadap Program Ketahanan Pangan Polri (2025)**
Telaah pelaksanaan program ketahanan pangan berbasis jagung di Jawa Tengah dengan pendekatan *Citizen Satisfaction Model* (CSM), metode campuran (wawancara multipihak + survei). Hasil: respons publik umumnya positif (kualitas layanan, manfaat, kepercayaan) + rekomendasi penguatan koordinasi & kapasitas teknis.
→ **CALLOUT: 1.155 responden · 12 kabupaten/kota.** Peran Senopati: pelaksana riset & evaluasi.

**03 · Strategi Preventif Rangkul Gen Z Lewat E-Sports**
Turnamen e-sports berjenjang (Mobile Legends, PUBG Mobile) dari tingkat Polsek hingga puncak Kapolda Cup, merangkul ribuan pelajar. Mengalihkan energi digital remaja ke prestasi sekaligus edukasi kamtibmas: melawan judi online, tawuran, dan kenakalan remaja.
→ **CALLOUT: ribuan peserta · berjenjang Polsek → Polda.** Peran Senopati: penyelenggara (EO) & perancang program.

**04 · Sinergi Peduli Berantas TB Paru**
Gerakan "Polda Jateng Peduli Berantas TB Paru" mendukung target Eliminasi TBC Nasional 2030. Diinisiasi Kapolda Jateng; memberdayakan ribuan Bhabinkamtibmas sebagai *tracer* lapangan berbekal buku saku, mengusung semangat **TOSS** (Temukan, Obati, Sampai Sembuh) — deteksi dini, jemput pasien, kawal kepatuhan obat — bersinergi dengan Dinas Kesehatan.
→ **CALLOUT: ribuan Bhabinkamtibmas tracer · target 2030.** Peran Senopati: perancang program, penyusun pedoman, pendamping pelaksanaan.

**05 · Respons Cepat: Safe House 110 Lindungi Warga**
Program Safe House 110 sebagai pusat perlindungan darurat berbasis komunitas, terintegrasi langsung dengan Call Center Polisi 110. Menjadi rumah singgah taktis Bhabinkamtibmas dan tempat aman korban sebelum evakuasi — mempercepat waktu penanganan dan menumbuhkan rasa aman di lingkungan warga.
→ **CALLOUT: terintegrasi Call Center 110.** Peran Senopati: perancang konsep & pengembang program.

**06 · Emansipasi Nyata: Gerakan Kartini Berdaya**
Program "Sekolah Kartini Berdaya" bersama Polda Jateng dan HMI untuk memperkuat emansipasi dan peran perempuan di ranah publik & keluarga. Dipimpin perwira Polwan; menekankan peran ibu dalam pembentukan karakter anak dan pencegahan kenakalan remaja.
→ Peran Senopati: penggagas & fasilitator program.

*(Catatan: di v2 ini SIPOLAN dan "Senopati Academy" tidak berdiri sebagai entri terpisah — literasi AI terwakili oleh entri 01. Jika ingin memunculkan SIPOLAN/Academy kembali, beri tahu, saya tambahkan spread ke-4.)*

---

# 8. ASET & PROMPT DALL·E (v2 — foto utama, render aksen)

**Strategi:** foto dokumentasi asli = citra utama (cover, section, portofolio, tim, MoU). Render 3D hanya **aksen**: emblem, crystal angka, globe, dan ikon kecil per bidang/portofolio (opsional). Karena cover & banyak section sudah berfoto, **A8 backdrop tidak wajib**.

**Gaya rumah (tempel di akhir tiap prompt):**
> *"3D render, premium product-viz style, frosted translucent glass + glossy deep-navy and electric-blue (#1c46c9) with subtle cyan rim light (#7fd4ff), soft studio lighting, gentle reflections, clean minimal, high detail, octane/redshift look, centered with generous negative space."*

Ukuran DALL·E: portrait 1024×1792 · landscape 1792×1024 · square 1024×1024. Aset untuk slide gelap → minta *background navy #0e2347*; untuk di-*cutout* → *pure white background*.

### A1 — Emblem 3D Senopati (cover/divider) · 1024×1024 · bg navy
```
A floating 3D emblem shaped like a sleek heraldic shield with a vertical sword/keel motif at its center, frosted translucent glass with glossy deep-navy and electric-blue interior, thin glowing cyan edges, two delicate orbital ring lines, a few soft light particles, hovering above a faint reflective surface, centered, premium, authoritative. [gaya rumah], deep navy #0e2347 background.
```

### A2 — Crystal Data (di samping angka callout: 142.288 / 1.155 / 12) · 1024×1024 · bg white
```
A small abstract 3D crystal cluster of stacked translucent glass cubes ascending like data blocks, glossy electric-blue and navy with soft cyan inner glow, isolated and centered with lots of empty space. [gaya rumah], pure white background.
```

### A3 — Globe Jaringan (Kemitraan / jangkauan) · 1792×1024 · bg navy
```
A glowing dark-blue wireframe globe of fine dotted light points with soft glowing nodes and thin connecting arcs across its surface, faint orbital ring. [gaya rumah], deep navy #0e2347 background.
```

### A4 — Set 6 ikon Portofolio (opsional, marker kecil) · 1024×1024 · bg navy
Generate berurutan dalam satu sesi; sebut "matching the same style as the previous icon" agar seragam. Template — ganti `[OBJEK]`:
```
A single centered 3D icon: [OBJEK], frosted translucent glass with glossy navy and electric-blue interior and soft cyan inner glow, floating with soft shadow, minimal and iconic. [gaya rumah], deep navy #0e2347 background, lots of negative space.
```
1. **AI Readiness:** `a glowing neural-network brain merged with a graduation cap`
2. **Riset Ketahanan Pangan:** `a clipboard survey with a corn cob and a small bar chart`
3. **E-Sports:** `a glossy game controller`
4. **TB Paru / TOSS:** `a medical cross with a subtle pair of lungs`
5. **Safe House 110:** `a house with an open glowing door and a small shield, the number 110 subtly implied`
6. **Kartini Berdaya:** `a stylized female figure rising with an upward arrow and a small flower`

### A5 — Set 4 ikon Bidang Kegiatan (opsional) · 1024×1024 · bg white
Sama seperti A4 tetapi **pure white background**. `[OBJEK]`:
1. Strategic Research: `magnifying glass over a document with a small chart`
2. Institutional Development: `a building block with interlocking gears`
3. Capacity Building: `three small figures with an upward arrow`
4. Collaborative Engagement: `two interlocking rings with connecting nodes`

### A6 — Tekstur latar abstrak (opsional) · 1792×1024 · bg navy
```
Abstract dark navy topographic contour texture with faint glowing electric-blue lines, very subtle, low contrast, used as a quiet background layer, no text. [gaya rumah], seamless feel.
```

---

## 9. QA — koreksi kecil sebelum build (sumber masih ada typo)
Walau "sudah matang", ada beberapa yang sebaiknya dibetulkan saat menulis ulang ke HTML:
- Hal. 7 (Layanan, Konsultasi): **"memberikan sran"** → **"memberikan saran"**.
- Hal. 7 (intro Layanan): **"Layanan … di desain"** → **"didesain"**.
- Hal. 3 (Misi, poin 2): **"pengambilan Keputusan"** → huruf kecil **"keputusan"**.
- Opsional konsistensi: Misi poin 1 masih berbentuk "Menjadi mitra strategis…" (tidak paralel dengan poin lain yang berkata-kerja). Boleh diubah jadi "Menjalin kemitraan strategis…" — atau biarkan jika memang disengaja.
- Cek atribusi kutipan halaman Layanan ("The future belongs to those who prepare for it today.") yang umum dinisbatkan ke Malcolm X — pertahankan jika memang pilihan Anda.

---

## 10. Catatan eksekusi untuk Claude Code
1. Satu `index.html` + CSS internal; tiap section satu `.page` A4; uji **Print → Save as PDF** (Margins: None, Background graphics: ON).
2. Foto asli taruh di `/assets/photos/` (foto dari PDF matang), render 3D di `/assets/3d/`.
3. Terapkan satu perlakuan foto konsisten (full-color berbingkai kaca **atau** duotone navy–cyan).
4. Sediakan slot foto di tiap entri portofolio; surface angka 142.288 / 1.155 / 12 sebagai number-callout.
5. Pakai teks final dari PDF matang untuk semua section (terapkan koreksi §9); embed font Fontshare; jangan andalkan font sistem.

*Where Ideas Become Strategy — Senopati Institute · 2026.*
