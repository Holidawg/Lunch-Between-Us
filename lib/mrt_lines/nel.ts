export const NEL_STATIONS = [
  { code: "NE1", name: "HarbourFront" },
  // NE2 is a reserved station code.
  { code: "NE3", name: "Outram Park" },
  { code: "NE4", name: "Chinatown" },
  { code: "NE5", name: "Clarke Quay" },
  { code: "NE6", name: "Dhoby Ghaut" },
  { code: "NE7", name: "Little India" },
  { code: "NE8", name: "Farrer Park" },
  { code: "NE9", name: "Boon Keng" },
  { code: "NE10", name: "Potong Pasir" },
  { code: "NE11", name: "Woodleigh" },
  { code: "NE12", name: "Serangoon" },
  { code: "NE13", name: "Kovan" },
  { code: "NE14", name: "Hougang" },
  { code: "NE15", name: "Buangkok" },
  { code: "NE16", name: "Sengkang" },
  { code: "NE17", name: "Punggol" },
  { code: "NE18", name: "Punggol Coast" },
] as const;

export const NEL_EDGES = NEL_STATIONS.slice(0, -1).map((station, index) => ({
  from: station.code,
  to: NEL_STATIONS[index + 1].code,
  weight: 3,
}));
