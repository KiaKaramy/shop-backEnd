const Users = require("../modules/User.module");
const verifyUser = require("../modules/verifyUser.module")
const cookieParser = require("cookie-parser");
const {Resend} = require("resend");
const configs = require("../config/env")
const {makeTokenAndSaveIT , getValueOfToken} = require("./process");
const ForgetDB = require("../modules/forget.password.module")


async function sendcode(req , res){
const passwordRegex = /^.{1,10}$/;
const gmailRegex = /^[\w.-]+@gmail\.com$/;

if(!gmailRegex.test(req.body.email)  || !passwordRegex.test(req.body.password)){
   return res.status(401).json({error : "there is problem in value"})
}

  const bodyData = {
            email  : req.body.email ,
            password : req.body.password
        }


const user = await Users.find({email : bodyData.email});
console.log(user);

if(user.length == 0){
    return res.status(401).json({error : "there is no account with this email"});
}
if(user[0].Password != bodyData.password ){
    return res.status(401).json({error : "the passoword is not cuuttt"});
}

// res.redirect("/dashbord");
res.json({isCorrect : true});

// const code =  Math.floor(100000 + Math.random() * 900000).toString();
// const expiresAt = new Date(Date.now() + 5 * 60 * 1000);


// const data = {
// email : req.body.email , 
// Password : req.body.password,
// GmailCode : code ,
// expiresAt : expiresAt 
// }
// await verifyUser.create(data);

// const resend = new Resend(configs.config.Resend_API_KEY);
//   await resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: req.body.email,
//   subject: ` سلام! کد تایید شما: ${code} `,
//   html: '<p>ایمیلت رسید!</p>'
// });

// res.json(data);

}

async function checkcode(req , res) {
    const code = req.body.code;
    
    if(typeof(code) != "number"){
        return res.status(401).json({error : "the type of data is not correct"});
    }

    const user = await verifyUser.findOne({GmailCode : code});
    console.log(user)
    if(user == null){
        return res.status(401).json({error : "you have to write the form again"})
    }

    if(code != user.GmailCode){
        return res.status(401).json({error : "the code is not  correct"})
    }

    if(user.expiresAt < new Date()){
        return res.status(401).json({error : "code monghazi shode"})
    }

    await verifyUser.deleteOne({GmailCode : code})
    res.status(200).json({message : "login was succsuful" , user : user});
}


async function sendForgetCodePasswordcode(req , res){
        const gmailRegex = /^[\w.-]+@gmail\.com$/;
        const email = req.body.email;
        console.log(email)
        if(!gmailRegex.test(email)){
        return res.status(401).json({error : "the gmail is not  correct"})
        }
        const user = await Users.findOne({email : email});
        if (!user) {
        return res.status(401).json({error : "there is no account with this gmail "})
        }


        const payload = {   
            email : email ,
        }

        const token = makeTokenAndSaveIT(configs.config.secretTokenValue , payload , "5m")
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        res.cookie("changPassword" , token , {
             httpOnly : true  ,
            secure : false
        })

        const data = {
            email : email ,
            token : token , 
            code : code
        }

        await ForgetDB.create(data);
        console.log(user);
        res.json(data);

}



async function AuthForgetCode(req , res) {
    const token = req.cookies.changPassword;
    const code = req.body.code;
console.log(token , code);

    if (!token || !code) {
        return res.status(401).json({error : "you are an imposter "})
    }

    const data = getValueOfToken(token , configs.config.secretTokenValue);
    if (data.status == false) {
        return res.status(401).json({error : "the code is not vaild "})
    }

    const user = await ForgetDB.findOne({token : token});
    
    if(user.email != data.data.email){
        return res.status(401).json({error : "imposter"})
    }
    
    const Newtoken = makeTokenAndSaveIT(configs.config.secretTokenValue , {canChangeIt : true , email : user.email} , "2m")
    
    res.cookie("validationChange" , Newtoken , {
        httpOnly : true  ,
        secure : false
    })

    await ForgetDB.deleteOne({code : code})
    res.json("was okay");
}

async function changPassword(req , res) {
    const token = req.cookies.validationChange;
    const newPassword = req.body.password;

    if(!token || !newPassword){
        return res.status(401).json({error : "you are an imposter "})
    }
    const data = getValueOfToken(token , configs.config.secretTokenValue);
      if (data.status == false) {
        return res.status(401).json({error : "the code is not vaild "})
    }

    await Users.findOneAndUpdate({
     email : data.data.email
    }, {$set : {Password : newPassword}})
    

    res.json({data , successful : 'yap'})
}





module.exports = {
    checkcode , 
    sendcode,
    sendForgetCodePasswordcode,
    AuthForgetCode,
    changPassword
}