const { Schema, model } = require("mongoose");


const productSchema = new Schema({
  image: {
    type: String,
    default: "../photo/profileIcon.png",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: String,
  kg: Number,
});

// User schema
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  products: {
    type: [productSchema], // Array of products
    default: [],
  },
});

const USER_MODEL = model("user", UserSchema);

module.exports = USER_MODEL;
