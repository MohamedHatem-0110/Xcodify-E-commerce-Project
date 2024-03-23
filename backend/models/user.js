const { Schema, model } = require("mongoose");
const { generateObjectFromSchemaPaths } = require("../util/generalUtil");
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
  },
  password: {
    type: String,
    required: true,
  },
  address: String,
  city: String,
  country: String,
  zipCode: String,
  phoneNumber: String,
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  authToken: String,
});

module.exports = {
  userModel: model("Users", userSchema),
};
