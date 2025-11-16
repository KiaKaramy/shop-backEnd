const express = require("express");
const productRoute = express.Router();
const {addingProductController
    ,getAllFrame
     , findPorductWithId 
     , getAllPorduct 
     , getProductByBrand 
     , getAllBrnad 
     ,getProductByCategory
     , getProductByTypeOfFrame
    ,getAllCategroy
    } = require("../controller/product.controller");

const {upload , uploadMiddleware} = require("../controller/uploadProcess.controller")

productRoute.post("/add" , uploadMiddleware , addingProductController);

productRoute.get("/:id" , findPorductWithId);

productRoute.get("/" , getAllPorduct);


// productRoute.get("/filterData/get" , fileterDataController)/

productRoute.get("/allbrand/get" , getAllBrnad);
productRoute.get("/allFrame/get" , getAllFrame);
productRoute.get("/allCategory/get" , getAllCategroy);

productRoute.get("/category/:category"  , getProductByCategory);
productRoute.get("/frame/:frame" , getProductByTypeOfFrame );
productRoute.get("/brand/:brand" , getProductByBrand)
module.exports = productRoute;

