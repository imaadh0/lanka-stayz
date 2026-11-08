import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import assert from "node:assert/strict";
const destination = path.resolve(".test-results/unit");
await fs.mkdir(destination, { recursive: true });
for (const name of ["booking", "stays"]) {
  const source = await fs.readFile(`lib/${name}.ts`, "utf8");
  await fs.writeFile(
    path.join(destination, `${name}.mjs`),
    ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    }).outputText,
  );
}
const booking = await import(
  pathToFileURL(path.join(destination, "booking.mjs"))
);
const properties = await import(
  pathToFileURL(path.join(destination, "stays.mjs"))
);
const tests = [];
function test(name, run) {
  run();
  tests.push({ name, status: "passed" });
  console.log("PASS", name);
}
const values = {
  name: "Guest Example",
  email: "guest@example.com",
  phone: "+94 77 123 4567",
  checkin: "2027-02-01",
  checkout: "2027-02-04",
  guests: "2",
};
test("All six stays appear without destination filters", () =>
  assert.equal(properties.filterStays("").length, 6));
test("Destination matching ignores case", () =>
  assert.equal(properties.filterStays("galle")[0].slug, "the-palm-house"));
test("Guest capacity excludes smaller properties", () =>
  assert.ok(properties.filterStays("", 6).every((s) => s.guests >= 6)));
test("Unknown destination has no results", () =>
  assert.equal(properties.filterStays("unknown").length, 0));
test("Combined destination and capacity may have no results", () =>
  assert.equal(properties.filterStays("Ella", 6).length, 0));
test("Valid request has no validation errors", () =>
  assert.deepEqual(booking.validateBooking(values, 6, "2027-01-01"), {}));
test("Missing identity and dates are rejected", () =>
  assert.ok(
    Object.keys(
      booking.validateBooking(
        {
          name: "",
          email: "",
          phone: "",
          checkin: "",
          checkout: "",
          guests: "1",
        },
        6,
        "2027-01-01",
      ),
    ).length >= 4,
  ));
test("Malformed email is rejected", () =>
  assert.ok(
    booking.validateBooking({ ...values, email: "no-at-sign" }, 6, "2027-01-01")
      .email,
  ));
test("Non-numeric phone is rejected", () =>
  assert.ok(
    booking.validateBooking({ ...values, phone: "telephone" }, 6, "2027-01-01")
      .phone,
  ));
test("Past check-in is rejected", () =>
  assert.match(
    booking.validateDates("2026-01-01", "2026-01-02", "2027-01-01"),
    /today/,
  ));
test("Same-day checkout is rejected", () =>
  assert.match(
    booking.validateDates("2027-02-01", "2027-02-01", "2027-01-01"),
    /after/,
  ));
test("Reversed dates are rejected", () =>
  assert.match(
    booking.validateDates("2027-02-04", "2027-02-01", "2027-01-01"),
    /after/,
  ));
test("Impossible calendar date is rejected", () =>
  assert.match(
    booking.validateDates("2027-02-30", "2027-03-03", "2027-01-01"),
    /valid/,
  ));
test("Above-capacity and fractional guest counts are rejected", () => {
  assert.ok(
    booking.validateBooking({ ...values, guests: "7" }, 6, "2027-01-01").guests,
  );
  assert.ok(
    booking.validateBooking({ ...values, guests: "1.5" }, 6, "2027-01-01")
      .guests,
  );
});
test("Night count uses calendar dates without DST drift", () =>
  assert.equal(booking.nightsBetween("2027-03-12", "2027-03-15"), 3));
await fs.mkdir(".test-results", { recursive: true });
await fs.writeFile(
  ".test-results/unit-results.json",
  JSON.stringify(
    { executedAt: new Date().toISOString(), total: tests.length, tests },
    null,
    2,
  ),
);
