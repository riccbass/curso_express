import conn from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

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

  //olha como esse é no static, é pq não vai ser usado ele numa instância,
  //nem varia sentido pegar uma instancia de 1 produto e pegar o get all
  static getProducts = () => {
    const products = conn.db().collection("products").find().toArray();

    return products;
  };

  static getProductById = async (id) => {
    const product = await conn
      .db()
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    return product;
  };

  static removeProductById = async (id) => {
    await conn
      .db()
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    return;
  };

  //como já é com o objeto product, não precisa do static
  updateProduct = async (id) => {
    const objectId = new mongoose.Types.ObjectId(id);

    await conn
      .db()
      .collection("products")
      .updateOne({ _id: objectId }, { $set: this });
    //como é pelo objecto (não tem static pra confirma) dá para usar o this

    return;
  };
}

export default Product;
