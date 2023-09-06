const Admin = require("../Model/Admin.model");
const User=require('../Model/User.model.js');
const bcrypt = require("bcryptjs");

//signup admin
const createAdmin= async(req,res)=>{
    try {
      const { username, email, password } = req.body;
      //check if admin exist or not
      const adminFound = await Admin.find({ email });
      if (adminFound) {
        return res.status(400).json({
          status: "failed",
          message: "User already Found, please login",
        });
      }
      //generate salt
      const salt = await bcrypt.genSalt(10);
      //hasing password
      const hashPassword = await bcrypt.hash(password, salt);

      //create into database
      const admin = await Admin.create({
        username,
        email,
        password:hashPassword,
      });
      res.status(201).json({
        status: "success",
        msg: "data saved successfully",
        data: admin,
      });
    } catch (error) {
        console.log("Error while creating Admin into database " + error.message);
        res.status(500).json({
          status: "error",
          msg: "Internal server error",
        });
    }
}

//login Admin
const loginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //find the admin
        const adminFound=await Admin.findOne({email});
        //check for email
        if(!adminFound){
            return res.json({
                status:"failed",
                message:"Invalid User Input"
            })
        }
        //compare for password
        const isValidPassword=await bcrypt.compare(password,adminFound.password);
        if(!isValidPassword){
            return res.json({
              status: "failed",
              message: "Invalid User Input",
            });
        }
        //save the loginUser details into session
         req.session.loginUser=adminFound;  
         res.json({
          status:"success",
          message:"admin login successfully",
         })


    } catch (error) {
        console.log(
          "Error while login Admin " + error.message
        );
        res.status(500).json({
          status: "error",
          msg: "Internal server error",
        });
    }
}

//logout admin
const logoutAdmin=async(req,res)=>{
    req.session.destroy();
    res.json({
      status:"success",
      message:"Admin loggedout successfully"
  })
}
module.exports={
    createAdmin,
    loginAdmin,
    logoutAdmin,
}