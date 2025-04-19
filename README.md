# WhatsApp Bot dengan JavaScript

Bot WhatsApp ini menggunakan library `whatsapp-web.js` untuk berinteraksi dengan WhatsApp secara otomatis. Anda dapat mengonfigurasi bot untuk merespons pesan tertentu dengan mudah.

## Langkah-langkah Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan bot WhatsApp menggunakan Node.js.

### 1. Inisialisasi Proyek

Buat file `package.json` untuk mengonfigurasi proyek Anda dengan menjalankan perintah berikut di terminal:

```bash
npm init -y
```
### 2. Instalasi Library WhatsApp Bot
Selanjutnya, install library yang diperlukan untuk menjalankan WhatsApp Bot:

bash
Salin kode
```
npm install whatsapp-web.js qrcode-terminal

```
### 3. Buat File index.js
Buat file index.js di dalam direktori proyek Anda dan masukkan kode berikut
```js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inisialisasi client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true } // Set true untuk mode headless (tanpa GUI)
});

// Generate QR Code untuk login
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR code untuk login di atas!');
});

// Menunggu WhatsApp siap
client.on('ready', () => {
    console.log('Bot WhatsApp sudah siap!');
});

// Menanggapi pesan masuk
client.on('message', message => {
    console.log(`Pesan masuk: ${message.body}`);

    // Menanggapi pesan tertentu
    if (message.body === 'Halo') {
        message.reply('Halo, bagaimana kabarmu?');
    }

    if (message.body === 'Bot') {
        message.reply('Iya, saya adalah bot WhatsApp!');
    }
});

// Menjalankan client
client.initialize();

```
### 4. Jalankan Bot
Setelah semuanya siap, jalankan bot Anda dengan perintah berikut
```
node index.js
```
### 5. Scan QR Code
Saat pertama kali menjalankan bot, Anda akan diminta untuk memindai QR Code menggunakan aplikasi WhatsApp di ponsel Anda. Setelah berhasil scan, bot akan mulai berfungsi dan siap untuk merespons pesan.

## Fitur Bot
- QR Code: Untuk login, bot akan menampilkan QR code yang perlu dipindai menggunakan aplikasi WhatsApp.

- Pesan Otomatis: Bot dapat merespons pesan tertentu seperti "Halo" dan "Bot". Anda bisa menambah atau mengubah respons bot sesuai kebutuhan.

- Mode Headless: Bot dapat berjalan tanpa GUI (headless mode) untuk dijalankan di server atau lingkungan yang tidak mendukung antarmuka grafis.

## Konfigurasi
- Autentikasi Lokal: Bot menggunakan LocalAuth untuk menyimpan status login sehingga Anda tidak perlu memindai QR code setiap kali menjalankan bot.

- Puppeteer Mode: Set headless: true untuk menjalankan bot tanpa GUI atau set headless: false jika Anda ingin melihat antarmuka browser.

## Troubleshooting
Jika Anda menemui masalah, coba beberapa langkah berikut:

- Pastikan WhatsApp di ponsel Anda sudah terhubung dengan akun yang sama.

- Jika QR Code tidak muncul, pastikan browser Anda memiliki akses yang diperlukan untuk menampilkan antarmuka.

- Pastikan Node.js dan npm sudah terinstal dengan benar di sistem Anda.

## 📢 Sumber Daya
WhatsApp Web.js Documentation

Node.js

markdown
Salin
Edit

### Apa yang diubah?
1. Menambahkan **emoji** di berbagai bagian untuk membuat tampilan lebih menarik.
2. Mengorganisasi langkah-langkah instalasi dan fitur bot dalam format yang lebih mudah dibaca.
3. Menambahkan judul dan pembagian section dengan garis horizontal (---) agar lebih terstruktur.

Dengan tampilan ini, README Anda akan lebih informatif dan menarik bagi pembaca.