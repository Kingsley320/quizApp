const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  },
  role: { type: String, enum: ["admin", "user", "security"], default: "user" },
  ir_no: {type: Number, required: true},
  rank: {type: String, required: true, },
  department: {type: String, required: true},
  createdAt: {
    type: Date,
    default: () => {
      const offset = 1 * 60;
      return new Date(Date.now() + offset * 60 * 1000);
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      const offset = 1 * 60;
      return new Date(Date.now() + offset * 60 * 1000);
    },
  },
});

module.exports = mongoose.model("User", userSchema);
