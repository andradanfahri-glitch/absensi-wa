const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// test server
app.get("/", (req, res) => {
  res.send("Server aktif 🚀");
});

// test WA
app.get("/test-wa", async (req, res) => {
  try {
    const r = await axios.post("https://api.fonnte.com/send", {
      target: "6285784117242",
      message: "Test WA 🚀"
    }, {
      headers: {
        Authorization: "dNnddRHMv4BUGoXnbLFY"
      }
    });

    res.json(r.data);
  } catch (e) {
    res.json(e.response?.data || e.message);
  }
});

// kirim absensi
app.post("/kirim", async (req, res) => {
  const { nama, nip, foto, lokasi } = req.body;

  try {
    const pesan = `
Absensi Karyawan
Nama: ${nama}
NIP: ${nip}
Lokasi: ${lokasi}
`;

    await axios.post("https://api.fonnte.com/send", {
      target: "6285784117242",
      message: pesan,
      file: foto // 🔥 INI YANG FIX FOTO
    }, {
      headers: {
        Authorization: "dNnddRHMv4BUGoXnbLFY"
      }
    });

    res.json({ message: "Absensi berhasil!" });

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.json({
      message: "Gagal: " + (err.response?.data?.reason || err.message)
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server jalan 🚀");
});
