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
  stationOptions: StationOption[];
};

type StationOption = {
  name: string;
  codes: string[];
  label: string;
};

function StationInput({ label, value, onChange, stationOptions }: StationInputProps) {
  const inputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const search = value.trim().toLowerCase();
  const matches = stationOptions.filter((option) =>
    option.label.toLowerCase().includes(search),
  );
  const selectedOption = stationOptions.find(
    (option) => option.name.toLowerCase() === search,
  );

  return (
    <div className="station-field">
      <label htmlFor={inputId}>{label}</label>
      <div
        className="station-input-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 48,
          border: "1px solid var(--border)",
          borderRadius: 5,
          background: "#fff",
        }}
      >
        <input
          id={inputId}
          value={value}
          placeholder="Type an MRT station"
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen && matches.length > 0}
          aria-controls={`${inputId}-listbox`}
          style={{
            flex: 1,
            width: "auto",
            minWidth: 0,
            height: "100%",
            padding: "0 13px",
            border: 0,
            background: "transparent",
            outline: "none",
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onChange={(event) => {
            onChange(event.target.value);
            setIsOpen(true);
          }}
        />
        {selectedOption && (
          <span className="input-codes" style={{ flex: "none", paddingRight: 13 }}>
            ({selectedOption.codes.join(" / ")})
          </span>
        )}
      </div>

      {isOpen && matches.length > 0 && (
        <ul id={`${inputId}-listbox`} className="station-list" role="listbox">
          {matches.map((option) => (
            <li key={option.name} role="option" aria-selected={option.name === value}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(option.name);
                  setIsOpen(false);
                }}
              >
                <span>{option.name}</span>
                <span className="option-codes"> {`(${option.codes.join(" / ")})`}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MeetingPointFinder() {
  const stationOptions = useMemo(() => {
    const codesByName = new Map<string, string[]>();

    for (const station of ALL_STATIONS) {
      const codes = codesByName.get(station.name) ?? [];
      codes.push(station.code);
      codesByName.set(station.name, codes);
    }

    return [...codesByName]
      .map(([name, codes]) => ({
        name,
        codes,
        label: `${name} (${codes.join(" / ")})`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);
  const [firstStation, setFirstStation] = useState("");
  const [secondStation, setSecondStation] = useState("");
  const [result, setResult] = useState<MeetingPointResult | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstMatch = stationOptions.find(
      (option) =>
        option.label.toLowerCase() === firstStation.trim().toLowerCase() ||
        option.name.toLowerCase() === firstStation.trim().toLowerCase(),
    );
    const secondMatch = stationOptions.find(
      (option) =>
        option.label.toLowerCase() === secondStation.trim().toLowerCase() ||
        option.name.toLowerCase() === secondStation.trim().toLowerCase(),
    );

    if (!firstMatch || !secondMatch) {
      setResult(null);
      setError("Please choose both stations from the dropdown list.");
      return;
    }

    const meetingPoint = findMeetingPointByStationName(
      ALL_STATIONS,
      ALL_EDGES,
      firstMatch.name,
      secondMatch.name,
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
            stationOptions={stationOptions}
          />
          <StationInput
            label="Person two's station"
            value={secondStation}
            onChange={(value) => {
              setSecondStation(value);
              setResult(null);
            }}
            stationOptions={stationOptions}
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
                From {firstStation}:{" "}
                <strong>{result.firstPersonRoute.totalWeight} min</strong>
              </p>
              <p>
                From {secondStation}:{" "}
                <strong>{result.secondPersonRoute.totalWeight} min</strong>
              </p>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
