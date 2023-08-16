// controllers/modifyProduct.js
const Products = require("../models/product.js");



const modifyProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, href, imageSrc, imageAlt, price, stock, brand, category, description, isActive } = req.body;

  try {
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Modificar los atributos del producto
    if(name !== ''){
      product.name = name;
    }
    if(href !== ''){
      product.href = href;
    }
    if(imageSrc !== ''){
      product.imageSrc = imageSrc;
    }
    if(imageAlt !== ''){
      product.imageAlt = imageAlt;
    }
    if(price !== 0){
      product.price = price;
    }
    if(stock !== 0){
      product.stock = stock;
    }
    if(brand !== ''){
      product.brand = brand;
    }
    if(category !== ''){
      product.category = category;
    }
    if(description !== ''){
      product.description = description;
    }
    product.isActive = isActive; // Agregar el valor de isActive

    await product.save();
    const prod = await Products.findAll();
    return res.status(200).json(prod);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = modifyProduct;
