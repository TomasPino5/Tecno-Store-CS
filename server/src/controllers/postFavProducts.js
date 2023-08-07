const Products = require('../models/product.js');
const Users = require('../models/users.js');

const postFavProducts = async(req, res)=>{
    const {productId, userId} = req.body;
    try{
        const product = await Products.findByPk(productId);
        const user = await Users.findByPk(userId);
        await user.addProducts(product);
        res.status(200).json({message: 'Se añadio a favoritos con exito...'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = postFavProducts