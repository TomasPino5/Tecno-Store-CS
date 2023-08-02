const Products = require('../models/product.js');

const postCreateProduct = async(req, res)=>{
    const { id, name, href, imageSrc, imageAlt, price, stock, brand, category, description } = req.body;
    try{
        const dbProduct = await Products.findOne({where:{name:name}});
        if(dbProduct){
            res.status(200).json({message: 'Ya existe un producto con ese nombre'});
        }
        else{
            const product = await Products.create({id, name, href, imageSrc, imageAlt, price, stock, brand, category, description});
            res.status(200).json(product);
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = postCreateProduct;