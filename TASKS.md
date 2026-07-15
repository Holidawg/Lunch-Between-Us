# Lunch Between Us tasks

## Update MRT travel times

- [ ] Find reliable station-to-station travel times for all six MRT lines.
- [ ] Replace the estimated three-minute edge weights in `lib/mrt_lines/`.
- [ ] Replace the estimated five-minute interchange weights with realistic transfer times.
- [ ] Record the source and date of the timing data.
- [ ] Do not include LRT or unopened stations.
- [ ] Add tests for several known journeys and expected total times.
- [ ] Run `npm run test:mrt-network`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run lint`.

Done when `npm run route -- START DESTINATION` returns a sensible quickest route and an accurate estimated journey time across all operational MRT lines.
