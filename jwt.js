
const jwt = require("jsonwebtoken");
require ("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {

    // first I'll check that req.headers has authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: "Token not found" });
    }
    
    // if have authorization then I'll extract jwt token from req.headers
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        // if have token then I'll verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next();
        
    } catch (error) {
        console.log("jwtAuthMiddleware error", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = jwtAuthMiddleware;




