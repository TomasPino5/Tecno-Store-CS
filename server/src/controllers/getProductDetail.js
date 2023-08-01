const productsData = require('../data')

const getProductDetail = async (id) => {

    let findProduct = productsData.find(product => product.id === id);

    if (findProduct) {
        return {
            id: findProduct.id,
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


    // let productId = productsData.find((product) => {
    //     if (product.id === id) {
    //         return {
    //             id: product.id,
    //             href: product.href,
    //             imageSrc: product.imageSrc,
    //             imageAlt: product.imageAlt,
    //             price: product.price,
    //             stock: product.stock,
    //             brand: product.brand,
    //             category: product.category,
    //             description: product.description
    //         };
    //     }

    // })
    // return productId
}
// {
//     return {
//         id: product.id,
//         href: product.href,
//         imageSrc: product.imageSrc,
//         imageAlt: product.imageAlt,
//         price: product.price,
//         stock: product.stock,
//         brand: product.brand,
//         category: product.category,
//         description: product.description
//     };
// })

module.exports = getProductDetail;