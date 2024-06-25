const { Router } = require("express");
const { createUser, whatsMyName, getUserByName, getUserByID, getAllUsers, logIn } = require("../Controllers/user.controller");

const userRouter = Router()

userRouter.post('/createUser', createUser) 
userRouter.post('/whatsMyName', whatsMyName)
userRouter.get('/getUserByName', getUserByName)
userRouter.get('/getUserByID', getUserByID)
userRouter.get('/getAllUsers', getAllUsers)
userRouter.post('/logIn', logIn)
module.exports = userRouter