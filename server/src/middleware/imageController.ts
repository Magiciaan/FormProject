// import { NextFunction, Request, Response } from "express";
// import prisma from "@prisma/client";
// import cloudinary from "../utils/cloudinary";
// import upload from "../utils/multer";

// const  {Image}  = prisma;

// export const uploadImage = async (req: Request, res: Response, next:NextFunction) => {
//   try {
//     if (!req.file) throw new Error ("No uploads");

//     const result = await cloudinary.v2.uploader.upload(req.file.path);

//     const image = await Image.create({
//       data: {
//         publicId: result.public_id,
//         url: result.secure_url,
//       },
//     });

//     res.status(201).json(image);
//   } catch (error) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// };

// export const uploadMiddleware = upload.single("image");
