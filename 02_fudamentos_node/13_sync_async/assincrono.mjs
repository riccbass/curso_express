import fs from "fs";

console.log("início");

fs.writeFile("arquivo.txt", "oi", (err) => {
  setTimeout(() => {
    console.log("Arquivo criado");
  }, 1000);
});

console.log("fim");
