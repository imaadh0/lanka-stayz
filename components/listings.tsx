"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "./search";
import { StayCard } from "./stay-card";
import { destinations, filterStays } from "@/lib/stays";
export function Listings() {
  const params = useSearchParams();
  const router = useRouter();
  const destination = params.get("destination") || "";
  const rawGuests = Number(params.get("guests") || 1);
  const guests =
    Number.isInteger(rawGuests) && rawGuests > 0 && rawGuests <= 8
      ? rawGuests
      : 1;
  const results = filterStays(destination, guests);
  const query = `?${params.toString()}`;
  return (
    <>
      <div className="listing-search">
        <Search
          key={params.toString()}
          initialDestination={destination}
          initialGuests={String(guests)}
          initialCheckin={params.get("checkin") || ""}
          initialCheckout={params.get("checkout") || ""}
        />
      </div>
      <div className="filter-row" aria-label="Filter by destination">
        {["", ...destinations].map((d) => (
          <button
            key={d}
            className={destination === d ? "filter-chip active" : "filter-chip"}
            aria-pressed={destination === d}
            onClick={() => {
              const p = new URLSearchParams(params.toString());
              p.set("destination", d);
              router.push(`/stays/?${p}`, { scroll: false });
            }}
          >
            {d || "All destinations"}
          </button>
        ))}
      </div>
      <div className="results-label" aria-live="polite">
        <span>
          {results.length} {results.length === 1 ? "stay" : "stays"}{" "}
          {destination ? `in ${destination}` : "across Sri Lanka"}
        </span>
        <span>A considered collection, at your pace.</span>
      </div>
      {results.length ? (
        <div className="property-grid" key={`${destination}:${guests}`}>
          {results.map((s) => (
            <StayCard key={s.slug} stay={s} query={query} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>A little further afield?</h2>
          <p>
            No stays match these filters. Try another destination or fewer
            guests.
          </p>
          <button
            className="button"
            onClick={() => router.push("/stays/", { scroll: false })}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
