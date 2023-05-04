const cloudinaryPost = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multerPost = require("multer");

cloudinaryPost.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const postStorage = new CloudinaryStorage({
  cloudinary: cloudinaryPost,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: (req, file) => "/posts",
    transformation: (req, file) => ["post_700"],
  },
});

const uploadPostPhotoCloud = multerPost({ storage: postStorage });

module.exports = uploadPostPhotoCloud;
