import Product from "../models/Product.mjs";

export default class ProductController {
  static showProduct = (req, res) => {
    res.render("products/all");
  };
}
