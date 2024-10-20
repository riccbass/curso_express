import express from "express";
import exphbs from "express-handlebars";

const app = express();
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/dashboards", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboards", { items });
});

app.use(express.static("public"));

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender node.js",
    category: "JavaScript",
    body: "Este artigo vai te ajudar a aprender Node.js",
    comments: 4,
  };

  res.render("blogpost", { post });
});

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "A1",
      category: "B1",
      body: "C1",
      comments: 1,
    },
    {
      title: "A2",
      category: "B2",
      body: "C2",
      comments: 2,
    },
    {
      title: "A3",
      category: "B3",
      body: "C3",
      comments: 3,
    },
    {
      title: "A4",
      category: "B4",
      body: "C4",
      comments: 4,
    },
  ];

  res.render("blog", { posts });
});

app.get("/", (req, res) => {
  const user = { name: "Ric", surname: "Valley", age: 36 };

  const palavra = "Teste";
  const auth = false;
  const approved = false;

  res.render("home", { user, palavra, auth, approved });
});

app.listen(3000, () => {
  console.log("App funcionando...");
});
