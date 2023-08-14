const UsersPurchases = require("../models/usersPurchases");

const postUserPurchase = async (req, res) => {
    
    const { user, picture, productName, productQuantity, productBrand, productPrice, totalPurchase } = req.body; //, picture

    try {
        await UsersPurchases.create({ user, picture, productName, productQuantity, productBrand, productPrice, totalPurchase });
        res.status(200).json({ message: 'Compra creada...' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = postUserPurchase