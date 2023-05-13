const express = require("express");

const { asyncWrapper } = require("../middleware/errorHandler");
const { authMiddleware } = require("../middleware/authMiddleware");

const uploadPostPhotoCloud = require("../middleware/uploadPostPhotoMiddlevare");

const {
  getPostController,
  getUserPostController,
  createUserPostController,
  deleteUserPostController,
  changeUserPostController,
  getSingleUserPostController,
  changeCommentsInPostController,
} = require("../controllers/postController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getUserPostController));
router.get("/all", asyncWrapper(getPostController));
router.post(
  "/",
  uploadPostPhotoCloud.single("image"),
  asyncWrapper(createUserPostController)
);
router.get("/:postId", asyncWrapper(getSingleUserPostController));
router.delete("/:postId", asyncWrapper(deleteUserPostController));
router.patch(
  "/:postId",
  uploadPostPhotoCloud.single("image"),
  asyncWrapper(changeUserPostController)
);
router.patch("/:postId/comment", asyncWrapper(changeCommentsInPostController));

module.exports = { postRouter: router };
