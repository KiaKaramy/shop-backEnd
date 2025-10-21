const verifyUser = require("../modules/verifyUser.module");
const Users = require("../modules/User.module");
const jwt = require("jsonwebtoken");
const configs = require("../config/env");
const cookieParser = require("cookie-parser")
const {Resend} = require("resend");
const {makeTokenAndSaveIT , getValueOfToken} = require("./process");



    async function sendCodeController(req , res , next){
        const gmailRegex = /^[\w.-]+@gmail\.com$/;
        const nameRegex = /^[آ-یa-zA-Z\s]+$/;
        const passwordRegex = /^.{1,10}$/;

        if(!gmailRegex.test(req.body.email)  || !nameRegex.test(req.body.fullName) || !passwordRegex.test(req.body.password)){
            return res.status(401).json({error : "there is problem in value"})
        }

        const bodyData = {
            email  : req.body.email ,
            fullName : req.body.fullName,
            password : req.body.password
        }


        const user = await Users.find({email : req.body.email});
        console.log(typeof(user));

        console.log(user)
        //if it was't not null it's mean thats null 
        //null == means there wasnt any account
        if(user.length != 0 ){
            return res.status(401).json({error : "ther is an account with this name"});
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const token = makeTokenAndSaveIT(configs.config.secretTokenValue , bodyData.email , '5m' );
        res.cookie("whoIsItVerify" , token , {
        httpOnly : true  ,
        secure : false
    }) 

        
        const data = {
            FullName : bodyData.fullName ,
            email : bodyData.email , 
            Password : bodyData.password,
            GmailCode : code ,
            expiresAt : expiresAt ,
            NeccecryToken : token
         }

        await verifyUser.create(data)
        const resend = new Resend(configs.config.Resend_API_KEY);


        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: data.email,
            subject: ` سلام! کد تایید شما: ${code} `,
            html: '<p>ایمیلت رسید!</p>'
        }
        );
        res.status(200).json(data);
        // next();
            // console.log(req.body)
}




async function checkCode(req , res) {
    // const numRegex = /^\d{7}$/ ;
    const code = req.body.code;
    console.log(req.cookies );
    
    const whoIsItVerifyToken = req.cookies.whoIsItVerify;
    console.log(whoIsItVerifyToken);
    console.log(whoIsItVerifyToken);
    
    console.log(typeof(req.body.code) , req.body.code )
    if(!whoIsItVerifyToken){
        return res.status(401).json({error : "register again"});
    }
    if (typeof(code) !== "number"){
        return res.status(401).json({error : "you are fuck dmn right"});
    }
    //check the token if was false it means he edit or delete it
    const message  = getValueOfToken(whoIsItVerifyToken , configs.config.secretTokenValue);
    if(message.status == false){
        return res.status(401).json({error : "login aiagn"})
    }

  
    console.log(message);
    const user = await verifyUser.findOne({GmailCode : code}).lean();
    if(!user){
       return res.status(401).json({error: "cannot find code"})
    }
    if(user.expiresAt < new Date()){
        return res.status(401).json({error : "code monghazi shode"})
    }
    const token = jwt.sign(user.email , configs.config.REFRESH_TOKEN);

    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: false,
    })

    const newUser = {
        FullName : user.FullName,
        email : user.email ,
        Password : user.Password , 
        refreshToken : token
    }

    await Users.create(newUser);
    await verifyUser.deleteOne({GmailCode : code})
    
res.status(200).json(newUser);
}
module.exports = {
    sendCodeController,
    checkCode,
    
}
