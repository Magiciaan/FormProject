import { Router } from "express";
import {
  login,
  activeUser,
  forms,
  submit,
} from "../../controller/formController";
import fileUpload from "../../controller/formController";
import { registerSchema } from "../../utils/registerValidator";
import { registerValidation } from "../../middleware/checkEmail";
import { searchPaginationSortMiddleware } from "../../middleware/pagination";
import verifyJWT from "../../middleware/verifyJWT";
// import { checkUserRole } from "../../middleware/verifyRole";
import upload from "../../utils/multer";

const router = Router();

router.get(
  "/forms",
  searchPaginationSortMiddleware({
    model: "Form",
    searchableFields: ["fullName", "email"],
  }),
  forms
);
router.post("/upload", upload.array("file"), fileUpload());
router.post("/submit", registerSchema, registerValidation, submit);
router.post("/login", login);
router.post("/me", verifyJWT, activeUser);

export default router;
