const mongoose = require("mongoose");

require("../../utils/db");

const tb_pengajuan = mongoose.model("tb_pengajuan", {
  nama: {
    type: String,
    required: true,
  },
  nip: {
    type: String,
  },
  ktp: {
    type: String,
  },
  foto: {
    type: String,
  },
});

module.exports = { tb_pengajuan };
