import { Groups, GroupMembers, Users } from "../models/indexModels.js";
import { sendResponse } from "../utils/responseHelper.js";

/**
 * 🆕 Tạo nhóm mới
 */
const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id; // Lấy ID của người tạo nhóm

        // Tạo nhóm mới
        const group = await Groups.create({
            name: name,
            description: description,
            created_by: userId,
        });

        // Thêm người tạo vào nhóm với quyền Admin
        await GroupMembers.create({
            group_id: group.id,
            user_id: userId,
            role: "admin",
        });

        return sendResponse(res, 201, true, "Group created successfully", group);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

/**
 * 📜 Lấy danh sách nhóm mà user tham gia
 */
const getAllGroupsOfUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const groups = await Groups.findAll({
            include: {
                model: GroupMembers,
                where: { user_id: userId },
                attributes: ["role"],
            },
        });

        return sendResponse(res, 200, true, "Groups fetched successfully", groups);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

/**
 * 🔍 Lấy thông tin nhóm theo ID
 */
const getGroupById = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.id;

        // Kiểm tra user có trong nhóm không
        const member = await GroupMembers.findOne({
            where: { group_id: groupId, user_id: userId },
        });

        if (!member) {
            return sendResponse(res, 403, false, "You are not a member of this group");
        }

        const group = await Groups.findByPk(groupId);
        return sendResponse(res, 200, true, "Group details fetched successfully", group);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

/**
 * ➕ Thêm thành viên vào nhóm (Chỉ admin)
 */
const addMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const adminId = req.user.id;

        // Kiểm tra user có phải admin nhóm không
        const admin = await GroupMembers.findOne({
            where: { group_id: groupId, user_id: adminId, role: "admin" },
        });

        if (!admin) {
            return sendResponse(res, 403, false, "Only admins can add members");
        }

        // Kiểm tra user đã trong nhóm chưa
        const existingMember = await GroupMembers.findOne({
            where: { group_id: groupId, user_id: userId },
        });

        if (existingMember) {
            return sendResponse(res, 400, false, "User is already a member");
        }

        // Thêm user vào nhóm với vai trò "member"
        await GroupMembers.create({ group_id: groupId, user_id: userId, role: "member" });

        return sendResponse(res, 201, true, "User added successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

/**
 * ❌ Xóa thành viên khỏi nhóm (Chỉ admin)
 */
const removeMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const adminId = req.user.id;

        // Kiểm tra admin có quyền không
        const admin = await GroupMembers.findOne({
            where: { group_id: groupId, user_id: adminId, role: "admin" },
        });

        if (!admin) {
            return sendResponse(res, 403, false, "Only admins can remove members");
        }

        // Không cho phép admin xóa chính mình
        if (userId === adminId) {
            return sendResponse(res, 400, false, "Admin cannot remove themselves");
        }

        // Xóa thành viên khỏi nhóm
        await GroupMembers.destroy({ where: { group_id: groupId, user_id: userId } });

        return sendResponse(res, 200, true, "User removed successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

/**
 * ✏️ Cập nhật thông tin nhóm (Chỉ admin)
 */
const updateGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { name, description } = req.body;
        const adminId = req.user.id;

        // Kiểm tra quyền admin
        const admin = await GroupMembers.findOne({
            where: { group_id: groupId, user_id: adminId, role: "admin" },
        });

        if (!admin) {
            return sendResponse(res, 403, false, "Only admins can update group info");
        }

        // Cập nhật nhóm
        await Groups.update({ name, description }, { where: { id: groupId } });

        return sendResponse(res, 200, true, "Group updated successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

/**
 * 🗑️ Xóa nhóm (Chỉ admin)
 */
const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const adminId = req.user.id;

        // Kiểm tra quyền admin
        const admin = await GroupMembers.findOne({
            where: { group_id: groupId, user_id: adminId, role: "admin" },
        });

        if (!admin) {
            return sendResponse(res, 403, false, "Only admins can delete the group");
        }

        // Xóa nhóm và tất cả dữ liệu liên quan
        await Groups.destroy({ where: { id: groupId } });

        return sendResponse(res, 200, true, "Group deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

/**
 * 👥 Lấy danh sách thành viên trong nhóm
 */
const getGroupMembers = async (req, res) => {
    try {
        const { groupId } = req.params;

        const members = await GroupMembers.findAll({
            where: { group_id: groupId },
            include: { model: Users, attributes: ["id", "username", "email"] },
        });

        return sendResponse(res, 200, true, "Group members fetched successfully", members);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

/**
 * 🚪 Rời nhóm (Chỉ member)
 */
const leaveGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.id;

        // Kiểm tra user có trong nhóm không
        const member = await GroupMembers.findOne({
            where: { group_id: groupId, user_id: userId },
        });

        if (!member) {
            return sendResponse(res, 403, false, "You are not in this group");
        }

        // Không cho phép admin duy nhất rời nhóm
        const isAdmin = member.role === "admin";
        const adminCount = await GroupMembers.count({
            where: { group_id: groupId, role: "admin" },
        });

        if (isAdmin && adminCount === 1) {
            return sendResponse(
                res,
                400,
                false,
                "Admin cannot leave the group if they are the only admin"
            );
        }

        // Rời nhóm
        await GroupMembers.destroy({ where: { group_id: groupId, user_id: userId } });

        return sendResponse(res, 200, true, "You have left the group");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

export {
    createGroup,
    getAllGroupsOfUser,
    getGroupById,
    addMember,
    removeMember,
    updateGroup,
    deleteGroup,
    getGroupMembers,
    leaveGroup,
};
