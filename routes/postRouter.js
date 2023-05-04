const express = require("express");

const { asyncWrapper } = require("../middleware/errorHandler");
const { authMiddleware } = require("../middleware/authMiddleware");

const uploadPostPhotoCloud = require("../middleware/uploadPostPhotoMiddlevare");

const {
  getUserPostController,
  createUserPostController,
  deleteUserPostController,
} = require("../controllers/postController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getUserPostController));
router.post(
  "/",
  uploadPostPhotoCloud.single("image"),
  asyncWrapper(createUserPostController)
);
router.delete("/:postId", asyncWrapper(deleteUserPostController));

module.exports = { postRouter: router };
