const { tb_pengajuan } = require("../models/Pengajuan.js");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

const insertDataPengajuan = async (data) => {
  //upload.single("foto");
  await tb_pengajuan.insertMany(data);
  return { succes: true, message: `Berhasil Menambahkan ${data.nama}` };
};

module.exports = { insertDataPengajuan };
