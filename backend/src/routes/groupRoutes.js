import express from "express";
import {
    createGroup,
    getAllGroupsOfUser,
    getGroupById,
    addMember,
    removeMember,
    updateGroup,
    deleteGroup,
    getGroupMembers,
    leaveGroup
} from "../controllers/groupsController.js";
import { authenticate } from "../middlewares/authorization.js";

const router = express.Router();

// 🆕 Tạo nhóm mới (Chỉ cần đăng nhập)
router.post("/create", authenticate, createGroup);

// 📜 Lấy danh sách nhóm user tham gia
router.get("/", authenticate, getAllGroupsOfUser);

// 🔍 Lấy thông tin nhóm theo ID
router.get("/:groupId", authenticate, getGroupById);

// ➕ Thêm thành viên vào nhóm (Chỉ Admin)
router.post("/add-member", authenticate, addMember);

// ❌ Xóa thành viên khỏi nhóm (Chỉ Admin)
router.post("/remove-member", authenticate, removeMember);

// ✏️ Cập nhật thông tin nhóm (Chỉ Admin)
router.put("/:groupId", authenticate, updateGroup);

// 🗑️ Xóa nhóm (Chỉ Admin)
router.delete("/:groupId", authenticate, deleteGroup);

// 👥 Lấy danh sách thành viên trong nhóm
router.get("/:groupId/members", authenticate, getGroupMembers);

// 🚪 Rời nhóm (Chỉ Member)
router.post("/:groupId/leave", authenticate, leaveGroup);

export default router;
