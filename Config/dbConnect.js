const mongoose=require('mongoose');

const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('database connected');
    } catch (error) {
        console.log('database not connected'+error.message);
    }
}
module.exports=dbConnect();