const Joi = require('joi');

module.exports = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
    password: Joi.string().required().min(6),
  },
};
