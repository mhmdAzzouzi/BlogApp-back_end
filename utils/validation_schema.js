const joi = require("joi");

const userSchema = joi.object({
  firstName: joi.string().max(10).required(),
  lastName: joi.string().max(10).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.ref("password"),
  verified: joi.boolean(),
  image: joi.string(),
});

const updateUserSchema = joi.object({
    firstName: joi.string().max(10).required(),
  lastName: joi.string().max(10).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(6),
  confirmPassword: joi.ref("password"),
  verified: joi.boolean(),
  image: joi.string(),
})
module.exports = {
  userSchema,
  updateUserSchema
};
