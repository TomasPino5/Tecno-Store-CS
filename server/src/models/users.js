const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const Users = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = Users;