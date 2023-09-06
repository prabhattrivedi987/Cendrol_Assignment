const express=require('express');
const {
  createUser,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
} = require("../Controller/userController");
const protected=require('../middleware/protected');


const Route=express.Router();

//create user into database
Route.post('/create',protected,createUser);

//get all users
Route.get('/all',protected,allUser);

//get single user
Route.get('/:id',protected,singleUser);

//upadte user
Route.patch('/update/:id',protected,updateUser);

//delete user
Route.delete('/:id',protected,deleteUser);


module.exports=Route;