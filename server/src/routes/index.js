const { Router } = require("express");
const { getAllProductsHandler } = require("../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../handlers/getProductDetailHandler");
const getDbProducts = require("../controllers/getDbProducts.js");
const postCreateProduct = require("../controllers/postCreateProduct");
const postUser = require("../controllers/postUser.js");
const Stripe = require("stripe");
const postFavProducts = require("../controllers/postFavProducts");
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

//Ruta para almacenar un nuevo producto al db
router.post("/productos", postCreateProduct);

//Ruta para crear un nuevo usuario
router.post('/login', postUser);

//Ruta para agregar producto favorito (no funciona todavia)
router.post("/productfav", postFavProducts);

router.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let arrayItems = [];
  items.forEach((item) => {
    arrayItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: arrayItems,
    mode: "payment",
    success_url: "http://localhost:3001/success",
    cancel_url: "http://localhost:3001/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

module.exports = router;
