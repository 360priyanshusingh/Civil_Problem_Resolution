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
const ProblemModel = require('../models/ProblemModel');



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
    
    router.post('/login',async(req,res)=>{
       const {username,password} =req.body
        
       AdminModel.findOne({username}).
       then((data)=>{
        if(!data){
            return res.json({error:"Sorry admin not exit"})
        }
        if(data && data.password!=password){
            return res.json({error:"Sorry your password is wrong !"})
        }
    
        const token = jwt.sign(
            { role : 'admin',id:data._id, user:data },
            "jwt-secret-key",
            { expiresIn:"1d" }
         )
    
         res.cookie('Token',token);
         console.log(token)
         res.json({Succes:"Admin login Succesfully !",data,token}) 
    
       })
       .catch((error)=>{
         res.json({message:"Admin login Unsuccesfully !",error}) 
       })
    
    
    
    })  

    router.get('/logout',async(req,res)=>{
        res.clearCookie('Token');
        console.log(res.cookies)
        return res.json( {Status: 'Logout successful'});
    
    })

    router.put('/changePassword', verifyuser, async(req, res) => {
        const userId = req.id;
        console.log("userId", userId)
        const { currentPassword, newPassword } = req.body;
       
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user ID.' });
        }
      
        AdminModel.findById(userId)
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
      router.put('/updateProblem2/:id',async(req,res)=>{
        const id=req.params.id
        const {status,estimateDate}=req.body

        ProblemModel.findByIdAndUpdate(id,{status:status,actualDate:estimateDate}).
        then((result)=>{
            res.json({message:"Problem Status Update",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
      router.put('/updateProblem/:id',async(req,res)=>{
        const id=req.params.id
        const {status,estimateDate}=req.body

        ProblemModel.findByIdAndUpdate(id,{status:status,estimateDate:estimateDate}).
        then((result)=>{
            res.json({message:"Problem Status Update",result})
        })
        .catch((error)=>{
            res.json({message:"Sorry something error in backend",error})
        })
    })
     
    router.post("/craeteProblem",upload.single("pic"),async(req,res)=>{
        const pic = req.file ? req.file.filename : null;  
    
       const {location,votesByAdmin,actualDate,estimateDate,startDate,postDate,postByAdmin,postByUser,dis,title
        ,votesByUser}=req.body
    
       ProblemModel.create({location,votesByAdmin,actualDate,estimateDate,startDate,postDate,postByAdmin,postByUser,dis,title
        ,votesByUser,pic})
       .then((result)=>{
        res.json({message:"Problem SuccessFully Created",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry Problem SuccessFully not Created",error})
       })
        
    })  

    router.get('/getAllProblem',async(req,res)=>{
        ProblemModel.find({}).
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
    router.get('/getNotStartedProblem',async(req,res)=>{

        const keyword = req.query.search ? {
            $or:[
              {title:{$regex : req.query.search,$options:"i"}},
              {location:{$regex : req.query.search,$options:"i"}},  
            ],
          } :{} ;
    
        ProblemModel.find(keyword).find({status:"Not Started"}).
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

    router.get('/getSolvedProblem',async(req,res)=>{
         const keyword = req.query.search ? {
            $or:[
              {title:{$regex : req.query.search,$options:"i"}},
              {location:{$regex : req.query.search,$options:"i"}},  
            ],
          } :{} ;
    
        ProblemModel.find(keyword).find({status:"Problem Solved"}).
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
    router.get('/getInProgressProblem',async(req,res)=>{
        const keyword = req.query.search ? {
            $or:[
              {title:{$regex : req.query.search,$options:"i"}},
              {location:{$regex : req.query.search,$options:"i"}},  
            ],
          } :{} ;
    
        ProblemModel.find(keyword).find({status:"In Progress"}).
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

module.exports=router;
 