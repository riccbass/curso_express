import express from "express";
import ProductController from "../controllers/ProductController.mjs";

const router = express.Router();

router.get("/create", ProductController.createProduct);
router.post("/create", ProductController.createProductPost);
router.post("/remove/:id", ProductController.removeProduct);
router.get("/edit/:id", ProductController.editProduct);
router.post("/edit", ProductController.editProductPost);
router.get("/:id", ProductController.getProductById);
router.get("/", ProductController.showProducts);

export default router;
