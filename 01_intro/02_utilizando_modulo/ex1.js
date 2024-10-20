var xlsx = require("node-xlsx").default;

let workSheetsFromFile;

try {
  workSheetsFromFile = xlsx.parse(`faltante.xlsx`);
} catch (e) {
  console.log(e.message);
  return;
}

// workSheetsFromFile.forEach((sheet) => {
//   console.log(sheet.name);
// });

const sheet = workSheetsFromFile.find((sheet) => sheet.name === "ABA");
const sheetData = sheet.data.slice(1, sheet.data.length - 1);

console.log(sheetData);
