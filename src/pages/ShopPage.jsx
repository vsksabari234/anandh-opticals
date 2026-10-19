import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Calendar,
  Sparkles,
  Heart,
  ShoppingBag,
  Star,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Eye,
  Glasses,
  Cpu,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Camera
} from 'lucide-react';

// Real Frame Images
import frameClubmasterImg from '../assets/images/frame_clubmaster_browline_1792301527114.jpg';
import frameCelestialGoldImg from '../assets/images/frame_celestial_oval_gold_1792301542656.jpg';
import frameKidsFlexibleImg from '../assets/images/frame_kids_flexible_1791953023678.jpg';
import frameMatteBlackSquareImg from '../assets/images/frame_matte_black_square_1792301614774.jpg';
import frameGeometricGoldImg from '../assets/images/frame_geometric_gold_1791952519461.jpg';
import frameClubmasterSunImg from '../assets/images/frame_clubmaster_sunglasses_1792301630073.jpg';
import frameRoundVintageImg from '../assets/images/frame_round_vintage_1791952985361.jpg';
import frameCateyeTortoiseImg from '../assets/images/frame_cateye_tortoise_1791952478872.jpg';
import frameTitaniumBlackImg from '../assets/images/frame_titanium_black_1791952478324.jpg';
import frameAviatorGoldImg from '../assets/images/frame_aviator_sunglass_1791952477672.jpg';
import frameTransparentCrystalImg from '../assets/images/frame_transparent_crystal_1792301600526.jpg';
import frameWayfarerBlueImg from '../assets/images/frame_wayfarer_blue_1791952518846.jpg';
import contactLensesImg from '../assets/images/cat_contact_lenses_1792214322180.jpg';
import raybanBoxImg from '../assets/images/rayban_eyewear_box_1792405271349.jpg';

