const CustomError = require("../middleware/error");
const User = require("../models/user.model");
const { cryptTokengenerate } = require("../utils/cryptoToken");
const { sendEmail } = require("../utils/emailSend");

const userRegister = async (req, res, next) => {
    const { name, email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) throw new CustomError("User already register");
    try {
        const verifyToken = await cryptTokengenerate();

        const verifiedLink = `http://localhost:5000/api/v1/user/verify/${verifyToken}`;
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            verifiedToken: verifyToken,
        });
        sendEmail({ email, verifiedLink });

        res.status(200).json({
            success: true,
            message: "User register success",
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

const userVerified = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);

    const user = await User.findOne({ verifiedToken: id });

    if (user.verified) {
        return res.status(200).json({
            success: true,
            message: "Already verified your account",
        });
    }

    const time = Date.now();
    if (user.verifiedTokenExpired < time) {
        await User.delete({ email });
        throw new CustomError(
            "Verification time's up. Try agian register.",
            400
        );
    }
    user.verified = true;
    user.verifiedToken = "";
    user.save();
    res.status(200).json({
        success: true,
        message: "User verifiacaion success",
    });
};

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("User email may be wrong.");
    const passwordCheck = user.checkPassword(password);
    if (!passwordCheck) throw new CustomError("User password may be wrong.");

    if (!user.verified) throw new CustomError("User not.");
    const token = await user.jwtToken();
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    res.status(200).json({
        success: true,
        message: "User login success",
    });
};

const userLogout = async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User logout success",
    });
};

const showUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        success: true,
        users,
    });
};

const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("User not registerd", 402);
    const token = await cryptTokengenerate();
    const tokenLink = `http://localhost:5000/api/v1/forgetpassword/${token}`;
    sendEmail({ email, tokenLink });
    res.status(200).json({
        success: true,
        message: "Forget password link sent via mail",
    });
};

module.exports = {
    userRegister,
    userVerified,
    userLogin,
    userLogout,
    showUsers,
};
