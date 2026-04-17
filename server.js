const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.post("/kirim", async (req, res) => {
    const { nama, nip, foto } = req.body;

    try {
        await axios.post("https://api.fonnte.com/send", {
            target: "6285784117242",
            message: `Absensi Karyawan\nNama: ${nama}\nNIP: ${nip}`,
            image: foto
        }, {
            headers: {
                Authorization: "TOKEN_KAMU"
            }
        });

        res.json({ message: "Absensi berhasil dikirim!" });
    } catch (error) {
        res.json({ message: "Gagal kirim!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server jalan"));