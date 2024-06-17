const multer = require("multer");
const mkdirp = require("mkdirp");
const uploadImage = (type) => {
  const made = mkdirp.sync(`./public/image/${type}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/image/${type}`); // setup cho can luu file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname); //dat lai ten file
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const extensionImageList = [".png", ".jpg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImageList.includes(extension);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("extension khong hop le"), false);
      }
    },
  });
  return upload.single(type);
};

module.exports = {
  uploadImage,
};
