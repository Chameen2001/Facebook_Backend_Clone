const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    surName:{
        type:String,
        required:true,
        trim:true
    },
    mobileNo:{
        type:Number,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    birthDay:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    }
});

//collect name will be 'user'  because we add mongoose.model('user') below
const user = mongoose.model('user',userSchema); 
module.exports = user;