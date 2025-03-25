import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

/**
 * Tạo token JWT
 * @param {Object} payload - Thông tin cần mã hóa (userId, role, v.v.)
 * @param {string} expiresIn - Thời gian hết hạn (mặc định: "7d")
 * @returns {string} - Token JWT
 */
export const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

/**
 * Xác thực token JWT
 * @param {string} token - Token cần xác thực
 * @returns {Object | null} - Giải mã payload nếu hợp lệ, ngược lại null
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export {
    generateToken,
    verifyToken
}
