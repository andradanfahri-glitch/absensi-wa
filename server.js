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
// TEST WHATSAPP LANGSUNG
// ======================
app.get("/test-wa", async (req, res) => {
    try {
        await axios.post("https://api.fonnte.com/send", {
            target: "6285784117242",
            message: "Test WA dari server 🚀"
        }, {
            headers: {
                Authorization: "uSbMYhkBRf2kjV3w6yqC"
            }
        });

        res.send("WA berhasil dikirim!");
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.send("Error: " + (error.response?.data?.reason || error.message));
    }
});

// ======================
// KIRIM DARI WEBSITE
// ======================
app.post("/kirim", async (req, res) => {
    const { nama, nip, foto } = req.body;

    try {
        await axios.post("https://api.fonnte.com/send", {
            target: "6285784117242",
            message: `Absensi Karyawan\nNama: ${nama}\nNIP: ${nip}`,
            image: foto
        }, {
            headers: {
                Authorization: "uSbMYhkBRf2kjV3w6yqC"
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
