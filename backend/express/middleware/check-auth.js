const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const {
    SECRET_KEY 
} = process.env;

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.usernameFromToken = jwt.decode(token).username;
        jwt.verify(token,SECRET_KEY);
        next();
    }
    catch (error) {
        res.status(401).json({message: "Auth Failed!"});
    }
}