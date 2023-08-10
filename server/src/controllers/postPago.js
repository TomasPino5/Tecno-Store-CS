const stripe = require("stripe")(
    "sk_test_51NcvqGCNUAoI7WlfYdjceaTV47v9U1dGeTSVFPqhmgJ1fJF6vWO84ER7VQater3g88Xx4Gs4TayyCGDff2Au0h7T00nAgIEDyr"
  );

  const postPago= async(req, res)=>{

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
  }

  module.exports = postPago;