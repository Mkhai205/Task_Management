import express from "express";
import {
    registerUser, loginUser, logoutUser
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authorization.js";

const routeAuth = express.Router();

routeAuth.post("/register", registerUser);
routeAuth.post("/login", loginUser);
routeAuth.post("/logout", authenticate, logoutUser);

export default routeAuth;