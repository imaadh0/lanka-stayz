"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { format, isValid, parseISO, addDays } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";
type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  min?: string;
  exclusiveMin?: boolean;
  name?: string;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};
export function DatePicker({
  value,
  onChange,
  label,
  min,
  exclusiveMin = false,
  name,
  invalid,
  describedBy,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const parsed = value ? parseISO(value) : undefined;
  const selected = parsed && isValid(parsed) ? parsed : undefined;
  const minDate = min && isValid(parseISO(min)) ? parseISO(min) : undefined;
  const earliest = minDate
    ? exclusiveMin
      ? addDays(minDate, 1)
      : minDate
    : undefined;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "ui-field-trigger ui-date-trigger",
            !selected && "is-placeholder",
            className,
          )}
          aria-label={label}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
        >
          <span>
            {selected ? format(selected, "dd MMM yyyy") : "Select date"}
          </span>
          <CalendarDays size={15} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="ui-date-popover"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="ui-popover-heading">{label}</div>
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected || earliest}
          disabled={earliest ? { before: earliest } : undefined}
          autoFocus
          onSelect={(date) => {
            if (date) {
              onChange(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }
          }}
        />
        {value && (
          <button
            type="button"
            className="ui-clear-date"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            Clear date
          </button>
        )}
      </PopoverContent>
      {name && <input type="hidden" name={name} value={value} />}
    </Popover>
  );
}
