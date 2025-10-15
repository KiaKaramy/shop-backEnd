const mongoose = require("mongoose");
const configs = require("./env");

async function UserServerStartConection() {
    console.log(configs.config.MONGO_URL)
    await mongoose.connect(configs.config.MONGO_URL);
    console.log("CONNECTION WAS SUCCESFUL");
}

module.exports =  UserServerStartConection;