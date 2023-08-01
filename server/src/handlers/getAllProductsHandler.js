//Handler que muestra el producto cuando se lo busca por nombre y si no devuelve todos los productos
const getAllProuctsHandler = (req, res) => {

    const { name } = req.query

    if (name) {
        res.status(200).send(`Producto ${name}`)
    }
    else {
        res.status(200).send('Todos los productos')
    }
}

module.exports = { getAllProuctsHandler }