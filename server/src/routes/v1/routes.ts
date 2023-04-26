import { Router } from "express";
import { getAllForms } from "../../controller/formController";
import { uploadFile } from "../../controller/formController";
// import { registerSchema } from "../../utils/registerValidator";
// import { registerValidation } from "../../middleware/checkEmail";
import { searchPaginationSortMiddleware } from "../../middleware/pagination";
import upload from "../../middleware/fileUpload";

const router = Router();

router.get(
  "/getAllForms",
  searchPaginationSortMiddleware({
    model: "Form",
    searchableFields: ["fullName", "email"],
  }),
  getAllForms
);
router.post("/upload", upload, uploadFile);

export default router;
