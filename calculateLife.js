console.log("hello, world");
(async () => {
  let resjson = await getLifeTable();
  let [men, women] = processDeathRates(resjson);
  document.DeathRates = [men, women];
  update();
  document.querySelector("#update").addEventListener("click", update);
})();

async function getLifeTable() {
  const baseURL = "https://api.e-stat.go.jp/rest/2.1/app";
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
  let men = yearParsed.filter(datum => datum["@cat02"] == "10").map(datum => {
    let rd = {
      published: parseInt(datum["@time"].slice(0, 4)),
      sex: "man",
      age: datum["@cat01"],
      deathRate: datum["$"]
    };
    return rd
  });
  let women = yearParsed.filter(datum => datum["@cat02"] == "20").map(datum => {
    let rd = {
      published: parseInt(datum["@time"].slice(0, 4)),
      sex: "woman",
      age: datum["@cat01"],
      deathRate: datum["$"]
    };
    return rd
  });
  men = men.sort((a, b) => a.age - b.age);
  women = women.sort((a, b) => a.age - b.age);
  return [men, women]
}

function update() {
  console.log("update!");
  const startAge = document.querySelector("#ageInput").value;
  updatePlot(document.DeathRates, startAge);
}

function updatePlot(data, startAge) {
  const [men, women] = data;
  let surviveRates = [{
    age: startAge,
    rate: 1
  }];
  for (let i = startAge; i < men.length; i++) {
    surviveRates.push({
      age: i,
      rate: surviveRates[i - startAge].rate * (1 - men[i].deathRate)
    });
  }
  let survivePercentages = surviveRates.map(datum => {
    datum.rate = datum.rate * 100;
    return datum;
  });
  const plotHeight = 300;
  const plotWidth = 500;
  const marginH = 50;
  const marginW = 50;
  const svg = d3.select("svg");
  svg
    .attr("height", plotHeight + 2 * marginH)
    .attr("width", plotWidth + 2 * marginW);
  const xScale = d3.scaleLinear()
    .domain(d3.extent(survivePercentages, point => point.age))
    .range([0, plotWidth]);
  const xAxis = d3.axisBottom(xScale);
  const yScale = d3.scaleLinear()
    .domain(d3.extent(survivePercentages, point => point.rate))
    .range([plotHeight, 0]);
  const yAxis = d3.axisLeft(yScale);
  const points = svg.selectAll(".point")
    .data(survivePercentages);
  points.exit().remove();
  points.enter()
    .append("circle")
    .classed("point", true)
    .attr("r", 1)
    .merge(points)
    .attr("cx", d => marginW + xScale(d.age))
    .attr("cy", d => marginH + yScale(d.rate));
  let xAxisGroup = svg.selectAll(".xAxis")
    .data([1]);
  xAxisGroup.enter()
    .append("g")
    .classed("xAxis", true)
    .attr("transform", `translate(${marginW},${marginH+plotHeight})`)
    .merge(xAxisGroup)
    .call(xAxis);
  let yAxisGroup = svg.selectAll(".yAxis")
    .data([1]);
  yAxisGroup.enter()
    .append("g")
    .classed("yAxis", true)
    .attr("transform", `translate(${marginW},${marginH})`)
    .merge(yAxisGroup)
    .call(yAxis);
}
