import assert from "node:assert/strict";
import { findMeetingPoint } from "../lib/meeting_point.ts";

const stations = [
  { code: "A", name: "Alpha" },
  { code: "B", name: "Bravo" },
  { code: "C", name: "Charlie" },
  { code: "D", name: "Delta" },
];
const edges = [
  { from: "A", to: "B", weight: 1 },
  { from: "B", to: "C", weight: 1 },
  { from: "C", to: "D", weight: 1 },
];

const result = findMeetingPoint(stations, edges, "A", "D");

assert.ok(result);
assert.equal(result.stationName, "Bravo");
assert.equal(result.longestJourney, 2);
assert.equal(result.combinedJourney, 3);
assert.equal(findMeetingPoint(stations, edges, "INVALID", "D"), null);

console.log("PASS: meeting-point fairness and invalid-input tests");
