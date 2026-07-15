import {
  shortestPath,
  type Edge,
  type ShortestPathResult,
  type Station,
} from "../../lib/shortest_path.ts";

export type MeetingPointResult = {
  stationName: string;
  stationCodes: string[];
  firstPersonRoute: ShortestPathResult;
  secondPersonRoute: ShortestPathResult;
  firstPersonArrivalCode: string;
  secondPersonArrivalCode: string;
  longestJourney: number;
  combinedJourney: number;
};

// Google-style public transport estimates include some time waiting for a train.
export const INITIAL_TRAIN_WAIT_MINUTES = 3;

function includeInitialWait(route: ShortestPathResult): ShortestPathResult {
  if (route.path.length <= 1) return route;

  return {
    ...route,
    totalWeight: route.totalWeight + INITIAL_TRAIN_WAIT_MINUTES,
  };
}

/**
 * Finds the fairest MRT meeting station for two starting station codes.
 * It minimises the longer journey first, then the combined journey time.
 */
export function findMeetingPoint(
  stations: readonly Station[],
  edges: readonly Edge[],
  firstStart: string,
  secondStart: string,
): MeetingPointResult | null {
  const codesByStationName = new Map<string, string[]>();

  for (const station of stations) {
    const codes = codesByStationName.get(station.name) ?? [];
    codes.push(station.code);
    codesByStationName.set(station.name, codes);
  }

  let best: MeetingPointResult | null = null;

  for (const [stationName, stationCodes] of codesByStationName) {
    let firstBest: { code: string; route: ShortestPathResult } | null = null;
    let secondBest: { code: string; route: ShortestPathResult } | null = null;

    for (const code of stationCodes) {
      const firstRoute = shortestPath(stations, edges, firstStart, code);
      const secondRoute = shortestPath(stations, edges, secondStart, code);

      if (firstRoute && (!firstBest || firstRoute.totalWeight < firstBest.route.totalWeight)) {
        firstBest = { code, route: firstRoute };
      }
      if (secondRoute && (!secondBest || secondRoute.totalWeight < secondBest.route.totalWeight)) {
        secondBest = { code, route: secondRoute };
      }
    }

    if (!firstBest || !secondBest) continue;

    const firstJourney = includeInitialWait(firstBest.route);
    const secondJourney = includeInitialWait(secondBest.route);

    const candidate: MeetingPointResult = {
      stationName,
      stationCodes,
      firstPersonRoute: firstJourney,
      secondPersonRoute: secondJourney,
      firstPersonArrivalCode: firstBest.code,
      secondPersonArrivalCode: secondBest.code,
      longestJourney: Math.max(firstJourney.totalWeight, secondJourney.totalWeight),
      combinedJourney: firstJourney.totalWeight + secondJourney.totalWeight,
    };

    const candidateIsBetter =
      !best ||
      candidate.longestJourney < best.longestJourney ||
      (candidate.longestJourney === best.longestJourney &&
        candidate.combinedJourney < best.combinedJourney) ||
      (candidate.longestJourney === best.longestJourney &&
        candidate.combinedJourney === best.combinedJourney &&
        candidate.stationName.localeCompare(best.stationName) < 0);

    if (candidateIsBetter) best = candidate;
  }

  return best;
}

/** Finds a meeting point when people enter station names instead of line codes. */
export function findMeetingPointByStationName(
  stations: readonly Station[],
  edges: readonly Edge[],
  firstStationName: string,
  secondStationName: string,
): MeetingPointResult | null {
  const firstCodes = stations
    .filter((station) => station.name.toLowerCase() === firstStationName.toLowerCase())
    .map((station) => station.code);
  const secondCodes = stations
    .filter((station) => station.name.toLowerCase() === secondStationName.toLowerCase())
    .map((station) => station.code);

  let best: MeetingPointResult | null = null;

  for (const firstCode of firstCodes) {
    for (const secondCode of secondCodes) {
      const candidate = findMeetingPoint(stations, edges, firstCode, secondCode);
      if (!candidate) continue;

      if (
        !best ||
        candidate.longestJourney < best.longestJourney ||
        (candidate.longestJourney === best.longestJourney &&
          candidate.combinedJourney < best.combinedJourney)
      ) {
        best = candidate;
      }
    }
  }

  return best;
}
