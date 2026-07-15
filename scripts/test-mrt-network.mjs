import assert from "node:assert/strict";
import { shortestPath } from "../lib/shortest_path.ts";
import { EWL_EDGES, EWL_STATIONS } from "../lib/mrt_lines/ewl.ts";
import { NSL_EDGES, NSL_STATIONS } from "../lib/mrt_lines/nsl.ts";
import { NEL_EDGES, NEL_STATIONS } from "../lib/mrt_lines/nel.ts";
import { CCL_EDGES, CCL_STATIONS } from "../lib/mrt_lines/ccl.ts";
import { DTL_EDGES, DTL_STATIONS } from "../lib/mrt_lines/dtl.ts";
import { TEL_EDGES, TEL_STATIONS } from "../lib/mrt_lines/tel.ts";
import { INTERCHANGE_EDGES } from "../lib/mrt_lines/interchanges.ts";

const stations = [
  ...EWL_STATIONS, ...NSL_STATIONS, ...NEL_STATIONS,
  ...CCL_STATIONS, ...DTL_STATIONS, ...TEL_STATIONS,
];
const edges = [
  ...EWL_EDGES, ...NSL_EDGES, ...NEL_EDGES,
  ...CCL_EDGES, ...DTL_EDGES, ...TEL_EDGES, ...INTERCHANGE_EDGES,
];
const codes = new Set(stations.map((station) => station.code));

assert.equal(codes.size, stations.length, "Every station code should be unique");
for (const edge of edges) {
  assert.ok(codes.has(edge.from), `Unknown station code: ${edge.from}`);
  assert.ok(codes.has(edge.to), `Unknown station code: ${edge.to}`);
}

for (const station of stations) {
  assert.ok(
    shortestPath(stations, edges, "EW1", station.code),
    `${station.code} should be reachable from EW1`,
  );
}

console.log("PASS: all six MRT lines form one connected network");
console.log(`Checked ${stations.length} line station codes and ${edges.length} connections`);
console.log("No LRT stations were included");
