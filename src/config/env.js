require("dotenv").config();

const config = {
    MONGO_URL  : process.env.MONGO_URL,
    REFRESH_TOKEN : process.env.REFRESH_TOKEN,
    PORT : process.env.PORT
}


module.exports = {
    config
}