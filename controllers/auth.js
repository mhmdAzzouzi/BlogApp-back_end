const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).send({ message: "incorrect email or password" });

    let checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(404).send({ message: "incorrect email or password" });

    const token = jwt.sign(
      { firstName: user.firstName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1800s" }
    );

    return res.status(200).send({ user, token });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "something went wrong :( " } + error);
  }
};

module.exports = { login };
