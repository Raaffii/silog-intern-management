const { tb_pengajuan } = require("../models/Pengajuan.js");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

const insertDataPengajuan = async (data) => {
  //upload.single("foto");
  await tb_pengajuan.insertMany(data);
  return { succes: true, message: `Berhasil Menambahkan ${data.nama}` };
};

const readDataPengajuan = async (id) => {
  dataPengajuan = await tb_pengajuan.find({ user: id });
  return dataPengajuan;
};

module.exports = { insertDataPengajuan, readDataPengajuan };
