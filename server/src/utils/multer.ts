import multer from "multer";
import path from "path";

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb): void => {
//     return cb(null, "../../database");
//   },
//   filename: (req, file, cb): void => {
//     return cb(null, file.originalname);
//   },
// });

// const allowedExt = [".png", ".jpeg"];

// export const upload = multer({
//   storage: fileStorage,
//   limits: {
//     fileSize: 100,
//   },
//   fileFilter: (req, file, cb): void => {
//     cb(null, (file.originalname));
//   },
// });



const allowedExt = [".png", ".jpeg"];

const storage = multer.diskStorage({
  destination: (req, file, cb): void => {
    return cb(null, "./UploadedFiles");
  },

  filename: (req, file, cb): void => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 100,
  },
  fileFilter: (req, file, cb):void =>
    cb(null, allowedExt.includes(path.extname(file.originalname))),
});
export = upload;
