const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true,  match: [/^[a-zA-Z0-9._%+-]+@firs\.gov\.ng$/, "Please use your official firs.gov.ng email address"] },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  },
  role: { type: String, required:true, enum: ["admin", "user", "security"], default: "user" },
  ir_no: {type: String, required: true},
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


// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // skip if password hasn't changed

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
