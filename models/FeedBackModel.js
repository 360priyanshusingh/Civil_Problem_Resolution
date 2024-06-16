const mongoose=require('mongoose')

const FeedBackSchema=mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
    problemId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
      },
    date:{type:Date,default:Date.now},
    msg:{type:String,required:true}
})

const FeedBackModel=mongoose.model("FeedBack",FeedBackSchema);

module.exports=FeedBackModel
