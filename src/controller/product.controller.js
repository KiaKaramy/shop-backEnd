const Product = require("../modules/product.module");





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
            properties : req.body.properties,
            explain : req.body.explain
        };
    // console.log(req.body)
    if(!stringRegex.test(productData.Title) || typeof(productData.Price) !== "number" || !categorygRegex.test(productData.Category) 
        || typeof req.body.properties !== "object" || typeof(productData.explain) !== "string"){
        return res.status(400).json({error : "the type of data is not currect"});
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

async function  getProductByCategory(req , res) {
    try{
        const products = await Product.find({Category : req.params.category})
       return res.status(200).json(products)
    }catch(err){
        return res.status(400).json({error : "there is no product with that category"})
    }
}
module.exports = {
    addingProductController,
    findPorductWithId,
    getAllPorduct,
    getProductByCategory
}