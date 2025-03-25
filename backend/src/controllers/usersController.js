import Users from "../models/Users.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken, verifyToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await Users.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User created", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (!user) return res.status(404).json({ error: "User not found" });

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken({ id: user.id, email: user.email });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    register,
    login
}
