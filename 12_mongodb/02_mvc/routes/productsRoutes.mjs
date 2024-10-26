import express from "express";
import ProductController from "../controllers/ProductController.mjs";

const router = express.Router();

router.get("/create", ProductController.createProduct);
router.post("/create", ProductController.createProductPost);
router.get("/:id", ProductController.getProductById);
router.get("/", ProductController.showProducts);

export default router;
