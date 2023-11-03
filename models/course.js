const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PLEASE PROVIDE A TITLE FOR THE COURSE"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, "PLEASE PROVIDE A DESCRIPTION FOR THE COURSE"],
      trim: true,
      maxlength: 150,
    },
    students: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
