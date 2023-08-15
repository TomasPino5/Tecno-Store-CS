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
    product.name = name;
    product.href = href;
    product.imageSrc = imageSrc;
    product.imageAlt = imageAlt;
    product.price = price;
    product.stock = stock;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.isActive = isActive; // Agregar el valor de isActive

    await product.save();

    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = modifyProduct;
