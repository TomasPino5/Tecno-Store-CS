const productsData = require('../data')

const getAllProducts = async() => 

    productsData.map((product) => {
        return {
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
        };
    })

module.exports = getAllProducts;