const Favorites = require("../models/favorites");

const postFav = async (req, res) => {

    const { user, productId, product } = req.body; //, picture
    const products = [product]
    //console.log(user, productId, products)
    try {
        await Favorites.create({ user, productId, products });
        res.status(200).json({ message: 'Favorito añadido...' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = postFav;