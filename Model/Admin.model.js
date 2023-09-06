const mongoose=require('mongoose');

//admin Schema
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
//admin model
const Admin=mongoose.model('Admin',adminSchema);

module.exports=Admin;

