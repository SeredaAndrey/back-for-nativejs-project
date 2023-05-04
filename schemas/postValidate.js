const Joi = require("joi");

const createPostValidate = Joi.object({
  description: Joi.string().required(),
  text: Joi.string().required(),
  photo: Joi.any(),
  geolocation: Joi.string(),
});

const patchPostValidate = Joi.object({
  description: Joi.string(),
  text: Joi.string(),
  photo: Joi.any(),
  comments: Joi.array().items(
    Joi.object({
      user: Joi.string(),
      text: Joi.string(),
    })
  ),
});

module.exports = { createPostValidate, patchPostValidate };
