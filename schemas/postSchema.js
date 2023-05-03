const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const post = new Schema({});

const Post = mongoose.model("post", post);

module.exports = Post;
