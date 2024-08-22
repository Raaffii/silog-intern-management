const express = require('express')
const routerMahasiswa = express.Router()
const { tampilDashboard } = require("../controllers/Mahasiswa.js")


routerMahasiswa.get("/dashboard", tampilDashboard)


module.exports = routerMahasiswa