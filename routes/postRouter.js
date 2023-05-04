const express = require("express");

const { asyncWrapper } = require("../middleware/errorHandler");
const uploadPostPhotoCloud = require("../middleware/uploadPostPhotoMiddlevare");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper());
router.post("/", uploadPostPhotoCloud.single("image"), asyncWrapper());
