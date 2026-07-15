export const NSL_STATIONS = [
  { code: "NS1", name: "Jurong East" },
  { code: "NS2", name: "Bukit Batok" },
  { code: "NS3", name: "Bukit Gombak" },
  { code: "NS4", name: "Choa Chu Kang" },
  { code: "NS5", name: "Yew Tee" },
  // NS6 Sungei Kadut is not open yet.
  { code: "NS7", name: "Kranji" },
  { code: "NS8", name: "Marsiling" },
  { code: "NS9", name: "Woodlands" },
  { code: "NS10", name: "Admiralty" },
  { code: "NS11", name: "Sembawang" },
  { code: "NS12", name: "Canberra" },
  { code: "NS13", name: "Yishun" },
  { code: "NS14", name: "Khatib" },
  { code: "NS15", name: "Yio Chu Kang" },
  { code: "NS16", name: "Ang Mo Kio" },
  { code: "NS17", name: "Bishan" },
  { code: "NS18", name: "Braddell" },
  { code: "NS19", name: "Toa Payoh" },
  { code: "NS20", name: "Novena" },
  { code: "NS21", name: "Newton" },
  { code: "NS22", name: "Orchard" },
  { code: "NS23", name: "Somerset" },
  { code: "NS24", name: "Dhoby Ghaut" },
  { code: "NS25", name: "City Hall" },
  { code: "NS26", name: "Raffles Place" },
  { code: "NS27", name: "Marina Bay" },
  { code: "NS28", name: "Marina South Pier" },
] as const;

// Minutes between stations, derived from published SMRT train progression times.
const NSL_TRAVEL_TIMES = [
  3, 2, 4, 3, 5, 3, 3, 3, 3, 3, 3, 2, 5,
  3, 3, 2, 2, 3, 2, 3, 2, 2, 3, 2, 3, 3,
] as const;

export const NSL_EDGES = NSL_STATIONS.slice(0, -1).map((station, index) => ({
  from: station.code,
  to: NSL_STATIONS[index + 1].code,
  weight: NSL_TRAVEL_TIMES[index],
}));
