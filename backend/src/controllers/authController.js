import { Users } from "../models/indexModels.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResponse } from "../utils/responseHelper.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await Users.findOne({ where: { email } });
        if (userExists) {
            return sendResponse(res, 400, false, "User already exists");
        }
        const hashedPassword = await hashPassword(password);
        const user = await Users.create({ username, email, password: hashedPassword });

        return sendResponse(res, 201, true, "User created", user);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return sendResponse(res, 404, false, "User Not Found");
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return sendResponse(res, 401, false, "Invalid Password");
        }

        const token = generateToken({ id: user.id, email: user.email });

        user.refresh_token = token;
        user.refresh_exprired = Date.now() + 2 * 24 * 60 * 60 * 1000;

        await user.save();

        return sendResponse(res, 200, true, "Login successful", { token });
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

export const logoutUser = async (req, res) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return sendResponse(res, 400, false, "Token required");
        }

        await Users.update(
            {
                refresh_token: null,
                refresh_exprired: null,
            },
            {
                where: { refresh_token: token },
            }
        );

        return sendResponse(res, 200, true, "Logged out successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

export { registerUser, loginUser, logoutUser };
