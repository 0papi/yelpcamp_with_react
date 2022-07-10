const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const verifySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  verifyToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

verifySchema.pre("save", async function (next) {
  if (this.isModified("verifyToken")) {
    const hash = await bcrypt.hash(this.verifyToken, 8);
    this.verifyToken = hash;
  }
  next();
});

verifySchema.methods.compareVerifyToken = async function (verifyToken) {
  const result = await bcrypt.compare(verifyToken, this.verifyToken);
  return result;
};

module.exports = mongoose.model("VerificationToken", verifySchema);
