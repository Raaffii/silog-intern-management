const mongoose = require("mongoose");

require("../../utils/db");

const tb_pengajuan = mongoose.model("tb_pengajuan", {
  nama: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
  nip: {
    type: String,
  },
  instansi: {
    type: String,
  },
  jurusan: {
    type: String,
  },
  fakultas: {
    type: String,
  },
  tanggalmulai: {
    type: Date,
  },
  tanggalselesai: {
    type: Date,
  },
  telp: {
    type: String,
  },
  email: {
    type: String,
  },
  minat: {
    type: String,
  },
  tanggalMulai: {
    type: String,
  },
  tanggalSelesai: {
    type: String,
  },
  ktp: {
    type: String,
  },
  foto: {
    type: String,
  },
  ktm: {
    type: String,
  },
  proposal: {
    type: String,
  },
  asuransi: {
    type: String,
  },
});

module.exports = { tb_pengajuan };
