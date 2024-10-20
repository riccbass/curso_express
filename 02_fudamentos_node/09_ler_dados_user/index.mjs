import { createInterface } from "readline";

const read = createInterface({ input: process.stdin, output: process.stdout });

read.question("Qual a sua linguagem favorita? ", (language) => {
  if (language === "py") {
    console.log("parabéns");
  } else {
    console.log(`A minha é: ${language}`);
  }

  read.close();
});

// const read = createInterface({ output: process.stdout });
