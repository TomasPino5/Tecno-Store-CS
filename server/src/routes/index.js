const { Router } = require("express");
const { getAllProductsHandler } = require("../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../handlers/getProductDetailHandler");
const getDbProducts = require("../controllers/getDbProducts.js");
const postCreateProduct = require("../controllers/postCreateProduct");
const postUser = require('../controllers/postUser.js');
const postFavProducts = require('../controllers/postFavProducts');

const router = Router();

//Ruta para mostrar los productos
router.get("/productos", getAllProductsHandler);

//Ruta para mostrar el detalle de los productos
router.get("/productos/:id", getDetailHandler);

//Ruta para llenar la base de datos con los productos se utiliza una sola vez
router.get("/dbproducts", getDbProducts);

//Ruta para almacenar un nuevo producto al db
router.post("/productos", postCreateProduct);

//Ruta para crear un nuevo usuario (no funciona todavia)
router.post('/login', postUser);

//Ruta para agregar producto favorito (no funciona todavia)
router.post('/productfav', postFavProducts);

module.exports = router;