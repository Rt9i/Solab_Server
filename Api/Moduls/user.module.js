const { Schema, model } = require("mongoose");

// Define the product schema
const productSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId, // Use ObjectId for MongoDB references
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
  },
  taste: {
    type: String,
  },
  img: {
    type: String, // URL to the image
  },
  dis: {
    type: String,
  },
  category: {
    type: String,
  },
  petType: {
    type: [String], // Array of pet type strings
  },
  quantity: {
    type: Number,
    required: true,
  },
  saleAmmount: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },
});

// Define the user schema
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
  products: [productSchema], // Array of product subdocuments
});

const USER_MODEL = model("User", UserSchema);

module.exports = USER_MODEL;
