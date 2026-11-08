import Link from "next/link";
export const metadata = { title: "Get in touch" };
export default function Page() {
  return (
    <main id="main" className="wrap page-main">
      <div className="page-title">
        <p className="eyebrow">A CONVERSATION STARTS HERE</p>
        <h1>
          A little help
          <br />
          <em>finding your way.</em>
        </h1>
        <p>A little inspiration for your next island escape.</p>
      </div>
      <div className="contact-grid">
        <section>
          <h2>
            Say <em>hello.</em>
          </h2>
          <p>Colombo, Sri Lanka</p>
          <a className="text-link" href="mailto:hello@lankastayz.example">
            hello@lankastayz.example ↗
          </a>
        </section>
        <section>
          <h3>How do booking requests work?</h3>
          <p>
            Choose a property, select your preferred dates and the number of
            guests, then complete the booking request form.
          </p>
          <h3>Where should I stay?</h3>
          <p>
            Follow the south coast for warm seas and sandy coves, head into the
            hills for cool mornings, or make Colombo your base for a city
            escape.
          </p>
          <Link href="/stays/" className="text-link">
            Browse the stays ↗
          </Link>
        </section>
      </div>
    </main>
  );
}
