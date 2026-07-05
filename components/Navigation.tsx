"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "#about",      label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects" },
  { href: "#contact",    label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled]    = useState(false);
  const [scrollPct, setScrollPct]  = useState(0);
  const [activeSection, setActive] = useState("");
  const [menuOpen, setMenuOpen]    = useState(false);

  // Lock body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Scroll progress + scrolled flag
  useEffect(() => {
    const onScroll = () => {
      const scrollY   = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 10);
      setScrollPct(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 64 - 32;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled
            ? "rgba(250, 250, 247, 0.92)"
            : "rgba(250, 250, 247, 0.80)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${scrolled ? "var(--color-border)" : "transparent"}`,
          transition: "border-color 0.3s ease, background-color 0.3s ease",
        }}
      >
        {/* Scroll progress bar */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "2px",
            width: `${scrollPct}%`,
            backgroundColor: "var(--color-accent)",
            transition: "width 0.1s linear",
            borderRadius: "0 2px 2px 0",
          }}
        />

        <nav
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.1rem",
              fontWeight: 400,
              color: "var(--color-text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Anushidh
          </Link>

          {/* Desktop nav */}
          <ul className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none" }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="link-underline"
                    style={{
                      fontSize: "0.875rem",
                      color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                      textDecoration: "none",
                      fontFamily: "var(--font-body)",
                      fontWeight: isActive ? 500 : 400,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.target as HTMLElement).style.color = "var(--color-text-primary)"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.target as HTMLElement).style.color = "var(--color-text-secondary)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
              color: "var(--color-text-primary)",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "currentColor", transition: "transform 0.25s ease, opacity 0.25s ease", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "currentColor", transition: "opacity 0.25s ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "currentColor", transition: "transform 0.25s ease, opacity 0.25s ease", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          backgroundColor: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Slide-in sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 70,
          width: "min(300px, 80vw)",
          backgroundColor: "var(--color-surface)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
        }}
      >
        {/* Sheet header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
            Anushidh
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              cursor: "pointer",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-secondary)",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
              (e.currentTarget.firstElementChild as HTMLElement).style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
              (e.currentTarget.firstElementChild as HTMLElement).style.transform = "rotate(0deg)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(0.9)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--color-accent)" : "var(--color-text-primary)",
                  textDecoration: "none",
                  backgroundColor: isActive ? "color-mix(in srgb, var(--color-accent) 8%, transparent)" : "transparent",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-background)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-accent)", flexShrink: 0 }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            Available for full-time roles
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}

