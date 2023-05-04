const { FoundingError, ValidateError } = require("../middleware/errorHandler");
const { paginationQuerryValidation } = require("../schemas/paginationValidate");
const { createPostValidate } = require("../schemas/postValidate");
const {
  getUserPostService,
  createUserPostService,
  deleteUserPostService,
} = require("../services/postService");

const getUserPostController = async (req, res, next) => {
  const reqValidate = paginationQuerryValidation.validate(req.query);
  const _id = req.user._id;

  let { page = 1, limit = 4 } = req.query;

  limit = parseInt(limit);
  const skip = (parseInt(page) - 1) * limit;

  if (!reqValidate.error) {
    const posts = await getUserPostService(_id, { skip, limit });
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
  const _id = req.user._id;
  const body = req.body;

  if (!reqValidate.error) {
    const post = await createUserPostService(_id, body, photo);
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
  console.log(req.params);

  const post = await deleteUserPostService(postId);
  if (post) {
    res.status(200).json({
      message: "delete post success",
      code: 200,
      post,
    });
  } else throw new FoundingError("post not found");
};

module.exports = {
  getUserPostController,
  createUserPostController,
  deleteUserPostController,
};
