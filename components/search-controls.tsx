"use client";
import { ArrowUpRight, MapPin, CalendarDays, Users } from "lucide-react";
import { destinations } from "@/lib/stays";
import { todayISO } from "@/lib/booking";
import { DatePicker } from "@/components/ui/date-picker";
import { SelectField } from "@/components/ui/select";
type Props = {
  destination: string;
  checkin: string;
  checkout: string;
  guests: string;
  onDestination: (s: string) => void;
  onCheckin: (s: string) => void;
  onCheckout: (s: string) => void;
  onGuests: (s: string) => void;
};
export function SearchControls(p: Props) {
  return (
    <div className="search-fields">
      <div className="search-field">
        <span className="search-field-label">
          <MapPin size={14} />
          DESTINATION
        </span>
        <SelectField
          value={p.destination}
          onChange={p.onDestination}
          label="Destination"
          options={[
            { value: "", label: "Anywhere in Sri Lanka" },
            ...destinations.map((d) => ({ value: d, label: d })),
          ]}
        />
      </div>
      <div className="search-field">
        <span className="search-field-label">
          <CalendarDays size={14} />
          CHECK IN
        </span>
        <DatePicker
          value={p.checkin}
          onChange={p.onCheckin}
          label="Check-in date"
          min={todayISO()}
        />
      </div>
      <div className="search-field">
        <span className="search-field-label">
          <CalendarDays size={14} />
          CHECK OUT
        </span>
        <DatePicker
          value={p.checkout}
          onChange={p.onCheckout}
          label="Check-out date"
          min={p.checkin || todayISO()}
          exclusiveMin={!!p.checkin}
        />
      </div>
      <div className="search-field">
        <span className="search-field-label">
          <Users size={14} />
          GUESTS
        </span>
        <SelectField
          value={p.guests}
          onChange={p.onGuests}
          label="Number of guests"
          options={Array.from({ length: 8 }, (_, i) => ({
            value: String(i + 1),
            label: `${i + 1} ${i ? "guests" : "guest"}`,
          }))}
        />
      </div>
      <button type="submit" className="button search-button">
        Find a stay <ArrowUpRight size={19} />
      </button>
    </div>
  );
}
