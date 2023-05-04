const Post = require("../schemas/postSchema");

const getUserPostService = async (_id, { skip, limit }) => {
  const count = await Post.find({ owner: _id }).count();
  const countPage = await Post.find({ owner: _id })
    .skip(skip)
    .limit(limit)
    .count();
  const posts = await Post.find({ owner: _id }).skip(skip).limit(limit);
  return { count, countPage, posts };
};

const createUserPostService = async (_id, body, photo) => {
  return await Post.create({ ...body, owner: _id, photo });
};

const deleteUserPostService = async (postId) => {
  return await Post.findOneAndRemove({ _id: postId });
};

module.exports = {
  getUserPostService,
  createUserPostService,
  deleteUserPostService,
};
