import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const {
    cart,
    setIsCartOpen,
    globalSearch,
    setGlobalSearch
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchInput, setSearchInput] = useState(globalSearch || '');
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Shop' },
    { to: '#clinic', label: 'Clinic', isScroll: true },
    { to: '#about', label: 'About', isScroll: true },
    { to: '#appointment', label: 'Contact', isScroll: true }
  ];

  const handleNavClick = (link) => {
    if (link.isScroll) {
      if (location.pathname !== '/') {
        navigate(`/${link.to}`);
      } else {
        const el = document.querySelector(link.to);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchInput.trim()) {
      setGlobalSearch(searchInput.trim());
      setShowSearchInput(false);
      navigate('/catalog');
    }
  };

  const isActive = (link) => {
    if (link.to === '/') return location.pathname === '/' && !location.hash;
    if (link.to.startsWith('#')) return location.hash === link.to;
    return location.pathname === link.to;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090909]/95 backdrop-blur-md border-b border-[#27272A]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo on the Left matching Reference */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="flex flex-col items-center">
            {/* Wireframe Gold Glasses Icon */}
            <svg
              className="w-8 h-4 text-[#D4AF87] group-hover:scale-105 transition-transform"
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
            <span className="font-serif-luxury text-base tracking-[0.22em] text-[#D4AF87] font-semibold leading-none mt-1">
              ANAND
            </span>
            <span className="text-[8px] uppercase tracking-[0.38em] text-zinc-400 font-sans leading-none mt-0.5">
              OPTICALS
            </span>
          </div>
        </Link>

        {/* Navigation Links in Center */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {navLinks.map((link) => {
            const active = isActive(link);
            return link.isScroll ? (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className={`text-xs uppercase tracking-[0.18em] transition-all pb-1 font-sans cursor-pointer ${
                  active
                    ? 'text-[#D4AF87] border-b border-[#D4AF87] font-medium'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={`text-xs uppercase tracking-[0.18em] transition-all pb-1 font-sans ${
                  active
                    ? 'text-[#D4AF87] border-b border-[#D4AF87] font-medium'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search, User Account & Cart matching Reference */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Search Toggle / Input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center animate-fade-in">
                <input
                  type="text"
                  placeholder="Search frames..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  autoFocus
                  onBlur={() => !searchInput && setShowSearchInput(false)}
                  className="w-36 sm:w-48 pl-3 pr-8 py-1.5 bg-[#18181B] border border-[#27272A] rounded-full text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                />
                <button
                  type="button"
                  onClick={() => setShowSearchInput(false)}
                  className="absolute right-2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearchInput(true)}
                className="text-zinc-300 hover:text-[#D4AF87] transition-colors p-1"
                aria-label="Search Eyewear"
              >
                <Search className="w-4 h-4 stroke-[1.75]" />
              </button>
            )}
          </div>

          {/* User Account Icon */}
          <Link
            to="/doctor-portal"
            className="text-zinc-300 hover:text-[#D4AF87] transition-colors p-1"
            aria-label="Doctor & Staff Portal"
            title="Account / Portal"
          >
            <User className="w-4 h-4 stroke-[1.75]" />
          </Link>

          {/* Shopping Bag with Gold Badge */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative text-zinc-300 hover:text-[#D4AF87] transition-colors p-1"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            <span className="absolute -top-1.5 -right-2 bg-[#D4AF87] text-[#090909] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white p-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090909] border-b border-[#27272A] px-6 py-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className="text-sm uppercase tracking-widest text-zinc-200 hover:text-[#D4AF87] transition-colors py-1.5 border-b border-zinc-800/40"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
