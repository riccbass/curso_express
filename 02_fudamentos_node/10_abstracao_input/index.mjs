import inquirer from "inquirer";

inquirer
  .prompt([
    { name: "p1", message: "Qual a primeira nota?" },
    { name: "p2", message: "Qual a segunda nota?" },
  ])
  .then((answers) => {
    const avg = (parseFloat(answers.p1) + parseFloat(answers.p2)) / 2;
    console.log(`A média é ${avg}`);
  })
  .catch((err) => console.log(err));
