const mongoose= require('mongoose')
const ProblemSchema=mongoose.Schema({
    title:{type:String,required:true},
    pic:{type:String},
    dis:{type:String,required:true},
    postByUser: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
    postByAdmin: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
      },
    postDate:{type:Date,default:Date.now},
    startDate:{type:String},
    estimateDate:{type:String},
    actualDate:{type:String},
    location:{type:String},
    votesByUser:
        [
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
          }
        ],
    votesByAdmin:
        [
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin",
          }
        ],
    status:{type:String,default:"Not Started"},
})

const ProblemModel=mongoose.model('Problem',ProblemSchema);
module.exports=ProblemModel;