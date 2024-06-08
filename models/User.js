const mongoose = require("mongoose");

const schema = mongoose.Schema;

// user schema

const userSchema = new schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamp: true }
);

const userModelSchema = mongoose.model("user", userSchema);

module.exports = {
  userModelSchema,
};
