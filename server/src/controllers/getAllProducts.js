const Products = require('../models/product')
const { Op } = require('sequelize');

const getAllProducts = async () => {
  const products = await Products.findAll()
  return products
}

const getProductByName = async (name) => {
  let filteredProducts = await Products.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } }
  })

  return filteredProducts;
};

module.exports = { getAllProducts, getProductByName };
