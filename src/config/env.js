require("dotenv").config();

const config = {
    MONGO_URL  : process.env.MONGO_URL,
    REFRESH_TOKEN : process.env.REFRESH_TOKEN,
    Resend_API_KEY : process.env.Resend_API_KEY,
    PORT : process.env.PORT
}


module.exports = {
    config
}