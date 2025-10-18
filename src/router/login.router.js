const express = require("express");
const LoginRouter = express.Router();
const { sendcode , checkcode} = require("../controller/login.controller");

LoginRouter.post("/sendcode" , sendcode);
LoginRouter.post("/checkcode" , checkcode);

module.exports = LoginRouter;