import Product from "../models/Product.mjs";

export default class ProductController {
  //static
  //Static class methods are defined on the class itself.

  //You cannot call a static method on an object, only on an object class.

  static showProducts = (req, res) => {
    res.render("products/all");
  };

  static createProduct = (req, res) => {
    res.render("products/create");
  };

  static createProductPost = (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(name, price, description);

    product.save();

    res.redirect("/products");
  };
}
