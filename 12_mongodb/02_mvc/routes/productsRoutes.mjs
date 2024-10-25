import express from "express";
import ProductController from "../controllers/ProductController.mjs";

const router = express.Router();

router.get("/", ProductController.showProducts);

export default router;
