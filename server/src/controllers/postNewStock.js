const Products = require("../models/product.js");

const postNewStock = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        //console.log(productId, quantity)
        const product = await Products.findByPk(productId);

        product.stock -= quantity === undefined ? 1 : quantity;
        await product.save();

        res.status(200).json({ mensaje: "Stock actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el stock" });
    }
}

module.exports = postNewStock