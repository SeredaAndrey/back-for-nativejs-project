const Post = require("../schemas/postSchema");
const User = require("../schemas/userSchema");

const getPostService = async ({ skip, limit }) => {
  const count = await Post.find({}).count();
  const countPage = await Post.find({}).skip(skip).limit(limit).count();
  const posts = await Post.find({}).skip(skip).limit(limit);
  return { count, countPage, posts };
};

const getUserPostService = async (userId, { skip, limit }) => {
  const count = await Post.find({ owner: userId }).count();
  const countPage = await Post.find({ owner: userId })
    .skip(skip)
    .limit(limit)
    .count();
  const posts = await Post.find({ owner: userId }).skip(skip).limit(limit);
  return { count, countPage, posts };
};

const createUserPostService = async (userId, body, photo) => {
  return await Post.create({ ...body, owner: userId, photo });
};

const getSingleUserPostService = async (postId, userId) => {
  return Post.findOne({ _id: postId, owner: userId });
};

const deleteUserPostService = async (postId, userId) => {
  console.log(postId, userId);
  return await Post.findOneAndRemove({ _id: postId, owner: userId });
};

const changeUserPostService = async (postId, userId, body, photo) => {
  const result = await Post.findOne({ _id: postId, owner: userId });
  if (!result) {
    return;
  }
  if (!photo) {
    photo = result.photo;
  }
  return await Post.findOneAndUpdate(
    { _id: postId, owner: userId },
    { ...body, photo },
    { new: true }
  );
};

const changeCommentsInService = async (postId, userId, body) => {
  const user = await User.findById({ _id: userId });
  const post = await Post.findById({ _id: postId });
  const { text } = body;
  const comments = {
    text,
    user: user._id,
    name: user.name,
    avatar: user.avatarUrl,
  };
  console.log("post.countComment: ", post.countComment);
  if (!post) {
    return;
  }
  let count = post.countComment;
  if (!count) {
    count = 1;
  } else {
    count = count + 1;
  }
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments }, countComment: count },
    { new: true }
  );
};

module.exports = {
  getPostService,
  getUserPostService,
  createUserPostService,
  getSingleUserPostService,
  deleteUserPostService,
  changeUserPostService,
  changeCommentsInService,
};
