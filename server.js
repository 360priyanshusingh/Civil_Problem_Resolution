const express = require('express')
const app = express();
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto= require('crypto')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const AdminModel=require("./models/AdminModel")
const AdminRouter=require("./routers/AdminRouter")
const UserModel=require("./models/UserModel")
const UserRouter=require("./routers/UserRouter");
const ProblemModel = require('./models/ProblemModel');
const FeedBackModel = require('./models/FeedBackModel');
const ContactModel = require('./models/ContactModel');

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'));
app.use(cors());
 
mongoose.connect('mongodb+srv://upscpriyanshu06:Priyanshu%40123@cluster0.6ua5tlk.mongodb.net/mydatabase?retryWrites=true&w=majority')


app.use('/admin',AdminRouter)
app.use('/user',UserRouter)


app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
// app.get("/",async(req,res)=>{
//     res.json("Priyanshu server startted")
// })

const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`Server start at PORT ${PORT}`);
});
