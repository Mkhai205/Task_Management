import express from "express";
import {
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUser,
    getAllUsers
} from "../controllers/usersController.js";
import { authenticate } from "../middlewares/authorization.js";

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);
router.put("/change-password", authenticate, changePassword);
router.delete("/delete", authenticate, deleteUser);
router.get("/all", authenticate, getAllUsers); // Admin only

export default router;
