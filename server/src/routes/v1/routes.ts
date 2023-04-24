import { Router } from "express";
import {
  login,
  activeUser,
  forms,
  submit,
} from "../../controller/formController";
import { registerSchema } from "../../utils/registerValidator";
import { registerValidation } from "../../middleware/checkEmail";
import { searchPaginationSortMiddleware } from "../../middleware/pagination";
import verifyJWT from "../../middleware/verifyJWT";
// import { checkUserRole } from "../../middleware/verifyRole";

const router = Router();

router.get(
  "/forms",
  searchPaginationSortMiddleware({
    model: "Form",
    searchableFields: ["fullName", "email"],
  }),
  forms
);

router.post("/submit", registerSchema, registerValidation, submit);
router.post("/login", login);
router.post("/me", verifyJWT, activeUser);

export default router;
