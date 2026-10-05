"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Product", href: "#product" },
  { label: "Calculators", href: "#calculators" },
  { label: "Markets", href: "#markets" },
  { label: "Insights", href: "#insights" },
];

function Wordmark() {
  return (
    <a className="wordmark" href="#product" aria-label="Fermor home">
      <svg className="brand-mark" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 20.5V7.5h12.8M5 13.8h10.2M16.5 20.5l6-6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21.8" cy="8" r="2.2" fill="currentColor" />
      </svg>
      Fermor
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 8);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a className="nav-link" href={link.href} key={link.label}>{link.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="login-link" href="#login">Log in</a>
          <a className="button button-primary button-small" href="#get-started">
            Get started <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map((link) => <a className="nav-link" href={link.href} key={link.label} onClick={closeMenu}>{link.label}</a>)}
          <div className="mobile-menu-actions">
            <a className="login-link" href="#login" onClick={closeMenu}>Log in</a>
            <a className="button button-primary button-small" href="#get-started" onClick={closeMenu}>
              Get started <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
