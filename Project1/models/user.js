const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please enter a valid email address",
      },
    },
    gender: {
      type: String,
      required: true,
      //enum: ["Male", "Female", "Other"],
    },
    job_title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
const User = mongoose.model("user", userSchema)

module.exports = User