// Curated Frame Products with Real Frame Product Photography
const SHOP_PRODUCTS = [
  {
    id: 'sp-1',
    brand: 'Ray-Ban',
    name: 'Classic Round Acetate & Gold',
    category: 'men',
    shape: 'round',
    image: frameRoundVintageImg,
    price: 5499,
    originalPrice: 6999,
    tag: 'Best Seller',
    rating: 4.8,
    reviewsCount: 214,
    swatches: ['#1b1b1b', '#8a5a2b', '#c9a24a'],
    description: 'Iconic vintage round silhouette handcrafted with premium lightweight acetate and reinforced hinges.'
  },
  {
    id: 'sp-2',
    brand: 'Vogue',
    name: 'Cat-Eye Elegance Tortoise',
    category: 'women',
    shape: 'cat',
    image: frameCateyeTortoiseImg,
    price: 4299,
    originalPrice: 5499,
    tag: 'Trending',
    rating: 4.6,
    reviewsCount: 128,
    swatches: ['#8a3b4a', '#1b1b1b', '#c9a24a'],
    description: 'Feminine upswept browline with hand-polished Italian tortoiseshell finish.'
  },
  {
    id: 'sp-3',
    brand: 'Oakley',
    name: 'Holbrook Matte Black Polarized',
    category: 'sun',
    shape: 'square',
    image: frameMatteBlackSquareImg,
    price: 7999,
    originalPrice: 9999,
    tag: 'Prizm Optics',
    rating: 4.9,
    reviewsCount: 302,
    swatches: ['#1b1b1b', '#2563eb'],
    description: 'High-definition sport optics with lightweight O Matter stress-resistant square frame.'
  },
  {
    id: 'sp-4',
    brand: 'Zeiss',
    name: 'Kids Flex Pro Bendable Frame',
    category: 'kids',
    shape: 'round',
    image: frameKidsFlexibleImg,
    price: 2499,
    originalPrice: 2999,
    tag: 'Unbreakable',
    rating: 4.5,
    reviewsCount: 86,
    swatches: ['#2563eb', '#38bdf8', '#ef4444'],
    description: 'Flexible medical-grade hypoallergenic elastomer designed specifically for growing children.'
  },
  {
    id: 'sp-5',
    brand: 'Tom Ford',
    name: 'Executive Rectangle Titanium',
    category: 'men',
    shape: 'square',
    image: frameTitaniumBlackImg,
    price: 12999,
    originalPrice: 15999,
    tag: 'Luxury Atelier',
    rating: 4.9,
    reviewsCount: 97,
    swatches: ['#1b1b1b', '#52525b'],
    description: 'Featherlight Japanese beta-titanium with laser-etched signature T-temples.'
  },
  {
    id: 'sp-6',
    brand: 'Prada',
    name: 'Gold Metal Aviator Linea',
    category: 'sun',
    shape: 'aviator',
    image: frameAviatorGoldImg,
    price: 14999,
    originalPrice: 17999,
    tag: '20% OFF',
    rating: 4.8,
    reviewsCount: 143,
    swatches: ['#c9a24a', '#a1a1aa'],
    description: 'Double-bridge luxury aviator with anti-reflective crystal sun lenses and 100% UV400 shield.'
  },
  {
    id: 'sp-7',
    brand: 'Anand Atelier',
    name: 'Sovereign Diplomat Browline',
    category: 'men',
    shape: 'browline',
    image: frameClubmasterImg,
    price: 3690,
    originalPrice: 4800,
    tag: 'Handcrafted',
    rating: 4.9,
    reviewsCount: 184,
    swatches: ['#1b1b1b', '#c9a24a', '#78350f'],
    description: 'Bespoke combination frame with rich black Italian acetate and 24K gold plated accents.'
  },
  {
    id: 'sp-8',
    brand: 'Anand Atelier',
    name: 'Celestial Oval Rose Gold Wire',
    category: 'women',
    shape: 'oval',
    image: frameCelestialGoldImg,
    price: 4290,
    originalPrice: 5600,
    tag: 'Signature',
    rating: 4.9,
    reviewsCount: 142,
    swatches: ['#f43f5e', '#c9a24a', '#e2e8f0'],
    description: 'Ultra-slender 18K rose gold plated aerospace titanium wire frame with ergonomic silicone nose pads.'
  },
  {
    id: 'sp-9',
    brand: 'Ray-Ban',
    name: 'Clubmaster Classic G-15 Polarized',
    category: 'sun',
    shape: 'browline',
    image: frameClubmasterSunImg,
    price: 8990,
    originalPrice: 10990,
    tag: 'Iconic',
    rating: 4.9,
    reviewsCount: 220,
    swatches: ['#1b1b1b', '#c9a24a'],
    description: 'The retro browline icon with crystal green G-15 lenses and gold temple ornamentation.'
  },
  {
    id: 'sp-10',
    brand: 'Zeiss',
    name: 'Crystal Clarity Blue-Shield',
    category: 'blue-cut',
    shape: 'square',
    image: frameTransparentCrystalImg,
    price: 3290,
    originalPrice: 4200,
    tag: 'Digital Shield',
    rating: 4.7,
    reviewsCount: 95,
    swatches: ['#e2e8f0', '#94a3b8'],
    description: 'Crystal-clear transparent TR90 frames with certified blue-light absorption for screen comfort.'
  },
  {
    id: 'sp-11',
    brand: 'Oakley',
    name: 'Wayfarer Azure Polarized',
    category: 'sun',
    shape: 'square',
    image: frameWayfarerBlueImg,
    price: 6490,
    originalPrice: 7990,
    tag: 'Limited Edition',
    rating: 4.8,
    reviewsCount: 88,
    swatches: ['#1e3a8a', '#1b1b1b'],
    description: 'Deep midnight blue acetate finish with polarized anti-glare hydrophobic coating.'
  },
  {
    id: 'sp-12',
    brand: 'Tom Ford',
    name: 'Geometric Hexagon Gold Wire',
    category: 'women',
    shape: 'geometric',
    image: frameGeometricGoldImg,
    price: 13800,
    originalPrice: 16500,
    tag: 'Haute Optique',
    rating: 4.9,
    reviewsCount: 76,
    swatches: ['#c9a24a', '#e2e8f0'],
    description: 'Architectural hexagonal rim with hand-beveled edges and signature gold inlay.'
  }
];

