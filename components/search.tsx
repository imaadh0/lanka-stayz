"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, MapPin, CalendarDays, Users } from "lucide-react";
import { SearchControls } from "./search-controls";
import { todayISO, validateDates } from "@/lib/booking";
export function Search({
  initialDestination = "",
  initialCheckin = "",
  initialCheckout = "",
  initialGuests = "1",
}: {
  initialDestination?: string;
  initialCheckin?: string;
  initialCheckout?: string;
  initialGuests?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [destination, setDestination] = useState(initialDestination);
  const [checkin, setCheckin] = useState(initialCheckin);
  const [checkout, setCheckout] = useState(initialCheckout);
  const [guests, setGuests] = useState(initialGuests);
  const [error, setError] = useState("");
  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (checkin || checkout) {
          const message = validateDates(checkin, checkout);
          if (message) {
            setError(message);
            return;
          }
        }
        setError("");
        const params = new URLSearchParams({
          destination,
          checkin,
          checkout,
          guests,
        });
        const url = `/stays/?${params}`;
        if (pathname === "/stays" || pathname === "/stays/") {
          window.history.pushState(null, "", url);
        } else {
          router.push(url);
        }
      }}
    >
      <SearchControls
        destination={destination}
        checkin={checkin}
        checkout={checkout}
        guests={guests}
        onDestination={setDestination}
        onCheckin={(next) => {
          setCheckin(next);
          if (checkout && next >= checkout) setCheckout("");
        }}
        onCheckout={setCheckout}
        onGuests={setGuests}
      />

      {error && (
        <p role="alert" className="form-error search-error">
          {error}
        </p>
      )}
    </form>
  );
}
