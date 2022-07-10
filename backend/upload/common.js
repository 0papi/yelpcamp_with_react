const multer = require("multer");
const storage = require("./cloduinary");

// var fs = require("fs");

// var dir = "./public/images/nov";

// if (!fs.existsSync(dir)) {
//   // CREATE DIRECTORY IF NOT FOUND
//   fs.mkdirSync(dir, { recursive: true });
// }
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
const upload = multer({ storage: storage });
module.exports = upload;
