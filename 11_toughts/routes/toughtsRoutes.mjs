import express from "express";
import { checkAuth } from "../helpers/auth.mjs";

const router = express.Router();

import ToughtController from "../controllers/ToughtController.mjs";

//controller
router.get("/add", checkAuth, ToughtController.createTought);
router.post("/add", checkAuth, ToughtController.createToughtSave);
router.get("/edit/:id", checkAuth, ToughtController.updateTought);
router.post("/edit/", checkAuth, ToughtController.updateToughtSave);
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.post("/remove", checkAuth, ToughtController.removeTought);
router.get("/", ToughtController.showToughts);

export default router;
