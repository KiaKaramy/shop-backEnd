const mongoose = require("mongoose");
const Product = new mongoose.Schema({
    Title : {//
        type : String ,
        require : true
    },
    Category : {//
        type : Object ,
        require : true 
    },
       typeOfFrame : {//
        type : Object ,
        require : true
    },
      brand : {//
        type : Object ,
        require : true 
    },
    productImage : {
        type : Object , 
        require : false,
    },
    Price : {//
        type : Number, 
        require : true 
    },
 
    colorOfFrame : {//
        type : String,
        require : true 
    },
  
   sizeOfPel : {//
        type : String ,
        require : true
    },
    sizeOfdaste : {//
        type : String,
        require : true
    },
    GenderOfFrame : {//
        type : String ,
        require : true
    },
    displayModel : {
        type : String ,
        require : true   
    }, 
    sizeOfAdasy : {
        type : String ,
        require : true ,
    },
    polarize : {
        type : String ,
        require : true 
    },
    standardUv : {
        type : String ,
        require : true 
    },
    madeIn : {
        type : String , 
        require : true 
    },
     Comment : {
        type : Object,
        require : false
    },
    explain : {//
        type : String , 
        require : true
    },
    // brandImage : {
    //     type : String ,
    //     require: true
    // },
    productImage : {
        type : [String] , 
        require : true
    }
})

module.exports = mongoose.model("Product" , Product)