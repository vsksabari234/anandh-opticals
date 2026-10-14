import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import {
  Sparkles,
  ShoppingBag,
  Eye,
  Menu,
  X,
  Stethoscope,
  Phone,
  Globe,
  Search,
  Heart,
  Home,
  Calendar,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ onOpenCart }) {
  const {
    lang,
    setLang,
    cart,
    wishlist,
    setIsHomeEyeTestOpen,
    setIsTryOnModalOpen,
    setIsAppointmentModalOpen,
    globalSearch,
    setGlobalSearch
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState(globalSearch || '');
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const itemTotal = (item.price + (item.lens?.price || 0)) * item.quantity;
    return sum + itemTotal;
  }, 0);

  const navLinks = [
    { to: '/', label: lang === 'ta' ? 'முகப்பு' : 'Home' },
    { to: '/catalog', label: lang === 'ta' ? 'கண்ணாடிகள்' : 'Eyewear Frames' },
    { to: '/vision-lab', label: lang === 'ta' ? 'கண் பரிசோதனை லேப்' : 'Vision Lab' },
    { to: '/contact', label: lang === 'ta' ? 'தொடர்புக்கு' : 'Clinic & Store' }
  ];

  const trendingSearches = [
    'Titanium Rimless',
    'Cat-Eye Rose Acetate',
    'Blue Cut Computer Glasses',
    'Aviator Polarized',
    'Vintage Round',
    'Junior Unbreakable'
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchInput.trim()) {
      setGlobalSearch(searchInput.trim());
      setShowSearchDropdown(false);
      navigate('/catalog');
    }
  };

  const handleSelectQuickSearch = (term) => {
    setSearchInput(term);
    setGlobalSearch(term);
    setShowSearchDropdown(false);
    navigate('/catalog');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-sky-100 shadow-xs transition-all">
      {/* 1. Top Announcement & Utility Bar */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-[11px] text-white py-1.5 px-4 sm:px-8 border-b border-sky-700/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-sky-200 font-extrabold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Modern Eyewear & German Precision Eye Care • Established 1998
            </span>
            <span className="hidden md:inline text-sky-400">|</span>
            <button
              onClick={() => setIsHomeEyeTestOpen(true)}
              className="hidden md:flex items-center gap-1 text-sky-200 hover:text-white transition font-medium"
            >
              <Home className="w-3 h-3 text-sky-400" />
              100% Free Doorstep Eye-Test in Kallakurichi
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.contact.phone}`}
              className="flex items-center gap-1 text-sky-200 hover:text-white transition font-semibold"
            >
              <Phone className="w-3 h-3 text-sky-400" />
              {BUSINESS_INFO.contact.phone}
            </a>

            <span className="text-sky-600">|</span>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-[10px] font-bold"
              title="Toggle English / தமிழ்"
            >
              <Globe className="w-3 h-3 text-sky-300" />
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>

            {/* Dr. Anand Clinic Portal Link */}
            <Link
              to="/doctor"
              className="flex items-center gap-1.5 text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-full border border-amber-400/40 transition text-[10px] font-black"
            >
              <Stethoscope className="w-3 h-3 text-amber-400" />
              Dr. Anand Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-amber-400 p-0.5 shadow-md glow-glacier flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-sky-600 group-hover:scale-105 transition">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-sky-700 transition">
                ANAND OPTICALS
              </span>
              <span className="hidden sm:inline text-[9px] uppercase font-black tracking-widest bg-sky-50 text-sky-800 border border-sky-300 px-2 py-0.5 rounded-full shadow-2xs">
                Precision Clinic
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-semibold tracking-wide">
              {lang === 'ta' ? 'ஆனந்த் ஆப்டிக்கல்ஸ் • கள்ளக்குறிச்சி' : 'Smart Eyewear Studio • Salem Main Rd'}
            </div>
          </div>
        </Link>

        {/* Central Search Bar (Desktop/Tablet) */}
        <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg relative mx-2">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search frames (e.g. Aviator, Titanium, Cat-Eye, Blue Cut)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-10 pr-20 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-sky-500 rounded-full text-xs font-medium text-slate-800 placeholder-slate-400 transition shadow-inner focus:ring-2 focus:ring-sky-200 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white text-[11px] font-bold rounded-full transition shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Dropdown with Trending suggestions */}
          {showSearchDropdown && (
            <div
              className="absolute top-12 left-0 right-0 bg-white border border-sky-100 rounded-2xl shadow-2xl p-4 z-50 animate-scale-in"
              onMouseLeave={() => setShowSearchDropdown(false)}
            >
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>Popular Searches</span>
                <button
                  onClick={() => setShowSearchDropdown(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectQuickSearch(term)}
                    className="px-2.5 py-1 bg-sky-50/70 hover:bg-sky-100 text-sky-900 border border-sky-200 rounded-lg text-xs font-medium transition text-left"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons & CTAs */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Free Doorstep Eye-Test Button */}
          <button
            onClick={() => setIsHomeEyeTestOpen(true)}
            className="hidden sm:flex items-center gap-1.5 py-2 px-3 sm:px-3.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold transition shadow-xs"
            title="Book Free Doorstep Eye-Test"
          >
            <Home className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden md:inline">Doorstep Test</span>
            <span className="md:hidden">Home Test</span>
          </button>

          {/* 3D Virtual Try-On Launcher */}
          <button
            onClick={() => setIsTryOnModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-black border border-sky-200 transition"
            title="Launch 3D Virtual Try-On"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            3D Try-On
          </button>

          {/* Wishlist Icon */}
          <Link
            to="/catalog"
            className="relative p-2.5 rounded-xl bg-white hover:bg-rose-50 text-slate-700 border border-slate-200 hover:border-rose-200 transition"
            aria-label="View Wishlist"
            title="Saved Frames"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Shopping Bag with Count & Subtotal */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-sky-700 text-white text-xs font-black shadow-md transition"
            aria-label="View shopping bag"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            {cartCount > 0 && (
              <span className="hidden sm:inline font-mono">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Sub-Navbar Links Strip (Desktop) */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-8 py-2 border-t border-sky-100/70 text-xs font-bold text-slate-700">
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-sky-600 transition pb-0.5 ${
                isActive(link.to)
                  ? 'text-sky-700 border-b-2 border-sky-600 font-extrabold'
                  : 'text-slate-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsHomeEyeTestOpen(true)}
            className="flex items-center gap-1.5 text-sky-700 hover:text-sky-900 text-xs font-bold bg-sky-50 px-3 py-1 rounded-full border border-sky-200 transition"
          >
            <Home className="w-3.5 h-3.5 text-sky-600" />
            Book Doorstep Test
          </button>

          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="flex items-center gap-1.5 text-amber-900 hover:text-amber-950 text-xs font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-300 transition"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            Book Clinic Exam
          </button>
        </div>
      </div>

      {/* 4. Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 px-5 py-5 space-y-4 shadow-xl animate-fade-in">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search frames by name, brand, shape..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl text-sm font-bold transition ${
                  isActive(link.to)
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl text-sm font-bold text-amber-900 bg-amber-50 border border-amber-300 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-amber-700" />
                Doctor Admin Clinic Portal
              </span>
              <ChevronRight className="w-4 h-4 text-amber-600" />
            </Link>
          </nav>

          {/* Quick Action Buttons */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsHomeEyeTestOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-50 text-sky-900 font-bold text-xs border border-sky-300 flex items-center justify-center gap-1.5"
            >
              <Home className="w-4 h-4 text-sky-600" /> Book Free Doorstep Eye-Test
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTryOnModalOpen(true);
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" /> 3D Try-On
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAppointmentModalOpen(true);
              }}
              className="py-2.5 px-3 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Clinic
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
