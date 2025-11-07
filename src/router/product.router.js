const express = require("express");
const productRoute = express.Router();
const {addingProductController , findPorductWithId , getAllPorduct ,getProductByCategory} = require("../controller/product.controller");

productRoute.post("/add" , addingProductController);

productRoute.get("/:id" , findPorductWithId);

productRoute.get("/" , getAllPorduct);

productRoute.get("/category/:category"  , getProductByCategory);

module.exports = productRoute;

