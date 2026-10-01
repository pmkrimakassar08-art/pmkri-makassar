# Project Guidance

## User Preferences

- Latar belakang merah marun sebagai warna dasar situs
- Gunakan logo dan gambar latar yang diunggah pengguna
- Logo harus transparan tanpa latar belakang putih
- Desain sederhana dan bersih
- Navigasi hanya empat menu: Beranda, Tentang Kami, Kontak, Galeri
- Konten berbahasa Indonesia
- Aksen warna kuning dan hijau dari logo organisasi
- Nama organisasi ditampilkan lengkap sebagai 'Perhimpiunan Mahasiswa Katolik Republik Indonesia' dengan 'PMKRI' sebagai singkatan resmi
- Subjudul 'Sanctus Albertus Magnus' dan baris cabang 'Cabang Makassar' tampil di bawah nama organisasi pada hero dan footer
- Latar belakang halaman utama harus terang dan jelas: foto latar terlihat, lapisan gelap tipis saja, teks tetap terbaca

## Verified Commands

- **typecheck**: `mops check --fix`
- **build**: `mops build`

## Learnings

- caffeineai-email's sendServiceEmail can trap (not just return #err) when INTEGRATIONS_CANISTER_ID is unset; wrap best-effort email calls in try/catch at the call site so the public method still succeeds.
- With check-limit=1, two pending migration files fail the stable compatibility check; fold all changes into the latest pending file and delete the earlier pending one.
- mo:core Text.trim takes a Text.Pattern argument; calling trim() with no arguments is a compile error M0233.
- Uploaded attachments under .platform/attachments/ cannot be copied with cp (denied); use install -m 644 to place them into src/frontend/public/assets/.
- Biome rejects role="status" on a <p> and role="dialog" on a div; use aria-live="polite" and a native <dialog open> element instead.
- HomePage stub section functions can shadow real @/components versions; verify the page imports and renders the real components, not local duplicates.
- Removing a white background from a JPEG logo needs saturation-aware alpha: bright saturated colors (yellow) have high luminance, so a pure luminance ramp makes them semi-transparent. Use alpha=1 when saturation>=40 or luminance<=200, ramp only for near-white pixels.
- JPEG anti-aliasing leaves a 1px near-white ring outside dark artwork; erode alpha only for light pixels adjacent to a transparent pixel so the outline stays opaque and the halo drops out.
- The Gemma image inspector can report a transparent PNG as 'solid white' when it composites alpha onto white; ask specifically about the alpha channel/corners for a correct transparency reading.
- SITE.name di src/frontend/src/lib/site.ts adalah sumber utama nama organisasi dan menggerakkan navbar, hero h1, footer, copyright, dan alt logo; SITE.tagline memuat singkatan PMKRI.
- Setelah mengubah teks konten, test files di src/frontend/src/__tests__/ milik tester perlu diperbarui agar sesuai perilaku baru.
- Overlay latar hero dikendalikan oleh --gradient-hero-overlay di :root dan .dark pada src/frontend/src/index.css; menurunkan alpha tiap stop mencerahkan latar tanpa menyentuh lapisan foto.
- Saat overlay hero dicerahkan, keterbacaan judul dan tombol dijaga dengan text-shadow pada wrapper konten Hero.tsx, bukan dengan menambah lapisan gelap baru.
- Nama organisasi juga muncul hardcoded di gallery.ts, Hero.tsx, AboutSection.tsx, ContactSection.tsx, GallerySection.tsx, ValueCards.tsx, dan index.html; rename harus menyapu semua file ini, bukan hanya site.ts.
- Ejaan nama organisasi yang diminta pengguna adalah 'Perhimpiunan' (bukan 'Perhimpunan'); jangan 'memperbaiki' ejaan ini.
- Local preflight verified the renamed organization name renders in the navbar, hero heading, footer, and page title with PMKRI abbreviation intact.
- SITE.branch ('Cabang Makassar') di src/frontend/src/lib/site.ts adalah sumber tunggal baris cabang, dirender di bawah SITE.subtitle pada Hero.tsx dan Footer.tsx.
- SITE.subtitle ('Sanctus Albertus Magnus') dan SITE.branch ('Cabang Makassar') keduanya dirender di Hero dan Footer, jadi perubahan identitas cukup dari satu sumber.
- String 'PMKRI Makassar' tidak boleh muncul di konten halaman yang dirender; test suite menegakkan larangan ini.
- Local preflight verified the hero and footer render the organization name with 'Sanctus Albertus Magnus' and 'Cabang Makassar' stacked beneath it, PMKRI abbreviation intact.
