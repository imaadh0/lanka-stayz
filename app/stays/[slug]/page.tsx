import { Photo } from "@/components/photo";
import { BrandMark } from "@/components/brand-mark";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users, BedDouble, Check } from "lucide-react";
import { stays } from "@/lib/stays";
import { BookingPanel } from "@/components/booking-panel";
export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stay = stays.find((s) => s.slug === slug);
  return { title: stay?.name || "Stay not found" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stay = stays.find((s) => s.slug === slug);
  if (!stay) notFound();
  return (
    <main id="main" className="wrap detail-main">
      <Link href="/stays/" className="back-link">
        <ArrowLeft size={14} />
        Back to the collection
      </Link>
      <div className="detail-heading">
        <div>
          <p className="eyebrow">
            {stay.region} / {stay.type.toUpperCase()}
          </p>
          <h1>{stay.name}</h1>
          <p>
            <MapPin size={15} />
            {stay.location}, Sri Lanka <span>·</span> {stay.note}
          </p>
        </div>
        <BrandMark className="detail-mark" />
      </div>
      <div className="property-gallery">
        <Photo
          src={`/images/${stay.image}.jpg`}
          alt={`exterior of ${stay.name}`}
          width="1200"
          height="900"
          fetchPriority="high"
        />
        <Photo
          src="/images/bedroom.jpg"
          alt="spacious guest bedroom"
          width="800"
          height="600"
        />
        <Photo
          src={
            stay.amenities.includes("Swimming pool")
              ? "/images/pool.jpg"
              : "/images/courtyard.jpg"
          }
          alt={
            stay.amenities.includes("Swimming pool")
              ? "holiday accommodation pool"
              : "holiday accommodation living space"
          }
          width="800"
          height="600"
        />
      </div>
      <div className="detail-columns">
        <div>
          <div className="detail-facts">
            <span>
              <Users size={18} />
              Up to {stay.guests} guests
            </span>
            <span>
              <BedDouble size={18} />
              {stay.bedrooms} bedrooms
            </span>
            <span>{stay.type}</span>
          </div>
          <section className="detail-section">
            <p className="eyebrow">SETTLE IN</p>
            <h2>
              A place to <em>exhale.</em>
            </h2>
            <p>{stay.description}</p>
          </section>
          <section className="detail-section">
            <h3>The little comforts</h3>
            <div className="amenity-grid">
              {stay.amenities.map((a) => (
                <span key={a}>
                  <Check size={17} />
                  {a}
                </span>
              ))}
            </div>
          </section>
          <section className="detail-section">
            <h3>Before you arrive</h3>
            <div className="arrival-info">
              <p>
                <strong>Check-in</strong>
                <span>From 2:00 pm</span>
              </p>
              <p>
                <strong>Check-out</strong>
                <span>Before 11:00 am</span>
              </p>
            </div>
          </section>
        </div>
        <BookingPanel stay={stay} />
      </div>
    </main>
  );
}
