import minimist from "minimist";

// node .\index.mjs --nome=Ric

const args = minimist(process.argv.slice(2));
console.log(args);

const nome = args["nome"];
const profissao = args["profissao"];

// node .\index.mjs --nome=Ric --profissao=admin

console.log(nome, profissao);
