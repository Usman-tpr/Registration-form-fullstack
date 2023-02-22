const mongoose=require('mongoose');

const userdata=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    repass:{
        type:String,
        required:true
    },
})

const Register=new mongoose.model('Register',userdata);
module.exports=Register;