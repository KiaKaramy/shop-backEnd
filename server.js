const http = require("http"); 
const app= require("./app");
 require("dotenv").config();
  const configs = require("./src/config/env"); 
  const PORT = configs.config.PORT;

   const UserServerStartConection = require("./src/config/mongo-users"); 
  
   const server = http.createServer(app)
    
   async function runServer() {
         await UserServerStartConection()
          server.listen(PORT , ()=>{
         console.log(`server run on port ${PORT} `) }) 
            
    } 
runServer();