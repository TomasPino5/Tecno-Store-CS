const UsersPurchases = require("../models/usersPurchases");

const postUserPurchase = async (req, res) => {

    const { user, products } = req.body; //, picture
    //console.log(user, picture, productName, productQuantity, productBrand, productPrice, totalPurchase)
    try {
        await UsersPurchases.create({ user, products });
        res.status(200).json({ message: 'Compra creada...' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = postUserPurchase