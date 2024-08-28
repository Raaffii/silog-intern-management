const { tb_pengajuan } = require("../models/Pengajuan.js");
const { user } = require("../models/User.js");
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

const deleteDataPengajuan = async (id) => {
  await tb_pengajuan.deleteOne({ _id: id });
};

const updateTambahStatus = async (id) => {
  const dataPengajuan = await user.findOne({ _id: id }, "status");
  const statusBaru = (await dataPengajuan.status) + 1;
  await user.updateOne({ _id: id }, { $set: { status: statusBaru } });
  await tb_pengajuan.updateMany({ user: id }, { $set: { status: statusBaru } });
  return statusBaru;
};

module.exports = {
  insertDataPengajuan,
  readDataPengajuan,
  deleteDataPengajuan,
  updateTambahStatus,
};
