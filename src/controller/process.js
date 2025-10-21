const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

function makeTokenAndSaveIT( necceryCookieSecret , payload , timeExpire ){
    
    console.log(payload , timeExpire)
    return token = jwt.sign({email : payload.email , canChangePassword : payload.destinaiton} , necceryCookieSecret , { expiresIn : `${timeExpire}`}); 
}

function getValueOfToken(token , CookieSecret){
    try{
    const tokenDecod = jwt.verify(token , CookieSecret)
    return  {
        status : true , 
        data : tokenDecod
    }

    }catch(err){
         return  {
        status : false , 
    }

    }
}
module.exports = {
    makeTokenAndSaveIT,
    getValueOfToken
};