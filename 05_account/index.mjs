//modulos externos
import inquirer from "inquirer";
import chalk from "chalk";

//modulos internos
import fs from "fs";

console.log("Iniciamos o Accounts");

const getAccount = (accountName) => {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
};

const addAmount = (accountName, amount) => {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRedBright.black(`Ocorreu um erro`));
    return deposit();
  }
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );

  console.log(chalk.green(`Foi depositado o valor de R$${amount}`));
  operation();
};

const checkAccount = (accountName) => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRedBright.black("Conta inexistente"));
    return false;
  }

  return true;
};

const removeAmount = (accountName, amount) => {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRedBright.black("Sem amount"));
    return witdhdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRedBright.black("Saldo insuficiente!"));
    return witdhdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err)
  );

  console.log(chalk.green(`${amount} sacado`));
  operation();
};

const witdhdraw = () => {
  inquirer
    .prompt([{ name: "accountName", message: "qual o nome da sua conta?" }])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return witdhdraw();
      }

      inquirer
        .prompt([{ name: "amount", message: "Quanto você deseja sacar?" }])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const getAccountBalance = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      //verify if account exists

      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);
      console.log(
        chalk.bgBlackBright.black(
          `Olá, o saldo da sua conta é ${accountData.balance}`
        )
      );

      operation();
    })
    .catch((err) => console.log(err));
};

const deposit = () => {
  inquirer
    .prompt([{ name: "accountName", message: "Qual o nome da sua conta?" }])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([{ name: "amount", message: "Quanto você deseja depositar?" }])
        .then((answer) => {
          const amount = answer["amount"];

          //add an acount
          addAmount(accountName, amount);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

const buildAccount = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRedBright.black("Esta conta já exists, escolha outrno nome")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        (err) => {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabéns, a sua conta foi criada"));
      operation();
    })
    .catch((err) => console.error(err));
};

const createAccount = () => {
  console.log(chalk.bgGreenBright.black("Parabéns por escolher o nosso banco"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
  buildAccount();
};

const operation = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])

    .then((answer) => {
      const action = answer["action"];
      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        witdhdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlueBright.black("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
};

operation();
