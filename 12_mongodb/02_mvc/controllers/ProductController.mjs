import Product from "../models/Product.mjs";

export default class ProductController {
  //static
  //Static class methods are defined on the class itself.

  //You cannot call a static method on an object, only on an object class.

  static showProducts = async (req, res) => {
    const products = await Product.getProducts();

    res.render("products/all", { products });
  };

  static createProduct = (req, res) => {
    res.render("products/create");
  };

  static createProductPost = (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(name, image, price, description);

    product.save();

    res.redirect("/products");
  };

  static getProduct = async (req, res) => {
    const id = req.params.id;

    const product = await Product.getProductById(id);

    res.render("products/product", { product });
  };

  static removeProduct = async (req, res) => {
    const id = req.params.id;

    await Product.removeProductById(id);

    res.redirect("/products");
  };

  static editProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.getProductById(id);

    res.render("products/edit", { product });
  };

  static editProductPost = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(name, image, price, description);

    await product.updateProduct(id);

    res.redirect("/products");
  };
}
