const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Username must be enter"],
        },
        email: {
            type: String,
            required: [true, "Email must be enter"],
            unique: true,
        },
        password: {
            type: String,
            min: [5, "Password must be more than 8 characters"],
            required: [true, "Password must be enter"],
        },
        verifiedToken: {
            type: String,
        },
        verifiedTokenExpired: {
            type: Date,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        forgetPasswordToken: {
            type: String,
        },
        forgetPasswordTokenExpired: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    const time = Date.now();
    const futureTime = new Date(time);
    futureTime.setMinutes(futureTime.getMinutes + 30);
    this.verifiedTokenExpired = futureTime;
    return next();
});

userSchema.methods.jwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: "7D",
    });
};

userSchema.methods.checkPassword = async function (enterpass) {
    const match = await bcrypt.compare(enterpass, this.password);
    return match;
};

const User = mongoose.models.User || mongoose.model("user", userSchema);

module.exports = User;
