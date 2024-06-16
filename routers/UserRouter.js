const express = require('express')
const app = express();
const router=express.Router();
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto= require('crypto')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const AdminModel = require('../models/AdminModel');
const UserModel = require('../models/UserModel');
const FeedBackModel = require('../models/FeedBackModel');
const ProblemModel = require('../models/ProblemModel');
const ContactModel = require('../models/ContactModel');



app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
    }));


    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, 'public/images')
      },
      filename: (req, file, cb) => {
          cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
      }
    })
    
    const upload = multer({
        storage: storage
    })
    
    const verifyuser= async (req,res,next)=>{
        // console.log(req.cookies)
        const token=req.cookies.Token;
        // console.log(token)
        if(!token){
           return res.json({Error:"The token was not available"})
        }else{
         jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
        if(err){
         console.error(err)
         return res.json({Error:"Token is  wrong"})
        }
        // console.log(decoded);
        req.role=decoded.role;
        req.user=decoded.user
        req.id=decoded.id
        next()
    
       })
    
        }
    }
    
    router.post("/signup",upload.single("pic"),async(req,res)=>{
        const pic = req.file ? req.file.filename : null;  
    
       const {name,email,password,idcard,contact,city,address}=req.body
    
       UserModel.create({name,email,password,pic,idcard,contact,city,address})
       .then((result)=>{
        res.json({message:"User SuccessFully Created",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry User SuccessFully not Created",error})
       })
        
    })
    router.post("/createContact",async(req,res)=>{
    
       const {fname,lname,email,contact,subject}=req.body

       ContactModel.create({fname,lname,email,contact,subject})
       .then((result)=>{
        res.json({message:"Contact SuccessFully Created",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry User SuccessFully not Created",error})
       })
        
    })
    router.post("/createFeedback",async(req,res)=>{
    
       const {userId,msg,problemId}=req.body
       FeedBackModel.create({userId,msg,problemId})
       .then((result)=>{
        res.json({message:"FeedBack SuccessFully Created",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry FeedBack SuccessFully not Created",error})
       })
        
    })

    router.post('/login',async(req,res)=>{
        const {idcard,password} =req.body
         
        UserModel.findOne({idcard}).
        then((data)=>{
         if(!data){
             return res.json({error:"Sorry User not exit"})
         }
         if(data && data.password!=password){
             return res.json({error:"Sorry your password is wrong !"})
         }
         if(data && data.status!="Accept"){
           return res.json({message:"User login Unsuccesfully deo to status!"}) 
         }
     
         const token = jwt.sign(
             { role : 'user',user:data,id:data._id},
             "jwt-secret-key",
             { expiresIn:"1d" }
          )
     
          res.cookie('Token',token);
          console.log(token)
          res.json({Succes:"User login Succesfully !",data,token}) 
     
        })
        .catch((error)=>{
          res.json({message:"User login Unsuccesfully !",error}) 
        })
     
     
     
     })

     router.get('/logout',async(req,res)=>{
        res.clearCookie('Token');
        console.log(res.cookies)
        return res.json( {Status: 'Logout successful'});
    
    }) 

    router.get('/home',verifyuser,(req,res)=>{
        return res.json({Status:"Success" , role:req.role , user:req.user,})
    })

    router.get('/getPendingUser',async(req,res)=>{

         const keyword = req.query.search ? {
            $or:[
              {name:{$regex : req.query.search,$options:"i"}},
              {email:{$regex : req.query.search,$options:"i"}},
              {idcard:{$regex : req.query.search,$options:"i"}},
              {contact:{$regex : req.query.search,$options:"i"}},
              {address:{$regex : req.query.search,$options:"i"}},
              {city:{$regex : req.query.search,$options:"i"}},
            ],
          } :{} ;
    
        UserModel.find(keyword).find({status:"Pending"}).
        then((result)=>{
            res.json({message:"We get all user",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
    router.get('/getAllContact',async(req,res)=>{
        ContactModel.find({}).
        then((result)=>{
            res.json({message:"We get all Contact",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
    router.get('/getAllUser',async(req,res)=>{
        UserModel.find({}).
        then((result)=>{
            res.json({message:"We get all user",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
    router.delete('/deleteContact/:id',async(req,res)=>{
        const id=req.params.id
   
        ContactModel.findByIdAndDelete(id).
        then((result)=>{
            res.json({message:"Contact SuccessFully Delete",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
    router.delete('/deleteUser/:id',async(req,res)=>{
        const id=req.params.id
   
        UserModel.findByIdAndDelete(id).
        then((result)=>{
            res.json({message:"User SuccessFully Delete",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
    router.delete('/deleteFeedBack/:id',async(req,res)=>{
        const id=req.params.id
   
        FeedBackModel.findByIdAndDelete(id).
        then((result)=>{
            res.json({message:"Feedback SuccessFully Delete",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })

    router.put('/updateProfile/:id',upload.single("pic"),verifyuser,async(req,res)=>{
        
        const id=req.params.id
        const pic = req.file ? req.file.filename : req.user.pic;  
        const {name,email,contact,idcard,address,city}=req.body

        UserModel.findByIdAndUpdate(id,{name,email,pic,contact,idcard,address,city}).
        then((result)=>{
            res.json({message:"User Profile Update",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })

    router.put('/updateUserStatus/:id',async(req,res)=>{
        const id=req.params.id
        const {status}=req.body

        UserModel.findByIdAndUpdate(id,{status:status}).
        then((result)=>{
            res.json({message:"User Status Update",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
    router.get('/getuser/:id',async(req,res)=>{
        const id=req.params.id
    
        UserModel.findById(id).
        then((result)=>{
            res.json({message:"We get all user",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
    router.get('/searchUser',async(req,res)=>{

        const keyword = req.query.search ? {
            $or:[
              {name:{$regex : req.query.search,$options:"i"}},
              {email:{$regex : req.query.search,$options:"i"}},
              {idcard:{$regex : req.query.search,$options:"i"}},
              {contact:{$regex : req.query.search,$options:"i"}},
              {address:{$regex : req.query.search,$options:"i"}},
              {city:{$regex : req.query.search,$options:"i"}},
            ],
          } :{} ;
    
        UserModel.find(keyword).
        then((result)=>{
            res.json({message:"We get all user",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })

    router.get('/searchProblem',async(req,res)=>{

        const keyword = req.query.search ? {
            $or:[
              {title:{$regex : req.query.search,$options:"i"}},
              {location:{$regex : req.query.search,$options:"i"}},  
            ],
          } :{} ;
    
        ProblemModel.find(keyword).find({}).
        populate("postByAdmin").
        populate("postByUser").
        populate("votesByUser").
        populate("votesByAdmin").
        then((result)=>{
            res.json({message:"We get all Problem",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })


    router.put('/voteByUser/:id',async(req,res)=>{
        const id=req.params.id
        const {userId}=req.body

        ProblemModel.findByIdAndUpdate(id,
            {
            $push: { votesByUser: userId }
           },
          {
            new: true
          })
        .then((result)=>{
            res.json({message:"Vote SuccessFuly Created",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
    router.get('/getfeedback/:id',async(req,res)=>{
        const id=req.params.id
    
        FeedBackModel.find({problemId:id})
        .populate("userId")
        .populate("problemId")
        .then((result)=>{
            res.json({message:"We get all feedback",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })

    router.put('/changePassword', verifyuser, async(req, res) => {
        const userId = req.id;
        console.log("userId", userId)
        const { currentPassword, newPassword } = req.body;
       
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user ID.' });
        }
      
        UserModel.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(404).json({ error: 'User not found.' });
            }
            // Compare the provided current password with the stored password
            if (currentPassword != user.password) {
              return res.status(400).json({ error: 'Current password is incorrect.' });
            }
      
            // Update the user's password with the new password
            user.password = newPassword;
            user.save()
              .then(() => {
                // Password changed successfully
                res.status(200).json({ message: 'Password changed successfully' });
              })
              .catch((saveErr) => {
                console.error(saveErr);
                res.status(500).json({ error: 'User update failed.' });
              });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Password change failed.' });
          });
      });
     
 

module.exports=router;
 