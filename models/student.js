const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const StudentSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please Provide Your First Name"],
      trim: true,
    },
    middle_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Please Provide Your Last Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide Your Email Address"],
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please Provide a Valid Email Address",
      },
    },
    phone_number: {
      type: String,
      required: [true, "Please Provide Your Phone Number"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Create A Password"],
      trim: true,
    },
    role: {
      type: String,
      default: "student",
    },
    courses: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//Hash Student Password
StudentSchema.pre("save", async function () {
  const student = this;
  if (!student.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);
});

//Check if password is correct
StudentSchema.methods.comparePassword = async function (studentPassword) {
  const student = this;
  const isMatch = await bcrypt.compare(studentPassword, student.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  return isMatch;
};

module.exports = mongoose.model("Student", StudentSchema);
