const productsData = require("../data");
//const Products = require('../models/product')
//const { Op } = require('sequelize');

// const getAllProducts = async () => {
//   const products = await Products.findAll()
//   return products
// }

// const getProductByName = async (name) => {
//   let filteredProducts = await Products.findAll({
//     where: { name: { [Op.iLike]: `%${name}%` } }
//   })

//   return filteredProducts;
// };

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
      description: product.description,
    };
  });

const getProductByName = async (name) => {
  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );

  if (filteredProducts.length > 0) {
    return filteredProducts.map((product) => ({
      id: product.id,
      name: product.name,
      href: product.href,
      imageSrc: product.imageSrc,
      imageAlt: product.imageAlt,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      description: product.description,
    }));
  }

  return null;
};

module.exports = { getAllProducts, getProductByName };
