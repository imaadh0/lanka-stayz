"use client";
import { SocialLinks } from "./social-links";
import { BrandMark } from "./brand-mark";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Lanka Stayz home">
      <span className="brand-name">
        lanka stayz
        <BrandMark className="brand-sun" />
      </span>
      <span className="brand-caption">SOMEWHERE THAT FEELS LIKE YOU</span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav
          id="main-navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {[
            ["/", "Home"],
            ["/stays/", "Explore Stays"],
            ["/about/", "About Us"],
            ["/contact/", "Contact"],
          ].map(([href, label]) => (
            <Link
              onClick={() => setOpen(false)}
              aria-current={
                path === href || path === href.slice(0, -1) ? "page" : undefined
              }
              key={href}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/stays/" className="header-cta">
          Find your stay <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div>
          <Brand />
          <p>
            Good places. Slower days.
            <br />A little more Sri Lanka.
          </p>
        </div>
        <div>
          <span className="eyebrow">MAKE YOURSELF AT HOME</span>
          <Link href="/stays/">Explore stays</Link>
          <Link href="/about/">Our story</Link>
          <Link href="/contact/">Get in touch</Link>
        </div>
        <div>
          <span className="eyebrow">YOUR ISLAND CONNECTION</span>
          <p>
            Find your next escape,
            <br />
            somewhere in Sri Lanka.
          </p>
          <a href="mailto:hello@lankastayz.example">hello@lankastayz.example</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} Lanka Stayz · All rights reserved.
        </span>
        <SocialLinks />
      </div>
    </footer>
  );
}
