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

  


const updateUserProducts = async (req, res) => {
  const userId = req.params.userId;
  const { cartItems } = req.body;

  if (!Array.isArray(cartItems)) {
    return res.status(400).json({ error: true, errorMessage: "cartItems must be an array" });
  }

  console.log('Received cartItems:', cartItems);

  try {
    const user = await USER_MODEL.findById(userId);

    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ error: true, errorMessage: "User not found" });
    }

    // Clear products if cartItems is empty
    if (cartItems.length === 0) {
      user.products = [];
    } else {
      // Map and validate cartItems
      user.products = cartItems.map(item => {
        if (!item.productId || !item.price || !item.quantity) {
          console.error('Invalid item found:', item);
          throw new Error('Invalid item data');
        }
        return {
          productId: item.productId,
          price: item.price,
          brand: item.brand,
          taste: item.taste,
          img: item.img,
          dis: item.dis,
          category: item.category,
          petType: item.petType,
          quantity: item.quantity,
          saleAmmount: item.saleAmmount,
          salePrice: item.salePrice,
        };
      });
    }

    console.log('User products after update:', user.products);

    const updatedUser = await user.save();

    console.log('User document saved:', updatedUser);

    res.status(200).json({ message: "User products updated successfully" });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: true, errorMessage: "Internal Server Error" });
  }
};







const updateUserProductsTest = async (req, res) => {
    const {_id,updated} = req.body;
    try {
      const user =await USER_MODEL.updateOne({_id},updated,{runValidators:true})
      res.status(200).json({ 
        message: "User products updated successfully",
        updated: user
      });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({
         errorMessage: "Internal Server Error" ,
         message:error.message
        });
    }
  };
  
  

const getUserProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await USER_MODEL.findById(id).lean(); // Use .lean() to get plain JavaScript objects

    if (!user) {
      return res.status(404).json({ error: true, errorMessage: "User not found" });
    }

    // Extract products with quantities
    const productsWithQuantities = user.products.map(product => ({
      ...product,
      quantity: product.quantity || 0 // Default quantity to 0 if not present
    }));

    res.status(200).json({ products: productsWithQuantities });
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
  updateUserProductsTest
};
