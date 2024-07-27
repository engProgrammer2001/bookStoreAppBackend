const generateToken = require("../config/jwtProvider");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  // username length should be greater than 4 characters
  // password length should be greater than 6 characters
  // email is valid
  // username already exists
  // email already exists

  try {
    // assuming the req.body contains all the user data
    const { username, email, password, address, role, number } = req.body;

    // check if username length is greater than 4
    if (username.length < 4) {
      return res.status(400).json({
        message: "username length should be greater than 4 characters",
      });
    }

    // check if password length is greater than 8
    if (password.length < 6) {
      return res.status(400).json({
        message: "password length should be greater than 6 characters",
      });
    }

    // check if email is valid
    if (!email.includes("@")) {
      return res.status(400).json({ message: "email is invalid" });
    }

    // check if username already exists
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "username already exists, You can Login" });
    }

    // check if email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      address: address,
      role: role,
      number: number,
    });
    const savedUser = await newUser.save();
    // console.log("user created successfully", savedUser);
    const payload = {
      id: savedUser._id,
    };
    // console.log("payload", JSON.stringify(payload));
    const token = generateToken(payload);
    // console.log("token_is : ", token);

    return res.status(201).json({
      message: "user created successfully",
      data: savedUser,
      token: token,
    });
  } catch (error) {
    console.log("user registration controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// login API's
const login = async (req, res) => {
  try {
    // assuming the req.body contains all the user data
    const { username, password } = req.body;

    // if username not exist
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username or password is missing" });
    }

    // find the user using username
    const user = await User.findOne({ username: username });
    // if user not found
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const payload = {
      id: user._id,
    };
    // console.log("payload", JSON.stringify(payload));
    const token = generateToken(payload);

    await bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        return res
          .status(200)
          .json({ message: "login successful", data: user, token: token });
      } else {
        return res.status(401).json({ message: "invalid Password" });
      }
    });
  } catch (error) {
    console.log("login controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserprofile = async (req, res) => {
  try {
    // extract userid from req.user
    const userId = req.user.userId.id;

    // find the user using userid
    const user = await User.findById(userId).select("-password");

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "user not found with this id" });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.log("profile controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const changePassword = async (req, res) => {
  try {
    // extract userid from req.user
    const userId = req.user.userId.id;
    const { password, newPassword } = req.body;

    // find the user using userid
    const user = await User.findById(userId);

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "user not found with this id" });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "invalid password" });
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ message: "password changed successfully", user: user });
  } catch (error) {
    console.log("change password controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update address
const updateAddress = async (req, res) => {
  try {
    const userId = req.user.userId.id;
    const { address } = req.body;

    // find the user using userid
    const user = await User.findByIdAndUpdate(userId, { address: address });
    if(!user){
      return res.status(404).json({ message: "user not found with this id" });
    }
    return res.status(200).json({ message: "address updated successfully", user: user });
    
  } catch (error) {
    console.log("update address controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  getUserprofile,
  updateAddress,
};
