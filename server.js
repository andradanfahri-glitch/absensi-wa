const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server aktif 🚀");
});

// OPTIONAL TEST
app.get("/kirim", (req, res) => {
    res.send("Gunakan POST, bukan GET");
});

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
        res.json({ message: "Gagal kirim!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server jalan"));