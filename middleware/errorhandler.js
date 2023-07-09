module.exports = (err, req, res, next) => {
    const message = err.message || "Server has something wrong";
    const statuscode = err.statusCode || 500;

    res.status(statuscode).json({
        success: true,
        message: message,
    });
};
