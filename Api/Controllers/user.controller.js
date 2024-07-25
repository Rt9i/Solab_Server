const USER_MODEL = require("../Moduls/user.module");

const getUserByName = async (req, res) => {
  const { name } = req.body;
  try {
    const users = await USER_MODEL.find({ name });
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: true, errorMessage: e.message });
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await USER_MODEL.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ error: true, errorMessage: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: true, errorMessage: e.message });
  }
};

const bcrypt = require("bcrypt");

const logIn = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await USER_MODEL.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        error: true,
        errorMessage: "No user found with this phone number",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.status(200).json({ auth: true, user });
    } else {
      return res.status(403).json({ auth: false, message: "Invalid password" });
    }
  } catch (e) {
    res.status(500).json({ error: true, errorMessage: e.message });
  }
};

const createUser = async (req, res) => {
  const { userName, phoneNumber, password } = req.body;

  if (!userName || !phoneNumber || !password) {
    return res
      .status(400)
      .json({ error: true, errorMessage: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await USER_MODEL.create({
      userName,
      phoneNumber,
      password: hashedPassword,
    });
    res.status(201).json({ user });
  } catch (e) {
    res.status(500).json({ error: true, errorMessage: e.message });
  }
};
// Update cart data on server
const updateCartOnServer = async (userId, cartItems) => {
  try {
    const response = await appFetch("/updateUserProducts", "POST", {
      userId,
      cartItems,
    });
    console.log("Server response:", response);
  } catch (error) {
    console.error("Failed to update cart on server:", error);
  }
};

const updateUserProducts = async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    const user = await USER_MODEL.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.products = cartItems;
    await user.save();

    res.status(200).send("User products updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserProducts = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await USER_MODEL.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ error: true, errorMessage: "User not found" });
      }
      res.status(200).json({ products: user.products });
    } catch (e) {
      res.status(500).json({ error: true, errorMessage: e.message });
    }
  };
  

const getAllUsers = async (req, res) => {
  try {
    const users = await USER_MODEL.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: true, errorMessage: e.message });
  }
};

const whatsMyName = (req, res) => {
  const { name, lastName } = req.body;
  if (!name || !lastName) {
    return res.status(400).json({
      error: true,
      errorMessage: "Name and LastName must be submitted",
    });
  }
  res.status(200).json({
    myName: name,
    myLastName: lastName,
    myFullName: `${name} ${lastName}`,
  });
};

module.exports = {
  createUser,
  whatsMyName,
  getUserByName,
  getUserByID,
  getAllUsers,
  logIn,
  updateUserProducts,
  getUserProducts,
  updateCartOnServer,
};
