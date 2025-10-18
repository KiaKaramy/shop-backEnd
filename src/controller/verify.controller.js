const verifyUser = require("../modules/verifyUser.module");
const Users = require("../modules/User.module");
const jwt = require("jsonwebtoken");
const configs = require("../config/env");
const cookieParser = require("cookie-parser")
const {Resend} = require("resend");

async function sendCodeController(req , res){
const gmailRegex = /^[\w.-]+@gmail\.com$/;
const nameRegex = /^[آ-یa-zA-Z\s]+$/;
const passwordRegex = /^.{1,10}$/;

if(!gmailRegex.test(req.body.Gmail)  || !nameRegex.test(req.body.FullName) || !passwordRegex.test(req.body.Password)){
   return res.json({error : "there is problem in value"})
}
const user = await Users.find({email : req.body.Gmail});
console.log(typeof(user));

console.log(user)
//if it was't not null it's mean thats null 
//null == means there wasnt any account
if(user.length != 0 ){
    return res.json({error : "ther is an account with this name"});
}

const code = Math.floor(100000 + Math.random() * 900000).toString();
const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

const data = {
FullName : req.body.FullName ,
email : req.body.Gmail , 
Password : req.body.Password,
GmailCode : code ,
expiresAt : expiresAt 
}

await verifyUser.create(data)
const resend = new Resend(configs.config.Resend_API_KEY);


  await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: req.body.Gmail,
  subject: ` سلام! کد تایید شما: ${code} `,
  html: '<p>ایمیلت رسید!</p>'
});
res.json(data);
    console.log(req.body)
}


async function checkCode(req , res) {
    // const numRegex = /^\d{7}$/ ;
    const code = req.body.code;
    console.log(typeof(req.body.code) , req.body.code )

    if (typeof(code) !== "number"){
        return res.json({error : "you are fuck dmn right"});
    }
    const user = await verifyUser.findOne({GmailCode : req.body.code}).lean();
    if(!user){
       return res.json({error: "cannot find code"})
    }
    if(user.expiresAt < new Date()){
        return res.json({error : "code monghazi shode"})
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
    
res.json(newUser);
}
module.exports = {
    sendCodeController,
    checkCode
}