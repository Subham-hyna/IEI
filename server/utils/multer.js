const multer = require("multer");
// img storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allow"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

module.exports = upload;


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna