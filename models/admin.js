const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please Provide a First Name"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Please Provide a Last Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide an Email Address"],
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Please Provide a Password"],
      trim: true,
      minlength: 7,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

//Hash Admin Password
AdminSchema.pre("save", async function () {
  const admin = this;
  if (!admin.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
});

//Check If Password Is Correct
AdminSchema.methods.comparePassword = async function (adminPassword) {
  const admin = this;
  const isMatch = await bcrypt.compare(adminPassword, admin.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials...");
  }
  return isMatch;
};

module.exports = mongoose.model("Admin", AdminSchema);
