const Course = require("../models/course");
const Student = require("../models/student");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

exports.createCourse = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const course = await Course.create({
      ...req.body,
    });
    res.status(StatusCodes.CREATED).json({ course });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.getSingleCourse = async (req, res) => {
  const { id: courseId } = req.params;
  try {
    const course = await Course.findOne({ _id: courseId }).populate({
      path: "students",
    });
    if (!course) {
      throw new CustomError.NotFoundError(`Course Not Found`);
    }
    res.status(StatusCodes.OK).json({ data: course });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.courseEnrollment = async (req, res) => {
  const { id: courseId } = req.params;
  try {
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      throw new CustomError.NotFoundError(`Course Not Found`);
    }
    const user = await Student.findOne({ _id: req.user.userId });

    //check if the user already subscribed to the course.
    //If the user subscribes,add the user id to the courses array, and add the course to the user profile.
    if (
      !user.courses.includes(courseId) &&
      !course.students.includes(req.user.userId)
    ) {
      await user.updateOne({ $push: { courses: courseId } });
      await course.updateOne({ $push: { students: req.user.userId } });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: `You have subscribed to course ${courseId}` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    if (courses === null) {
      throw new CustomError.NotFoundError(`Course Not Found`);
    }
    res.status(StatusCodes.OK).json({ courses });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
