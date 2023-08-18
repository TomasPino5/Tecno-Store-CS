const Ratings = require("../models/ratings.js");

const getUserRating = async (req, res) => {
    const { email, productId } = req.query;
    //console.log(email, productId)
    if (email && productId) {
        try {
            const ratings = await Ratings.findOne({ where: { user: email, productId: productId } })
            if (ratings) {
                res.status(200).json(ratings)
            }
        }
        catch (error) {
            res.status(500).json(error.message)
        }
    }
    else if (productId) {
        try {
            const allRatings = await Ratings.findAll({ where: { productId: productId } })
            if (allRatings) {
                res.status(200).json(allRatings)
            }
        } catch (error) {
            res.status(500).send('Todavia no hay reviews')
        }
    }
    else if (email) {
        try {
            const allRatings = await Ratings.findAll({ where: { user: email } })
            if (allRatings) {
                res.status(200).json(allRatings)
            }
        } catch (error) {
            res.status(500).send('Todavia no hay reviews')
        }
    }
    else { res.status(500).send('Todavia no hay reviews') }
}

module.exports = getUserRating;