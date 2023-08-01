const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const Products = sequelize.define('products',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    href:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imageSrc:{
        type: DataTypes.STRING,
        allowNull:false
    },
    imageAlt:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = Products;