const fs = require("fs");
const f = fs.readFileSync("./resource/deathRate_2015man.txt", {
  encoding: "utf-8"
});
const deathRate = f.split("\r\n").filter(stg => stg != "").map(stg => parseFloat(stg));
const startYear = 25; // になった人が
const endYear = 50; // 歳になることができる確率
const origin = deathRate.slice(startYear, endYear);
console.log(origin);
console.log(origin.reduce((total, rate) => total * (1 - rate), 1));
