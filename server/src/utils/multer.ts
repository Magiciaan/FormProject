import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const allowedExt = [".png", ".jpeg"];

const storage = multer.diskStorage({
  destination: (req, file, cb): void => {
    return cb(null, "./UploadedFiles");
  },

  filename: (req, file, cb): void => {
    cb(null, `${uuidv4()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 100,
  },
  fileFilter: (req, file, cb):void =>
    cb(null, allowedExt.includes(path.extname(file.originalname))),
}).single("file")


export = upload;
