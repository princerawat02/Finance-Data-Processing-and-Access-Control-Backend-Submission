import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
import { allowRoles } from "../middleware/authMiddleware.js";

router.get("/", allowRoles(["admin", "analyst"]), userController.getAllUsers);
router.put("/:id", allowRoles(["admin"]), userController.updateUser);

export default router;
