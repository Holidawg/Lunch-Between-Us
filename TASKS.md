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

## Improve the UI with an MRT map

- [ ] Add a simple Singapore MRT network map below the station form.
- [ ] Add map positions for every operational MRT station without including LRT or unopened stations.
- [ ] Mark person one's starting station clearly.
- [ ] Mark person two's starting station in a different colour.
- [ ] Mark the recommended meeting station as the main destination.
- [ ] Highlight both suggested journeys from the starting stations to the meeting point.
- [ ] Add a small legend explaining the two starting markers, meeting marker, and highlighted routes.
- [ ] Keep interchange stations and their multiple line codes understandable.
- [ ] Make the map readable on both desktop and mobile screens.
- [ ] Keep the map accessible with text labels or a written route summary for people who cannot rely on colour alone.
- [ ] Update the map whenever either starting station or the meeting-point result changes.
- [ ] Add UI tests for selecting stations and displaying the correct three markers.

Done when two selected starting stations and the calculated meeting point are clearly visible on the MRT map, with both journeys easy to distinguish.
