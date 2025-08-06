const User = require("../models/User");
// import handleRequest from "../middleware/handleRequest.js"
const handleRequest = require("../middleware/handleRequest.js");

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
    const { name, email, password, ir_no, rank, department} = req.body;
    const newUser = await User.create({ name, email, password, ir_no, rank, department });
    return newUser;
  })
};

exports.signInUser = async (req, res) => {
  handleRequest(req, res, async (req) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user){
      
      if (user.password === password){
        console.log(user.password);
        
        return user;
      }
    }
  })
}

exports.ping = async (req, res) => {
  try {
    res.status(200).json({ message: "API Alive" });
  } catch (error) {
    res.staus(500).json({ message: error.message });
  }
};
