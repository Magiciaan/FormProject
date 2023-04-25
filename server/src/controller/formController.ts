import { RequestHandler } from "express";
import { Form, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import upload from "../utils/multer";

dotenv.config();

const prisma = new PrismaClient();

export const forms: RequestHandler = async (req, res, next) => {
  try {
    const { data, currentPage, totalPages, found } = res.locals;

    res.json({ data, currentPage, totalPages, found });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(400).json({ success: false, message });
  }
};

export const submit: RequestHandler = async (req, res, next) => {
  try {
    const { fullName, email, phone, password }: Form = req.body;

    if (!email || !password) {
      throw new Error("can't be blank");
    }

    const checkUser = await prisma.form.findUnique({
      where: {
        email,
      },
    });

    if (checkUser) {
      throw new Error("User exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.form.create({
      data: { fullName, email, phone, password: hashedPassword },
    });

    return res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ success: false, message: "email already exists" });
    // next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.form.findUniqueOrThrow({ where: { email } });

    if (!user) throw new Error("invalid user");

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("invalid user");

    const signedToken = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(201).json({ loggedIn: user, token: signedToken });
  } catch (error) {
    next(error);
  }
};

export const activeUser: RequestHandler = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, data: res.locals.user });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(400).json({ success: false, message });
  }
};

export default function (): RequestHandler {
  return function fileUpload(req, res, next) {
    try {
      console.log(req.files);
      return res.json(req.files);
    } catch (error) {
      next(error);
    }
  };
}
