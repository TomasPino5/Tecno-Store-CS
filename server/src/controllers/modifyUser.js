const Users = require("../models/users.js");

const modifyUser = async (req, res) => {
  const { email } = req.params;
  console.log(email)
  const { name, direction, telefone } = req.body; //, picture
  console.log(name, direction, telefone)
  const user = await Users.findOne({where:{email}})
  const id = user.id;
  console.log(id)
  try {
      const user = await Users.findByPk(id);
      user.name = name,
      user.direction = direction,
      user.telefone = telefone,
      //user.picture = picture,
      await user.save();
      res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = modifyUser