const Joi = require("joi");

const createPostValidate = Joi.object({
  description: Joi.string().required(),
  text: Joi.string(),
  photo: Joi.any(),
  geolocation: Joi.object({
    altitude: Joi.string(),
    accuracy: Joi.string(),
    altitudeAccuracy: Joi.string(),
    heading: Joi.string(),
    latitude: Joi.string(),
    longitude: Joi.string(),
    speed: Joi.string(),
  }),
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
