const jwt = require("jsonwebtoken");

const {
  ConflictError,
  ValidateError,
  AutorizationError,
} = require("../middleware/errorHandler");
const {
  userRegValidate,
  userLoginValidate,
} = require("../schemas/userValidate");
const {
  registrationService,
  loginService,
  logoutService,
} = require("../services/authService");

const registrationController = async (req, res, next) => {
  const requestValidate = userRegValidate.validate(req.body);
  const body = req.body;

  if (!requestValidate.error) {
    const data = await registrationService(body);
    if (data) {
      return res.status(201).json({
        message: "created",
        code: 201,
        data,
      });
    } else {
      throw new ConflictError("Email is already in use");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

const loginController = async (req, res, next) => {
  const requestValidate = userLoginValidate.validate(req.body);
  const { email, password } = req.body;
  if (!requestValidate.error) {
    const data = await loginService(email, password);
    if (!data) {
      throw new AutorizationError("email or password is wrong");
    }
    return res.status(200).json({
      message: "logged successful",
      code: 200,
      data,
    });
  } else throw new ValidateError(requestValidate.error);
};

const logoutController = async (req, res, next) => {
  const _id = req.user._id;
  console.log(_id);
  const result = await logoutService(_id);
  if (result) {
    return res.status(204).json({
      message: "logout successful",
      code: 204,
    });
  } else throw new AutorizationError("Logined user not found");
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
