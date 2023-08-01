// Handler que muestra el ditail a partir del id
const getDetailHandler = (req, res) => {

    const { id } = req.params;

    res.status(200).send(`Detalles del producto ${id}`)
}

module.exports = { getDetailHandler }