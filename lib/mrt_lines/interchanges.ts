// Walking between platforms takes time, so transfers have a five-minute weight.
// Multi-line interchanges are connected as a short chain; every code remains reachable.
export const INTERCHANGE_EDGES = [
  { from: "NS1", to: "EW24", weight: 5 },       // Jurong East
  { from: "NS9", to: "TE2", weight: 5 },        // Woodlands
  { from: "NS17", to: "CC15", weight: 5 },      // Bishan
  { from: "NS21", to: "DT11", weight: 5 },      // Newton
  { from: "NS22", to: "TE14", weight: 5 },      // Orchard
  { from: "NS24", to: "NE6", weight: 5 },       // Dhoby Ghaut
  { from: "NE6", to: "CC1", weight: 5 },        // Dhoby Ghaut
  { from: "NS25", to: "EW13", weight: 5 },      // City Hall
  { from: "NS26", to: "EW14", weight: 5 },      // Raffles Place
  { from: "NS27", to: "CC33", weight: 5 },      // Marina Bay
  { from: "CC33", to: "TE20", weight: 5 },      // Marina Bay
  { from: "EW2", to: "DT32", weight: 5 },       // Tampines
  { from: "EW8", to: "CC9", weight: 5 },        // Paya Lebar
  { from: "EW12", to: "DT14", weight: 5 },      // Bugis
  { from: "EW16", to: "NE3", weight: 5 },       // Outram Park
  { from: "NE3", to: "TE17", weight: 5 },       // Outram Park
  { from: "EW21", to: "CC22", weight: 5 },      // Buona Vista
  { from: "CG1", to: "DT35", weight: 5 },       // Expo
  { from: "NE1", to: "CC29", weight: 5 },       // HarbourFront
  { from: "NE4", to: "DT19", weight: 5 },       // Chinatown
  { from: "NE7", to: "DT12", weight: 5 },       // Little India
  { from: "NE12", to: "CC13", weight: 5 },      // Serangoon
  { from: "CC4", to: "DT15", weight: 5 },       // Promenade
  { from: "CC10", to: "DT26", weight: 5 },      // MacPherson
  { from: "CC17", to: "TE9", weight: 5 },       // Caldecott
  { from: "CC19", to: "DT9", weight: 5 },       // Botanic Gardens
  { from: "CC34", to: "DT16", weight: 5 },      // Bayfront
  { from: "DT10", to: "TE11", weight: 5 },      // Stevens
] as const;
