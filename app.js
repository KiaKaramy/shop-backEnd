const express = require("express");
const app = express();
const Verification = require("./src/router/Verification.router");
const LoginRouter = require("./src/router/login.router");
const productRoute = require("./src/router/product.router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const {GetRegister} = require("")
app.use(cors({
  // origin: "https://shop-iota-ashen.vercel.app",
  origin: ["http://127.0.0.1:5500" , "https://shop-iota-ashen.vercel.app" ],
   credentials:true,      
}));

app.use(express.json());
app.use(cookieParser());



app.use("/verify" , Verification);
app.use("/login" , LoginRouter);
app.use("/product" , productRoute);

app.get("/" , (req , res)=>{
    res.json({messge : "fuck you"})
})

module.exports = app;
