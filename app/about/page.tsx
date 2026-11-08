import { Photo } from "@/components/photo";
import Link from "next/link";
export const metadata = { title: "Our story" };
export default function Page() {
  return (
    <main id="main">
      <section className="wrap page-main">
        <div className="page-title">
          <p className="eyebrow">ROOTED IN THE ISLAND</p>
          <h1>
            Good places.
            <br />
            <em>Lasting feelings.</em>
          </h1>
        </div>
        <div className="about-grid">
          <Photo
            src="/images/coast.jpg"
            alt="Palm-lined tropical coastline"
            width="1200"
            height="1000"
          />
          <div>
            <h2>
              Travel a little <em>closer.</em>
            </h2>
            <p>
              Lanka Stayz is about discovering Sri Lanka through the places we
              stay. A veranda with a sea breeze. A hillside room with a view. A
              city apartment that makes a new neighbourhood feel familiar.
            </p>
            <p>
              Explore a considered collection of coastal escapes, hillside
              hideaways and city residences. Find a space that fits your group
              and a place that moves at your pace.
            </p>
            <Link href="/stays/" className="button">
              Explore the collection ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
