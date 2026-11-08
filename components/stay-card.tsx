import { Photo } from "@/components/photo";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Stay, lkr } from "@/lib/stays";
export function StayCard({ stay, query = "" }: { stay: Stay; query?: string }) {
  return (
    <article className="stay-card">
      <Link
        className="card-image"
        href={`/stays/${stay.slug}/${query}`}
        aria-label={`View ${stay.name}`}
      >
        <Photo
          src={`/images/${stay.image}.jpg`}
          alt={`${stay.type.toLowerCase()} accommodation for ${stay.name}`}
          width="900"
          height="1000"
          loading="lazy"
        />
        <span className="card-type">{stay.type}</span>
        <span className="card-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="card-location">
        <MapPin size={12} />
        {stay.location}, Sri Lanka
      </div>
      <h3>
        <Link href={`/stays/${stay.slug}/${query}`}>{stay.name}</Link>
      </h3>
      <p className="card-meta">
        {stay.bedrooms} {stay.bedrooms === 1 ? "bedroom" : "bedrooms"}
        <span>·</span>Up to {stay.guests} guests
      </p>
      <div className="card-bottom">
        <p>
          <strong>LKR {lkr(stay.price)}</strong>
          <span> / night</span>
        </p>
        <Link href={`/stays/${stay.slug}/${query}`} className="details-link">
          View details <ArrowUpRight size={13} />
        </Link>
      </div>
    </article>
  );
}
