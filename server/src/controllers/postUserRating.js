const Ratings = require("../models/ratings.js");

const postUserRating = async (req, res) => {
    const { user, productId, rating } = req.body
    console.log(user, productId, rating)
    try {
        await Ratings.create({ user, productId, rating });
        res.status(200).json({ message: 'Calificacion cargada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = postUserRating