const jwt = require("jsonwebtoken");
require ("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = (userId) => {
    const token = jwt.sign({ userId: userId }, SECRET_KEY, {
        expiresIn: "5d",
    });
    return token;
}

module.exports = generateToken;