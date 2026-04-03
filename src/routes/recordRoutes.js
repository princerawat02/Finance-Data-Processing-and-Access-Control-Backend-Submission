import express from "express";
const router = express.Router();
import * as recordController from "../controllers/recordController.js";
import { allowRoles } from "../middleware/authMiddleware.js";

router.get(
  "/summary",
  allowRoles(["admin", "analyst"]),
  recordController.getSummary,
);

router.get(
  "/",
  allowRoles(["admin", "analyst", "viewer"]),
  recordController.getAllRecords,
);

router.post("/", allowRoles(["admin"]), recordController.createRecord);
router.put("/:id", allowRoles(["admin"]), recordController.updateRecord);
router.delete("/:id", allowRoles(["admin"]), recordController.deleteRecord);

export default router;
