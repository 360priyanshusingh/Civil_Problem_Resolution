const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String},
    password:{type:String,required:true},
    pic:{type:String},
    idcard:{type:String,required:true},
    contact:{type:String},
    city:{type:String},
    address:{type:String},
    status:{type:String,default:"Pending"}
  
})

const UserModel=mongoose.model("User",UserSchema);

module.exports=UserModel
