const Joi = require('joi');

const registerUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8) // Password must be at least 8 characters long
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\|[\]\/~])/,
      { name: 'password' }
    )
    .error(
      new Error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      )
    ),
    firstName: Joi.string().required(),
    lastName : Joi.string().required(),
});

const registerUserV1Validation = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string()
    .min(8) // Password must be at least 8 characters long
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\|[\]\/~])/,
      { name: 'password' }
    )
    .error(
      new Error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      )
    ),
    first_name: Joi.string().required(),
    last_name : Joi.string().required(),
    uid:Joi.string().required(),
    os:Joi.string(),
    app_version: Joi.string(),
    device_model: Joi.string(),
});


const loginUserV1Validation = Joi.object().keys({
    uid:Joi.string().required(),
    os:Joi.string(),
    app_version: Joi.string(),
    device_model: Joi.string(),

});

const loginUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});

const checkUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string()
    .min(8) // Password must be at least 8 characters long
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\|[\]\/~])/,
      { name: 'password' }
    )
    .error(
      new Error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      )
    ),
});

const resetPasswordValidation = Joi.object().keys({
  token: Joi.string().required(), 
  password: Joi.string()
    .min(8) // Password must be at least 8 characters long
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\|[\]\/~])/,
      { name: 'password' }
    )
    .error(
      new Error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      )
    ),
});

const resetPasswordEmailValidation = Joi.object().keys({
  email: Joi.string().required().email(),
});

const refreshTokenValidation = Joi.object().keys({
  user_id: Joi.string().required(),
  refresh_token: Joi.string().required()
});
module.exports = {
  registerUserValidation,
  loginUserValidation,
  refreshTokenValidation,
  resetPasswordEmailValidation,
  registerUserV1Validation,
  checkUserValidation,
  loginUserV1Validation,
  resetPasswordValidation
};