export default function ShopPage() {
  const navigate = useNavigate();
  const {
    addToCart,
    setIsCartOpen,
    toggleWishlist,
    wishlist = [],
    setIsAppointmentModalOpen,
    launchTryOn
  } = useStore();

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const formatPrice = (amount) => '₹' + Number(amount).toLocaleString('en-IN');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  const handleProductAddToCart = (product) => {
    if (addToCart) {
      addToCart({
        id: product.id,
        name: `${product.brand} ${product.name}`,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand
      });
    }
    triggerToast(`Added ${product.brand} to cart`);
  };

  const isItemWishlisted = (id) => {
    if (Array.isArray(wishlist)) {
      return wishlist.some((item) => (typeof item === 'object' ? item.id === id : item === id));
    }
    return false;
  };

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return SHOP_PRODUCTS;
    return SHOP_PRODUCTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const scrollToFrames = (category = 'all') => {
    setActiveFilter(category);
    const el = document.getElementById('frames');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 font-sans selection:bg-[#D4AF87] selection:text-black pt-4 pb-20">
      
      {/* =========================================================================
          SECTION 1: HERO BANNER (LUXURY DARK AESTHETIC)
          Dark obsidian gradient, gold highlights, relatable frame showcase, CTA buttons
      ========================================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#121214] via-[#0e0e10] to-[#090909] shadow-2xl min-h-[520px] flex items-center">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#D4AF87]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Background Optical Frame Accent */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 lg:opacity-35 pointer-events-none overflow-hidden">
            <img
              src={frameClubmasterSunImg}
              alt="Luxury optical frames"
              className="w-full h-full object-cover object-center scale-110 filter saturate-150 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121214] via-[#121214]/60 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF87]/15 border border-[#D4AF87]/30 text-[#D4AF87] text-xs uppercase tracking-[0.22em] font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Eye Care &amp; Eyewear</span>
            </div>

            {/* H1 Heading */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7F0] leading-[1.1] mb-5">
              Better Vision{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF87] via-[#FAF7F0] to-[#C5A070] block sm:inline">
                Brighter Tomorrow
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Advanced computerized eye testing, artisanal handcrafted eyewear, and trusted clinical care — all under one roof. Because your vision deserves perfection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={() => setIsAppointmentModalOpen && setIsAppointmentModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF87] to-[#C5A070] text-[#090909] font-semibold text-xs uppercase tracking-wider hover:brightness-110 hover:shadow-lg hover:shadow-[#D4AF87]/25 transition-all group cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => scrollToFrames('all')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-zinc-200 hover:text-white hover:bg-white/5 font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Explore Eyewear</span>
              </button>
            </div>

            {/* 4 Feature Badges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <Users className="w-4 h-4 text-[#D4AF87] shrink-0" />
                <span>Expert Optometrists</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <Cpu className="w-4 h-4 text-[#D4AF87] shrink-0" />
                <span>Latest Zeiss Tech</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <Award className="w-4 h-4 text-[#D4AF87] shrink-0" />
                <span>Iconic Brands</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-[#D4AF87] shrink-0" />
                <span>100% Genuine Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SERVICE CARDS STRIP
          4 clinical and eyewear services in dark glass card format
      ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#121214]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Eye Testing */}
          <div
            onClick={() => setIsAppointmentModalOpen && setIsAppointmentModalOpen(true)}
            className="group p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:scale-110 group-hover:border-[#D4AF87]/60 transition-all shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-[#D4AF87] transition-colors flex items-center justify-between">
                  <span>Eye Testing</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D4AF87] group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Accurate computerized refraction &amp; biometric ocular checkups.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Spectacles */}
          <div
            onClick={() => scrollToFrames('all')}
            className="group p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:scale-110 group-hover:border-[#D4AF87]/60 transition-all shrink-0">
                <Glasses className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-[#D4AF87] transition-colors flex items-center justify-between">
                  <span>Spectacles</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D4AF87] group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Bespoke Italian acetate &amp; ultra-light titanium prescription frames.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Contact Lenses */}
          <div
            onClick={() => scrollToFrames('sun')}
            className="group p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:scale-110 group-hover:border-[#D4AF87]/60 transition-all shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-[#D4AF87] transition-colors flex items-center justify-between">
                  <span>Contact Lenses</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D4AF87] group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Comfortable, hydrating daily &amp; monthly soft breathable lenses.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Eye Care Services */}
          <div
            onClick={() => setIsAppointmentModalOpen && setIsAppointmentModalOpen(true)}
            className="group p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#D4AF87] group-hover:scale-110 group-hover:border-[#D4AF87]/60 transition-all shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-[#D4AF87] transition-colors flex items-center justify-between">
                  <span>Clinical Care</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D4AF87] group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Consultation with Dr. Ayyadhurai for complete ocular health.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SHOP BY CATEGORY (USING RELATABLE FRAME IMAGES)
          Row of 6 category cards using high-res real frame product photography
      ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[#D4AF87] uppercase text-xs font-semibold tracking-[0.2em] block mb-2">
              DISCOVER COLLECTIONS
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0] font-normal">
              Shop by Category
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Find the perfect pair tailored to your facial geometry and personal style.
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToFrames('all')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF87] hover:text-[#FAF7F0] transition-colors group cursor-pointer"
          >
            <span>View All Eyewear</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Category Image Cards with RELATABLE FRAME PHOTOGRAPHY */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* 1. Men (Browline Frame) */}
          <div
            onClick={() => scrollToFrames('men')}
            className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-[#121214] p-4 flex flex-col justify-end cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF87]/60 hover:shadow-xl hover:shadow-black/70"
          >
            <img
              src={frameClubmasterImg}
              alt="Men Eyewear Frame"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF87] block mb-0.5">Classic</span>
              <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF87] transition-colors">Men</h3>
              <span className="text-[11px] text-zinc-300 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                Shop Now <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          {/* 2. Women (Celestial Oval Gold Wire) */}
          <div
            onClick={() => scrollToFrames('women')}
            className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-[#121214] p-4 flex flex-col justify-end cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF87]/60 hover:shadow-xl hover:shadow-black/70"
          >
            <img
              src={frameCelestialGoldImg}
              alt="Women Eyewear Frame"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF87] block mb-0.5">Elegance</span>
              <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF87] transition-colors">Women</h3>
              <span className="text-[11px] text-zinc-300 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                Shop Now <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          {/* 3. Kids (Flexible Kids Frame) */}
          <div
            onClick={() => scrollToFrames('kids')}
            className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-[#121214] p-4 flex flex-col justify-end cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF87]/60 hover:shadow-xl hover:shadow-black/70"
          >
            <img
              src={frameKidsFlexibleImg}
              alt="Kids Flexible Eyewear Frame"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF87] block mb-0.5">Durable</span>
              <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF87] transition-colors">Kids</h3>
              <span className="text-[11px] text-zinc-300 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                Shop Now <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          {/* 4. Sunglasses (Matte Black Polarized Frame) */}
          <div
            onClick={() => scrollToFrames('sun')}
            className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-[#121214] p-4 flex flex-col justify-end cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF87]/60 hover:shadow-xl hover:shadow-black/70"
          >
            <img
              src={frameMatteBlackSquareImg}
              alt="Polarized Sunglasses Frame"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF87] block mb-0.5">UV400</span>
              <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF87] transition-colors">Sunglasses</h3>
              <span className="text-[11px] text-zinc-300 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                Shop Now <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          {/* 5. Premium Brands (Geometric Gold Frame) */}
          <div
            onClick={() => scrollToFrames('all')}
            className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-[#121214] p-4 flex flex-col justify-end cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF87]/60 hover:shadow-xl hover:shadow-black/70"
          >
            <img
              src={frameGeometricGoldImg}
              alt="Designer Luxury Eyewear Frame"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF87] block mb-0.5">Atelier</span>
              <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF87] transition-colors">Premium Brands</h3>
              <span className="text-[11px] text-zinc-300 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                Shop Now <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          {/* 6. Contact Lenses (Real Contact Lenses Product) */}
          <div
            onClick={() => scrollToFrames('all')}
            className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-[#121214] p-4 flex flex-col justify-end cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF87]/60 hover:shadow-xl hover:shadow-black/70"
          >
            <img
              src={contactLensesImg}
              alt="Contact Lenses"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF87] block mb-0.5">Comfort</span>
              <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF87] transition-colors">Contact Lenses</h3>
              <span className="text-[11px] text-zinc-300 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                Shop Now <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: BRANDS BANNER
          Split dark panel with Ray-Ban eyewear box and 3x2 brand logo grid
      ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          
          {/* Left Dark Luxury Panel */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#121214] via-[#161619] to-[#0a0a0c] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4AF87]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-[#D4AF87] uppercase text-xs font-semibold tracking-[0.25em] block mb-3">
                THE LATEST IN EYEWEAR
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0] font-normal leading-tight mb-4">
                Iconic Brands.<br />Timeless Style.
              </h3>
              <p className="text-zinc-300 text-sm max-w-md leading-relaxed mb-8">
                From everyday certified prescription frames to world-renowned designer fashion houses, find your signature silhouette.
              </p>
              <button
                type="button"
                onClick={() => scrollToFrames('all')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FAF7F0] text-[#090909] hover:bg-[#D4AF87] font-semibold text-xs uppercase tracking-wider transition-all group cursor-pointer shadow-lg"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Product Image: Ray-Ban Eyewear Box */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40">
                <img
                  src={raybanBoxImg}
                  alt="Ray-Ban Eyewear Packaging"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <span className="text-[11px] text-[#D4AF87] font-semibold uppercase tracking-wider block">Official Authorized Retailer</span>
                <p className="text-xs text-zinc-300 font-medium">100% Genuine Luxottica &amp; Safilo warranty certificate included with every pair.</p>
              </div>
            </div>
          </div>

          {/* Right Brand Logo Grid (3x2) */}
          <div className="lg:col-span-5 bg-[#0e0e10] p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">Featured Houses</span>
                <button
                  type="button"
                  onClick={() => scrollToFrames('all')}
                  className="text-xs text-[#D4AF87] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Brands</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* 3x2 Brand Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Ray-Ban', desc: 'Milan, Italy', cat: 'men' },
                  { name: 'OAKLEY', desc: 'Foothill Ranch, CA', cat: 'sun' },
                  { name: 'VOGUE', desc: 'Eyewear Paris', cat: 'women' },
                  { name: 'TOM FORD', desc: 'New York Atelier', cat: 'men' },
                  { name: 'PRADA', desc: 'Milano Dal 1913', cat: 'sun' },
                  { name: 'ZEISS', desc: 'Oberkochen, Germany', cat: 'blue-cut' }
                ].map((brand) => (
                  <div
                    key={brand.name}
                    onClick={() => scrollToFrames(brand.cat)}
                    className="p-4 rounded-xl bg-[#141416] border border-white/5 hover:border-[#D4AF87]/50 hover:bg-[#18181b] transition-all text-center cursor-pointer group"
                  >
                    <div className="font-serif-luxury text-base font-semibold text-zinc-200 group-hover:text-[#D4AF87] tracking-wider transition-colors">
                      {brand.name}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-500 mt-1">
                      {brand.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span>All frames include Zeiss UV400 certification</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => triggerToast('Ray-Ban, Oakley, Vogue featured')}
                  className="w-7 h-7 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#D4AF87] transition-all cursor-pointer"
                  aria-label="Previous brand"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('Tom Ford, Prada, Zeiss featured')}
                  className="w-7 h-7 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#D4AF87] transition-all cursor-pointer"
                  aria-label="Next brand"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WHY CHOOSE US
          Dark obsidian section with 4 trust stats & gold badges
      ========================================================================== */}
      <section className="bg-[#0c0c0e] border-y border-white/10 py-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-[#D4AF87] uppercase text-xs font-semibold tracking-[0.25em] block mb-2">
                WHY CHOOSE ANAND OPTICALS
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0] font-normal leading-tight mb-4">
                More Than Just Glasses
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We are dedicated to precision refraction, clinical eye health, and curating eyewear that enhances both your vision and presence.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#121214] border border-white/5 text-center">
                <div className="w-10 h-10 rounded-full bg-[#D4AF87]/15 text-[#D4AF87] flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="font-serif-luxury text-2xl font-bold text-white mb-1">10+</div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">Years of Clinical Trust</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#121214] border border-white/5 text-center">
                <div className="w-10 h-10 rounded-full bg-[#D4AF87]/15 text-[#D4AF87] flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <div className="font-serif-luxury text-2xl font-bold text-white mb-1">50K+</div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">Happy Patients</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#121214] border border-white/5 text-center">
                <div className="w-10 h-10 rounded-full bg-[#D4AF87]/15 text-[#D4AF87] flex items-center justify-center mx-auto mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <div className="font-serif-luxury text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">Original Products</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#121214] border border-white/5 text-center">
                <div className="w-10 h-10 rounded-full bg-[#D4AF87]/15 text-[#D4AF87] flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="font-serif-luxury text-2xl font-bold text-white mb-1">Lifetime</div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">Frame Alignment Support</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SHOP FRAMES (CATALOG WITH REAL FRAME PRODUCT PHOTOGRAPHY)
          Filter tabs, high-res frame photography, add to cart, 3D try-on button
      ========================================================================== */}
      <section id="frames" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-24">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-[#D4AF87] uppercase text-xs font-semibold tracking-[0.2em] block mb-2">
              CURATED EYEWEAR GALLERY
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0] font-normal">
              Shop Frames
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Select your favourite handcrafted frame, test it in 3D, or add straight to cart.
            </p>
          </div>

          {/* Luxury Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Frames' },
              { id: 'men', label: 'Men' },
              { id: 'women', label: 'Women' },
              { id: 'kids', label: 'Kids' },
              { id: 'sun', label: 'Sunglasses' },
              { id: 'blue-cut', label: 'Blue-Cut Screen' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#D4AF87] text-[#090909] font-semibold shadow-lg shadow-[#D4AF87]/20'
                    : 'bg-[#18181B] text-zinc-300 border border-white/10 hover:border-[#D4AF87]/50 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWish = isItemWishlisted(product.id);

            return (
              <article
                key={product.id}
                className="group bg-[#121214] border border-[#27272A] rounded-2xl p-4 flex flex-col justify-between hover:border-[#D4AF87]/60 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#18181B] border border-white/5 mb-4 flex items-center justify-center p-3">
                    
                    {/* Badge */}
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#090909]/80 backdrop-blur-md border border-[#D4AF87]/40 text-[#D4AF87] text-[10px] font-mono tracking-wider">
                      {product.tag}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (toggleWishlist) toggleWishlist(product);
                        triggerToast(isWish ? 'Removed from wishlist' : 'Saved to wishlist ❤️');
                      }}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        isWish
                          ? 'bg-rose-500 text-white border-rose-500'
                          : 'bg-[#090909]/80 text-zinc-300 border-white/10 hover:border-white/40 hover:text-white'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                    </button>

                    {/* REAL HIGH RESOLUTION FRAME PHOTOGRAPHY */}
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.name}`}
                      className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* 3D Virtual Try-On Overlay Pill */}
                    <button
                      type="button"
                      onClick={() => {
                        if (launchTryOn) {
                          launchTryOn({
                            id: product.id,
                            name: `${product.brand} ${product.name}`,
                            image: product.image,
                            price: product.price
                          });
                        }
                      }}
                      className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#090909]/90 backdrop-blur-md border border-[#D4AF87] text-[#D4AF87] text-[11px] font-medium tracking-wide shadow-lg cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Try-On 3D</span>
                    </button>
                  </div>

                  {/* Brand & Title */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#D4AF87] font-semibold uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-zinc-200 font-mono text-[11px]">
                        {product.rating} ({product.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-base font-normal text-zinc-100 group-hover:text-[#D4AF87] transition-colors leading-snug line-clamp-1 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                    {product.description}
                  </p>

                  {/* Swatches */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {product.swatches.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-serif-luxury text-lg font-semibold text-white">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-emerald-400 font-medium">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleProductAddToCart(product)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4AF87] hover:bg-[#e2c19d] text-[#090909] font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#D4AF87]/15 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </section>

      {/* Floating Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 bg-[#18181B]/95 backdrop-blur-xl border border-[#D4AF87]/50 text-zinc-100 px-5 py-3 rounded-full text-xs font-medium shadow-2xl transition-all duration-300 flex items-center gap-2.5 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <CheckCircle2 className="w-4 h-4 text-[#D4AF87]" />
        <span>{toastMessage}</span>
      </div>

    </div>
  );
}
