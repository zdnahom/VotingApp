const mongoose=require('mongoose');
const electionSchema=new mongoose.Schema({
    leader:{
        type:String,
        required:true,

    },
    year:{
        type:String,
        required:true,

    },
    country:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        max:255
   }
    
});

module.exports=mongoose.model('Election',electionSchema);