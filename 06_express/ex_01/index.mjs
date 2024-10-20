import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "templates");

const app = express();
const port = 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//arquivos estáticos
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.use((req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta: ${port}`);
});
