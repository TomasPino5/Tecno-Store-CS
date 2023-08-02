const productsData = require('../data')

const getAllProducts = async () =>

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

const getProductByName = async (name) => {

    let findProduct = productsData.find(product => product.name === name);

    if (findProduct) {
        return {
            id: findProduct.id,
            name: findProduct.name,
            href: findProduct.href,
            imageSrc: findProduct.imageSrc,
            imageAlt: findProduct.imageAlt,
            price: findProduct.price,
            stock: findProduct.stock,
            brand: findProduct.brand,
            category: findProduct.category,
            description: findProduct.description
        };
    }
    return null;
}

module.exports = { getAllProducts, getProductByName };