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
  updateCartOnServer,
} = require("../Controllers/user.controller");

const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.post("/whatsMyName", whatsMyName);
userRouter.get("/getUserByName", getUserByName);
userRouter.get("/getUserByID/:id", getUserByID);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/logIn", logIn);
userRouter.post("/updateUserProducts", updateUserProducts);
userRouter.get("/getUserProducts/:userId", getUserProducts);
userRouter.get("/updateCartOnServer/:userId", updateCartOnServer);

module.exports = userRouter;
