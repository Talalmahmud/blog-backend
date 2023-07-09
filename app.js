require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
require("express-async-errors");

const app = express();
const helmet = require("helmet");
const cors = require("cors");
const errorhandler = require("./middleware/errorhandler");

const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route");

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

// error handler
app.use("*", (req, res, next) => {
    res.status(402).json({
        message: "Page not found",
    });
});
app.use(errorhandler);

module.exports = app;
