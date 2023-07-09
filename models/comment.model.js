const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
        comment: {
            type: String,
            required: "Must be add words",
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model.Blog || mongoose.models("blog", blogSchema);

module.exports = Blog;
