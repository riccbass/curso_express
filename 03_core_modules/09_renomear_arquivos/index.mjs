import fs from "fs";

fs.rename("arquivo.txt", "novo_arquivo.txt", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("arquivo renomeado");
});
