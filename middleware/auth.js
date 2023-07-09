const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const CustomError = require("./error");

const userAuthentication = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) throw new CustomError("Authenticaion Erorr. Be careful!");
    const decodetoken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodetoken.id).select("-password");
    console.log(user);
    next();
};

module.exports = { userAuthentication };
