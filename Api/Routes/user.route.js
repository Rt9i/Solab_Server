const { Router } = require("express");
const {
  createUser,
  whatsMyName,
  getUserByName,
  getUserByID,
  getAllUsers,
  logIn,
  updateUserProducts,
  getUserProducts,
} = require("../Controllers/user.controller");

const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.post("/whatsMyName", whatsMyName);
userRouter.get("/getUserByName", getUserByName); // Use query parameters for GET requests
userRouter.get("/getUserByID/:id", getUserByID);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/logIn", logIn);
userRouter.post('/updateUserProducts/:userId', updateUserProducts);
userRouter.get("/getUserProducts/:id", getUserProducts);



module.exports = userRouter;
