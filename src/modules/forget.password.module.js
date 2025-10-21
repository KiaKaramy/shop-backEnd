const mongoose = require("mongoose");
const user = new mongoose.Schema({
email :{
    type: String , 
    require : true
} ,
code :{
    type : Number , 
    require : true
} ,
token : {
    type : String , 
    require : true 
},
Date : {
    type : Date,
    default : Date.now
}

})


module.exports = mongoose.model("forgetPassword" , user)


