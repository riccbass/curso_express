import _ from "lodash";
import chalk from "chalk";

const a = [13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

const diff = _.difference(a, b);

console.log(chalk.red(diff)); //mostra só o 13
