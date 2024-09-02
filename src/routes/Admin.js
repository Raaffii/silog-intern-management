const express = require("express");
const routerAdmin = express.Router();
const { tampilDashboard, viewDashboard } = require("../controllers/Admin.js");

routerAdmin.get("/dashboard/:id", viewDashboard);
routerAdmin.get("/dashboard", tampilDashboard);

module.exports = routerAdmin;
