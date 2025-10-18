const Users = require("../modules/User.module");
const verifyUser = require("../modules/verifyUser.module")
const cookieParser = require("cookie-parser");
const {Resend} = require("resend");
const configs = require("../config/env")




async function sendcode(req , res){
const passwordRegex = /^.{1,10}$/;
const gmailRegex = /^[\w.-]+@gmail\.com$/;

if(!gmailRegex.test(req.body.Gmail)  || !passwordRegex.test(req.body.Password)){
   return res.json({error : "there is problem in value"})
}
const user = await Users.find({email : req.body.Gmail});
console.log(user);

if(user.length == 0){
    return res.json({error : "there is no account with this email"});
}
if(user[0].Password != req.body.Password ){
    return res.json({error : "the passoword is not cuuttt"});
}

const code =  Math.floor(100000 + Math.random() * 900000).toString();
const expiresAt = new Date(Date.now() + 5 * 60 * 1000);


const data = {
email : req.body.Gmail , 
Password : req.body.Password,
GmailCode : code ,
expiresAt : expiresAt 
}
await verifyUser.create(data);

const resend = new Resend(configs.config.Resend_API_KEY);
  await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: req.body.Gmail,
  subject: ` سلام! کد تایید شما: ${code} `,
  html: '<p>ایمیلت رسید!</p>'
});

res.json(data);

}

async function checkcode(req , res) {
    const code = req.body.code;
    
    if(typeof(code) != "number"){
        return res.json({error : "the type of data is not correct"});
    }
    const user = await verifyUser.findOne({GmailCode : code});
    console.log(user)
    if(user == null){
        return res.json({error : "you have to write the form again"})
    }
    if(code != user.GmailCode){
        return res.json({error : "the code is not  correct"})
    }

    if(user.expiresAt < new Date()){
        return res.json({error : "code monghazi shode"})
    }

    await verifyUser.deleteOne({GmailCode : code})
    res.json({message : "login was succsuful" , user : user});
}

module.exports = {
    checkcode , 
    sendcode,
}