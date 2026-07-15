export const CCL_STATIONS = [
  { code: "CC1", name: "Dhoby Ghaut" },
  { code: "CC2", name: "Bras Basah" },
  { code: "CC3", name: "Esplanade" },
  { code: "CC4", name: "Promenade" },
  { code: "CC5", name: "Nicoll Highway" },
  { code: "CC6", name: "Stadium" },
  { code: "CC7", name: "Mountbatten" },
  { code: "CC8", name: "Dakota" },
  { code: "CC9", name: "Paya Lebar" },
  { code: "CC10", name: "MacPherson" },
  { code: "CC11", name: "Tai Seng" },
  { code: "CC12", name: "Bartley" },
  { code: "CC13", name: "Serangoon" },
  { code: "CC14", name: "Lorong Chuan" },
  { code: "CC15", name: "Bishan" },
  { code: "CC16", name: "Marymount" },
  { code: "CC17", name: "Caldecott" },
  // CC18 Bukit Brown is not open yet.
  { code: "CC19", name: "Botanic Gardens" },
  { code: "CC20", name: "Farrer Road" },
  { code: "CC21", name: "Holland Village" },
  { code: "CC22", name: "Buona Vista" },
  { code: "CC23", name: "one-north" },
  { code: "CC24", name: "Kent Ridge" },
  { code: "CC25", name: "Haw Par Villa" },
  { code: "CC26", name: "Pasir Panjang" },
  { code: "CC27", name: "Labrador Park" },
  { code: "CC28", name: "Telok Blangah" },
  { code: "CC29", name: "HarbourFront" },
  { code: "CC30", name: "Keppel" },
  { code: "CC31", name: "Cantonment" },
  { code: "CC32", name: "Prince Edward Road" },
  { code: "CC33", name: "Marina Bay" },
  { code: "CC34", name: "Bayfront" },
] as const;

const CCL_SPUR = ["CC1", "CC2", "CC3", "CC4"] as const;
const CCL_LOOP = [
  "CC4", "CC5", "CC6", "CC7", "CC8", "CC9", "CC10", "CC11", "CC12",
  "CC13", "CC14", "CC15", "CC16", "CC17", "CC19", "CC20", "CC21",
  "CC22", "CC23", "CC24", "CC25", "CC26", "CC27", "CC28", "CC29",
  "CC30", "CC31", "CC32", "CC33", "CC34", "CC4",
] as const;

// The completed loop does not yet publish one clean station-by-station timetable.
// These distance-aware estimates replace the old flat three-minute value.
const CCL_SPUR_TIMES = [2, 2, 2] as const;
const CCL_LOOP_TIMES = [
  2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 4, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2,
] as const;

function connectRoute(route: readonly string[], travelTimes: readonly number[]) {
  return route.slice(0, -1).map((from, index) => ({
    from,
    to: route[index + 1],
    weight: travelTimes[index],
  }));
}

export const CCL_EDGES = [
  ...connectRoute(CCL_SPUR, CCL_SPUR_TIMES),
  ...connectRoute(CCL_LOOP, CCL_LOOP_TIMES),
];
