# Prompt untuk Claude Code — Revisi Web Profil Senopati (Interaktif)

> Tempatkan `Senopati-Profile_Design-Brief.md` di folder proyek, lalu tempel prompt di bawah ke Claude Code.

---

## KONTEKS & TUJUAN
Revisi/bangun situs **"Profil Lembaga Senopati Institute"** menjadi **satu halaman web interaktif (scrollytelling)** yang premium, *playful* namun profesional: objek 3D kaca melayang berlapis (parallax), efek scroll & hover, dan **dolly-zoom hero**. Versi **cetak A4 (15 halaman)** tetap keluar dari file yang sama via `@media print`.

## LANGKAH 0 — BACA DULU
Baca `Senopati-Profile_Design-Brief.md` secara menyeluruh. Itu **sumber kebenaran**: token warna, font, struktur 15 section, copy final 6 portofolio, kutipan tokoh, dan daftar aset (A/R/F-series). Gunakan teks final + terapkan **koreksi QA §9** ("saran" bukan "sran"; "didesain"; "pengambilan keputusan" huruf kecil).

## STACK & ATURAN
- Vanilla: `index.html` + `style.css` + `main.js`. Tanpa framework. **Tanpa localStorage.**
- CDN: **Lenis** (smooth scroll) + **GSAP + ScrollTrigger**.
- Font **Fontshare**: Clash Display + Switzer + Space Mono (embed via `<link>`).
- Animasikan **hanya `transform`/`opacity`**; pakai `will-change`.

## STRUKTUR FOLDER & ASET
Buat **manifest**. Jika aset belum ada, pakai **placeholder berlabel** dengan **nama file yang benar** agar mudah ditukar — jangan data URI besar.
```
/index.html /style.css /main.js
/assets/3d/      a1-emblem.png a2-crystal.png a3-globe.png a4-icon-*.png a5-bidang-*.png
/assets/render/  r1-cover.png … r10-penutup.png
/assets/float/   f1-emblem.png f2-crystal.png … f10-laptop.png   (PNG TRANSPARAN)
/assets/photos/  cover.jpg tentang.jpg latar.jpg … p1-ai.jpg … p6-kartini.jpg team.jpg mou.jpg
/assets/fx/      grain.png glow.png particle.png
```

## STRUKTUR 15 SECTION (ritme gelap–terang, brief §6)
cover(dark) · tentang(light) · latar(dark) · visi-misi(dark) · nilai(dark) · legalitas(light) · bidang(light) · layanan(light) · struktur(light) · kemitraan(dark) · rekam-jejak ×3 (6 entri portofolio) · penutup(dark) · footer(dark).
Kutipan di **Tentang** (Bacon), **Layanan** (Malcolm X), **Kemitraan** (Newton), **Penutup** (Churchill).
Angka callout: **142.288** (AI Readiness), **1.155** & **12** (Riset Ketahanan Pangan).

## INTERAKSI — WAJIB
- Smooth scroll (Lenis) fondasi semua efek.
- Reveal bertahap (stagger) saat section masuk viewport.
- Parallax: `.float[data-speed]` → `y = progress * speed`.
- **Dolly-zoom hero** (brief §11): pin cover; bg `scale 1→1.35` + blur, subjek `1.2→1`, `perspective`.
- **Count-up** angka saat callout masuk layar.
- Hover **tilt 3D** pada kartu (rotateX/Y dari kursor + perspective; reset on leave).
- **Magnetic button** + **zoom-in-frame** pada foto (overflow hidden).
- **Idle drift** emblem & partikel (yoyo loop).

### NICE-TO-HAVE
Pinned portfolio, glow-follow di kartu gelap, transisi tema dark↔light, custom cursor halus.

## FLOATING SYSTEM
F-series sebagai `.float` absolute per section dengan `data-speed` berbeda; beberapa drift idle; objek tema melayang di section terkait (mis. `f6-controller` di esports, `f8` di safe house).

## CETAK/PDF
`@media print` → matikan animasi & smooth scroll; tiap section jadi A4 (210×297mm) dengan `page-break-after`; background-graphics ON. Uji **Print → Save as PDF** (15 halaman rapi).

## AKSESIBILITAS & PERFORMA
Hormati `prefers-reduced-motion` (matikan semua tween). Lazy-load gambar berat. Target 60fps. Responsif: `<680px` reduce efek berat. Semantic HTML + alt text.

## DEFINITION OF DONE
1. 15 section terisi copy final.
2. Semua efek wajib jalan & mulus.
3. Responsif mobile.
4. `prefers-reduced-motion` & print fallback berfungsi.
5. Manifest aset jelas.
6. Konsol bersih (tanpa error).

## PENDEKATAN BERTAHAP (tunjukkan hasil tiap tahap)
a) scaffold + token + Lenis/GSAP → b) isi 15 section + copy → c) interaksi inti → d) floating + polish → e) print CSS + reduced-motion.
