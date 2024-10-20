import chalk from "chalk";

import inquirer from "inquirer";

let age;

inquirer
  .prompt([
    { name: "p1", message: "Qual a o seu nome?" },
    { name: "p2", message: "Qual a sua idade?" },
  ])
  .then((answers) => {
    age = parseInt(answers.p2);

    if (isNaN(age)) {
      throw new Error("age must be an integer");
    }

    console.log(
      chalk.bgYellowBright.black(`Nome é: ${answers.p1} e idade é: ${age}`)
    );
  })
  .catch((err) => console.log(err));
