const express=require('express');
const Admin = require('../Model/Admin.model');
const { createAdmin, loginAdmin, logoutAdmin } = require("../Controller/adminController");

const adminRoute=express.Router();

// signup admin
adminRoute.post('/create',createAdmin);

//login admin
adminRoute.post("/login", loginAdmin);

//logout admin
adminRoute.get("/logout", logoutAdmin);

module.exports=adminRoute;