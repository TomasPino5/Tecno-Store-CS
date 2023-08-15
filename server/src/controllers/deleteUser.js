const Users = require("../models/users.js");

const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    await user.destroy();
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteUser;
