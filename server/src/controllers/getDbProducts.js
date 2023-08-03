const productsData = require('../data.js');
const Products = require('../models/product.js');

const getDbProducts = async(req, res)=>{
    try{
        productsData.map((product)=>{
            Products.create({
                //id: product.id,
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
        });
        res.status(200).json({message: 'Productos almacenados en la base de datos correcto'});
    }
    catch(error){
        res.status(200).json({message: error.message});
    }
}

module.exports = getDbProducts;