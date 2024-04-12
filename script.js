const gamesUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let width = document.getElementById("root").scrollWidth * 0.9;
let height = window.innerHeight * 0.6;

const baseColors = [
  "#fd7e14",
  "#fab005",
  "#82c91e",
  "#40c057",
  "#12b886",
  "#15aabf",
  "#228be6",
  "#4c6ef5",
  "#7950f2",
  "#be4bdb",
  "#e64980",
  "#fa5252",
  "#868e96",
];
const colorMap = {};

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
  .attr("id", "treemap");

// Tooltip
const tip = d3.tip().attr("class", "d3-tip").attr("id", "tooltip");
svg.call(tip);

// API call
d3.json(gamesUrl).then((gameData) => {
  const hierarchy = d3
    .hierarchy(gameData, (node) => node.children)
    .sum((node) => node.value)
    .sort((a, b) => b.value - a.value);

  const createTreemap = d3.treemap().size([width, height]);

  const treemap = createTreemap(hierarchy);
  const tiles = hierarchy.leaves();

  const block = svg
    .selectAll("g")
    .data(tiles)
    .enter()
    .append("g")
    .attr("transform", (game) => `translate(${game.x0},${game.y0})`);

  block
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (game) => {
      const platform = game.data.category;
      return getColor(platform);
    })
    .attr("data-category", (game) => game.data.category)
    .attr("data-name", (game) => game.data.name)
    .attr("data-value", (game) => game.data.value)
    .attr("width", (game) => game.x1 - game.x0)
    .attr("height", (game) => game.y1 - game.y0)
    .on('mouseover', (e, game) => {
      let html = '<ul>';
      html += `<li>Name: ${game.data.name}</li>`;
      html += `<li>Platform: ${game.data.category}</li>`;
      html += `<li>Value: ${game.data.value}</li>`;
      html += '</ul>';

      tip.html(html);
      tip.show(e);
    })
    .on('mouseout', (e) => tip.hide(e))

  block
    .append("text")
    .text((game) => game.data.name)
    .attr("x", 5)
    .attr("y", 20);

  // Legend
  graph.append("br");
  const legend = graph
    .append("svg")
    .attr("width", 650)
    .attr("height", 150)
    .attr("id", "legend");

  let i = 1;
  for (const [key, value] of Object.entries(colorMap)) {
    legend
      .append("rect")
      .attr("class", "legend-item")
      .attr("fill", value)
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', parseInt(i / 5) * 250)
      .attr('y', 25 * ((i - 1) % 5 + 1));
    legend.append("text")
      .attr('x', parseInt(i / 5) * 250 + 30)
      .attr('y', 25 * ((i - 1) % 5 + 1) + 16)
      .text(key);
    i++;
  }
});

function getColor(platform) {
  if (colorMap[platform]) {
    return colorMap[platform];
  } else {
    const usedColors = Object.keys(colorMap).length;
    if (usedColors < baseColors.length) {
      colorMap[platform] = baseColors[usedColors];
      return colorMap[platform];
    } else {
      const iteration = parseInt(usedColors / baseColors.length);
      colorMap[platform] = d3.interpolate(
        baseColors[usedColors - baseColors.length * iteration],
        "white"
      )(0.2);
      return colorMap[platform];
    }
  }
}
