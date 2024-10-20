import express from "express";
import exphbs from "express-handlebars";

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

let products = [
  {
    name: "A1",
    price: "600",
  },
  {
    name: "A2",
    price: "300",
  },
];

app.get("/", (req, res) => {
  res.render("home", { products });
});

app.get("/product/:name", (req, res) => {
  const name = req.params.name;

  console.log(`Estamos buscando pelo usuário: ${name}`);

  const product = products.find((obj) => obj.name === name) || {
    name,
    price: "Não disponível",
  };

  res.render("product", { product });
});

app.listen(3000, () => {
  console.log("App funcionando...");
});
