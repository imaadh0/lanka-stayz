import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wrap empty-state page-main">
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>
        This path ends <em>here.</em>
      </h1>
      <p>
        We couldn’t find that stay or page. There are still lovely places to
        explore.
      </p>
      <Link href="/stays/" className="button">
        Back to the collection ↗
      </Link>
    </main>
  );
}
