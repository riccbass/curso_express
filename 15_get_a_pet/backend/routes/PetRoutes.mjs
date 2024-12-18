import express from "express";
import PetController from "../controllers/PetController.mjs";
import checkToken from "../helpers/verify-token.mjs";
import { imageUpload } from "../helpers/image-upload.mjs";

const router = express.Router();

//middlewares

//o array que faz dar para salvar várias imagens
router.post(
  "/create",
  checkToken,
  imageUpload.array("images"),
  PetController.create
);

router.get("/", PetController.getAll);
router.get("/mypets", checkToken, PetController.getAllUserPets);

export default router;
