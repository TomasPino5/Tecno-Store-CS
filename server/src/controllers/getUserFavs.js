const Favorites = require('../models/favorites');

const getUserFavs = async (req, res) => {
    try {
        const { email } = req.params
        let user = email
        const favorites = await Favorites.findAll({where:{user}});
        res.status(200).json(favorites)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = getUserFavs;