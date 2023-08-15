const Products = require("../models/product.js");

const deleteProductByName = async (req, res) => {
  const productName = req.params.name;

  try {
    const product = await Products.findOne({ where: { name: productName } });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = deleteProductByName;
