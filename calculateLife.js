const fs = require("fs");
// const xlsx = require('xlsx');
//
// let workbook = xlsx.readFile('./resource/22nd-lifetable-male.xlsx');
// let sheetNames = workbook.SheetNames;
// console.log(sheetNames);
// const worksheet = workbook.Sheets["第22回生命表（男）"];
//
// console.log(xlsx.utils.sheet_to_csv(worksheet))

const f = fs.readFileSync("./resource/raw.txt", {
  encoding: "utf-8"
});
const deathRate = f.split("\r\n").filter(stg => stg != "").map(stg => parseFloat(stg));
const startYear = 25; // になった人が
const endYear = 81; // 歳になることができる確率
const origin = deathRate.slice(startYear, endYear);
console.log(origin);
console.log(origin.reduce((total, rate) => total * (1 - rate), 1));
