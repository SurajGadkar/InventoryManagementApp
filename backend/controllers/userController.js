const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  if (password.length < 6) {
    throw new Error("Password must be atleast 6 characters");
  }

  // validate if user email already exists.
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exists.");
  }

  //Create new user
  const user = await User.create({
    // can write only name, email, password, if key and value pair are same
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    const { _id, name, email, phone, photo, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user details.");
  }
});

module.exports = {
  registerUser,
};
