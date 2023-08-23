const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const Favorites = sequelize.define('favorites', {

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
    products: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    
}, {
    timestamps: false
});


module.exports = Favorites;