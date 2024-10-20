// mais de um valir

const x = 10;
const y = "Algum texto";
const z = [1, 2];

console.log(x, y, z);

//countagem de impressões
console.count(`valor de x é: ${x} contagem`);
console.count(`valor de x é: ${x} contagem`);
console.count(`valor de x é: ${x} contagem`);
console.count(`valor de x é: ${x} contagem`);
console.count(`valor de x é: ${x} contagem`);

//variável entre string
console.log("Teste é: %s", y);

//limpar o console
setTimeout(() => {
  console.clear();
  console.log("limpou!");
}, 2000); //timetou roda uma vez depois de mil milisgeundo
