const USER_MODEL = require("../Moduls/user.module");

const getUserByName = async (req, res) => {
    const { name } = req.body;
    try {
        const users = await USER_MODEL.find({ name: req.body.name });
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: true, errorMessage: e.message });
    }
};
const getUserByID = async (req, res) => {
    const { id } = req.body;
    try {
        const users = await USER_MODEL.findById(id);
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: true, errorMessage: e.message });
    }
};

const logIn = async (req, res) => {
    const { number, pass } = req.body

    const user = await USER_MODEL.find({ phoneNumber: number })
    if (!user) {
        res.status(310).json({ error: true, errorMessage: "no user" });
    }
    if (user.pass == pass) {
        res.status(200).json({ auth: true, user: user })
    } else {
        res.status(403).json({ auth: false, message: "not authorized" })
    }
}

const getAllUsers = async (req, res) => {

    try {
        const users = await USER_MODEL.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: true, errorMessage: e.message });
    }
};

const createUser = (req, res) => {
    const { userID, name, phoneNumber } = req.body;
    console.log("inside");

    USER_MODEL.create({
        name: name,
        userID: userID,
        phoneNumber: phoneNumber,
    })
        .then((Cres) => {
            res.status(200).json({ user: Cres });
        })
        .catch((e) =>
            res.status(500).json({ error: true, errorMessage: e.message })
        );
};
const whatsMyName = (req, res) => {
    const { name, lastName } = req.body;
    console.log("req : ", req.body);
    if (!name || !lastName) {
        res.status(400).json({
            error: true,
            errorMessage: "Name and LastName must be submitted"
        });
        return;
    }
    res.status(200).json({
        myName: name,
        myLastName: lastName,
        myFullName: `${name} ${lastName}`,
    });
}
module.exports = {
    createUser,
    whatsMyName,
    getUserByName,
    getUserByID,
    getAllUsers,
    logIn,
};