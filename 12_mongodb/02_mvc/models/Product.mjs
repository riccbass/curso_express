import conn from "../db/conn.mjs";

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
}

export default Product;
