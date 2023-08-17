const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const Ratings = sequelize.define('ratings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, { timestamps: false });

module.exports = Ratings;