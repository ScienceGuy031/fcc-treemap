const gamesUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let width = document.getElementById("root").scrollWidth * 0.9;
let height = window.innerHeight * 0.7;

// General Document Structure
const root = d3.select("#root");
root.style("height", "100vh");
const header = root.append("div").attr("id", "header");
const title = header
  .append("h1")
  .text("FreeCodeCamp Treemap")
  .attr("id", "title");
const description = header
  .append("h2")
  .text("Video Game Sales")
  .attr("id", "description");
header.append("h3").text("Top 100 Most Sold Video Games Grouped by Platform");

const graph = root.append("div").attr("id", "graph");
const svg = graph
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", "0 0 960 600")
  .attr("id", "treemap");


// Tooltip
const tip = d3.tip().attr("class", "d3-tip").attr("id", "tooltip");
svg.call(tip);

// API call
d3.json(gamesUrl).then((gamesData) => {
  
})

// Legend
graph.append("br");
const legend = graph.append("svg");
legend.attr("width", 650);
legend.attr("height", 150);
legend.attr("id", "legend");

