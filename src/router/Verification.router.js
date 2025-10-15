const express = require("express");
const Verification = express.Router();
const {sendCodeController , checkCode} = require("../controller/verify.controller")

Verification.post("/sendCode" , /*send code*/ sendCodeController);
Verification.post("/checkCode" , /*check code*/ checkCode);


module.exports =  Verification;