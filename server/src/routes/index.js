const { Router } = require("express");
const { getAllProductsHandler } = require("../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../handlers/getProductDetailHandler");
const getDbProducts = require("../controllers/getDbProducts.js");
const postCreateProduct = require("../controllers/postCreateProduct");
const postUser = require("../controllers/postUser.js");
const postFavProducts = require("../controllers/postFavProducts");
const getUser = require("../controllers/getUser.js");
const modifyUser = require("../controllers/modifyUser.js");
const postPago = require("../controllers/postPago");
const { sendMailCompraHandler } = require("../handlers/sendMailCompraHandler");
const postUserPurchase = require("../controllers/postUserPurchase");
const getUserPurchasesHandler = require("../handlers/getUserPurchasesHandler");
const modifyProduct = require("../controllers/modifyProduct");
const deleteUser = require("../controllers/deleteUser.js");
const allUser = require("../controllers/getAllUsers");
const putUser = require('../controllers/putUser.js');
const getCompras = require('../controllers/getCompras.js');
const getUserRating = require('../controllers/getUserRating');
const modifyUserRating = require('../controllers/modifyUserRating');
const postUserRating = require('../controllers/postUserRating');
const postNewStock = require('../controllers/postNewStock');
const putAdmin = require('../controllers/putAdmin.js');

const router = Router();

//Ruta para mostrar los productos
router.get("/productos", getAllProductsHandler);

//Ruta para mostrar el detalle de los productos
router.get("/productos/:id", getDetailHandler);

// Ruta para modificar un producto por ID
router.put("/productos/:id", modifyProduct);

//Ruta para poner como admin a un usuario
router.put('/putadmin/:id', putAdmin);

//Ruta para llenar la base de datos con los productos se utiliza una sola vez
router.get("/dbproducts", getDbProducts);

//Ruta para traer un usuario
router.get("/getuser/:email", getUser);

//Ruta para traer las compras de un usuario
router.get("/getUserPurchases/:email", getUserPurchasesHandler);

//Ruta para traer todas las compras de los usuarios
router.get('/compras', getCompras);

//Ruta para obtener Rating del usuario
router.get("/getRating", getUserRating);

//Ruta para modificar datos del usuario
router.put("/modifyUser/:email", modifyUser);

//Ruta para modificar usuario
router.put('/putuser/:id', putUser);

//Ruta para modificar la calificacion del usuario
router.put("/modifyUserRating", modifyUserRating);

// Ruta para eliminar un usuario por su correo electrónico
router.delete("/user/:email", deleteUser);

// Ruta para obtener todos los usuarios en base de datos
router.get("/allusers", allUser);

//Ruta para almacenar un nuevo producto al db
router.post("/productos", postCreateProduct);

//Ruta para crear un nuevo usuario
router.post("/login", postUser);

//Ruta para agregar producto favorito (no funciona todavia)
router.post("/productfav", postFavProducts);

router.post("/pago", postPago);

//Ruta para enviar mail de confirmacion de email
router.post("/send-email", sendMailCompraHandler);

//Ruta para guardar compra del usuario
router.post("/userPurchase", postUserPurchase);

//Ruta para guardar calificacion de producto
router.post("/rateProduct", postUserRating)

//Ruta para guardar calificacion de producto
router.post("/actualizarStock", postNewStock)

module.exports = router;
