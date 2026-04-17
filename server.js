const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// ======================
// TEST SERVER
// ======================
app.get("/", (req, res) => {
    res.send("Server aktif 🚀");
});

// ======================
// INFO ROUTE
// ======================
app.get("/kirim", (req, res) => {
    res.send("Gunakan POST untuk kirim data");
});

// ======================
// TEST WHATSAPP
// ======================
app.get("/test-wa", async (req, res) => {
    try {
        const result = await axios.post("https://api.fonnte.com/send", {
            target: "6285784117242",
            message: "Test WA dari server 🚀"
        }, {
            headers: {
                Authorization: "dNnddRHMv4BUGoXnbLFY"
            }
        });

        res.json(result.data);

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.json(error.response?.data || error.message);
    }
});

// ======================
// KIRIM ABSENSI + GPS
// ======================
app.post("/kirim", async (req, res) => {
    const { nama, nip, foto, lokasi } = req.body;

    try {
        const pesan = `
Absensi Karyawan
Nama: ${nama}
NIP: ${nip}
Lokasi: ${lokasi || "Tidak tersedia"}
        `;

        await axios.post("https://api.fonnte.com/send", {
            target: "6285784117242",
            message: pesan,
            image: foto
        }, {
            headers: {
                Authorization: "dNnddRHMv4BUGoXnbLFY"
            }
        });

        res.json({ message: "Absensi berhasil dikirim!" });

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.json({
            message: "Gagal kirim: " + (error.response?.data?.reason || error.message)
        });
    }
});

// ======================
// PORT
// ======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server jalan 🚀"));
