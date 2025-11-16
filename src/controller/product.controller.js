const Product = require("../modules/product.module");
const fs = require("fs");




async function addingProductController(req , res){

    
    if(!req.body){
        return res.status(400).json({error : "there is no Product data"});
    }

    let proPath = [];
    const productImage = req.files.productImage;
      for(i in productImage){
        proPath.push(productImage[i].path);
      } 
        const productData = {
            Title : req.body.productTitle,
            Price : req.body.price , 
            explain : req.body.explain,
            brand : {
                name : req.body.brand,
                RouteName : req.body.brandRouteName,
                imagePath : req.files.brandImage[0].path,
            },
            Category : {
                name : req.body.category,
                RouteName : req.body.categoryRouteName,
            },
             typeOfFrame : {
                name : req.body.typeOfFrame,
                RouteName : req.body.typeOfFrameRouteName,
            },
            colorOfFrame : req.body.colorOfFrame,
            sizeOfPel : req.body.sizeOfPel,
            sizeOfdaste : req.body.sizeOfdaste ,
            GenderOfFrame : req.body.genderOfFrame,
            displayModel : req.body.displayModel,
            sizeOfAdasy : req.body.sizeOfAdasy,
            polarize  : req.body.polarize,
            standardUv : req.body.standardUv,
            madeIn : req.body.madeIn,
            productImage : proPath
          
        };
    
  
        
        try{
            // {brand : {name : "dfadff"}}
            const prodata = await Product.find({
                "brand.RouteName" : productData.brand.RouteName
            });

            // console.log(prodata);
            if(prodata.length != 0){
                
                fs.unlinkSync(productData.brand.imagePath);
                productData.brand.imagePath = prodata[0].brand.imagePath
                
            }
        }catch(err){
            console.log("new brand add.")
        }

    await Product.create(productData);
    res.json(productData)

}

async function findPorductWithId(req , res) {

  try{
   const product = await Product.find({_id : req.params.id})
   res.status(200).json(product)


  }catch(err){
    return res.status(400).json({message : "there is no product with that id"})
  }

}


async function getAllPorduct(req , res) {
    res.json(await Product.find());
}

async function  getProductByCategory(req , res) {
    try{
        const products = await Product.find({
            "Category.RouteName" : req.params.category
        })
       return res.status(200).json(products)
    }catch(err){
        return res.status(400).json({error : "there is no product with that category"})
    }
}

async function getProductByTypeOfFrame(req , res) {
    try{
        const products = await Product.find({
            "typeOfFrame.RouteName" : req.params.frame
        })
       return res.status(200).json(products)
    }catch(err){
        return res.status(400).json({json :" there is no product with that frame"})
    }
}


async function getProductByBrand(req , res) {
    try{
        const product = await Product.find({
            "brand.RouteName" : req.params.brand
        })
        return res.status(200).json(product);
    }catch(err){
        return res.status(400).json({json : "there is no product with that brand"})
    }
}


async function getAllBrnad(req ,res) {
   try{ 
    const uniqueBrands = await Product.aggregate([
  {
    $group: {
      _id: "$brand.RouteName", 
      brand: { $first: "$brand" }
    }
  },
  {
    $project: {
      _id: 0,
      routRouteName: "$_id",
      brand: 1
    }
  }
]);
        return res.status(200).json(uniqueBrands)
        
    }catch(err){
        return res.status(400).json({erro : "there is nothing in there"})

    }
}

async function getAllFrame(req , res) {
    try{
        const uniqueFrames = await Product.aggregate([
            {
                $group : {
                    _id : "$typeOfFrame.RouteName",
                    typeOfFrame : {$first : "$typeOfFrame"}
                }
            }
            ,
            {
                $project : {
                    _id : 0 , 
                    RouteName : "$_id",
                    typeOfFrame : 1
                }
            }

        ])
        return res.status(200).json(uniqueFrames);
    }catch(err){
        return res.status(400).json({err});
    }
}


async function getAllCategroy(req , res) {
    try{
        const uniqueFrames = await Product.aggregate([
            {
                $group : {
                    _id : "$Category.RouteName",
                    Category : {$first : "$Category"}
                }
            }
            ,
            {
                $project : {
                    _id : 0 , 
                    RouteName : "$_id",
                    Category : 1
                }
            }

        ])
        return res.status(200).json(uniqueFrames);
    }catch(err){
        return res.status(400).json({err});
    }
}
module.exports = {
    addingProductController,
    findPorductWithId,
    getAllPorduct,
    getProductByCategory,
    getProductByTypeOfFrame,
    getProductByBrand,
    getAllBrnad,
    getAllFrame,
    getAllCategroy,
}