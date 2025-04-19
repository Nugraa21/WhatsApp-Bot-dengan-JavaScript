const { makeWASocket } = require("@whiskeysockets/baileys");
const { useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");
const natural = require("natural");
const qrcode = require("qrcode-terminal");
const path = require("path");

// File untuk menyimpan data pembelajaran
const DB_FILE = "database.json";

// Inisialisasi database
let database = {};
if (fs.existsSync(DB_FILE)) {
    try {
        database = JSON.parse(fs.readFileSync(DB_FILE));
    } catch (e) {
        console.error("Error membaca database.json:", e);
        database = {};
    }
}

// NLP - Tokenizer untuk pencocokan teks
const tokenizer = new natural.WordTokenizer();

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, // NONAKTIFKAN bawaan QR dari Baileys
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        if (update.qr) {
            // GUNAKAN QR dari qrcode-terminal
            qrcode.generate(update.qr, { small: true });
        }

        if (update.connection === "open") {
            console.log("✅ Bot berhasil terhubung ke WhatsApp!");
        }

        if (update.connection === "close") {
            console.log("❌ Koneksi terputus. Mencoba menyambung ulang...");
            startBot(); // Auto reconnect
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        console.log(`📩 Pesan dari ${sender}: ${text}`);

        // Perhitungan matematika
        let mathResult = handleMathCalculation(text);
        if (mathResult) {
            await sock.sendMessage(sender, { text: mathResult });
            return;
        }

        // Kirim gambar jika ada perintah
        if (text.startsWith("!gambar")) {
            const imagePath = path.join(__dirname, "media", "gambar1.jpg");
            if (fs.existsSync(imagePath)) {
                await sock.sendMessage(sender, {
                    image: fs.readFileSync(imagePath),
                    caption: "Ini gambar yang kamu minta!"
                });
            } else {
                await sock.sendMessage(sender, { text: "Maaf, gambar tidak ditemukan!" });
            }
            return;
        }

        // Fitur belajar (ajari | pertanyaan | jawaban)
        if (text.startsWith("ajari |")) {
            const parts = text.split("|").map(part => part.trim());
            if (parts.length === 3) {
                const question = parts[1];
                const answer = parts[2];
                learnNewResponse(question, answer);
                await sock.sendMessage(sender, { text: "✅ Aku sudah belajar jawaban baru!" });
            } else {
                await sock.sendMessage(sender, { text: "Format salah! Gunakan: ajari | pertanyaan | jawaban" });
            }
            return;
        }

        // Cek jawaban dari database
        let response = getBestResponse(text);
        if (response) {
            await sock.sendMessage(sender, { text: response });
        } else {
            await sock.sendMessage(sender, { text: "Aku belum tahu jawabannya. Bisa ajari aku? (Format: ajari | pertanyaan | jawaban)" });
        }
    });
}

// Fungsi hitung matematika
function handleMathCalculation(text) {
    const mathExp = /(\d+)\s*([+\-*/])\s*(\d+)/.exec(text);
    if (mathExp) {
        const num1 = parseFloat(mathExp[1]);
        const operator = mathExp[2];
        const num2 = parseFloat(mathExp[3]);

        let result;
        switch (operator) {
            case "+": result = num1 + num2; break;
            case "-": result = num1 - num2; break;
            case "*": result = num1 * num2; break;
            case "/": result = num2 !== 0 ? num1 / num2 : "Error: Tidak bisa dibagi 0"; break;
            default: result = "Operator tidak valid!"; break;
        }
        return `🧮 Hasil: ${result}`;
    }
    return null;
}

// Fungsi untuk mencari jawaban terbaik
function getBestResponse(input) {
    let bestMatch = null;
    let highestSimilarity = 0;

    Object.keys(database).forEach((question) => {
        let similarity = natural.JaroWinklerDistance(input.toLowerCase(), question.toLowerCase());
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestMatch = question;
        }
    });

    return highestSimilarity > 0.7 ? database[bestMatch] : null;
}

// Fungsi belajar
function learnNewResponse(question, answer) {
    database[question] = answer;
    fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2));
}

// Mulai bot
startBot();
