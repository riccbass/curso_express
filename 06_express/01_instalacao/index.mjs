import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Olá muddo");
});

app.listen(port, () => {
  console.log(`App rodando na porta: ${port}`);
});
