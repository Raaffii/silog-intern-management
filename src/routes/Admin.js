const express = require("express");
const routerAdmin = express.Router();
const {
  tampilDashboard,
  viewDashboard,
  tampilEdit,
  tambahDataKabiro,
} = require("../controllers/Admin.js");
const { konfirmasiPengajuanAdmin } = require("../controllers/Pengajuan.js");

routerAdmin.get("/dashboard/:id", viewDashboard);
routerAdmin.post("/dashboard/:id", konfirmasiPengajuanAdmin);
routerAdmin.get("/dashboard", tampilDashboard);
routerAdmin.get("/edit", tampilEdit);
routerAdmin.post("/edit", tambahDataKabiro);

module.exports = routerAdmin;
