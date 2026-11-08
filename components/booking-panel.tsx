"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, CheckCircle2, X } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { SelectField } from "@/components/ui/select";
import { PopupContainer } from "@/components/ui/popover";
import { Stay, lkr } from "@/lib/stays";
import {
  Booking,
  validateBooking,
  validateDates,
  todayISO,
  nightsBetween,
} from "@/lib/booking";
const empty: Booking = {
  name: "",
  email: "",
  phone: "",
  checkin: "",
  checkout: "",
  guests: "1",
};
export function BookingPanel({ stay }: { stay: Stay }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<Booking>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Booking, string>>>(
    {},
  );
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const n = Number(p.get("guests"));
    setValues((v) => ({
      ...v,
      checkin: p.get("checkin") || "",
      checkout: p.get("checkout") || "",
      guests: n >= 1 && n <= stay.guests ? String(n) : "1",
    }));
  }, [stay.guests]);
  const nights = !validateDates(values.checkin, values.checkout)
    ? nightsBetween(values.checkin, values.checkout)
    : 0;
  function open() {
    setSuccess(false);
    setErrors({});
    dialog.current?.showModal();
  }
  function update(key: keyof Booking, value: string) {
    setValues((v) => ({
      ...v,
      [key]: value,
      ...(key === "checkin" && v.checkout && value >= v.checkout
        ? { checkout: "" }
        : {}),
    }));
    setErrors((e) => ({
      ...e,
      [key]: undefined,
      ...(key === "checkin" ? { checkout: undefined } : {}),
    }));
  }
  return (
    <>
      <aside className="booking-panel">
        <p className="eyebrow">MAKE TIME FOR THIS</p>
        <div className="booking-price">
          LKR {lkr(stay.price)} <span>/ night</span>
        </div>
        <p className="booking-sub">Your own little piece of {stay.location}.</p>
        <div className="booking-dates">
          <label>
            CHECK IN
            <DatePicker
              label="Property check-in date"
              value={values.checkin}
              min={todayISO()}
              onChange={(next) => update("checkin", next)}
            />
          </label>
          <label>
            CHECK OUT
            <DatePicker
              label="Property check-out date"
              value={values.checkout}
              min={values.checkin || todayISO()}
              exclusiveMin={!!values.checkin}
              onChange={(next) => update("checkout", next)}
            />
          </label>
        </div>
        <label className="booking-guests">
          GUESTS
          <SelectField
            label="Property guest count"
            value={values.guests}
            onChange={(next) => update("guests", next)}
            options={Array.from({ length: stay.guests }, (_, i) => ({
              value: String(i + 1),
              label: `${i + 1} ${i ? "guests" : "guest"}`,
            }))}
          />
        </label>
        {nights > 0 && (
          <div className="booking-total">
            <span>
              {nights} {nights === 1 ? "night" : "nights"} total
            </span>
            <strong>LKR {lkr(nights * stay.price)}</strong>
          </div>
        )}
        <button className="button" onClick={open}>
          Request booking <ArrowUpRight size={18} />
        </button>
        <p className="booking-fine">
          <Check size={13} />
          No payment required
        </p>
      </aside>
      <button className="mobile-book button" onClick={open}>
        LKR {lkr(stay.price)} / night <span>Request booking ↗</span>
      </button>
      <dialog
        aria-labelledby={success ? "booking-success-title" : "booking-title"}
        ref={dialog}
        className="booking-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <PopupContainer.Provider value={dialog}>
          <button
            className="dialog-close"
            onClick={() => dialog.current?.close()}
            aria-label="Close booking request"
          >
            <X size={20} />
          </button>
          {success ? (
            <div className="booking-success" role="status">
              <CheckCircle2 size={45} strokeWidth={1} />
              <p className="eyebrow">YOUR NEXT ESCAPE</p>
              <h2 id="booking-success-title">
                Looks like <em>island time.</em>
              </h2>
              <p>
                Your request details for <strong>{stay.name}</strong> has been
                prepared.
              </p>
              <div className="success-summary">
                <span>
                  {values.checkin} → {values.checkout}
                </span>
                <span>
                  {values.guests} guests · {nights} nights
                </span>
                <span>Request reference: {reference}</span>
              </div>
              <button
                className="button"
                onClick={() => {
                  dialog.current?.close();
                  setValues({ ...empty });
                }}
              >
                Back to your stay
              </button>
            </div>
          ) : (
            <>
              <p className="eyebrow">YOUR ISLAND ESCAPE</p>
              <h2 id="booking-title">
                Stay a little <em>longer.</em>
              </h2>
              <p className="dialog-description">
                Request a stay at {stay.name}, {stay.location}.
              </p>
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  const found = validateBooking(values, stay.guests);
                  setErrors(found);
                  if (Object.keys(found).length) {
                    requestAnimationFrame(() =>
                      dialog.current
                        ?.querySelector<HTMLInputElement>(
                          '[aria-invalid="true"]',
                        )
                        ?.focus(),
                    );
                    return;
                  }
                  setReference(
                    `LS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
                  );
                  setSuccess(true);
                }}
                aria-labelledby="booking-title"
              >
                <div className="form-grid">
                  {(
                    [
                      {
                        key: "name",
                        label: "Guest name",
                        type: "text",
                        auto: "name",
                      },
                      {
                        key: "email",
                        label: "Email address",
                        type: "email",
                        auto: "email",
                      },
                      {
                        key: "phone",
                        label: "Contact number",
                        type: "tel",
                        auto: "tel",
                      },
                      { key: "checkin", label: "Check-in date", type: "date" },
                      {
                        key: "checkout",
                        label: "Check-out date",
                        type: "date",
                      },
                    ] as {
                      key: keyof Booking;
                      label: string;
                      type: string;
                      auto?: string;
                    }[]
                  ).map((f) => (
                    <label
                      className={f.key === "name" ? "full-field" : ""}
                      key={f.key}
                    >
                      {f.label}
                      {f.type === "date" ? (
                        <DatePicker
                          name={f.key}
                          label={f.label}
                          value={values[f.key]}
                          min={
                            f.key === "checkout"
                              ? values.checkin || todayISO()
                              : todayISO()
                          }
                          exclusiveMin={
                            f.key === "checkout" && !!values.checkin
                          }
                          onChange={(next) => update(f.key, next)}
                          invalid={!!errors[f.key]}
                          describedBy={
                            errors[f.key] ? `error-${f.key}` : undefined
                          }
                        />
                      ) : (
                        <input
                          name={f.key}
                          type={f.type}
                          autoComplete={f.auto}
                          value={values[f.key]}
                          required
                          min={f.type === "date" ? todayISO() : undefined}
                          aria-invalid={!!errors[f.key]}
                          aria-describedby={
                            errors[f.key] ? `error-${f.key}` : undefined
                          }
                          onChange={(e) => update(f.key, e.target.value)}
                        />
                      )}
                      {errors[f.key] && (
                        <span
                          className="form-error"
                          id={`error-${f.key}`}
                          role="alert"
                        >
                          {errors[f.key]}
                        </span>
                      )}
                    </label>
                  ))}
                  <label>
                    Number of guests
                    <SelectField
                      label="Number of guests"
                      name="guests"
                      value={values.guests}
                      onChange={(next) => update("guests", next)}
                      invalid={!!errors.guests}
                      describedBy={errors.guests ? "error-guests" : undefined}
                      options={Array.from({ length: stay.guests }, (_, i) => ({
                        value: String(i + 1),
                        label: `${i + 1} ${i ? "guests" : "guest"}`,
                      }))}
                    />
                    {errors.guests && (
                      <span className="form-error" id="error-guests">
                        {errors.guests}
                      </span>
                    )}
                  </label>
                </div>
                <button type="submit" className="button">
                  Submit booking request <ArrowUpRight size={18} />
                </button>
              </form>
            </>
          )}
        </PopupContainer.Provider>
      </dialog>
    </>
  );
}
