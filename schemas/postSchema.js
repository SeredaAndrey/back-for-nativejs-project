const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const post = new Schema(
  {
    description: { type: String, required: true },
    text: { type: String, default: null },
    photo: { type: String, default: null },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        name: { type: String },
        avatar: { type: String },
        text: { type: String },
      },
    ],
    countComment: { type: Number, default: null },
    geolocation: { type: String, default: null },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", post);

module.exports = Post;
