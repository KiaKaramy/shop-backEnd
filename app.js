const express = require("express");
const app = express();
const Verification = require("./src/router/Verification.router")
const cookieParser = require("cookie-parser")

// const {GetRegister} = require("")
app.use(express.json());
app.use(cookieParser());


app.use("/verify" , Verification);

app.get("/" , (req , res)=>{
    res.json({messge : "fuck you"})
})

module.exports =  app;
