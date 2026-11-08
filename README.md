# Lanka Stayz

A responsive accommodation discovery website for Sri Lanka, built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

Requires Node.js 22 or later.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

## Build and check

```sh
npm run assets
npm test
npm run build
npm run typecheck
npm start
```

The production build exports static files to `out/`. `npm start` serves that directory locally. All required images are included in `public/images`.

## Features

- Six stays across Colombo, Kandy, Ella, Galle, Mirissa and Nuwara Eliya.
- Destination and guest-capacity filters with shareable search URLs.
- Individual property pages with galleries, amenities and nightly LKR pricing.
- Booking request form with date, contact and capacity validation.
- Styled calendars and keyboard-accessible dropdowns using shadcn/ui composition, Radix Popover and React DayPicker.
- Responsive layouts, mobile navigation and accessible focus states.

## Project structure

- `app/`: routes and shared styling.
- `components/`: reusable interface components.
- `lib/`: property data, image manifest and validation.
- `public/images/`: bundled image assets.
- `scripts/`: asset checks, validation tests and local static server.

## Deploy to Netlify

Import this GitHub repository in Netlify and select the `main` branch. The included `netlify.toml` sets the build command, Node version and `out` publish directory. No environment secrets or runtime backend are required.

Do not add a single-page-app redirect to `index.html`: Next.js exports each route separately, including property pages and the not-found page.

## Current scope

Property data is local. Availability is not checked live, and the request form validates details in the browser without sending emails or saving reservations. Payments and accounts are outside the current implementation. Contact and social profile links should be replaced with the business's real details before commercial use.

After the first successful dependency installation, commit `package-lock.json` and use `npm ci` for subsequent installs.
