const express = require("express");
const routerMahasiswa = express.Router();
const { tampilDashboard, deleteDashboard, tampilDetailDokumen } = require("../controllers/Mahasiswa.js");

const { submitPengajuan, uploadFile, handleMulterErrorController, ajukanPengajuan } = require("../controllers/Pengajuan.js");

routerMahasiswa.get("/dashboard/:jenis/:namaFile", tampilDetailDokumen);
routerMahasiswa.get("/dashboard", tampilDashboard);
routerMahasiswa.post("/dashboard/:username", ajukanPengajuan);
routerMahasiswa.post("/dashboard", uploadFile, handleMulterErrorController, submitPengajuan);
routerMahasiswa.delete("/dashboard", deleteDashboard);

module.exports = routerMahasiswa;
