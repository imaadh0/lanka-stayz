"use client";
import { useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { cn } from "@/lib/utils";
type Option = { value: string; label: string };
// A keyboard-accessible listbox composed from shadcn/ui Popover.
export function SelectField({
  value,
  onChange,
  options,
  label,
  name,
  invalid,
  describedBy,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label: string;
  name?: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const list = useRef<HTMLDivElement>(null);
  const prefix = useRef("");
  const typedAt = useRef(0);
  const selected = options.find((o) => o.value === value);
  function move(index: number) {
    const next = (index + options.length) % options.length;
    setActive(next);
    requestAnimationFrame(() =>
      list.current
        ?.querySelectorAll<HTMLElement>("[role=option]")
        [next]?.focus(),
    );
  }
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next)
          setActive(
            Math.max(
              0,
              options.findIndex((o) => o.value === value),
            ),
          );
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={label}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="ui-field-trigger"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              setOpen(true);
              setActive(
                Math.max(
                  0,
                  options.findIndex((o) => o.value === value),
                ),
              );
            }
          }}
        >
          <span>{selected?.label || label}</span>
          <ChevronDown size={15} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="ui-select-popover"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          move(
            Math.max(
              0,
              options.findIndex((o) => o.value === value),
            ),
          );
        }}
      >
        <div className="ui-popover-heading">{label}</div>
        <div
          ref={list}
          id={listId}
          role="listbox"
          aria-label={label}
          className="ui-select-list"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              move(active + (e.key === "ArrowDown" ? 1 : -1));
            } else if (e.key === "Home" || e.key === "End") {
              e.preventDefault();
              move(e.key === "Home" ? 0 : options.length - 1);
            } else if (e.key === "Tab") {
              setOpen(false);
            } else if (e.key.length === 1 && e.key !== " ") {
              prefix.current =
                Date.now() - typedAt.current > 600
                  ? e.key
                  : prefix.current + e.key;
              typedAt.current = Date.now();
              const i = options.findIndex((o) =>
                o.label.toLowerCase().startsWith(prefix.current.toLowerCase()),
              );
              if (i >= 0) move(i);
            }
          }}
        >
          {options.map((option, index) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option.value}
              tabIndex={active === index ? 0 : -1}
              key={option.value}
              className={cn(
                "ui-select-option",
                value === option.value && "is-selected",
              )}
              onFocus={() => setActive(index)}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              {value === option.value && <Check size={15} />}
            </button>
          ))}
        </div>
      </PopoverContent>
      {name && <input type="hidden" name={name} value={value} />}
    </Popover>
  );
}
