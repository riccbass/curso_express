import fs from "fs";

fs.stat(`teste`, (err, stats) => {
  if (err) {
    console.log(err);
    return false;
  }

  console.log(stats.isFile());
  console.log(stats.isDirectory());
  console.log(stats.isSymbolicLink());
  console.log(stats.ctime);
  console.log(stats.size);
});
