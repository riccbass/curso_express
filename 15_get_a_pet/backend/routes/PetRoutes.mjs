import express from "express";
import PetController from "../controllers/PetController.mjs";
import checkToken from "../helpers/verify-token.mjs";

const router = express.Router();

//middlewares

router.post("/create", checkToken, PetController.create);

export default router;
