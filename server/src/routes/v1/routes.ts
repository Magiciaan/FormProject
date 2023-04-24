import { Router } from "express";
import {
  register,
  login,
  activeUser,
  forms,
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

router.post("/register", registerSchema, registerValidation, register);
router.post("/login", login);
router.post("/me", verifyJWT, activeUser);

export default router;
