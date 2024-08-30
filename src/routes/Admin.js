const express = require("express");
const routerAdmin = express.Router();
const { tampilDashboard } = require("../controllers/Admin.js");

routerAdmin.get("/dashboard", tampilDashboard);
module.exports = routerAdmin;
