import { verifyToken } from "../utils/generateToken.js";
import { sendResponse } from "../utils/responseHelper.js";
import wrapAsync from "./wrapAsync.js";

const authenticate = wrapAsync(async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return sendResponse(res, 400, false, "Token NOT Found");
        }

        const decoded = await verifyToken(token);

        if (!decoded) {
            return sendResponse(res, 401, false, "Invalid Token");
        }

        const user = await Users.findByPk(req.user.id, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return sendResponse(res, 404, false, "User Not Found");
        }

        req.user = user;
        next();
    } catch (error) {
        return sendResponse(res, 401, false, error.message);
    }
});

export { authenticate };
