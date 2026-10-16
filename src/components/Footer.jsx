import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footerLinks = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Shop' },
    { to: '#clinic', label: 'Clinic', isScroll: true },
    { to: '#about', label: 'About', isScroll: true },
    { to: '#appointment', label: 'Contact', isScroll: true }
  ];

  const handleLinkClick = (link, e) => {
    if (link.isScroll) {
      e.preventDefault();
      const el = document.querySelector(link.to);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-[#090909] text-zinc-300 border-t border-[#27272A]/80 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Logo matching Reference */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-center">
            <svg
              className="w-7 h-3.5 text-[#D4AF87]"
              viewBox="0 0 48 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="36" cy="12" r="9" />
              <path d="M21 12 C23 9.5, 25 9.5, 27 12" />
              <path d="M3 12 L0 10" />
              <path d="M45 12 L48 10" />
            </svg>
            <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#D4AF87] font-semibold leading-none mt-1">
              ANAND
            </span>
            <span className="text-[7px] uppercase tracking-[0.4em] text-zinc-500 font-sans leading-none mt-0.5">
              OPTICALS
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-10 text-xs uppercase tracking-[0.2em] font-sans text-zinc-400">
          {footerLinks.map((link) => (
            link.isScroll ? (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => handleLinkClick(link, e)}
                className="hover:text-[#D4AF87] transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-[#D4AF87] transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right Social Icons & Tagline */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-4 text-zinc-400">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#D4AF87] transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-none stroke-currentColor stroke-[1.75]" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#D4AF87] transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-none stroke-currentColor stroke-[1.75]" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#D4AF87] transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-none stroke-currentColor stroke-[1.75]" viewBox="0 0 24 24">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
          </div>

          <span className="text-xs text-zinc-500 font-serif-luxury italic tracking-wide hidden lg:inline-block border-l border-zinc-800 pl-6">
            Clear Vision. Better Life.
          </span>
        </div>
      </div>
    </footer>
  );
}
