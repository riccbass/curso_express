import conn from "../db/conn.mjs";
import { ObjectId } from "mongodb";

class Product {
  constructor(name, image, price, description) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  save() {
    const product = conn.db().collection("products").insertOne({
      name: this.name,
      image: this.image,
      price: this.price,
      description: this.description,
    });

    return product;
  }

  static getProducts = () => {
    const products = conn.db().collection("products").find().toArray();

    return products;
  };

  static getProductById = async (id) => {
    const product = conn
      .db()
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    return product;
  };
}

export default Product;
