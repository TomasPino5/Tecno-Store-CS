const productsData = require('../../api.js');
const Products = require('../models/product.js');

const getAllProducts = async(req, res)=>{
    try{
            productsData.map(product=>{
                Products.create({
                id: product.id,
                name: product.name,
                href: product.href,
                imageSrc: product.imageSrc,
                imageAlt: product.imageAlt,
                price: product.price,
                stock: product.stock,
                brand: product.brand,
                category: product.category,
                description: product.description
            })
            })
            res.send('todo correcto')
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = getAllProducts;