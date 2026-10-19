import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X,
  MapPin,
  Truck,
  ShieldCheck,
  ChevronDown,
  Calendar,
  Sparkles,
  Eye,
  Glasses,
  Stethoscope,
  Phone,
  Info,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const {
    cart,
    user,
    wishlist = [],
    setIsCartOpen,
    globalSearch,
    setGlobalSearch,
    setIsAppointmentModalOpen
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileHomeExpanded, setMobileHomeExpanded] = useState(false);
  const [mobileShopExpanded, setMobileShopExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'home' | 'shop' | null
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchInput, setSearchInput] = useState(globalSearch || '');

  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (menu) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const closeDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(null);
  };

  const handleNavScroll = (targetId) => {
    closeDropdown();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${targetId}`);
    } else {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchInput.trim()) {
      setGlobalSearch(searchInput.trim());
      setShowSearchInput(false);
      navigate('/catalog');
    }
  };

  const isCurrentPath = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* 1. Slim Announcement Bar */}
      <div className="bg-[#121214] border-b border-[#27272A]/80 text-[11px] text-zinc-400 py-1.5 px-4 sm:px-8 relative z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <MapPin className="w-3 h-3 text-[#D4AF87]" />
            <span>Chennai Flagship: Cathedral Road & Anna Nagar • Kallakurichi Showroom</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#D4AF87] font-medium">
            <Truck className="w-3 h-3" />
            <span>Free Express Shipping Across India on Orders Over ₹1,999</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3 h-3 text-[#D4AF87]" />
            <span>100% Certified Authentic Lenses • 14-Day Free Exchange</span>
          </div>
        </div>
      </div>

      {/* 2. Floating Glassmorphism Pill Header */}
      <header className="sticky top-2 sm:top-3.5 z-50 w-full px-3 sm:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto bg-[#090909]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.7)] px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6 pointer-events-auto transition-all duration-300">
          
          {/* Brand Logo on the Left */}
          <Link
            to="/"
            onClick={() => {
              closeDropdown();
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group py-1"
          >
            <div className="flex flex-col items-center">
              {/* Wireframe Gold Glasses Icon */}
              <svg
                className="w-7 sm:w-8 h-3.5 sm:h-4 text-[#D4AF87] group-hover:scale-105 transition-transform duration-300"
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
              <span className="font-serif-luxury text-sm sm:text-base tracking-[0.22em] text-[#D4AF87] font-semibold leading-none mt-1">
                ANAND
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.38em] text-zinc-400 font-sans leading-none mt-0.5">
                OPTICALS
              </span>
            </div>
          </Link>

          {/* Center Navigation Links with Interactive Dropdowns */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            
            {/* 1. Home with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  navigate('/');
                  closeDropdown();
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] font-sans transition-all duration-200 cursor-pointer ${
                  activeDropdown === 'home' || isCurrentPath('/')
                    ? 'text-[#D4AF87] bg-white/5 font-medium'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Home</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'home' ? 'rotate-180 text-[#D4AF87]' : 'text-zinc-400'
                  }`}
                />
              </button>

              {/* Home Dropdown Menu Card */}
              {activeDropdown === 'home' && (
                <div
                  className="absolute top-full left-0 mt-2.5 w-72 sm:w-80 bg-[#121214]/95 backdrop-blur-2xl border border-[#27272A] rounded-2xl p-2.5 shadow-2xl shadow-black/80 animate-fade-in z-50 overflow-hidden"
                  onMouseEnter={() => handleMouseEnter('home')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-3 py-2 border-b border-[#27272A]/80 mb-1 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF87] font-semibold">
                      Explore Anand Opticals
                    </span>
                    <span className="text-[10px] text-zinc-500">Established 1984</span>
                  </div>

                  <div className="space-y-1">
                    {/* Clinic */}
                    <button
                      type="button"
                      onClick={() => handleNavScroll('#clinic')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:border-[#D4AF87]/60 group-hover:scale-105 transition-all shrink-0 mt-0.5">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-zinc-100 group-hover:text-[#D4AF87] transition-colors flex items-center gap-1.5">
                          <span>Clinic & Diagnostic Suite</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                          Computerized refraction, Zeiss biometrics & retina checks.
                        </p>
                      </div>
                    </button>

                    {/* About */}
                    <button
                      type="button"
                      onClick={() => handleNavScroll('#about')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:border-[#D4AF87]/60 group-hover:scale-105 transition-all shrink-0 mt-0.5">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-zinc-100 group-hover:text-[#D4AF87] transition-colors">
                          About Our Heritage
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                          40+ years of master optometry, luxury frames & lens craftsmanship.
                        </p>
                      </div>
                    </button>

                    {/* Contact */}
                    <button
                      type="button"
                      onClick={() => {
                        closeDropdown();
                        navigate('/contact');
                      }}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:border-[#D4AF87]/60 group-hover:scale-105 transition-all shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-zinc-100 group-hover:text-[#D4AF87] transition-colors">
                          Contact & Showrooms
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                          Showroom addresses, WhatsApp helpline & store directions.
                        </p>
                      </div>
                    </button>

                    {/* Book Appointment CTA Card */}
                    <div className="pt-1.5 border-t border-[#27272A]/80">
                      <button
                        type="button"
                        onClick={() => {
                          closeDropdown();
                          setIsAppointmentModalOpen(true);
                        }}
                        className="w-full p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF87]/15 to-[#D4AF87]/5 border border-[#D4AF87]/30 hover:border-[#D4AF87] transition-all flex items-center justify-between text-left group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#D4AF87] text-[#090909] flex items-center justify-center font-bold">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#D4AF87] leading-none">
                              Book Appointment
                            </div>
                            <div className="text-[10px] text-zinc-300 mt-0.5">
                              Free consultation with senior optometrist
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF87] group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Shop with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('shop')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  navigate('/shop');
                  closeDropdown();
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] font-sans transition-all duration-200 cursor-pointer ${
                  activeDropdown === 'shop' || isCurrentPath('/shop')
                    ? 'text-[#D4AF87] bg-white/5 font-medium'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Shop</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'shop' ? 'rotate-180 text-[#D4AF87]' : 'text-zinc-400'
                  }`}
                />
              </button>

              {/* Shop Dropdown Menu Card */}
              {activeDropdown === 'shop' && (
                <div
                  className="absolute top-full left-0 mt-2.5 w-72 sm:w-80 bg-[#121214]/95 backdrop-blur-2xl border border-[#27272A] rounded-2xl p-2.5 shadow-2xl shadow-black/80 animate-fade-in z-50 overflow-hidden"
                  onMouseEnter={() => handleMouseEnter('shop')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-3 py-2 border-b border-[#27272A]/80 mb-1 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF87] font-semibold">
                      Curated Optical Collections
                    </span>
                    <Link
                      to="/shop"
                      onClick={() => {
                        closeDropdown();
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                      }}
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </Link>
                  </div>

                  <div className="space-y-1">
                    {/* Sunglasses */}
                    <Link
                      to="/shop#frames"
                      onClick={() => {
                        closeDropdown();
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                      }}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:border-[#D4AF87]/60 group-hover:scale-105 transition-all shrink-0 mt-0.5">
                        <Glasses className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-zinc-100 group-hover:text-[#D4AF87] transition-colors flex items-center gap-2">
                          <span>Sunglasses</span>
                          <span className="text-[9px] px-1.5 py-0.2 bg-[#D4AF87]/15 text-[#D4AF87] rounded font-mono">
                            UV400
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                          Ray-Ban, Oakley, luxury polarized shields & driving aviators.
                        </p>
                      </div>
                    </Link>

                    {/* Eyeglasses */}
                    <Link
                      to="/shop#frames"
                      onClick={() => {
                        closeDropdown();
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                      }}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:border-[#D4AF87]/60 group-hover:scale-105 transition-all shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-zinc-100 group-hover:text-[#D4AF87] transition-colors">
                          Eyeglasses
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                          Italian acetate, ultra-light titanium, rimless & vintage round.
                        </p>
                      </div>
                    </Link>

                    {/* Lenses */}
                    <Link
                      to="/shop#frames"
                      onClick={() => {
                        closeDropdown();
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                      }}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:border-[#D4AF87]/60 group-hover:scale-105 transition-all shrink-0 mt-0.5">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-zinc-100 group-hover:text-[#D4AF87] transition-colors">
                          Prescription & Contact Lenses
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                          Zeiss DuraVision, Essilor Crizal, progressives & daily disposables.
                        </p>
                      </div>
                    </Link>

                    {/* Accessories */}
                    <Link
                      to="/shop#frames"
                      onClick={() => {
                        closeDropdown();
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                      }}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:border-[#D4AF87]/60 group-hover:scale-105 transition-all shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-zinc-100 group-hover:text-[#D4AF87] transition-colors">
                          Optical Accessories & Care
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                          Hard leather cases, microfiber cloths, anti-fog solutions.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Virtual Try-On (Direct Prominent Link) */}
            <Link
              to="/vision-lab"
              onClick={() => {
                closeDropdown();
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] font-sans transition-all duration-200 group ${
                isCurrentPath('/vision-lab')
                  ? 'text-[#090909] bg-[#D4AF87] font-semibold shadow-md shadow-[#D4AF87]/20'
                  : 'text-zinc-300 hover:text-[#D4AF87] hover:bg-white/5'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 transition-transform group-hover:rotate-12 ${
                isCurrentPath('/vision-lab') ? 'text-[#090909]' : 'text-[#D4AF87]'
              }`} />
              <span>Virtual Try-On</span>
            </Link>
          </nav>

          {/* Right Action Hub: Search, Account, Wishlist, Cart & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            
            {/* Search Toggle / Inline Input */}
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
                    className="w-32 sm:w-44 pl-3 pr-8 py-1 bg-[#18181B] border border-[#27272A] rounded-full text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
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
                  className="text-zinc-300 hover:text-[#D4AF87] hover:bg-white/5 rounded-full p-2 transition-all cursor-pointer"
                  aria-label="Search Eyewear"
                  title="Search Frames & Sunglasses"
                >
                  <Search className="w-4 h-4 stroke-[1.75]" />
                </button>
              )}
            </div>

            {/* User Account */}
            <Link
              to={user ? "/account" : "/login"}
              onClick={closeDropdown}
              className="text-zinc-300 hover:text-[#D4AF87] hover:bg-white/5 rounded-full p-2 transition-all flex items-center gap-1.5"
              aria-label="Customer Account"
              title={user ? `Account: ${user.name}` : "Customer Login / Orders"}
            >
              <User className="w-4 h-4 stroke-[1.75]" />
              {user && (
                <span className="hidden xl:inline text-[11px] text-zinc-300 font-medium truncate max-w-[70px]">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Wishlist Button with Badge */}
            <Link
              to="/catalog?filter=wishlist"
              onClick={closeDropdown}
              className="relative text-zinc-300 hover:text-[#D4AF87] hover:bg-white/5 rounded-full p-2 transition-all"
              aria-label="Wishlist"
              title="Saved Eyewear"
            >
              <Heart className={`w-4 h-4 stroke-[1.75] ${wishlist.length > 0 ? 'fill-[#D4AF87] text-[#D4AF87]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 bg-[#D4AF87] text-[#090909] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag with Count */}
            <button
              type="button"
              onClick={() => {
                closeDropdown();
                setIsCartOpen(true);
              }}
              className="relative text-zinc-300 hover:text-[#D4AF87] hover:bg-white/5 rounded-full p-2 transition-all cursor-pointer"
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span className="absolute 0 top-0.5 right-0.5 bg-[#D4AF87] text-[#090909] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-300 hover:text-white hover:bg-white/5 rounded-full p-2 transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#D4AF87]" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Glass Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 max-w-6xl mx-auto bg-[#090909]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl animate-fade-in pointer-events-auto space-y-4">
            
            {/* Mobile Home Section with Accordion */}
            <div className="border-b border-[#27272A]/80 pb-3">
              <button
                type="button"
                onClick={() => setMobileHomeExpanded(!mobileHomeExpanded)}
                className="w-full flex items-center justify-between text-xs uppercase tracking-widest text-zinc-200 py-1 font-semibold"
              >
                <span>Home & Experience</span>
                <ChevronDown className={`w-4 h-4 text-[#D4AF87] transition-transform ${mobileHomeExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileHomeExpanded && (
                <div className="mt-2.5 pl-3 space-y-2 border-l border-[#27272A]">
                  <button
                    type="button"
                    onClick={() => handleNavScroll('#clinic')}
                    className="block text-xs text-zinc-300 hover:text-[#D4AF87] py-1 text-left w-full"
                  >
                    • Clinic & Diagnostics
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavScroll('#about')}
                    className="block text-xs text-zinc-300 hover:text-[#D4AF87] py-1 text-left w-full"
                  >
                    • Heritage & About
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/contact');
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }}
                    className="block text-xs text-zinc-300 hover:text-[#D4AF87] py-1 text-left w-full"
                  >
                    • Contact & Showrooms
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAppointmentModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 text-xs text-[#D4AF87] font-semibold py-1 text-left w-full"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Eye Exam Appointment</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Shop Section with Accordion */}
            <div className="border-b border-[#27272A]/80 pb-3">
              <button
                type="button"
                onClick={() => setMobileShopExpanded(!mobileShopExpanded)}
                className="w-full flex items-center justify-between text-xs uppercase tracking-widest text-zinc-200 py-1 font-semibold"
              >
                <span>Shop Eyewear</span>
                <ChevronDown className={`w-4 h-4 text-[#D4AF87] transition-transform ${mobileShopExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileShopExpanded && (
                <div className="mt-2.5 pl-3 space-y-2 border-l border-[#27272A]">
                  <Link
                    to="/catalog?category=Sunglasses"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }}
                    className="block text-xs text-zinc-300 hover:text-[#D4AF87] py-1"
                  >
                    • Sunglasses (UV400 & Polarized)
                  </Link>
                  <Link
                    to="/catalog?category=Eyeglasses"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }}
                    className="block text-xs text-zinc-300 hover:text-[#D4AF87] py-1"
                  >
                    • Eyeglasses (Italian Acetate & Titanium)
                  </Link>
                  <Link
                    to="/catalog?category=Prescription+Lenses"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }}
                    className="block text-xs text-zinc-300 hover:text-[#D4AF87] py-1"
                  >
                    • Prescription & Contact Lenses
                  </Link>
                  <Link
                    to="/catalog?category=Accessories"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }}
                    className="block text-xs text-zinc-300 hover:text-[#D4AF87] py-1"
                  >
                    • Accessories & Lens Care
                  </Link>
                  <Link
                    to="/catalog"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }}
                    className="block text-xs text-[#D4AF87] font-medium py-1"
                  >
                    Browse Entire Catalog →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Virtual Try-On Link */}
            <Link
              to="/vision-lab"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
              className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#D4AF87]/20 to-[#D4AF87]/5 border border-[#D4AF87]/40 text-[#D4AF87] text-xs font-semibold tracking-wider uppercase"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>3D Virtual Try-On Lab</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Quick Account & Admin Links */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <Link
                to={user ? "/account" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-[#D4AF87]"
              >
                {user ? `Account (${user.name.split(' ')[0]})` : 'Sign In / Register'}
              </Link>
              <Link
                to="/doctor-portal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                Doctor Portal →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
