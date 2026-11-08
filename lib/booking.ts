export type Booking = {
  name: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  guests: string;
};
export function todayISO(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function validDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}
export function validateDates(
  checkin: string,
  checkout: string,
  today = todayISO(),
) {
  if (!validDate(checkin) || !validDate(checkout))
    return "Choose valid check-in and check-out dates.";
  if (checkin < today) return "Check-in must be today or later.";
  if (checkout <= checkin) return "Check-out must be after check-in.";
  return "";
}
export function validateBooking(
  values: Booking,
  capacity: number,
  today = todayISO(),
) {
  const errors: Partial<Record<keyof Booking, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (
    !/^[+\d\s().-]+$/.test(values.phone) ||
    values.phone.replace(/\D/g, "").length < 7 ||
    values.phone.replace(/\D/g, "").length > 15
  )
    errors.phone = "Enter a contact number with 7–15 digits.";
  const dateError = validateDates(values.checkin, values.checkout, today);
  if (dateError) errors.checkout = dateError;
  if (
    !/^\d+$/.test(values.guests) ||
    Number(values.guests) < 1 ||
    Number(values.guests) > capacity
  )
    errors.guests = `Choose between 1 and ${capacity} guests.`;
  return errors;
}
export function nightsBetween(a: string, b: string) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}
