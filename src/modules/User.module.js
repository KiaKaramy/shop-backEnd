const mongoose = require("mongoose");

const User = new mongoose.Schema({
    FullName:{
        type : String , 
        required : true
    },
    email :{
        type : String,
        required : true 
    },
    Password :{
        type : String ,
        required : true
    },
    DateLogin : {
        type : Date ,
        default : Date.now
    },
    refreshToken : {
        type : String , 
        required : true
    }

})

module.exports = mongoose.model("users" , User);