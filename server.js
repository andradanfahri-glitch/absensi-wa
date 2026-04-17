const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// test
app.get("/", (req, res) => {
  res.send("Server aktif 🚀");
});

// kirim
app.post("/kirim", async (req, res) => {
  const { nama, nip, foto, lokasi } = req.body;

  try {
    const pesan = `
Absensi Karyawan
Nama: ${nama}
NIP: ${nip}
Lokasi: ${lokasi}
Foto: ${foto}
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

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.json({ message: "Gagal kirim!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server jalan 🚀"));
