import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "../templates");

const router = express.Router();

router.get("/add", (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

router.post("/save", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  console.log(`o nome do usuário é ${name} e a idade é ${age}`);

  res.sendFile(`${basePath}/userform.html`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  console.log(`Estamos buscando pelo usuário: ${id}`);

  res.sendFile(`${basePath}/users.html`);
});

export default router;
