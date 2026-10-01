mixin () {
  public query func getApiDoc() : async Text {
    "# API Backend PMKRI Makassar

Backend canister untuk situs PMKRI Makassar. Menyediakan penyimpanan pesan
kontak dari formulir situs dan notifikasi email ke pengurus.

## Metode Publik

### submitContactMessage(input : ContactMessageInput) : async ContactMessage

Mengirim pesan dari formulir kontak. Tidak memerlukan autentikasi; siapa pun
(termasuk pemanggil anonim) dapat memanggilnya.

- `input.name` : Text — nama pengirim, minimal 2 karakter setelah dipangkas.
- `input.email` : Text — alamat email pengirim.
- `input.message` : Text — isi pesan.

Pesan disimpan di canister dan notifikasi email dikirim ke pengurus. Nilai
kembalian adalah `ContactMessage` yang tersimpan, dengan `id` unik dan
`createdAt` dalam nanodetik Unix (waktu IC).

Catatan: saat ini validasi panjang nama hanya memengaruhi penyimpanan; pesan
tetap dikembalikan. Pengiriman email bersifat best-effort — kegagalan
pengiriman tidak menggagalkan pemanggilan.

### listContactMessages() : async [ContactMessage]

Mengembalikan seluruh pesan kontak yang tersimpan, sebagai query (read-only).
Tidak memerlukan autentikasi.

## Tipe Data

- `ContactMessageId` = Nat — pengenal unik pesan.
- `ContactMessage` = { id : ContactMessageId; name : Text; email : Text;
  message : Text; createdAt : Int }.
- `ContactMessageInput` = { name : Text; email : Text; message : Text }.
- `ContactMessageError` = { #invalidName; #invalidEmail; #invalidMessage;
  #emailDeliveryFailed : Text }.

## Autentikasi dan Otorisasi

Kedua metode publik (`submitContactMessage` dan `listContactMessages`) dapat
dipanggil tanpa masuk (sign-in). Tidak ada peran khusus yang diperlukan.

Frontend aplikasi ini menetapkan derivation origin Internet Identity, yang
dipublikasikan di `/.well-known/ii-derivation-origin` bila tersedia. Agen yang
sudah memegang otorisasi Internet Identity pengguna menurunkan principal
per-aplikasi yang benar terhadap origin tersebut (misalnya
`icp identity link web <name> --app <host>`). Delegasi semacam itu bertindak
dengan wewenang penuh pengguna di aplikasi ini sampai kedaluwarsa.

## Siklus Hidup dan Polling

`submitContactMessage` adalah update call dan selesai dalam satu panggilan;
tidak ada status perantara yang perlu dipolling. `listContactMessages` adalah
query call dan mengembalikan snapshot saat itu juga.

## Keamanan Pengulangan Mutasi

`submitContactMessage` tidak idempoten: setiap pemanggilan yang berhasil
membuat pesan baru dengan `id` baru dan mengirim email notifikasi tambahan.
Pemanggilan ulang karena percobaan ulang akan menghasilkan duplikat.

## Kesalahan dan Batasan

- `submitContactMessage` mengembalikan `ContactMessage`; kegagalan pengiriman
  email tidak dilaporkan sebagai error pada nilai kembalian.
- `listContactMessages` mengembalikan array kosong bila belum ada pesan.
- Tidak ada batas laju (rate limit) yang diterapkan pada backend.
";
  };
};
