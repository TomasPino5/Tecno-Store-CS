const UsersPurchases = require('../models/usersPurchases');

const getUserPurchasesHandler = async (req, res) => {
    try {
        const { email } = req.params
        let user = email
        const userPurchases = await UsersPurchases.findAll({where:{user}});
        res.status(200).json(userPurchases)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = getUserPurchasesHandler