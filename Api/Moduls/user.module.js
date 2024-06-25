const { Schema, model } = require("mongoose")
// mongoose is for the node.js
// shcema is a class
const productSchema = new Schema({
    name: String,
    price: Number,
    color: String,
})


const UserSchema = new Schema({
    name: String,
    pass: {
        type: String,
        required:true

    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    userID: {
        type: String,
        required: true

    },
    nickNames: {
        type: [String],
        default: []
    },
    products: {
        type: [productSchema],// product schema
        default: []
    }
})
const USER_MODEL = model('user', UserSchema)
// model is the brige between the server and the data base  through the user model i can go to the data base for the users in the moongsedb
// "user" is the collection that you wanna save the data in wich is the UserSchema
module.exports = USER_MODEL