const Users = require('../models/users.js');

const getUser = async(req, res)=>{
    const {email} = req.body;
    try{
        const userEmail = await Users.findOne({where:{email}});
        res.status(200).json(userEmail);
    }
    catch(error){
        status(500).json({message: error.message});
    }
}

module.exports = getUser;