import Product from "../models/Product.mjs";

const adaptFloat = (number) => {
  if (Number.isFinite(number)) {
    return number;
  }

  return parseFloat(number.replace(",", "."));
};

export default class ProductController {
  static showProducts = async (req, res) => {
    const products = await Product.find().lean();

    res.render("products/all", { products });
  };

  static createProduct = (req, res) => {
    res.render("products/create");
  };

  static createProductPost = async (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({ name, image, price, description });
    await product.save();

    res.redirect("/products");
  };

  static getProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).lean();

    res.render("products/product", { product });
  };

  static removeProduct = async (req, res) => {
    const id = req.params.id;

    await Product.deleteOne({ _id: id });

    res.redirect("/products");
  };

  static editProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).lean();

    res.render("products/edit", { product });
  };

  static editProductPost = async (req, res) => {
    const { id, name, image, price, description } = req.body;
    const adaptedPrice = adaptFloat(price);
    const product = { name, image, price: adaptedPrice, description };

    await Product.updateOne({ _id: id }, product);

    res.redirect("/products");
  };
}
