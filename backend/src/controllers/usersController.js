import { Users } from "../models/indexModels.js";
import { sendResponse } from "../utils/responseHelper.js";

const getUserProfile = async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }

        return sendResponse(res, 200, true, "User profile retrieved", user);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await Users.findByPk(req.user.id);

        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        return sendResponse(res, 200, true, "Profile updated", {
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await Users.findByPk(req.user.id);

        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }

        const validPassword = await comparePassword(oldPassword, user.password);
        if (!validPassword) {
            return sendResponse(res, 401, false, "Old password is incorrect");
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        return sendResponse(res, 200, true, "Password changed successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id);

        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }

        await user.destroy();

        return sendResponse(res, 200, true, "User deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

const getAllUsers = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return sendResponse(res, 403, false, "Access denied");
        }

        const users = await Users.findAll({
            attributes: { exclude: ["password", "refresh_token", "refresh_exprired"] },
        });

        return sendResponse(res, 200, true, "Users retrieved", users);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

export { getUserProfile, updateUserProfile, changePassword, deleteUser, getAllUsers };
