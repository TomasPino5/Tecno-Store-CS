const getAllProducts = require('../controllers/getAllProducts')

//Handler que muestra el producto cuando se lo busca por nombre y si no devuelve todos los productos
const getAllProductsHandler = async (req, res) => {
    try {
        const allProducts = await getAllProducts()
        return res.status(200).json(allProducts)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = { getAllProductsHandler }