const Users = require('../models/users.js');

const postUser = async(req, res)=>{
    const {name, email} = req.body;
    try{
        if(!name || !email){
            res.status(400).send('Faltan datos');
        }
        else{
            const user = await Users.create({name, email});
            res.status(200).json(user);
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = postUser;