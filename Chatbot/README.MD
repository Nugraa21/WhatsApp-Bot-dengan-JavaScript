# Chatbot Project - Rasa Framework

This project is a chatbot built using the Rasa framework, designed to perform basic conversation and interactions. The goal is to build an AI-driven assistant that can engage with users through natural language understanding.

## Features

- Natural Language Processing (NLP) to understand user intents.
- Ability to handle dynamic conversations.
- Integration with external APIs (if applicable).
- Customizable actions and responses.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Python 3.7 or higher](https://www.python.org/downloads/)
- [Pip](https://pip.pypa.io/en/stable/)
- [Rasa](https://rasa.com/)

## Installation

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/chatbot-project.git
   cd chatbot-project
    ```


2. Buat lingkungan virtual
   ```bash
    python -m venv venv
    source venv/bin/activate  # Di Windows, gunakan `venv\Scripts\activate`
    ```
2. Instal dependensi yang diperlukan
   ```bash
    pip install -r requirements.txt
    ```

## Menjalankan Chatbot

>Untuk memulai server Rasa, jalankan
```bash
rasa run

```

>Untuk melatih model
```bash
rasa train

```

>Untuk berinteraksi dengan chatbot melalui command line interface (CLI)
```bash
rasa shell

```

>Untuk memulai server API REST untuk integrasi dengan layanan lain
```bash
rasa run --enable-api

```
>Untuk mengakses chatbot melalui antarmuka web chat (jika diterapkan)
```bash
rasa run --cors "*"  # Ini memungkinkan semua domain terhubung ke server.

```

## Aksi Kustom

Proyek ini mencakup aksi kustom untuk respon yang lebih dinamis dan interaktif. Aksi ini didefinisikan dalam file actions.py. Untuk mengubah aksi-aksi ini, sesuaikan file ini sesuai kebutuhan.

>Untuk menjalankan server aksi kustom
```bash
rasa run actions

```
### Contoh Aksi Kustom

```python
from rasa_sdk import Action
from rasa_sdk.events import SlotSet

class ActionCheckWeather(Action):
    def name(self) -> str:
        return "action_check_weather"

    def run(self, dispatcher, tracker, domain):
        # Panggil API eksternal untuk mendapatkan data cuaca (jika ada)
        dispatcher.utter_message(text="Cuaca saat ini cerah.")
        return []

```

# Lisensi
>Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detail lebih lanjut.

## Kontribusi
>Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori dan kirimkan pull request. Pastikan untuk mengikuti gaya kode dan konvensi yang telah digunakan di proyek ini.

## Pemecahan Masalah
>Masalah: Rasa tidak mengenali entitas dengan benar.
Solusi: Periksa file nlu.mduntuk contoh pelatihan entitas yang benar dan perbarui data pelatihan jika diperlukan.

>Masalah: Aksi kustom tidak dijalankan.
Solusi: Pastikan server aksi sedang berjalan dan periksa adanya kesalahan pada file actions.py