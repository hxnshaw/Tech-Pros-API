const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Student = require("../models/student");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

exports.registerStudent = async (req, res) => {
  const { first_name, middle_name, last_name, email, phone_number, password } =
    req.body;
  try {
    const studentAlreadyExists = await Student.findOne({ email });

    if (studentAlreadyExists) {
      throw new CustomError.BadRequestError("Email is already registered");
    }

    const user = await Student.create({
      first_name,
      middle_name,
      last_name,
      email,
      phone_number,
      password,
    });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new CustomError.BadRequestError(
        "Please provide email and password"
      );
    }
    const user = await Student.findOne({ email });

    if (!user) throw new CustomError.BadRequestError("Not Found");

    const passwordIsCorrect = await user.comparePassword(password);
    if (!passwordIsCorrect)
      throw new CustomError.BadRequestError("Invalid Credentials");

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

//Individual students can view their profile
exports.getStudentProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await Student.findOne({ _id: userId });

    if (!user) {
      throw new CustomError.NotFoundError(`Student Not Found`);
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ data: tokenUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.getSingleStudent = async (req, res) => {
  const { id: studentId } = req.params;
  try {
    const user = await Student.findOne({ _id: studentId }).select("-password");
    if (!user) {
      throw new CustomError.NotFoundError(`Student Not Found`);
    }
    res.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).select("-password");
    if (students === null) {
      throw new CustomError.NotFoundError(`Students Not Found`);
    }
    res.status(StatusCodes.OK).json({ count: students.length, data: students });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
