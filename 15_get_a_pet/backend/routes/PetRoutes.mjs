import express from "express";
import PetController from "../controllers/PetController.mjs";

const router = express.Router();

router.post("/create", PetController.create);

export default router;
