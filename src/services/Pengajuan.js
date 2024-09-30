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
  if (Number.isInteger(id)) {
    dataPengajuan = await tb_pengajuan.find({ status: id });
  } else {
    dataPengajuan = await tb_pengajuan.find({ user: id });
  }
  return dataPengajuan;
};

const deleteDataPengajuan = async (id) => {
  await tb_pengajuan.deleteOne({ _id: id });
};

const kelompokanPengajuan = async (data) => {
  let acc = null;
  let acc2 = null;
  let acc3 = null;
  let idBefore = null;
  let idBefore2 = null;
  let data2 = [];

  // Mengiterasi data
  data.forEach((dt) => {
    if (idBefore && idBefore == dt.user) {
      acc = {
        nama3: dt.nama || "-",
        instansi3: dt.instansi || "-",
      }; // Update idBefore2
      idBefore = null;
    } else if (idBefore2 && idBefore2 == dt.user) {
      acc2 = {
        nama2: dt.nama || "-",
        instansi2: dt.instansi || "-",
      };
      idBefore = dt.user; // Update idBefore2
      idBefore2 = null;
    } else {
      if (acc || acc2 || acc3) {
        acc = {
          ...(acc || { nama3: "-", instansi3: "-" }),
          ...(acc2 || { nama2: "-", instansi2: "-" }),
          ...acc3,
        };
        data2.push(acc);
        acc3 = null;
        acc2 = null;
        acc = null;
      }
      acc3 = {
        id: dt.user,
        nama1: dt.nama,
        instansi1: dt.instansi,
      };
      idBefore2 = dt.user; // Update idBefore2
    }
  });
  if (acc || acc2 || acc3) {
    acc = {
      ...(acc3 || { nama3: "-", instansi3: "-" }),
      ...(acc2 || { nama2: "-", instansi2: "-" }),
      ...acc,
    };
    data2.push(acc);
    acc = null;
    acc2 = null;
    acc3 = null;
  }

  return data2;
};

const updateTambahStatus = async (id) => {
  console.log(id);
  const dataPengajuan = await user.findOne({ _id: id }, "status");
  const statusBaru = dataPengajuan.status + 1;
  await user.updateOne({ _id: id }, { $set: { status: statusBaru } });
  await tb_pengajuan.updateMany({ user: id }, { $set: { status: statusBaru } });
  return statusBaru;
};

const readDataPengajuanKabiro = async (status, id) => {
  console.log(id);
  const data = await tb_pengajuan.find({ biro: id, status: 3 });
  return data;
};

module.exports = {
  insertDataPengajuan,
  readDataPengajuan,
  deleteDataPengajuan,
  updateTambahStatus,
  kelompokanPengajuan,
  readDataPengajuanKabiro,
};
