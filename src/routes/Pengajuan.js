const express = require("express");
const routerPengajuan = express.Router();
const {
  submitPengajuan,
  uploadFile,
  handleMulterErrorController,
} = require("../controllers/Pengajuan.js");

routerPengajuan.post(
  "/submit",
  uploadFile,
  handleMulterErrorController,
  submitPengajuan
);

module.exports = routerPengajuan;
