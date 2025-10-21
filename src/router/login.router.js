const express = require("express");
const LoginRouter = express.Router();
const { sendcode , sendForgetCodePasswordcode , AuthForgetCode ,changPassword} = require("../controller/login.controller");

LoginRouter.post("/sendcode" , sendcode);
LoginRouter.post("/forgetPassword" , sendForgetCodePasswordcode);
LoginRouter.post("/authCode" , AuthForgetCode)
LoginRouter.post("/changPassword" , changPassword)

// LoginRouter.post("/checkcode" , checkcode);


module.exports = LoginRouter;