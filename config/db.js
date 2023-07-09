const mongoose = require("mongoose");

const dbConnect = async (url) => {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnect;
