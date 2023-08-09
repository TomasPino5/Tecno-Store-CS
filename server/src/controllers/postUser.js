const Users = require('../models/users.js');

const postUser = async(req, res)=>{
    const {name, email, email_verified, picture} = req.body;
    try{
        const userEmail = await Users.findOne({where:{email}});
        const userName = await Users.findOne({where:{name}});
        if(userEmail || userName){
            res.status(409).json({message:'Ya existe un usuario con esos datos'});
        }
        else{
            await Users.create({name, email, email_verified, picture});
            res.status(200).json({ message: 'Usuario creado...'});
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
   }
}

module.exports = postUser;