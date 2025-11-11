const mongoose = require("mongoose");
const Product = new mongoose.Schema({
    Title : {//
        type : String ,
        require : true
    },
    Category : {//
        type : String ,
        require : true 
    },
       typeOfFrame : {//
        type : String ,
        require : true
    },
      brand : {//
        type : String ,
        require : true 
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

})

module.exports = mongoose.model("Product" , Product)