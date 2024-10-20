import path from "path";

//path absoulto
console.log(path.resolve("teste.txt"));

//formar path
const midFolder = "relatorios";
const filename = "ric.txt";

const finalPath = path.join("/", "arquivos", midFolder, filename);

console.log(finalPath);
