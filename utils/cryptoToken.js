const crypto = require("crypto");
const cryptTokengenerate = async () => {
    const resetToken = await crypto.randomBytes(20).toString("hex");
    const token = await crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    return token;
};

module.exports = { cryptTokengenerate };
