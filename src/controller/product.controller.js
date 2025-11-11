const { json } = require("express");
const Product = require("../modules/product.module");
// const filterField = require("../modules/someProperties.module")





async function addingProductController(req , res){

        const stringRegex = /^.+$/;
        const categorygRegex = /^[آ-یA-Za-z\s]+$/;

    if(!req.body){
        return res.status(400).json({error : "there is no Product data"});
    }
        const productData = {
            Title : req.body.productTitle,
            Category : req.body.category,
            Price : req.body.price , 
            explain : req.body.explain,
            typeOfFrame : req.body.typeOfFrame,
            brand : req.body.brand ,
            colorOfFrame : req.body.colorOfFrame,
            sizeOfPel : req.body.sizeOfPel,
            sizeOfdaste : req.body.sizeOfdaste ,
            GenderOfFrame : req.body.genderOfFrame,
            displayModel : req.body.displayModel,
            sizeOfAdasy : req.body.sizeOfAdasy,
            polarize  : req.body.polarize,
            standardUv : req.body.standardUv,
            madeIn : req.body.madeIn
        };
    // console.log(req.body)
    // if(!stringRegex.test(productData.Title) || typeof(productData.Price) !== "number" || !categorygRegex.test(productData.Category) 
    //     || typeof req.body.properties !== "object" || typeof(productData.explain) !== "string"){
    //     return res.status(400).json({error : "the type of data is not currect"});
    // }
    
    for(let key in productData){
        if(key != "Price"){
           if(typeof(productData[key]) != "string"){
                return res.status(400).json({error : "the type of data is not currect" , key});
           }
        }else 
            if (typeof(productData[key]) != "number") {
                return res.status(400).json({error : "the type of data is not currect"});

            }
        }
    
   
    await Product.create(productData);
    res.json(req.body)

}

async function findPorductWithId(req , res) {

  try{
   const product = await Product.find({_id : req.params.id})
   res.status(200).json(product)

   console.log(product) 
  }catch(err){
    return res.status(400).json({message : "there is no product with that id"})
  }

}

async function getAllPorduct(req , res) {
    res.json(await Product.find());
}
async function  fileterDataController(req , res) {
   try{
    // const products = await Product.aggregate([
    //     {
    //         $group: {
    //         _id: null,
    //         Category: { $addToSet: "$Category" },
    //         brand: { $addToSet: "$brand" },
    //         typeOfFrame: { $addToSet: "$typeOfFrame" }
    //         }
    //     },
    //     {
    //         $project: {
    //         _id: 0,  // حذف فیلد _id از خروجی
    //         Category: 1,
    //         brand: 1,
    //         typeOfFrame: 1
    //         }
    //     }
    //     ]);

        const fileterData = await Product.aggregate([
            {
                $group : {
                    _id : null ,
                    Category : {$addToSet : "$Category"},
                    brand : {$addToSet : "$brand"},
                    typeOfFrame : {$addToSet : "$typeOfFrame"}
                }
            },
            {
                $project : {
                    _id : 0 , 
                    Category : 1,
                    brand : 1, 
                    typeOfFrame : 1
                    }
            }
            
        ])

        // console.log(products);
        
       return res.status(200).json(fileterData)
    }catch(err){
        return res.status(400).json({error : "there is a problem"})
    }
}


async function  getProductByCategory(req , res) {
    try{
        const products = await Product.find({Category : req.params.category})
       return res.status(200).json(products)
    }catch(err){
        return res.status(400).json({error : "there is no product with that category"})
    }
}

async function getProductByTypeOfFrame(req , res) {
    try{
        const products = await Product.find({typeOfFrame : req.params.frame})
       return res.status(200).json(products)
    }catch(err){
        return res.status(400).json({json :" there is no product with that frame"})
    }
}

async function getProductByBrand(req , res) {
    try{
        const product = await Product.find({brand : req.params.brand})
        return res.status(200).json(product);
    }catch(err){
        return res.status(400).json({json : "there is no product with that brand"})
    }
}
module.exports = {
    addingProductController,
    findPorductWithId,
    getAllPorduct,
    getProductByCategory,
    fileterDataController,
    getProductByTypeOfFrame,
    getProductByBrand
}