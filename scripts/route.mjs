import { EWL_EDGES, EWL_STATIONS } from "../lib/mrt_lines/ewl.ts";
import { NSL_EDGES, NSL_STATIONS } from "../lib/mrt_lines/nsl.ts";
import { NEL_EDGES, NEL_STATIONS } from "../lib/mrt_lines/nel.ts";
import { CCL_EDGES, CCL_STATIONS } from "../lib/mrt_lines/ccl.ts";
import { DTL_EDGES, DTL_STATIONS } from "../lib/mrt_lines/dtl.ts";
import { TEL_EDGES, TEL_STATIONS } from "../lib/mrt_lines/tel.ts";
import { INTERCHANGE_EDGES } from "../lib/mrt_lines/interchanges.ts";
import { shortestPath } from "../lib/shortest_path.ts";

const stations = [
  ...EWL_STATIONS, ...NSL_STATIONS, ...NEL_STATIONS,
  ...CCL_STATIONS, ...DTL_STATIONS, ...TEL_STATIONS,
];
const edges = [
  ...EWL_EDGES, ...NSL_EDGES, ...NEL_EDGES,
  ...CCL_EDGES, ...DTL_EDGES, ...TEL_EDGES, ...INTERCHANGE_EDGES,
];

const [startInput, destinationInput] = process.argv.slice(2);

if (!startInput || !destinationInput) {
  console.error("Please provide a start and destination station code.");
  console.error("Example: npm run route -- EW5 EW13");
  process.exit(1);
}

const start = startInput.toUpperCase();
const destination = destinationInput.toUpperCase();
const route = shortestPath(stations, edges, start, destination);

if (!route) {
  console.error(`Could not find a route from ${start} to ${destination}.`);
  console.error("Use a valid MRT code such as EW5, NS17, NE1, CC29, DT14, or TE9.");
  process.exit(1);
}

function stationName(code) {
  return stations.find((station) => station.code === code)?.name ?? code;
}

const routeNames = route.path
  .map(stationName)
  .filter((name, index, names) => index === 0 || name !== names[index - 1]);

console.log("Route:", routeNames.join(" -> "));
console.log("Estimated travel time:", `${route.totalWeight} minutes`);
