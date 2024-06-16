const mongoose=require('mongoose')

const ContactSchema=mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String},
    contact:{type:String},
    subject:{type:String}
})

const ContactModel=mongoose.model("Contact",ContactSchema);

module.exports=ContactModel
