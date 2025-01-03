import express from "express";
import ProductController from "../controllers/ProductController.mjs";

const router = express.Router();

router.get("/create", ProductController.createProduct);
router.post("/create", ProductController.createProductPost);
router.post("/remove/:id", ProductController.removeProduct);
router.post("/edit", ProductController.editProductPost);
router.get("/edit/:id", ProductController.editProduct);
router.get("/:id", ProductController.getProduct);
router.get("/", ProductController.showProducts);

export default router;
