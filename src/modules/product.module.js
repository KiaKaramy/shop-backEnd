const mongoose = require("mongoose");
const Product = new mongoose.Schema({
    Title : {
        type : String ,
        require : true
    },
    Category : {
        type : String ,
        require : true 
    },
    Price : {
        type : Number, 
        require : true 
    },
    Comment : {
        type : Object,
        require : false
    },
    explain : {
        type : String , 
        require : true
    },
    properties : {
        type : Object ,
        require : false
    }
})

module.exports = mongoose.model("Product" , Product)