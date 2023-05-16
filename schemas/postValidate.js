const Joi = require("joi");

const createPostValidate = Joi.object({
  description: Joi.string().required(),
  text: Joi.string(),
  photo: Joi.any(),
  geolocation: Joi.string(),
});

const patchPostValidate = Joi.object({
  description: Joi.string(),
  text: Joi.string(),
  photo: Joi.any(),
});

const addCommentValidate = Joi.object({
  text: Joi.string().required(),
});

module.exports = { createPostValidate, patchPostValidate, addCommentValidate };
