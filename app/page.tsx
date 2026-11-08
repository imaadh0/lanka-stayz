import { Photo } from "@/components/photo";
import { BrandMark } from "@/components/brand-mark";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Compass, Sun, Waves } from "lucide-react";
import { Search } from "@/components/search";
import { StayCard } from "@/components/stay-card";
import { stays } from "@/lib/stays";
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <Photo
          className="hero-image"
          src="/images/hero.jpg"
          alt="Palm-fringed tropical accommodation with a pool and lush gardens"
          width="2200"
          height="1400"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <p className="eyebrow hero-eyebrow">
            <span /> AN ISLAND. A THOUSAND WAYS TO STAY.
          </p>
          <h1>
            Somewhere
            <br />
            that feels <em>like you.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Discover your perfect stay in Sri Lanka.
              <br />
              From salt-kissed shores to misty hills.
            </p>
            <a href="#collection" className="hero-explore">
              EXPLORE THE COLLECTION{" "}
              <span>
                <ArrowDown size={18} />
              </span>
            </a>
          </div>
        </div>
        <span className="hero-coordinate">
          6.0329° N · 80.2168° E &nbsp; / &nbsp; SRI LANKA
        </span>
      </section>
      <div className="search-wrap wrap">
        <Search />
      </div>
      <section className="intro wrap">
        <p className="eyebrow">A DIFFERENT KIND OF GETAWAY</p>
        <h2>
          Less ordinary.
          <br />
          <em>More island.</em>
        </h2>
        <div>
          <p>
            Open the windows. Let the ocean in. Take the long way through the
            hills. Some places don’t just give you somewhere to sleep. They give
            you a different way to feel.
          </p>
          <Link className="text-link" href="/about/">
            Meet Lanka Stayz <ArrowUpRight size={17} />
          </Link>
        </div>
        <BrandMark className="intro-mark" />
      </section>
      <section id="collection" className="collection wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR KIND OF SOMEWHERE</p>
            <h2>
              Stays with <em>a little soul.</em>
            </h2>
          </div>
          <Link href="/stays/" className="text-link">
            Explore all stays <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="property-grid">
          {stays.map((s) => (
            <StayCard key={s.slug} stay={s} />
          ))}
        </div>
      </section>
      <section className="destination-story">
        <div className="story-photo">
          <Photo
            src="/images/coast.jpg"
            alt="A tropical coastline with palms and blue ocean"
            width="1200"
            height="1000"
            loading="lazy"
          />
          <span>THE ART OF DOING A LITTLE LESS.</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">SMALL ISLAND. ENDLESS POSSIBILITY.</p>
          <h2>
            Follow the coast.
            <br />
            Find the hills.
            <br />
            <em>Stay a little longer.</em>
          </h2>
          <p>
            Morning tea above the clouds. Bare feet on a warm veranda. A table
            set for the people you love. Find a corner of Sri Lanka that moves
            at your pace.
          </p>
          <Link className="button" href="/stays/">
            Find your corner <ArrowUpRight size={18} />
          </Link>
          <div className="story-icons">
            <span>
              <Waves size={20} />
              Coastal escapes
            </span>
            <span>
              <Compass size={20} />
              Hill country
            </span>
            <span>
              <Sun size={20} />
              Island living
            </span>
          </div>
        </div>
      </section>
      <section className="closing wrap">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>
          Leave a little room
          <br />
          for <em>the unexpected.</em>
        </h2>
        <Link href="/stays/" className="text-link">
          Let’s find your stay <ArrowUpRight size={20} />
        </Link>
      </section>
    </main>
  );
}
