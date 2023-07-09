const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title must be enter"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        description: {
            type: String,
            required: [true, "Password must be enter"],
        },
        vote: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model.Blog || mongoose.models("blog", blogSchema);

module.exports = Blog;
