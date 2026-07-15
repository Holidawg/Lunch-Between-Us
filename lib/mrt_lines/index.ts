import { EWL_STATIONS, EWL_EDGES } from "./ewl";
import { NSL_STATIONS, NSL_EDGES } from "./nsl";
import { NEL_STATIONS, NEL_EDGES } from "./nel";
import { CCL_STATIONS, CCL_EDGES } from "./ccl";
import { DTL_STATIONS, DTL_EDGES } from "./dtl";
import { TEL_STATIONS, TEL_EDGES } from "./tel";
import { INTERCHANGE_EDGES } from "./interchanges";

export const ALL_STATIONS = [
  ...EWL_STATIONS,
  ...NSL_STATIONS,
  ...NEL_STATIONS,
  ...CCL_STATIONS,
  ...DTL_STATIONS,
  ...TEL_STATIONS,
];

export const ALL_EDGES = [
  ...EWL_EDGES,
  ...NSL_EDGES,
  ...NEL_EDGES,
  ...CCL_EDGES,
  ...DTL_EDGES,
  ...TEL_EDGES,
  ...INTERCHANGE_EDGES,
];

export {
  EWL_STATIONS,
  NSL_STATIONS,
  NEL_STATIONS,
  CCL_STATIONS,
  DTL_STATIONS,
  TEL_STATIONS,
};
