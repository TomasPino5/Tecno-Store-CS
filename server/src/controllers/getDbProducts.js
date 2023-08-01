const Products = require('../models/product.js');

const getDbProducts = async(req, res)=>{
    try{
        const dbProducts = await Products.findAll();
        res.status(200).json(dbProducts);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = getDbProducts;