const { Schema, model } = require("mongoose");

// Product schema to match the item structure
const productSchema = new Schema({
  productId: { // Renamed from id to avoid confusion with MongoDB's _id
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    default: '',
  },
  taste: {
    type: String,
    default: '',
  },
  img: {
    type: String, // URL to the image
    default: '',
  },
  dis: {
    type: String,
    default: '',
  },
  category: {
    type: [String], // Array of category strings
    default: [],
  },
  petType: {
    type: [String], // Array of pet type strings
    default: [],
  },
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
