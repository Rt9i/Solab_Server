const { Schema, model } = require("mongoose");
// mongoose is for the node.js
// shcema is a class
const productSchema = new Schema({
  image: { type: String },
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

const UserSchema = new Schema({
  userName: {
    name: String,
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
    type: [productSchema], // product schema
    default: [],
  },
});
const USER_MODEL = model("user", UserSchema);
// model is the brige between the server and the data base  through the user model i can go to the data base for the users in the moongsedb
// "user" is the collection that you wanna save the data in wich is the UserSchema
module.exports = USER_MODEL;
