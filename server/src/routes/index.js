const { Router } = require('express');
const { getAllProuctsHandler } = require('../handlers/getAllProductsHandler')
const { getDetailHandler } = require('../handlers/getProductDetailHandler')

const router = Router();

//Ruta para mostrar los productos
router.get('/productos', getAllProuctsHandler)

//Ruta para mostrar el detalle de los productos
router.get('/productos/:id', getDetailHandler)

module.exports = router