export type Station = {
  code: string;
  name: string;
};

export type Edge = {
  from: string;
  to: string;
  weight: number;
};

export type ShortestPathResult = {
  path: string[];
  totalWeight: number;
};

/**
 * Finds the quickest route through an undirected, weighted MRT network.
 * The edge weight is the estimated travel time in minutes.
 */
export function shortestPath(
  stations: readonly Station[],
  connections: readonly Edge[],
  start: string,
  destination: string,
): ShortestPathResult | null {
  const stationCodes = new Set(stations.map((station) => station.code));

  if (!stationCodes.has(start) || !stationCodes.has(destination)) {
    return null;
  }

  const neighbours = new Map<string, Array<{ code: string; weight: number }>>();

  for (const code of stationCodes) neighbours.set(code, []);

  for (const connection of connections) {
    neighbours.get(connection.from)?.push({
      code: connection.to,
      weight: connection.weight,
    });
    neighbours.get(connection.to)?.push({
      code: connection.from,
      weight: connection.weight,
    });
  }

  const distances = new Map<string, number>();
  const previous = new Map<string, string>();
  const unvisited = new Set(stationCodes);

  for (const code of stationCodes) distances.set(code, Infinity);
  distances.set(start, 0);

  while (unvisited.size > 0) {
    let current: string | undefined;

    for (const code of unvisited) {
      if (current === undefined || distances.get(code)! < distances.get(current)!) {
        current = code;
      }
    }

    if (current === undefined || distances.get(current) === Infinity) break;
    if (current === destination) break;

    unvisited.delete(current);

    for (const neighbour of neighbours.get(current) ?? []) {
      if (!unvisited.has(neighbour.code)) continue;

      const newDistance = distances.get(current)! + neighbour.weight;
      if (newDistance < distances.get(neighbour.code)!) {
        distances.set(neighbour.code, newDistance);
        previous.set(neighbour.code, current);
      }
    }
  }

  if (distances.get(destination) === Infinity) return null;

  const path = [destination];
  while (path[0] !== start) {
    const previousStation = previous.get(path[0]);
    if (previousStation === undefined) return null;
    path.unshift(previousStation);
  }

  return { path, totalWeight: distances.get(destination)! };
}
