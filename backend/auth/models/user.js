const { number } = require('@hapi/joi');
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        min:6,
        max:255,
    },
    image:{
        
        type:String,
        required:true,
        min:255,
        max:6,
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:1024,
        max:255,    },
    email:{        
        type:String,
        required:true,
        min:255,
        max:6,

    },
    region:{
        type:String,
        required:true,
        min:1024,
        max:255,
   
    data:{
        type:Date,
        Default:Date.now
    }
    }});

module.exports=mongoose.model('User',userSchema);