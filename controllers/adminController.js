const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Admin = require("../models/admin");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

exports.registerAdmin = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const adminAlreadyExists = await Admin.findOne({ email });

    if (adminAlreadyExists) {
      throw new CustomError.BadRequestError("Email is already registered");
    }

    const user = await Admin.create({ first_name, last_name, email, password });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new CustomError.BadRequestError(
        "Please provide email and password"
      );
    }
    const user = await Admin.findOne({ email });

    if (!user) throw new CustomError.BadRequestError("Not Found");

    const passwordIsCorrect = await user.comparePassword(password);
    if (!passwordIsCorrect)
      throw new CustomError.BadRequestError("Invalid Credentials");

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
