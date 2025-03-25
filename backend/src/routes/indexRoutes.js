import express from "express";
import routeAuth from "./authRoutes.js";
import routeUser from "./usersRoutes.js";
import routeGroup from "./groupRoutes.js";

const router = express.Router();

router.use("/auth", routeAuth);
router.use("/users", routeUser);
router.use("/groups", routeGroup);

export default router;
