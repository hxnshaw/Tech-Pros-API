const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  registerStudent,
  loginStudent,
  getStudentProfile,
  getSingleStudent,
  getAllStudents,
} = require("../controllers/studentController");

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.route("/profile").get(authenticateUser, getStudentProfile);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getSingleStudent);

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllStudents);

module.exports = router;
