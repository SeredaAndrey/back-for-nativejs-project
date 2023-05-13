const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");

const uploadAvatarCloud = require("../middleware/uploadAvatarMiddleware");

const {
  getUserDataController,
  patchUserDataController,
  getUserInfoController,
  getUserDataByIdController,
} = require("../controllers/userController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getUserDataController));
router.get("/userId", asyncWrapper(getUserDataByIdController));
router.get("/info", asyncWrapper(getUserInfoController));
router.patch(
  "/",
  uploadAvatarCloud.single("image"),
  asyncWrapper(patchUserDataController)
);

module.exports = { userRouter: router };
