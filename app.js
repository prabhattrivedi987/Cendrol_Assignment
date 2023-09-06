require('dotenv').config();
require('./Config/dbConnect');
const express=require('express');
const path=require('path');
const Route=require('./Routes/User.Routes');
const User=require('./Model/User.model.js');
const adminRoute = require('./Routes/Admin.Route');
const MongoStore = require("connect-mongo");
const session = require("express-session");


const app=express();

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middleare or body-pasring
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

//session configuration
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, //1 day
    }),
  })
);


//Routes
app.use('/api/v1/users',Route);

app.use('/api/v1/admin',adminRoute);



//testing model

// const newUser=new User(
//     {
//         name:"prabhat",
//         email:"Prabhat@gmail.com",
//         mobile:978585655,
//         profile:"xyz",
//         password:"12345"
//     }
// );

// newUser.save()
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log('error');
// })

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})