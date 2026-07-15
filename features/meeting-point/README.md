# Meeting point feature

This folder contains the code for finding and displaying a fair MRT meeting point.

- `MeetingPointFinder.tsx` — the form, station dropdowns, button, and result UI.
- `findMeetingPoint.ts` — the meeting-point calculation.

Next.js still requires the homepage entry at `app/page.tsx`. That file now only loads `MeetingPointFinder` from this folder.
