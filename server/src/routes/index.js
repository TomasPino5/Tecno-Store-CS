const { Router } = require("express");
const { getAllProductsHandler } = require("../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../handlers/getProductDetailHandler");
const getDbProducts = require("../controllers/getDbProducts.js");
const postCreateProduct = require("../controllers/postCreateProduct");
const postUser = require("../controllers/postUser.js");
const Stripe = require("stripe");
const postFavProducts = require("../controllers/postFavProducts");
const getUser = require("../controllers/getUser.js");
const modifyUser = require("../controllers/modifyUser.js");

const stripe = require("stripe")(
  "sk_test_51NcvqGCNUAoI7WlfYdjceaTV47v9U1dGeTSVFPqhmgJ1fJF6vWO84ER7VQater3g88Xx4Gs4TayyCGDff2Au0h7T00nAgIEDyr"
);

const router = Router();

//Ruta para mostrar los productos
router.get("/productos", getAllProductsHandler);

//Ruta para mostrar el detalle de los productos
router.get("/productos/:id", getDetailHandler);

//Ruta para llenar la base de datos con los productos se utiliza una sola vez
router.get("/dbproducts", getDbProducts);

//Ruta para traer un usuario
router.get("/getuser/:email", getUser);

//Ruta para modificar datos del usuario
router.put("/modifyUser/:email", modifyUser);

//Ruta para almacenar un nuevo producto al db
router.post("/productos", postCreateProduct);

//Ruta para crear un nuevo usuario
router.post("/login", postUser);

//Ruta para agregar producto favorito (no funciona todavia)
router.post("/productfav", postFavProducts);

router.post("/pago", async (req, res) => {
  const { producto, cantidad, token } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: producto.precio * cantidad * 100, // El precio se debe proporcionar en centavos
      currency: "usd",
      source: token.id,
      description: `Compra de ${cantidad} ${producto.nombre}`,
    });

    res.json({ mensaje: "Pago exitoso", charge });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el pago", error: error.message });
  }
});

module.exports = router;
