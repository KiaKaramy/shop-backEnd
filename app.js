const express = require("express");
const app = express();
const Verification = require("./src/router/Verification.router")
const LoginRouter = require("./src/router/login.router")
const cookieParser = require("cookie-parser")
const cors = require("cors")
// const {GetRegister} = require("")
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/verify" , Verification);
app.use("/login" , LoginRouter);

app.get("/" , (req , res)=>{
    res.json({messge : "fuck you"})
})

module.exports = app;
