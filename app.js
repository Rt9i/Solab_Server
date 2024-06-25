const express = require("express")
var cors = require("cors")
const mongoose = require("mongoose")

const Routes = require("./Api/Routes/Routes");
const app = express()
app.use(cors());
app.use(express.json());
app.use('/', Routes)

// const openPhoneCamera = async () => {
//     try {
//         const cameraRes = await openCamera();
//         console.log("cameraRes: ", cameraRes);
//     } catch (e) {
//     }
// }

const mongooseLink =
    "mongodb+srv://Rt9i:RZn0mnH0s9fUW3Lt@cluster0.823owgn.mongodb.net/"
mongoose.connect(mongooseLink)
mongoose.connection.on("connected", () => {
    console.log("mongo connected")
}) 

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err); 
});

app.get("/app", (req, res) => {
    res.status(200).json({
        user: "Rt9i",
    })
})

module.exports = app 