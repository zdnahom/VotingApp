// const { number } = require('@hapi/joi');
const mongoose=require('mongoose');
const partySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    leader:{
        type:String,
        required:true,
    },
    region:{
        type:String,
        required:true,
    },
    vote:{
        type:Number,
        required:true,

    },
    description:{
        type:String,
        required:true,
   },
    hpr:{        
        type:Number,
        required:true,

    }
    // data:{
    //     type:Date,
    //     Default:Date.now
    // }
    // }
});

module.exports=mongoose.model('Party',partySchema);