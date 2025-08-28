const User = require("../models/User");
// import handleRequest from "../middleware/handleRequest.js"
const handleRequest = require("../middleware/handleRequest.js");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  handleRequest(req, res, async (req) => {
    const { name, password} = req.body;
    const newUser = await User.create({
      name,
      password,
    });
    return newUser;
  });
};

exports.signInUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({
      name: name,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.ping = async (req, res) => {
  try {
    res.status(200).json({ message: "API Alive" });
  } catch (error) {
    res.staus(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
handleRequest(req, res, async(req) => {
   const { userId } = req.params; // Extract ID from URL params
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return user;
})
};
