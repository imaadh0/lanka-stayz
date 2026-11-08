export function SocialLinks() {
  return (
    <div className="social-links" aria-label="Follow Lanka Stayz">
      <a
        href="https://www.instagram.com/"
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href="https://www.facebook.com/"
        aria-label="Facebook"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.7 21v-8.2h2.75l.42-3.2H13.7V7.55c0-.93.26-1.56 1.6-1.56H17V3.13A22.8 22.8 0 0 0 14.54 3c-2.44 0-4.11 1.5-4.11 4.25V9.6H7.67v3.2h2.76V21z" />
        </svg>
      </a>
    </div>
  );
}
