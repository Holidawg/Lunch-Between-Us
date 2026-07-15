import { EWL_EDGES, EWL_STATIONS } from "../../../lib/mrt_lines/ewl.ts";
import { NSL_EDGES, NSL_STATIONS } from "../../../lib/mrt_lines/nsl.ts";
import { NEL_EDGES, NEL_STATIONS } from "../../../lib/mrt_lines/nel.ts";
import { CCL_EDGES, CCL_STATIONS } from "../../../lib/mrt_lines/ccl.ts";
import { DTL_EDGES, DTL_STATIONS } from "../../../lib/mrt_lines/dtl.ts";
import { TEL_EDGES, TEL_STATIONS } from "../../../lib/mrt_lines/tel.ts";
import { INTERCHANGE_EDGES } from "../../../lib/mrt_lines/interchanges.ts";
import { findMeetingPoint } from "../findMeetingPoint.ts";

const stations = [
  ...EWL_STATIONS, ...NSL_STATIONS, ...NEL_STATIONS,
  ...CCL_STATIONS, ...DTL_STATIONS, ...TEL_STATIONS,
];
const edges = [
  ...EWL_EDGES, ...NSL_EDGES, ...NEL_EDGES,
  ...CCL_EDGES, ...DTL_EDGES, ...TEL_EDGES, ...INTERCHANGE_EDGES,
];
const [firstInput, secondInput] = process.argv.slice(2);

if (!firstInput || !secondInput) {
  console.error("Please provide two MRT station codes.");
  console.error("Example: npm run meeting -- EW5 NS16");
  process.exit(1);
}

const firstStart = firstInput.toUpperCase();
const secondStart = secondInput.toUpperCase();
const meeting = findMeetingPoint(stations, edges, firstStart, secondStart);

if (!meeting) {
  console.error("Could not find a meeting point. Check both station codes.");
  process.exit(1);
}

console.log(`Best meeting point: ${meeting.stationName} (${meeting.stationCodes.join("/")})`);
console.log(`Person 1 from ${firstStart}: ${meeting.firstPersonRoute.totalWeight} minutes`);
console.log(`Person 2 from ${secondStart}: ${meeting.secondPersonRoute.totalWeight} minutes`);
console.log(`Longest journey: ${meeting.longestJourney} minutes`);
