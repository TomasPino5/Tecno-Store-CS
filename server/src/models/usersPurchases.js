const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const UsersPurchases = sequelize.define('usersPurchases', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productBrand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totalPurchase: {
        type: DataTypes.FLOAT,
        allowNull: true
    }

}, { timestamps: false });

module.exports = UsersPurchases;