import express from "express";
import exphbs from "express-handlebars";

import conn from "./db/conn.mjs";

import productRoutes from "./routes/productsRoutes.mjs";

const app = express();

//template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//pra poder receber do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

//pra usar json
app.use(express.json());

//public path
app.use(express.static("public"));

app.use("/products", productRoutes);

app.listen(3000);
