import express from "express";
import exphbs from "express-handlebars";

import conn from "./db/conn.mjs";

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

app.listen(3000);
