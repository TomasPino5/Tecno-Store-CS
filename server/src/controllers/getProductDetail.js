const Products = require('../models/product')

const getProductDetail = async (id) => {

    let findProduct = await Products.findOne({
        where: { id: id }
    })
    return findProduct
}

module.exports = getProductDetail;