const UsersPurchases = require('../models/usersPurchases.js');
const Users = require('../models/users.js');

const getCompras = async(req, res)=>{
    try{
        const purchanses = await UsersPurchases.findAll();
        const users = await Users.findAll();
        const us = purchanses.map((element)=>{
            users.map((el)=>{
                if(el.email === element.user){
                    element.user={
                        email: el.email,
                        telefone: el.telefone,
                        direction: el.direction,
                    }
                }
            })
        })
        res.status(200).json(purchanses)
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = getCompras;