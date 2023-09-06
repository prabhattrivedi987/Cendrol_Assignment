const User=require('../Model/User.model.js');
const bcrypt=require('bcryptjs');


//create user into database
const createUser=async(req, res) => {
    try {
      // console.log(req.body);
      const {name,email,mobile,profile,password}=req.body;
    //check if user exist or not
      const userFound= await User.find({email});
      if(!userFound){
        return res.status(400).json({
        status:"failed",
        message:"User already Found"
      });
    }
    //generate salt
      const salt=await bcrypt.genSalt(10);
    //hasing password
      const hashPassword=await bcrypt.hash(password,salt);
    //save into database
      const user=await User.create({
        name,email,mobile,profile,
        password:hashPassword,
      })
      res.status(201).json({
        status:"success",
        msg:"data saved successfully",
        data:user,
      });
    } catch (error) {
        console.log('Error while creating data into database '+error.message);
        res.status(500).json({
          status: "error",
          msg: "Internal server error",
      })
    };
}

//fetching all user 
const allUser=async(req,res)=>{
  try {
    const users=await User.find({});
    res.status(200).json({
      status:"success",
      message:"data fetched successfully",
      users:users.length,
      data:users,
    })
  } catch (error) {
    console.log("Error while fetching data " + error.message);
    res.status(500).json({
      status: "error",
      msg: "Internal server error",
    });
  }
}

//fetching one user
const singleUser=async(req,res)=>{
  try {
    const user=await User.findById(req.params.id);
    res.status(200).json({
      ststus:"success",
      message:"data fetched successfully",
      data:user,
    })
  } catch (error) {
    console.log("Error while fetching single data " + error.message);
    res.status(500).json({
      status: "error",
      msg: "Internal server error",
    });
  }
}

//update user 
const updateUser=async(req,res)=>{
  try {
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    res.status(202).json({
      ststus: "success",
      message: "data fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error while updating user data " + error.message);
    res.status(204).json({
      status: "failed",
      msg: "user data not found",
    });
  }
}

//delete user
const deleteUser=async(req,res)=>{
  try {
    const deletedUser=await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      ststus: "success",
      message: "data deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log("Error while deleting user data " + error.message);
    res.status(500).json({
      status: "failed",
      msg: "Internal server error",
    });
  }
}
module.exports = {
  createUser,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
};
