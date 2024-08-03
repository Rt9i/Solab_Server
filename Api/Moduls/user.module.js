const { Schema, model } = require("mongoose");

// Product schema
const productSchema = new Schema({
  productId: {
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
    type: [String], 
    default: [],
  },
  quantity: { // Add quantity field
    type: Number,
    default: 1,
  },
});


const Product = model("Product", productSchema);

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
  products: [productSchema], // Use productSchema as a subdocument
});

const User = model("User", UserSchema);

module.exports = User;
