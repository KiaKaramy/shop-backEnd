const express = require("express");
const productRoute = express.Router();
const {addingProductController , findPorductWithId , getAllPorduct , getProductByBrand ,getProductByCategory, getProductByTypeOfFrame  , fileterDataController} = require("../controller/product.controller");

productRoute.post("/add" , addingProductController);

productRoute.get("/:id" , findPorductWithId);

productRoute.get("/" , getAllPorduct);

productRoute.get("/category/:category"  , getProductByCategory);

productRoute.get("/filterData/get" , fileterDataController)

productRoute.get("/frameType/:frame" , getProductByTypeOfFrame );
productRoute.get("/brand/:brand" , getProductByBrand)
module.exports = productRoute;

