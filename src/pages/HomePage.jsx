import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import FaceShapeStylist from '../components/FaceShapeStylist';
import CategoryCapsuleBar from '../components/CategoryCapsuleBar';
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  Award,
  Home,
  ShieldCheck,
  Truck,
  RotateCcw,
  Camera,
  Heart,
  ChevronLeft
} from 'lucide-react';

export default function HomePage() {
  const {
    products,
    launchTryOn,
    setIsAppointmentModalOpen,
    setIsLensCalcOpen,
    setIsHomeEyeTestOpen,
    setQuickCategory,
    addToCart,
    toggleWishlist,
    wishlist
  } = useStore();

  const navigate = useNavigate();

  // Active Promo Banner Carousel Slide (0: Special Offers, 1: Home Eye Test, 2: Screen Blu-Cut)
  const [activeSlide, setActiveSlide] = useState(0);

  // Hero Frame interactive showcase
  const [heroTint, setHeroTint] = useState('blue'); // 'blue', 'sunglass', 'clear'
  const [heroFrameId, setHeroFrameId] = useState(products[0]?.id || 'AO-101');

  const heroFrameOptions = [
    products[0] || { id: 'AO-101', name: 'Executive Titanium', shape: 'Rectangle', hexColor: '#1e293b' },
    products[3] || { id: 'AO-104', name: 'Geometric Hex Gold', shape: 'Geometric', hexColor: '#d97706' },
    products[1] || { id: 'AO-102', name: 'Luxury Cat-Eye', shape: 'Cat-Eye', hexColor: '#78350f' },
    products[2] || { id: 'AO-103', name: 'Skyline Aviator', shape: 'Aviator', hexColor: '#334155' }
  ];

  const featuredHeroProduct =
    products.find((p) => p.id === heroFrameId) || products[0] || heroFrameOptions[0];

  const heroSlides = [
    {
      tag: 'FESTIVE EYEWEAR FESTIVAL',
      title: 'SPECIAL EYEWEAR OFFERS',
      subtitle: 'Up to 25% OFF on 1,000+ Eyeglasses & Sunglasses + Free Anti-Glare Blue Shield',
      badge: '✨ Special Clinic Offer',
      accent: 'from-sky-700 via-sky-600 to-indigo-800',
      ctaText: 'Explore Eyewear Collection',
      ctaAction: () => navigate('/catalog')
    },
    {
      tag: 'KALLAKURICHI DOORSTEP CARE',
      title: '100% FREE HOME EYE-TEST',
      subtitle: 'Certified optometrist visits your home with 100+ frames & computerized vision equipment',
      badge: '🏠 Zero Visit Charges',
      accent: 'from-sky-600 via-sky-700 to-indigo-800',
      ctaText: 'Book Free Home Eye Test',
      ctaAction: () => setIsHomeEyeTestOpen(true)
    },
    {
      tag: 'NEXT-GEN AI AR TECHNOLOGY',
      title: '3D VIRTUAL AR TRY-ON',
      subtitle: 'See how any frame fits your exact face contours in real-time before you buy',
      badge: '✨ Instant Camera Fit',
      accent: 'from-sky-700 via-cyan-600 to-teal-700',
      ctaText: 'Start 3D Camera Try-On',
      ctaAction: () => launchTryOn(featuredHeroProduct)
    }
  ];

  return (
    <div className="space-y-12 pb-16 animate-fade-in bg-slate-50/70">
      {/* 1. Category Capsule Bar */}
      <CategoryCapsuleBar />

      {/* 2. PROMOTIONAL HERO BANNER & INTERACTIVE 3D EYEWEAR SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-white via-sky-50/50 to-amber-50/40 rounded-3xl border border-sky-100 shadow-xl overflow-hidden relative">
          {/* Subtle luminous background blobs */}
          <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-sky-200/40 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[350px] h-[250px] bg-amber-100/60 rounded-full blur-[90px] pointer-events-none" />

          {/* Slide Indicator Bar on top */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-sky-100/60">
            <div className="flex items-center gap-2">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.tag}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-black transition flex items-center gap-1.5 ${
                    activeSlide === idx
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/80'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === idx ? 'bg-amber-400' : 'bg-slate-400'}`} />
                  <span className="hidden sm:inline">{slide.tag}</span>
                  <span className="sm:hidden">Offer {idx + 1}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                className="p-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition shadow-2xs"
                title="Previous Offer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                className="p-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition shadow-2xs"
                title="Next Offer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content Banner (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-black shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {heroSlides[activeSlide].badge}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 font-heading tracking-tight leading-[1.05]">
                {heroSlides[activeSlide].title.split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 bg-clip-text text-transparent">
                  {heroSlides[activeSlide].title.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {heroSlides[activeSlide].subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={heroSlides[activeSlide].ctaAction}
                  className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-extrabold text-sm transition flex items-center gap-2 shadow-lg glow-glacier"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {heroSlides[activeSlide].ctaText}
                </button>

                <button
                  onClick={() => setIsHomeEyeTestOpen(true)}
                  className="py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 transition flex items-center gap-2 shadow-xs"
                >
                  <Home className="w-4 h-4 text-sky-600" />
                  Book Doorstep Test
                </button>
              </div>

              {/* Showroom Trust Metrics */}
              <div className="pt-6 border-t border-sky-100 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="bg-white/90 p-3 rounded-2xl border border-sky-100 shadow-2xs">
                  <span className="text-2xl font-black text-slate-900 font-heading">100%</span>
                  <span className="text-[11px] text-slate-500 font-semibold block">Accurate Power</span>
                </div>
                <div className="bg-white/90 p-3 rounded-2xl border border-sky-100 shadow-2xs">
                  <span className="text-2xl font-black text-sky-600 font-heading">1,000+</span>
                  <span className="text-[11px] text-slate-500 font-semibold block">Designer Frames</span>
                </div>
                <div className="bg-white/90 p-3 rounded-2xl border border-amber-200 shadow-2xs">
                  <span className="text-2xl font-black text-amber-600 font-heading">14 Days</span>
                  <span className="text-[11px] text-slate-500 font-semibold block">Free Exchange</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Eyewear Hero Visual (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-sky-100 shadow-xl relative group">
                {/* Header with featured badge & live rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      {featuredHeroProduct.name}
                    </span>
                  </div>
                  <div className="flex items-center text-amber-700 text-xs font-bold gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shadow-2xs">
                    ★ {featuredHeroProduct.rating} ({featuredHeroProduct.reviewsCount})
                  </div>
                </div>

                {/* Real Frame Studio Photograph Canvas with subtle ice-blue depth */}
                <div className="relative h-60 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 rounded-2xl border border-sky-100/80 flex items-center justify-center p-4 overflow-hidden group-hover:border-sky-300 transition shadow-inner">
                  {/* Subtle optical alignment grid */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Real Photographic Eyewear */}
                  <img
                    src={featuredHeroProduct.image}
                    alt={featuredHeroProduct.name}
                    className="w-full h-44 object-contain transform group-hover:scale-108 transition-all duration-500 filter drop-shadow-md z-10"
                  />

                  {/* Dynamic Lens Tint Overlay Simulation */}
                  {heroTint === 'blue' && (
                    <div className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply opacity-30 bg-gradient-to-tr from-sky-400/20 via-sky-300/40 to-cyan-400/20 rounded-2xl" />
                  )}
                  {heroTint === 'sunglass' && (
                    <div className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply opacity-55 bg-gradient-to-b from-slate-950/70 to-slate-900/40 rounded-2xl" />
                  )}
                  {heroTint === 'clear' && (
                    <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-20 bg-gradient-to-tr from-emerald-300/20 via-white/50 to-transparent rounded-2xl" />
                  )}

                  {/* Spec Tag */}
                  <div className="absolute bottom-2.5 right-3 text-[10px] text-slate-500 font-mono z-30 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
                    {featuredHeroProduct.material} • Real Photo
                  </div>
                </div>

                {/* Quick Frame Switcher (Real Stock Frames) */}
                <div className="mt-3.5">
                  <div className="text-[11px] font-bold text-slate-600 mb-1.5 flex items-center justify-between">
                    <span>Switch Frame Model:</span>
                    <span className="text-amber-700 font-bold text-[10px]">
                      ₹{featuredHeroProduct.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {heroFrameOptions.map((fProd) => (
                      <button
                        key={fProd.id}
                        onClick={() => setHeroFrameId(fProd.id)}
                        className={`py-1 px-1.5 rounded-xl text-[10px] font-bold border transition truncate flex items-center justify-center gap-1 ${
                          featuredHeroProduct.id === fProd.id
                            ? 'bg-sky-50 border-sky-400 text-sky-950 shadow-2xs ring-1 ring-sky-300'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-sky-200'
                        }`}
                        title={fProd.name}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: fProd.hexColor }}
                        />
                        <span className="truncate">{fProd.shape}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lens Coating Tints Live Demo Switcher */}
                <div className="mt-3 pt-3 border-t border-sky-100">
                  <div className="text-[11px] font-bold text-slate-700 mb-2 flex items-center justify-between">
                    <span>Lens Coating Simulation:</span>
                    <span className="text-sky-600 text-[10px] font-semibold">Live Real Optical AR</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setHeroTint('blue')}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
                        heroTint === 'blue'
                          ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs ring-1 ring-sky-300'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-sky-200'
                      }`}
                    >
                      Glacier Blue-Cut
                    </button>
                    <button
                      onClick={() => setHeroTint('sunglass')}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
                        heroTint === 'sunglass'
                          ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-sky-200'
                      }`}
                    >
                      Dark Polarized
                    </button>
                    <button
                      onClick={() => setHeroTint('clear')}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
                        heroTint === 'clear'
                          ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs ring-1 ring-amber-200'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-sky-200'
                      }`}
                    >
                      Clear HD ARC
                    </button>
                  </div>
                </div>

                {/* Quick Try-On Action */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => launchTryOn(featuredHeroProduct)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Try This Frame in 3D AR
                  </button>
                  <button
                    onClick={() => setIsLensCalcOpen(true)}
                    className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold border border-amber-200 shadow-2xs"
                  >
                    Price Calc
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. SHOP BY CATEGORY (Curated Collections) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-black tracking-widest text-amber-700">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
              Popular Styles in Kallakurichi
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 transition"
          >
            View All Categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Men's Titanium",
              subtitle: "Executive 9g Beta-Titanium",
              image: "/src/assets/images/frame_titanium_black_1791952478324.jpg",
              badge: "Lightweight",
              cat: "Eyeglasses"
            },
            {
              title: "Women's Cat-Eye",
              subtitle: "Handcrafted Italian Acetate",
              image: "/src/assets/images/frame_cateye_tortoise_1791952478872.jpg",
              badge: "Designer",
              cat: "Eyeglasses"
            },
            {
              title: "Screen Blu-Cut",
              subtitle: "Zero Power Eye Strain Defense",
              image: "/src/assets/images/frame_wayfarer_blue_1791952518846.jpg",
              badge: "Bestseller",
              cat: "Computer Glasses"
            },
            {
              title: "Polarized Aviators",
              subtitle: "100% UV400 Highway Protection",
              image: "/src/assets/images/frame_aviator_sunglass_1791952477672.jpg",
              badge: "Outdoor",
              cat: "Sunglasses"
            }
          ].map((item) => (
            <div
              key={item.title}
              onClick={() => {
                setQuickCategory(item.cat);
                navigate('/catalog');
              }}
              className="bg-white rounded-3xl p-4 border border-sky-100 hover:border-sky-300 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                    {item.badge}
                  </span>
                  <span className="text-amber-700">★ 4.9</span>
                </div>
                <div className="h-32 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20 rounded-2xl flex items-center justify-center p-2 overflow-hidden border border-sky-100/60 group-hover:bg-white group-hover:shadow-xs transition">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-24 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-heading font-black text-slate-900 text-sm mt-3 group-hover:text-sky-700 transition">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-sky-700 font-bold group-hover:translate-x-0.5 transition">
                <span>Shop Collection</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRENDING FRAMES - PRODUCT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-black tracking-widest text-amber-700 mb-1">
              Verified In-Stock Showroom Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Trending Frames & Real Photos
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Available with Single Vision, Bifocals, Progressives, or Zero Power Computer Lenses
            </p>
          </div>

          <Link
            to="/catalog"
            className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1.5 transition self-start sm:self-auto"
          >
            Explore All 1,000+ Frames <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => {
            const isSaved = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white border border-sky-100 hover:border-amber-300 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl shadow-xs relative"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-extrabold text-sky-800 tracking-wide text-[11px] uppercase">
                      {product.brand}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-1.5 rounded-full transition ${
                        isSaved ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
                      }`}
                      title={isSaved ? 'Remove from wishlist' : 'Save frame'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Real Frame Photo on Pure White with Soft Shadow */}
                  <div className="h-44 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20 rounded-2xl flex items-center justify-center p-3 relative group-hover:bg-white group-hover:shadow-md transition-all duration-300 border border-sky-100/70 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-36 object-contain transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-sm"
                      loading="lazy"
                    />

                    {/* Size tag */}
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-extrabold text-slate-700 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                      {product.lensWidth ? `Wide • ${product.lensWidth}mm` : 'Standard Fit'}
                    </span>

                    {/* Material Tag */}
                    <span className="absolute bottom-2.5 right-2.5 text-[9px] font-bold text-sky-900 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-sky-200/80 shadow-2xs">
                      {product.material}
                    </span>
                  </div>

                  {/* Frame Meta */}
                  <div className="mt-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">
                        {product.shape} • {product.gender}
                      </span>
                      <span className="text-[11px] font-bold text-amber-700 flex items-center gap-0.5">
                        ★ {product.rating} ({product.reviewsCount})
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700 transition truncate">
                      {product.name}
                    </h4>

                    {/* Color Swatch Dot */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span
                        className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: product.hexColor }}
                        title={product.color}
                      />
                      <span className="text-[11px] text-slate-500 truncate">
                        {product.color}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-slate-900 font-heading">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-extrabold block">
                      Free Fitting & Delivery
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => launchTryOn(product)}
                      className="p-2 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl text-xs font-bold border border-sky-200 transition flex items-center gap-1"
                      title="3D Virtual AR Try-On"
                    >
                      <Camera className="w-3.5 h-3.5 text-sky-600" />
                      <span className="text-[10px] font-black">3D</span>
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="px-3 py-2 bg-slate-900 hover:bg-sky-600 text-white rounded-xl font-extrabold text-xs transition shadow-xs flex items-center gap-1"
                      title="Add to Shopping Bag"
                    >
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. "SHOP BY FACE SHAPE" INTERACTIVE FINDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <FaceShapeStylist />
      </section>

      {/* 7. SHOWROOM SPOTLIGHT (Relatable High-End Interior Photo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-sky-100 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Kallakurichi Flagship Studio
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Visit Our Modern Optical Boutique on Salem Main Road
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Step into an illuminated boutique featuring over 1,000 curated spectacle frames, polarized driving sunglasses, and precision computerized lens verification desks.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>100% Computerized Testing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Zero-Pressure Trial</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>1-Hour Robotic Lens Lab</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Direct Doorstep Delivery</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsHomeEyeTestOpen(true)}
                className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5" /> Book Doorstep Test
              </button>
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition"
              >
                Book Clinic Exam
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-sky-100 group">
              <img
                src="/src/assets/images/optical_showroom_1791949566865.jpg"
                alt="Anand Opticals Showroom Interior"
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl border border-sky-100 text-slate-900 text-xs font-bold shadow-md">
                Showroom: Salem Main Road, Kallakurichi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DOCTOR PROFILE & CLINICAL EXCELLENCE (Relatable Doctor Portrait) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white border border-sky-100 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg relative overflow-hidden">
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative">
              <img
                src="/src/assets/images/doctor_portrait_1791949570094.jpg"
                alt={BUSINESS_INFO.doctor.name}
                className="w-48 h-48 md:w-56 md:h-56 rounded-3xl object-cover border-4 border-white shadow-2xl ring-2 ring-sky-200"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-md">
                FIACLE Fellow • 26+ Yrs
              </div>
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-heading mt-6">
              {BUSINESS_INFO.doctor.name}
            </h3>
            <p className="text-xs text-sky-700 font-bold mt-1">
              {BUSINESS_INFO.doctor.qualifications}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Tamil Nadu State Optometry Council: <strong className="text-slate-700">{BUSINESS_INFO.doctor.regNo}</strong>
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Senior Consultant Optometrist
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              Dedicated Vision Care for Kallakurichi Families Since 1998
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dr. S. Anand brings over 26 years of ophthalmic experience. Having trained across premier eye institutes, Dr. Anand specializes in objective computerized refraction, complex astigmatic toric contact lenses, and smooth adaptation digital progressive lenses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {BUSINESS_INFO.doctor.specialities.map((spec) => (
                <div
                  key={spec}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-slate-700 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="py-3 px-5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md glow-glacier"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation with Dr. Anand
              </button>

              <Link
                to="/doctor"
                className="py-3 px-5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-xl text-xs border border-amber-300 transition flex items-center gap-2 shadow-2xs"
              >
                <Stethoscope className="w-4 h-4 text-amber-700" />
                Doctor Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 4-PILLAR TRUST GUARANTEES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">14 Days Free Return</h4>
              <p className="text-[11px] text-slate-500">No questions asked exchange</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">1-Year Warranty</h4>
              <p className="text-[11px] text-slate-500">Covers frame & lens coatings</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Robotic Lens Lab</h4>
              <p className="text-[11px] text-slate-500">Micron 0.01mm precision</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Free Doorstep Test</h4>
              <p className="text-[11px] text-slate-500">100+ frames to your home</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-amber-600 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-white">
          <div>
            <span className="text-xs font-extrabold text-amber-200 uppercase tracking-widest">
              Visit Our Kallakurichi Showroom
            </span>
            <h3 className="text-2xl md:text-3xl font-black font-heading mt-1">
              Experience Flawless Vision Today
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
              Shop No. 14, Salem Main Road (Opposite Govt. Hospital), Kallakurichi. Walk-ins welcome for computerized eye tests!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hello%20Dr.%20Anand%20Opticals,%20I%20would%20like%20to%20enquire%20about%20eye%20testing%20and%20frames`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-2xl bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-xs transition shadow-lg flex items-center gap-2"
            >
              WhatsApp Us Direct
            </a>

            <button
              onClick={() => setIsHomeEyeTestOpen(true)}
              className="py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition shadow-lg flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" /> Book Doorstep Test
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
