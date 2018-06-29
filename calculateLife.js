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

const fetch = require("node-fetch");

const appID = "6e52e69bb11b4255f91f693711fa7376c3c38026";
let url = "http://api.e-stat.go.jp/rest/2.1/app/json/getStatsData?appId=" + appID + "&lang=J&statsDataId=0003109558&metaGetFlg=Y&cntGetFlg=N&sectionHeaderFlg=1"

fetch(url)
.then(async res=>{
  let restxt = await res.text();
  console.log(restxt);
})
