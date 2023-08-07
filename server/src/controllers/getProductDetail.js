const productsData = require('../data')
const Products = require('../models/product')

const getProductDetail = async (id) => {

    let findProduct = await Products.findOne({
        where: { id: id }
    })
    return findProduct
}

// const getProductDetail = async (id) => {

//     let findProduct = productsData.find(product => product.id === id);

//     if (findProduct) {
//         return {
//             id: findProduct.id,
//             name: findProduct.name,
//             href: findProduct.href,
//             imageSrc: findProduct.imageSrc,
//             imageAlt: findProduct.imageAlt,
//             price: findProduct.price,
//             stock: findProduct.stock,
//             brand: findProduct.brand,
//             category: findProduct.category,
//             description: findProduct.description
//         };
//     }
//     return null;
// }

module.exports = getProductDetail;