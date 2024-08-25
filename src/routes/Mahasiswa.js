const express = require("express");
const routerMahasiswa = express.Router();
const { tampilDashboard } = require("../controllers/Mahasiswa.js");
const {
  submitPengajuan,
  uploadFile,
  handleMulterErrorController,
} = require("../controllers/Pengajuan.js");

routerMahasiswa.get("/dashboard", tampilDashboard);
routerMahasiswa.post(
  "/dashboard",
  uploadFile,
  handleMulterErrorController,
  submitPengajuan
);

module.exports = routerMahasiswa;
