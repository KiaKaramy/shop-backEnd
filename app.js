const express = require("express");
const cookieParser = require("cookie-parser");
const Verification = require("./src/router/Verification.router");
const dotenv = require("dotenv");
const { UserServerStartConection } = require("./src/config/mongo-users");
const configs = require("./src/config/env");
dotenv.config();
const app = express();

// const {GetRegister} = require("")
app.use(express.json());
app.use(cookieParser());


app.use("/verify" , Verification);

app.get("/" , (req , res)=>{
    res.json({messge : "fuck you"})
})


UserServerStartConection()
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("MongoDB connection error:", err));

    
module.exports =  app;
