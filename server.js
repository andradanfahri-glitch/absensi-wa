const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "15mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server aktif 🚀");
});

app.post("/kirim", async (req, res) => {
  const { nama, nip, foto, lokasi } = req.body;

  try {
    // 🔥 CONVERT BASE64 KE BUFFER
    const base64Data = foto.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const pesan = `
Absensi Karyawan
Nama: ${nama}
NIP: ${nip}
Lokasi: ${lokasi}
`;

    // 🔥 KIRIM SEBAGAI FORM DATA
    const FormData = require("form-data");
    const form = new FormData();

    form.append("target", "6285784117242");
    form.append("message", pesan);
    form.append("file", buffer, {
      filename: "foto.jpg",
      contentType: "image/jpeg"
    });

    await axios.post("https://api.fonnte.com/send", form, {
      headers: {
        ...form.getHeaders(),
        Authorization: "dNnddRHMv4BUGoXnbLFY"
      }
    });

    res.json({ message: "Absensi berhasil + foto terkirim!" });

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
