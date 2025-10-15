const express = require("express");
const Verification = express.Router();
const {sendCodeController , checkCode} = require("../controller/verify.controller")

Verification.post("/sendcode" , /*send code*/ sendCodeController);
Verification.post("/checkcode" , /*check code*/ checkCode);


module.exports =  Verification;