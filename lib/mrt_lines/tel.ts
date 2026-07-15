export const TEL_STATIONS = [
  { code: "TE1", name: "Woodlands North" },
  { code: "TE2", name: "Woodlands" },
  { code: "TE3", name: "Woodlands South" },
  { code: "TE4", name: "Springleaf" },
  { code: "TE5", name: "Lentor" },
  { code: "TE6", name: "Mayflower" },
  { code: "TE7", name: "Bright Hill" },
  { code: "TE8", name: "Upper Thomson" },
  { code: "TE9", name: "Caldecott" },
  // TE10 Mount Pleasant is not open yet.
  { code: "TE11", name: "Stevens" },
  { code: "TE12", name: "Napier" },
  { code: "TE13", name: "Orchard Boulevard" },
  { code: "TE14", name: "Orchard" },
  { code: "TE15", name: "Great World" },
  { code: "TE16", name: "Havelock" },
  { code: "TE17", name: "Outram Park" },
  { code: "TE18", name: "Maxwell" },
  { code: "TE19", name: "Shenton Way" },
  { code: "TE20", name: "Marina Bay" },
  // TE21 Marina South is not open yet.
  { code: "TE22", name: "Gardens by the Bay" },
  { code: "TE23", name: "Tanjong Rhu" },
  { code: "TE24", name: "Katong Park" },
  { code: "TE25", name: "Tanjong Katong" },
  { code: "TE26", name: "Marine Parade" },
  { code: "TE27", name: "Marine Terrace" },
  { code: "TE28", name: "Siglap" },
  { code: "TE29", name: "Bayshore" },
] as const;

export const TEL_EDGES = TEL_STATIONS.slice(0, -1).map((station, index) => ({
  from: station.code,
  to: TEL_STATIONS[index + 1].code,
  weight: 3,
}));
