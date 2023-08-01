const productsData = require('../data')

const getProductDetail = async (id) => {

    productsData.find((product) => {
        if (product.id === id) {
            return {
                id: product.id,
                href: product.href,
                imageSrc: product.imageSrc,
                imageAlt: product.imageAlt,
                price: product.price,
                stock: product.stock,
                brand: product.brand,
                category: product.category,
                description: product.description
            };
        }
    })
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