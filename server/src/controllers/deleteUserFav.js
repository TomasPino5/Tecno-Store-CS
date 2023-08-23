const Favorites = require("../models/favorites");

const deleteUserFav = async (req, res) => {
    const { email, productId } = req.query;
    //console.log(email, productId)
    try {
        const fav = await Favorites.findOne({ where: { user: email, productId: productId  } });
        //console.log(fav)
        if (!fav) {
            return res.status(404).json({ message: "Favorito no encontrado" });
        }

        await fav.destroy();
        const favorites = await Favorites.findAll({where:{user:email}});
        res.status(200).json( favorites );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = deleteUserFav;