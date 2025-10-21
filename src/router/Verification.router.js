const express = require("express");
const Verification = express.Router();
const {sendCodeController , checkCode } = require("../controller/verify.controller")

Verification.post("/sendcode" , /*send code*/ sendCodeController);
Verification.post("/checkcode" , /*check code*/ checkCode);
Verification.get("/kia" , (req , res)=>{
    res.json({message : "kia"})
})
Verification.post("/nima" , (req , res)=>{
    res.json({message : "nima"})
})

module.exports =  Verification;