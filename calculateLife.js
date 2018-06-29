(async () => {
  let resjson = await getLifeTable();
  let [men, women] =processDeathRates(resjson);
  console.log(men);
  console.log(women);
})();

async function getLifeTable() {
  const baseURL = "http://api.e-stat.go.jp/rest/2.1/app";
  const appID = "6e52e69bb11b4255f91f693711fa7376c3c38026";
  const format = "/json";
  const action = "getStatsData";
  const url = `${baseURL}${format}/${action}?appId=${appID}&lang=J&statsDataId=0003109558&metaGetFlg=Y&cntGetFlg=N&sectionHeaderFlg=1`;
  let res = await fetch(url);
  let resjson = await res.json();
  return resjson
}

function processDeathRates(estatJSON) {
  const dataList = estatJSON.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;
  // console.log(dataList);
  const deathRate = dataList.filter(datum => datum["@tab"] == "130");
  const latest = deathRate.filter(datum => datum["@time"] == "2015000000");
  const yearDeath = latest.filter(datum => parseInt(datum["@cat01"]) >= 300000);
  const yearParsed = yearDeath.map(datum => {
    datum["@cat01"] = parseInt(datum["@cat01"].slice(1, 4));
    return datum
  });
  const men = yearParsed.filter(datum => datum["@cat02"] == "10").map(datum => {
    let rd = {
      published: parseInt(datum["@time"].slice(0, 4)),
      sex: "man",
      age: datum["@cat01"],
      deathRate: datum["$"]
    };
    return rd
  });
  const women = yearParsed.filter(datum => datum["@cat02"] == "20").map(datum => {
    let rd = {
      published: parseInt(datum["@time"].slice(0, 4)),
      sex: "woman",
      age: datum["@cat01"],
      deathRate: datum["$"]
    };
    return rd
  });
  return [men, women]
}
