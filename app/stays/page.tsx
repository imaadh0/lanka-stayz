import { Suspense } from "react";
import { Listings } from "@/components/listings";
export const metadata = { title: "Explore stays" };
export default function Page() {
  return (
    <main id="main" className="wrap page-main">
      <div className="page-title">
        <p className="eyebrow">SIX PLACES. COUNTLESS POSSIBILITIES.</p>
        <h1>
          Find your <em>somewhere.</em>
        </h1>
        <p>Beach houses, hillside hideaways and places that feel like home.</p>
      </div>
      <Suspense fallback={<p>Finding your stays…</p>}>
        <Listings />
      </Suspense>
    </main>
  );
}
