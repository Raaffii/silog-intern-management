const express = require("express");
const routerKabiro = express.Router();
const { tampilDashboard, viewDashboard, tampilEdit, tambahDataKabiro } = require("../controllers/Admin.js");
const { konfirmasiPengajuanAdmin, accKabiro } = require("../controllers/Pengajuan.js");

routerKabiro.get("/dashboard/:id", viewDashboard);
routerKabiro.post("/dashboard/:id", konfirmasiPengajuanAdmin);
routerKabiro.get("/dashboard", tampilDashboard);
routerKabiro.post("/acckabiro/:id", accKabiro);
routerKabiro.get("/edit", tampilEdit);
routerKabiro.post("/edit", tambahDataKabiro);

module.exports = routerKabiro;
