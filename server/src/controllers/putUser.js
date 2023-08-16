const Users = require("../models/users.js");

const putUser = async(req, res)=>{
    const {id} = req.params;
    try{
        const user = await Users.findByPk(id);
        if(user.isActive === true){
            user.isActive = false
        }
        else{
            user.isActive = true
        }
        await user.save();
        const prod = await Users.findAll();
        res.status(200).json(prod);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = putUser