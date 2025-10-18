const mongoose = require("mongoose");

const VerifyUser = new mongoose.Schema({
    FullName:{
        type : String , 
        required : false
    },
    email :{
        type : String,
        required : true 
    },
    Password : {
        type : String , 
        require : true
    },
    GmailCode : {
        type : Number , 
        required : true
    },
    expiresAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("verifyUser" , VerifyUser);