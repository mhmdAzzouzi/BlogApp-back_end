const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userSchema, updateUserSchema } = require("../utils/validation_schema");

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
    const user = await User.findOne({ where: { uuid: req.params.uuid } });
    if (user) return res.status(200).json(user);
    return res.status(404).json({ message: "User not found!" });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const add = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      verified,
      profileImage,
    } = req.body;

    let validate = await userSchema.validateAsync(req.body);

    let findUser = await User.findOne({ where: { email } });

    if (findUser)
      return res.status(400).send({ message: "User Already Exists" });

    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified,
      profileImage,
    });

    if (user) {
      let token = jwt.sign(
        {uuid:user.uuid, firstName: user.firstName, email: user.email, verified: user.verified },
        process.env.JWT_SECRET,
        { expiresIn: "1800s" }
      );
      return res.status(200).send({ user, token });
    }
  } catch (error) {
    if (error.isJoi == true)
      return res.status(422).send({   message: error.message   });
    return res.status(500).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    let { firstName, lastName, email } = req.body;
    const validate = await updateUserSchema.validateAsync(req.body);
    const user = await User.findOne({ where: { uuid: req.params.uuid } });
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }
    user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
    });
    return res.status(200).send(user);
  } catch (error) {
    if (error.isJoi)
      return res.status(422).send({ message: error.message });
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { uuid: req.params.uuid } });
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }
    user.destroy();
    return res.status(200).send({ message: "user deleted !" });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  list,
  getById,
  add,
  update,
  deleteUser,
};
