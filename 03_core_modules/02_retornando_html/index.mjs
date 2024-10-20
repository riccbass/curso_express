import http from "http";

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<h1>Server com HTML</h1><p>Testando atualização</p>`);
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
