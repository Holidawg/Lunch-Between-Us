// Directional platform-transfer timings supplied in "MRT transfer timing.xlsx".
// The workbook stores seconds; the route graph stores minutes.
function transfer(from: string, to: string, seconds: number) {
  return { from, to, weight: seconds / 60, directed: true } as const;
}

export const INTERCHANGE_EDGES = [
  transfer("NS1", "EW24", 10),       // Jurong East
  transfer("EW24", "NS1", 10),
  transfer("NS9", "TE2", 260),       // Woodlands
  transfer("TE2", "NS9", 230),
  transfer("NS17", "CC15", 150),     // Bishan
  transfer("CC15", "NS17", 150),
  transfer("NS21", "DT11", 220),     // Newton
  transfer("DT11", "NS21", 200),
  transfer("NS22", "TE14", 190),     // Orchard
  transfer("TE14", "NS22", 190),
  transfer("NS24", "NE6", 200),      // Dhoby Ghaut
  transfer("NE6", "NS24", 190),
  transfer("NS24", "CC1", 100),
  transfer("CC1", "NS24", 110),
  transfer("NE6", "CC1", 110),
  transfer("CC1", "NE6", 120),
  transfer("NS25", "EW13", 30),      // City Hall
  transfer("EW13", "NS25", 30),
  transfer("NS26", "EW14", 30),      // Raffles Place
  transfer("EW14", "NS26", 30),
  transfer("NS27", "CC33", 190),     // Marina Bay (CE2 is now CC33)
  transfer("CC33", "NS27", 200),
  transfer("NS27", "TE20", 310),
  transfer("TE20", "NS27", 310),
  transfer("CC33", "TE20", 220),
  transfer("TE20", "CC33", 220),
  transfer("EW2", "DT32", 380),      // Tampines
  transfer("DT32", "EW2", 360),
  transfer("EW8", "CC9", 160),       // Paya Lebar
  transfer("CC9", "EW8", 160),
  transfer("EW12", "DT14", 240),     // Bugis
  transfer("DT14", "EW12", 230),
  transfer("EW16", "NE3", 170),      // Outram Park
  transfer("NE3", "EW16", 150),
  transfer("EW16", "TE17", 110),
  transfer("TE17", "EW16", 120),
  transfer("NE3", "TE17", 210),
  transfer("TE17", "NE3", 210),
  transfer("EW21", "CC22", 170),     // Buona Vista
  transfer("CC22", "EW21", 190),
  transfer("CG1", "DT35", 170),      // Expo
  transfer("DT35", "CG1", 180),
  transfer("NE1", "CC29", 110),      // HarbourFront
  transfer("CC29", "NE1", 120),
  transfer("NE4", "DT19", 100),      // Chinatown
  transfer("DT19", "NE4", 50),
  transfer("NE7", "DT12", 190),      // Little India
  transfer("DT12", "NE7", 180),
  transfer("NE12", "CC13", 160),     // Serangoon
  transfer("CC13", "NE12", 190),
  transfer("CC4", "DT15", 90),       // Promenade
  transfer("DT15", "CC4", 90),
  transfer("CC10", "DT26", 70),      // MacPherson
  transfer("DT26", "CC10", 50),
  transfer("CC17", "TE9", 190),      // Caldecott
  transfer("TE9", "CC17", 210),
  transfer("CC19", "DT9", 190),      // Botanic Gardens
  transfer("DT9", "CC19", 190),
  transfer("CC34", "DT16", 30),      // Bayfront (CE1 is now CC34)
  transfer("DT16", "CC34", 30),
  transfer("DT10", "TE11", 110),     // Stevens
  transfer("TE11", "DT10", 100),
] as const;
