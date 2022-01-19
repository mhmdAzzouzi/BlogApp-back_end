const { User } = require("../models");

const list = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) return res.status(200).json(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) return res.status(200).json(user);
    return res.status(404).json({ message: "User not found!" });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const add = async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      verified: false,
      profileImage: req.body.profileImage,
    });
    if (user) return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }
    user.update({
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      email: req.body.email || user.email,
    });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }
    user.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  list,
  getById,
  add,
  update,
  deleteUser
};
