"use client";

import { FormEvent, useId, useMemo, useState } from "react";
import {
  findMeetingPointByStationName,
  type MeetingPointResult,
} from "./findMeetingPoint";
import { ALL_EDGES, ALL_STATIONS } from "@/lib/mrt_lines";

type StationInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  stationNames: string[];
};

function StationInput({ label, value, onChange, stationNames }: StationInputProps) {
  const inputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const matches = stationNames
    .filter((name) => name.toLowerCase().includes(value.trim().toLowerCase()))
    .slice(0, 8);

  return (
    <div className="station-field">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        value={value}
        placeholder="Type an MRT station"
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen && matches.length > 0}
        aria-controls={`${inputId}-listbox`}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
        }}
      />

      {isOpen && matches.length > 0 && (
        <ul id={`${inputId}-listbox`} className="station-list" role="listbox">
          {matches.map((name) => (
            <li key={name} role="option" aria-selected={name === value}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(name);
                  setIsOpen(false);
                }}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MeetingPointFinder() {
  const stationNames = useMemo(
    () => [...new Set(ALL_STATIONS.map((station) => station.name))].sort(),
    [],
  );
  const [firstStation, setFirstStation] = useState("");
  const [secondStation, setSecondStation] = useState("");
  const [result, setResult] = useState<MeetingPointResult | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstMatch = stationNames.find(
      (name) => name.toLowerCase() === firstStation.trim().toLowerCase(),
    );
    const secondMatch = stationNames.find(
      (name) => name.toLowerCase() === secondStation.trim().toLowerCase(),
    );

    if (!firstMatch || !secondMatch) {
      setResult(null);
      setError("Please choose both stations from the dropdown list.");
      return;
    }

    const meetingPoint = findMeetingPointByStationName(
      ALL_STATIONS,
      ALL_EDGES,
      firstMatch,
      secondMatch,
    );

    if (!meetingPoint) {
      setResult(null);
      setError("Sorry, a meeting point could not be found.");
      return;
    }

    setError("");
    setResult(meetingPoint);
  }

  return (
    <main className="page-shell">
      <section className="meeting-form-section">
        <p className="eyebrow">Lunch Between Us</p>
        <h1>Find a fair MRT meeting point</h1>
        <p className="intro">
          Enter where each person is starting. We&apos;ll find the station that keeps
          both journeys as balanced as possible.
        </p>

        <form onSubmit={handleSubmit}>
          <StationInput
            label="Person one's station"
            value={firstStation}
            onChange={(value) => {
              setFirstStation(value);
              setResult(null);
            }}
            stationNames={stationNames}
          />
          <StationInput
            label="Person two's station"
            value={secondStation}
            onChange={(value) => {
              setSecondStation(value);
              setResult(null);
            }}
            stationNames={stationNames}
          />

          <button className="submit-button" type="submit">
            Find best meeting point
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {result && (
          <section className="result-card" aria-live="polite">
            <p className="result-label">Best meeting point</p>
            <h2>{result.stationName}</h2>
            <p className="station-codes">{result.stationCodes.join(" / ")}</p>
            <div className="journey-times">
              <p>
                From {firstStation}: <strong>{result.firstPersonRoute.totalWeight} min</strong>
              </p>
              <p>
                From {secondStation}: <strong>{result.secondPersonRoute.totalWeight} min</strong>
              </p>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
