const mongoose = require("mongoose");

const filterField = new mongoose.Schema({
    typeOfFrame : [String],
    category : [String],
    brand : [String],

})


module.exports = mongoose.model("filterField" , filterField);