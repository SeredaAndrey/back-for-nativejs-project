const { FoundingError, ValidateError } = require("../middleware/errorHandler");
const { paginationQuerryValidation } = require("../schemas/paginationValidate");
const { patchPostValidate } = require("../schemas/postValidate");
const { createPostValidate } = require("../schemas/postValidate");
const {
  getUserPostService,
  createUserPostService,
  deleteUserPostService,
  changeUserPostService,
  getSingleUserPostService,
} = require("../services/postService");

const getUserPostController = async (req, res, next) => {
  const reqValidate = paginationQuerryValidation.validate(req.query);
  const userId = req.user._id;

  let { page = 1, limit = 4 } = req.query;

  limit = parseInt(limit);
  const skip = (parseInt(page) - 1) * limit;

  if (!reqValidate.error) {
    const posts = await getUserPostService(userId, { skip, limit });
    if (posts) {
      res.status(200).json({
        message: "getting user posts is success",
        code: 200,
        data: posts.posts,
        count: posts.count,
        countPage: posts.countPage,
        page: page,
        limit: limit,
      });
    } else throw new FoundingError("posts not found");
  } else throw new ValidateError(reqValidate.error);
};

const createUserPostController = async (req, res, next) => {
  let photo = "";
  if (req.file) {
    photo = req.file.path;
  } else {
    photo = null;
  }
  const reqValidate = createPostValidate.validate(req.body);
  const userId = req.user._id;
  const body = req.body;

  if (!reqValidate.error) {
    const post = await createUserPostService(userId, body, photo);
    if (post) {
      res.status(201).json({
        message: "create post success",
        code: 201,
        post,
      });
    } else throw new InternalError("Internal error");
  } else throw new ValidateError(reqValidate.error);
};

const deleteUserPostController = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await deleteUserPostService(postId, userId);
  if (post) {
    res.status(200).json({
      message: "delete post success",
      code: 200,
      post,
    });
  } else throw new FoundingError("post not found");
};

const getSingleUserPostController = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await getSingleUserPostService(postId, userId);

  if (post) {
    res.status(200).json({
      message: "get post success",
      code: 200,
      post,
    });
  } else throw new FoundingError("post not found");
};

const changeUserPostController = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const body = req.body;

  const reqValidate = patchPostValidate.validate(req.body);

  let photo = "";
  if (req.file) {
    photo = req.file.path;
  } else {
    photo = null;
  }

  if (!reqValidate.error) {
    const post = await changeUserPostService(postId, userId, body, photo);
    if (post) {
      res.status(200).json({
        message: "change post success",
        code: 200,
        post,
      });
    } else throw new FoundingError("post not found");
  } else throw new ValidateError(reqValidate.error);
};

module.exports = {
  getUserPostController,
  createUserPostController,
  getSingleUserPostController,
  deleteUserPostController,
  changeUserPostController,
};
