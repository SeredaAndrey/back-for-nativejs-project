const Post = require("../schemas/postSchema");

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

module.exports = {
  getUserPostService,
  createUserPostService,
  getSingleUserPostService,
  deleteUserPostService,
  changeUserPostService,
};
