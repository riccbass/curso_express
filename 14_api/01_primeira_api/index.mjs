import express from "express";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas - endpoints

app.post("/create_product", (req, res) => {
  const { name, price } = req.body;

  if (!name) {
    res.status(422).json({ message: "Usuário não informado" });
  }

  console.log(price);

  res.status(201).json({ message: `Olá mundo ${name}` });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Olá mundo" });
});

app.listen(3000);
