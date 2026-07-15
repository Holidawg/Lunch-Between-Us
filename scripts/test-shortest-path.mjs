import assert from "node:assert/strict";
import { EWL_EDGES, EWL_STATIONS } from "../lib/mrt_lines/ewl.ts";
import { shortestPath } from "../lib/shortest_path.ts";

function stationName(code) {
  return EWL_STATIONS.find((station) => station.code === code)?.name ?? code;
}

const route = shortestPath(EWL_STATIONS, EWL_EDGES, "EW1", "CG2");

assert.deepEqual(route, {
  path: ["EW1", "EW2", "EW3", "EW4", "CG1", "CG2"],
  totalWeight: 18,
});

console.log("PASS: shortest path works");
console.log("Route:", route.path.map(stationName).join(" -> "));
console.log("Estimated travel time:", `${route.totalWeight} minutes`);
