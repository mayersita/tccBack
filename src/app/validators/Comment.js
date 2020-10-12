const Joi = require('joi');

module.exports = {
  body: {
    story: Joi.string().required(),
    user: Joi.string().required(),
    description: Joi.string().required(),
    votes: Joi.number().required(),
  },
};
