const getProductDetail = require('../controllers/getProductDetail')

// Handler que muestra el ditail a partir del id
const getDetailHandler = (req, res) => {

    const { id } = req.params;

    try {
        if(id) {
            res.status(200).json(getProductDetail(id))
        }
    } catch (error) {
        res.status(404).json(error.messagge)
    }
    //res.status(200).send(`Detalles del producto ${id}`)
}

module.exports = { getDetailHandler }