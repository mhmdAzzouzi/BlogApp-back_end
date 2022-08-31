const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {loginSchema} = require("../utils/validation_schema")

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let validation= await loginSchema.validateAsync(req.body)

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).send({ message: "Incorrect email or password" });

    let checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(404).send({ message: "Incorrect email or password" });

    const token = jwt.sign(
      { uuid: user.uuid , firstName: user.firstName, email: user.email , verified: user.verified},
      process.env.JWT_SECRET,
      { expiresIn: "1800s" }
    );

    return res.status(200).send({ user, token });
  } catch (error) {
    if(error.isJoi){
      return res.status(400).send({message: "Please enter a valid email"})
    }
    return res
      .status(500)
      .send({ message: "something went wrong :( " } + error);
  }
};

module.exports = { login };
