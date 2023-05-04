const Post = require("../schemas/postSchema");
const User = require("../schemas/userSchema");

const getUserDataService = async (_id) => {
  return await User.findOne({ _id }, { password: 0 });
};

const getUserInfoService = async (_id) => {
  const countPostAddingToPortal = await Post.find({
    owner: _id,
  }).count();

  const { createdAt } = await User.findOne({ _id });
  const timeNow = new Date();
  const dayInPortal = parseInt((timeNow - createdAt) / 1000 / 60 / 60 / 24);

  return {
    countPostsUser: countPostAddingToPortal,
    dayInPortal,
  };
};

const patchUserDataService = async (_id, body, avatarUrl) => {
  const { name } = body;
  const result = await getUserDataService(_id);
  if (!result) {
    return;
  }
  if (!avatarUrl) {
    avatarUrl = result.avatarUrl;
  }
  const user = await User.findOneAndUpdate(
    { _id, loggedIn: true },
    { name, avatarUrl },
    { new: true }
  );
  if (user) {
    return await User.findOne({ _id }, { password: 0 });
  }
};

module.exports = {
  getUserDataService,
  getUserInfoService,
  patchUserDataService,
};
