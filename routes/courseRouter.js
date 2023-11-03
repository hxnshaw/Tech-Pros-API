const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  createCourse,
  getSingleCourse,
  courseEnrollment,
  getAllCourses,
} = require("../controllers/courseController");

router.route("/all-courses").get(authenticateUser, getAllCourses);

router
  .route("/create-new-course")
  .post(authenticateUser, authorizePermissions("admin"), createCourse);

router.route("/:id").get(authenticateUser, getSingleCourse);

router.route("/:id/subscribe").patch(authenticateUser, courseEnrollment);

module.exports = router;
