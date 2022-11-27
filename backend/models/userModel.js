const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email address is required!"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [6, "Password must be atleast 6 characters!"],
      maxLength: [23, "Password can only be upto 23 characters!"],
    },
    photo: {
      type: String,
      required: [true, "Please add a profile image"],
      default: "avatar link",
    },
    phone: {
      type: String,
      default: "+91",
    },
    bio: {
      type: String,
      maxLength: [250, "Keep Bio short, no more than 250 characters"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
