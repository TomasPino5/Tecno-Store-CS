const data = require('../data.js');
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
    },
    direction:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    telefone:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    email_verified:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    picture:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    timestamps: false
});

module.exports = Users;