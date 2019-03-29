const Joi = require("joi");

const validuser = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .required(),
  fname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  lname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  gender: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});

const validpost = Joi.object().keys({
  token: Joi.string()
    .alphanum()
    .required(),
  head: Joi.string()
    .alphanum()
    .min(20)
    .max(200)
    .required(),
  body: Joi.string()
    .alphanum()
    .min(10)
    .max(200)
    .required(),
  likes: Joi.string()
    .alphanum()
    .required()
});
const validUser = data => {
  Joi.validate(data, validuser, (err, value) => {
    if (err) {
      // send a 422 error response if validation fails
      return false;
    } else {
      // send a success response if validation passes
      // attach the random ID to the data response
      return true;
    }
  });
};
const validPost = data => {
  Joi.validate(data, validpost, (err, value) => {
    if (err) {
      // send a 422 error response if validation fails
      return false;
    } else {
      // send a success response if validation passes
      // attach the random ID to the data response
      return true;
    }
  });
};
module.exports = { validUser, validPost };
