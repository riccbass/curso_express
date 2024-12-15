import express from "express";
import UserController from "../controllers/UserController.mjs";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);

export default router;
