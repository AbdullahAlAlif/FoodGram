const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

async function registerUser(req, res) {
  try {
    // Extract user details from request body
    const { fullname, email, password } = req.body;
    // Check if user already exists
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hash password before saving (omitted for brevity)
    const hashedPassword = await bcrypt.hash(password, 10); //install bcryptjs if not done
    // create new user
    // const newUser = new userModel({ fullname, email, password: hashedPassword });
    // await newUser.save();
    const user = await userModel.create({ fullname, email, password: hashedPassword });//shortcut to create and save 
    //we need to create token of the user and save it in cookies
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({
       message: "User registered successfully",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email
       }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true });
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email
    }
  });
}

module.exports = { registerUser, loginUser }; //there will be a lot of controllers so we will export all as object