import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Search,
  Filter,
  Grid,
  List,
  Heart,
  ShoppingBag,
  Camera,
  Eye,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  ArrowRight,
  Sun,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

export default function CatalogPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    products,
    launchTryOn,
    addToCart,
    toggleWishlist,
    wishlist = [],
    globalSearch,
    setGlobalSearch,
    setIsLensCalcOpen
  } = useStore();

  // URL Params parsing
  const initialCategory = searchParams.get('category') || 'All';
  const initialGender = searchParams.get('gender') || 'All';
  const initialBrand = searchParams.get('brand') || 'All';
  const initialFilter = searchParams.get('filter'); // 'wishlist' etc.

  // State Management
  const [search, setSearch] = useState(globalSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [priceTier, setPriceTier] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(initialFilter === 'wishlist');
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  // Hero carousel slide state
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const heroSlides = [
    {
      title: "Style Meets Clear Vision",
      subtitle: "Discover our curated assemblage of world-class designer sunglasses, handcrafted Italian acetate frames, and aerograde Japanese beta-titanium fitted with custom ophthalmic lenses.",
      badge: "NEW 2026 LUXURY RELEASE",
      image: "/src/assets/images/luxury_eyewear_hero_model_1792047332173.jpg",
      ctaCategory: "Sunglasses"
    },
    {
      title: "Handcrafted Italian Acetate",
      subtitle: "Precision-sculpted Mazzucchelli acetate silhouettes featuring 5-barrel German hinges and deep beveled beveling designed for exquisite facial harmony.",
      badge: "ANAND SIGNATURE ATELIER",
      image: "/src/assets/images/frame_clubmaster_browline_1792301527114.jpg",
      ctaCategory: "Eyeglasses"
    },
    {
      title: "Zeiss & Essilor Precision Optics",
      subtitle: "Experience crystal-clear ophthalmic lenses with DuraVision Platinum blue-light defense, Crizal anti-reflective clarity, and sub-micron digital fitting.",
      badge: "CLINICAL OPHTHALMOLOGY GRADE",
      image: "/src/assets/images/cat_prescription_lenses_1792214450860.jpg",
      ctaCategory: "Prescription Lenses"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Sync when searchParams or globalSearch changes
  useEffect(() => {
    if (globalSearch && globalSearch !== search) {
      setSearch(globalSearch);
    }
  }, [globalSearch]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const gen = searchParams.get('gender');
    if (gen) setSelectedGender(gen);
    const br = searchParams.get('brand');
    if (br) setSelectedBrand(br);
    if (searchParams.get('filter') === 'wishlist') {
      setShowWishlistOnly(true);
    }
  }, [searchParams]);

  // Five Category Cards matching Section 3 of prompt
  const categoriesList = [
    {
      name: 'Eyeglasses',
      tagline: 'Pure Titanium & Acetate',
      image: '/src/assets/images/frame_titanium_black_1791952478324.jpg',
      categoryKey: 'Eyeglasses'
    },
    {
      name: 'Sunglasses',
      tagline: 'UV400 Polarized Shades',
      image: '/src/assets/images/luxury_gold_sunglasses_table_1792123622864.jpg',
      categoryKey: 'Sunglasses'
    },
    {
      name: 'Contact Lenses',
      tagline: 'Hydra-Moisture Daily & Monthly',
      image: '/src/assets/images/cat_contact_lenses_1792214322180.jpg',
      categoryKey: 'Contact Lenses'
    },
    {
      name: 'Prescription Lenses',
      tagline: 'Zeiss & Essilor Precision',
      image: '/src/assets/images/cat_prescription_lenses_1792214450860.jpg',
      categoryKey: 'Prescription Lenses'
    },
    {
      name: 'Accessories',
      tagline: 'Leather Cases & Care Kits',
      image: '/src/assets/images/cat_accessories_1792214435704.jpg',
      categoryKey: 'Accessories'
    }
  ];

  // Filter Counts calculation for real catalog data
  const counts = useMemo(() => {
    const catCount = {};
    const brandCount = {};
    const shapeCount = {};

    products.forEach((p) => {
      // Category count
      const c = p.type || 'Eyeglasses';
      catCount[c] = (catCount[c] || 0) + 1;

      // Brand count
      const b = p.brand || 'Other';
      brandCount[b] = (brandCount[b] || 0) + 1;

      // Shape count
      const s = p.shape || 'Rectangle';
      shapeCount[s] = (shapeCount[s] || 0) + 1;
    });

    return { catCount, brandCount, shapeCount };
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Wishlist only filter
      if (showWishlistOnly && !wishlist.includes(p.id)) {
        return false;
      }

      // Search keyword
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.shape && p.shape.toLowerCase().includes(q)) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          (p.color && p.color.toLowerCase().includes(q)) ||
          (p.type && p.type.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && p.type !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
        return false;
      }

      // Shape filter
      if (selectedShape !== 'All' && p.shape !== selectedShape) {
        return false;
      }

      // Material filter
      if (selectedMaterial !== 'All' && !(p.material || '').toLowerCase().includes(selectedMaterial.toLowerCase())) {
        return false;
      }

      // Color filter
      if (selectedColor !== 'All' && !(p.color || '').toLowerCase().includes(selectedColor.toLowerCase())) {
        return false;
      }

      // Gender filter
      if (selectedGender !== 'All' && p.gender !== selectedGender && p.gender !== 'Unisex') {
        return false;
      }

      // Price Tier filter
      if (priceTier === 'under3000' && p.price >= 3000) return false;
      if (priceTier === '3000-6000' && (p.price < 3000 || p.price > 6000)) return false;
      if (priceTier === '6000-10000' && (p.price < 6000 || p.price > 10000)) return false;
      if (priceTier === 'above10000' && p.price <= 10000) return false;

      return true;
    });
  }, [
    products,
    search,
    selectedCategory,
    selectedBrand,
    selectedShape,
    selectedMaterial,
    selectedColor,
    selectedGender,
    priceTier,
    showWishlistOnly,
    wishlist
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }
    if (sortBy === 'newest') {
      return list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }
    return list; // featured order
  }, [filteredProducts, sortBy]);

  // Handlers
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedItemNotice(product.name);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2800);
  };

  const handleCategoryCardClick = (catKey) => {
    setSelectedCategory(catKey);
    setSearchParams({ category: catKey });
    const target = document.getElementById('marketplace-products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetAllFilters = () => {
    setSearch('');
    setGlobalSearch('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedShape('All');
    setSelectedMaterial('All');
    setSelectedColor('All');
    setSelectedGender('All');
    setPriceTier('All');
    setSortBy('featured');
    setShowWishlistOnly(false);
    setSearchParams({});
  };

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedBrand !== 'All',
    selectedShape !== 'All',
    selectedMaterial !== 'All',
    selectedColor !== 'All',
    selectedGender !== 'All',
    priceTier !== 'All',
    Boolean(search.trim()),
    showWishlistOnly
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black">
      
      {/* =========================================================================
          2. HEADER AND CINEMATIC HERO SECTION (Full-Width Background Image)
          ========================================================================= */}
      <section className="relative overflow-hidden min-h-[82vh] flex items-center bg-[#090909] border-b border-[#27272A]/80">
        {/* Full-width background image layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroSlides[currentHeroSlide].image}
            alt={heroSlides[currentHeroSlide].title}
            className="w-full h-full object-cover object-center lg:object-[center_35%] transition-all duration-1000 scale-100"
          />
          {/* Subtle dark overlays for maximum legibility */}
          <div className="absolute inset-0 bg-[#090909]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/85 to-transparent w-full lg:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181B]/80 backdrop-blur-md border border-[#D4AF87]/40 text-[10px] sm:text-xs font-semibold text-[#D4AF87] uppercase tracking-[0.22em] animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{heroSlides[currentHeroSlide].badge}</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-[#FAF7F0] leading-[1.08] tracking-tight drop-shadow-md">
              {heroSlides[currentHeroSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed font-sans font-light drop-shadow">
              {heroSlides[currentHeroSlide].subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('marketplace-products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl hover:shadow-[#D4AF87]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsLensCalcOpen(true)}
                className="px-6 py-4 rounded-full bg-[#18181B]/80 backdrop-blur-md hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-[#D4AF87]" />
                <span>Lens Price Calculator</span>
              </button>
            </div>

            {/* Three Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#27272A]/70 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#18181B]/90 backdrop-blur-md border border-zinc-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF87]" />
                </div>
                <div>
                  <p className="font-bold text-[#FAF7F0] text-[11px] sm:text-xs">100% Certified</p>
                  <p className="text-[10px] text-zinc-400">Authentic Eyewear</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#18181B]/90 backdrop-blur-md border border-zinc-800 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#D4AF87]" />
                </div>
                <div>
                  <p className="font-bold text-[#FAF7F0] text-[11px] sm:text-xs">Free Shipping</p>
                  <p className="text-[10px] text-zinc-400">Pan-India Express</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#18181B]/90 backdrop-blur-md border border-zinc-800 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#D4AF87]" />
                </div>
                <div>
                  <p className="font-bold text-[#FAF7F0] text-[11px] sm:text-xs">1-Year Warranty</p>
                  <p className="text-[10px] text-zinc-400">Complete Coverage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Pagination & Navigation Controls */}
          <div className="flex items-center justify-between pt-10 text-xs text-white">
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentHeroSlide === idx ? 'w-8 bg-[#D4AF87]' : 'w-2 bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
                }
                className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-[#D4AF87] hover:text-[#D4AF87] flex items-center justify-center transition cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
                }
                className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-[#D4AF87] hover:text-[#D4AF87] flex items-center justify-center transition cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORY SECTION (“SHOP BY CATEGORY” - 5 IMAGE CARDS)
          ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[#27272A]/80 bg-[#0C0C0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[#D4AF87] uppercase text-[11px] tracking-[0.28em] font-semibold block mb-1">
                CURATED ARCHIVES
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0]">
                Shop By Category
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              Select a specialized optical department to browse certified ophthalmic frames, precision lenses, and care accessories.
            </p>
          </div>

          {/* 5-Card Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.categoryKey;
              return (
                <div
                  key={cat.name}
                  onClick={() => handleCategoryCardClick(cat.categoryKey)}
                  className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between p-4 sm:p-5 h-72 sm:h-80 shadow-lg ${
                    isSelected
                      ? 'border-[#D4AF87] ring-1 ring-[#D4AF87] shadow-[#D4AF87]/20 -translate-y-1'
                      : 'border-[#27272A] hover:border-[#D4AF87]/70 hover:-translate-y-1 hover:shadow-2xl'
                  }`}
                >
                  {/* Background Photo */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle Dark Gradient Overlay for Typography Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/25 group-hover:via-black/40 transition-colors" />

                  {/* Top Badge / Count */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {counts.catCount[cat.categoryKey] || 0} Models
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#D4AF87] animate-pulse" />
                    )}
                  </div>

                  {/* Bottom Content Row */}
                  <div className="relative z-10 space-y-2">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#FAF7F0] group-hover:text-[#D4AF87] transition-colors leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-zinc-300 line-clamp-1">
                      {cat.tagline}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#D4AF87] uppercase tracking-wider flex items-center gap-1">
                        Shop Now
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#D4AF87] group-hover:bg-[#C59F77] text-[#090909] flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-md">
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. MARKETPLACE PRODUCT LISTING (TWO-COLUMN ARCHITECTURE)
          ========================================================================= */}
      <section id="marketplace-products" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Toast Notice */}
        {addedItemNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#141417] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#D4AF87] animate-slide-up backdrop-blur-md">
            <div className="w-6 h-6 rounded-full bg-[#D4AF87] text-[#090909] flex items-center justify-center font-bold">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#FAF7F0]">Added to Shopping Bag!</p>
              <p className="text-[11px] text-zinc-400">{addedItemNotice}</p>
            </div>
          </div>
        )}

        {/* Two-Column Grid: Left Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* -------------------------------------------------------------------
              LEFT COLUMN: DARK FILTER SIDEBAR (Desktop)
              ------------------------------------------------------------------- */}
          <aside className="hidden lg:block lg:col-span-3 bg-[#121214] border border-[#27272A] rounded-3xl p-6 space-y-7 sticky top-28 shadow-xl">
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#FAF7F0] uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-[#D4AF87]" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#D4AF87] text-[#090909] text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-[11px] text-[#D4AF87] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* 1. Category Filter */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-[#D4AF87]">
                Category
              </h4>
              <div className="space-y-2">
                <label className="flex items-center justify-between text-xs text-zinc-300 hover:text-white cursor-pointer py-0.5">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="filter-cat"
                      checked={selectedCategory === 'All'}
                      onChange={() => setSelectedCategory('All')}
                      className="accent-[#D4AF87]"
                    />
                    <span>All Categories</span>
                  </span>
                  <span className="text-[11px] text-zinc-500">{products.length}</span>
                </label>

                {Object.keys(counts.catCount).map((cKey) => (
                  <label
                    key={cKey}
                    className="flex items-center justify-between text-xs text-zinc-300 hover:text-white cursor-pointer py-0.5"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="filter-cat"
                        checked={selectedCategory === cKey}
                        onChange={() => setSelectedCategory(cKey)}
                        className="accent-[#D4AF87]"
                      />
                      <span>{cKey}</span>
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {counts.catCount[cKey]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Brand Filter */}
            <div className="space-y-3 pt-3 border-t border-[#27272A]/70">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-[#D4AF87]">
                Brand
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                <label className="flex items-center justify-between text-xs text-zinc-300 hover:text-white cursor-pointer py-0.5">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="filter-brand"
                      checked={selectedBrand === 'All'}
                      onChange={() => setSelectedBrand('All')}
                      className="accent-[#D4AF87]"
                    />
                    <span>All Brands</span>
                  </span>
                  <span className="text-[11px] text-zinc-500">{products.length}</span>
                </label>

                {Object.keys(counts.brandCount).map((bKey) => (
                  <label
                    key={bKey}
                    className="flex items-center justify-between text-xs text-zinc-300 hover:text-white cursor-pointer py-0.5"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="filter-brand"
                        checked={selectedBrand === bKey}
                        onChange={() => setSelectedBrand(bKey)}
                        className="accent-[#D4AF87]"
                      />
                      <span>{bKey}</span>
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {counts.brandCount[bKey]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Frame Silhouette / Shape */}
            <div className="space-y-3 pt-3 border-t border-[#27272A]/70">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-[#D4AF87]">
                Frame Shape
              </h4>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#18181B] border border-zinc-700 text-xs font-medium text-zinc-200 focus:outline-none focus:border-[#D4AF87] cursor-pointer"
              >
                <option value="All">All Shapes</option>
                <option value="Wayfarer">Wayfarer</option>
                <option value="Aviator">Aviator</option>
                <option value="Rectangle">Rectangle</option>
                <option value="Round">Round</option>
                <option value="Cat-Eye">Cat-Eye</option>
                <option value="Geometric">Geometric</option>
                <option value="Rimless">Rimless</option>
                <option value="Shield">Shield</option>
                <option value="Clubmaster">Clubmaster</option>
              </select>
            </div>

            {/* 4. Frame Material */}
            <div className="space-y-3 pt-3 border-t border-[#27272A]/70">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-[#D4AF87]">
                Frame Material
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['All', 'Titanium', 'Acetate', 'TR90', 'Metal'].map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setSelectedMaterial(mat)}
                    className={`py-1.5 px-2 rounded-lg text-center font-medium transition cursor-pointer border ${
                      selectedMaterial === mat
                        ? 'bg-[#D4AF87] text-[#090909] border-[#D4AF87] font-bold'
                        : 'bg-[#18181B] text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {mat === 'All' ? 'All Materials' : mat}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Colour Swatches */}
            <div className="space-y-3 pt-3 border-t border-[#27272A]/70">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-[#D4AF87]">
                Colour Swatch
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: 'All', hex: 'transparent' },
                  { label: 'Black', hex: '#090909' },
                  { label: 'Gold', hex: '#D4AF87' },
                  { label: 'Tortoise', hex: '#78350f' },
                  { label: 'Gunmetal', hex: '#334155' },
                  { label: 'Blue', hex: '#0284c7' },
                  { label: 'Silver', hex: '#cbd5e1' }
                ].map((col) => {
                  const isSel = selectedColor === col.label;
                  return (
                    <button
                      key={col.label}
                      type="button"
                      onClick={() => setSelectedColor(col.label)}
                      title={col.label}
                      className={`relative w-6 h-6 rounded-full border transition cursor-pointer flex items-center justify-center ${
                        isSel
                          ? 'ring-2 ring-[#D4AF87] border-white scale-110'
                          : 'border-zinc-700 hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: col.hex === 'transparent' ? '#18181B' : col.hex
                      }}
                    >
                      {col.label === 'All' && (
                        <span className="text-[9px] text-zinc-400 font-bold">ALL</span>
                      )}
                      {isSel && col.label !== 'All' && (
                        <Check className="w-3 h-3 text-white drop-shadow" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Gender Filter */}
            <div className="space-y-3 pt-3 border-t border-[#27272A]/70">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-[#D4AF87]">
                Gender / Style
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['All', 'Men', 'Women', 'Unisex', 'Kids'].map((gen) => (
                  <button
                    key={gen}
                    type="button"
                    onClick={() => setSelectedGender(gen)}
                    className={`py-1.5 px-2 rounded-lg text-center font-medium transition cursor-pointer border ${
                      selectedGender === gen
                        ? 'bg-[#D4AF87] text-[#090909] border-[#D4AF87] font-bold'
                        : 'bg-[#18181B] text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Price Tier */}
            <div className="space-y-3 pt-3 border-t border-[#27272A]/70">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-[#D4AF87]">
                Price Range
              </h4>
              <div className="space-y-1.5 text-xs text-zinc-300">
                {[
                  { id: 'All', label: 'All Price Ranges' },
                  { id: 'under3000', label: 'Under ₹3,000' },
                  { id: '3000-6000', label: '₹3,000 - ₹6,000' },
                  { id: '6000-10000', label: '₹6,000 - ₹10,000' },
                  { id: 'above10000', label: 'Above ₹10,000 (Luxury)' }
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center gap-2 cursor-pointer py-0.5 hover:text-white">
                    <input
                      type="radio"
                      name="filter-price"
                      checked={priceTier === tier.id}
                      onChange={() => setPriceTier(tier.id)}
                      className="accent-[#D4AF87]"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN: PRODUCT HEADING, CONTROLS & PRODUCT GRID
              ------------------------------------------------------------------- */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Search, Sort Dropdown & Grid/List Controls */}
            <div className="bg-[#121214] p-4 sm:p-5 rounded-3xl border border-[#27272A] shadow-md space-y-4">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full sm:flex-1">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search by brand (Ray-Ban, Oakley...), model, shape, titanium..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#18181B] border border-zinc-700 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-2.5 text-zinc-400 hover:text-white text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Mobile Filter Trigger Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#18181B] border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Filter className="w-4 h-4 text-[#D4AF87]" />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>

                {/* Sorting Dropdown */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-2 bg-[#18181B] border border-zinc-700 px-3.5 py-2 rounded-xl text-xs text-zinc-300 w-full sm:w-auto">
                    <span className="text-zinc-500 font-medium">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent font-semibold text-zinc-100 focus:outline-none cursor-pointer"
                    >
                      <option value="featured" className="bg-[#18181B]">Featured Collection</option>
                      <option value="price-asc" className="bg-[#18181B]">Price: Low to High</option>
                      <option value="price-desc" className="bg-[#18181B]">Price: High to Low</option>
                      <option value="rating" className="bg-[#18181B]">Highest Rated ★</option>
                      <option value="newest" className="bg-[#18181B]">Newest Arrivals</option>
                    </select>
                  </div>

                  {/* Grid / List View Toggle */}
                  <div className="hidden sm:flex items-center bg-[#18181B] border border-zinc-700 rounded-xl p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        viewMode === 'grid' ? 'bg-[#D4AF87] text-[#090909]' : 'text-zinc-400 hover:text-white'
                      }`}
                      title="4-Column Grid View"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        viewMode === 'list' ? 'bg-[#D4AF87] text-[#090909]' : 'text-zinc-400 hover:text-white'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Badges */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#27272A]/60 text-xs">
                  <span className="text-zinc-500 text-[11px]">Active Filters:</span>
                  
                  {selectedCategory !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 bg-[#18181B] text-[#D4AF87] px-2.5 py-1 rounded-full border border-[#D4AF87]/40 text-[11px]">
                      Category: {selectedCategory}
                      <button type="button" onClick={() => setSelectedCategory('All')}>✕</button>
                    </span>
                  )}

                  {selectedBrand !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 bg-[#18181B] text-[#D4AF87] px-2.5 py-1 rounded-full border border-[#D4AF87]/40 text-[11px]">
                      Brand: {selectedBrand}
                      <button type="button" onClick={() => setSelectedBrand('All')}>✕</button>
                    </span>
                  )}

                  {selectedShape !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 bg-[#18181B] text-[#D4AF87] px-2.5 py-1 rounded-full border border-[#D4AF87]/40 text-[11px]">
                      Shape: {selectedShape}
                      <button type="button" onClick={() => setSelectedShape('All')}>✕</button>
                    </span>
                  )}

                  {selectedGender !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 bg-[#18181B] text-[#D4AF87] px-2.5 py-1 rounded-full border border-[#D4AF87]/40 text-[11px]">
                      Fit: {selectedGender}
                      <button type="button" onClick={() => setSelectedGender('All')}>✕</button>
                    </span>
                  )}

                  {priceTier !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 bg-[#18181B] text-[#D4AF87] px-2.5 py-1 rounded-full border border-[#D4AF87]/40 text-[11px]">
                      Price Tier
                      <button type="button" onClick={() => setPriceTier('All')}>✕</button>
                    </span>
                  )}

                  {showWishlistOnly && (
                    <span className="inline-flex items-center gap-1.5 bg-[#18181B] text-[#D4AF87] px-2.5 py-1 rounded-full border border-[#D4AF87]/40 text-[11px]">
                      Saved Only
                      <button type="button" onClick={() => setShowWishlistOnly(false)}>✕</button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-[11px] text-zinc-400 hover:text-white underline ml-1 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}

            </div>

            {/* Results Count Header */}
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <div>
                Showing <strong className="text-[#D4AF87] font-semibold">{sortedProducts.length}</strong> of {products.length} authenticated items
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                  className={`text-xs transition flex items-center gap-1.5 cursor-pointer ${
                    showWishlistOnly ? 'text-[#D4AF87] font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-[#D4AF87]' : ''}`} />
                  <span>Wishlist ({wishlist.length})</span>
                </button>
                <span className="hidden sm:inline text-zinc-600">|</span>
                <span className="hidden sm:inline text-[11px] text-zinc-500">100% Guaranteed Ophthalmic Fit</span>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                FOUR-COLUMN DESKTOP PRODUCT GRID matching Reference Section 4
                ------------------------------------------------------------------- */}
            {sortedProducts.length === 0 ? (
              <div className="bg-[#121214] rounded-3xl p-16 text-center border border-[#27272A] space-y-4 shadow-xl">
                <Search className="w-12 h-12 text-zinc-600 mx-auto" />
                <h3 className="font-serif-luxury text-2xl text-[#FAF7F0]">
                  No Eyewear Matches Your Criteria
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try clearing some filters, searching for another brand (e.g. Ray-Ban, Oakley, Titan Eye+), or view our full collection.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="py-3 px-8 rounded-full bg-[#D4AF87] text-[#090909] text-xs font-bold uppercase tracking-wider transition cursor-pointer hover:bg-[#C59F77]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
                    : "grid grid-cols-1 md:grid-cols-2 gap-5"
                }
              >
                {sortedProducts.map((product) => {
                  const isSaved = wishlist.includes(product.id);
                  const originalPrice = product.originalPrice || Math.round(product.price * 1.25);
                  const discountPct = Math.round(((originalPrice - product.price) / originalPrice) * 100);
                  const badgeText = product.badge || product.tags?.[0] || 'Genuine';

                  return (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-[#141417] border border-[#27272A] hover:border-[#D4AF87]/70 rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer relative"
                    >
                      <div>
                        {/* Top Card Row: Badge on Left, Wishlist Icon on Right */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#D4AF87] bg-[#D4AF87]/15 px-2.5 py-1 rounded-full border border-[#D4AF87]/30 truncate max-w-[120px]">
                            {badgeText}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className={`p-1.5 rounded-full transition cursor-pointer shrink-0 ${
                              isSaved
                                ? 'text-[#D4AF87] bg-[#D4AF87]/20'
                                : 'text-zinc-500 hover:text-[#D4AF87] hover:bg-zinc-800'
                            }`}
                            title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
                            aria-label="Toggle wishlist"
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D4AF87]' : ''}`} />
                          </button>
                        </div>

                        {/* Product Image Box matching Reference Proportions */}
                        <div className="h-44 sm:h-48 bg-[#18181B] rounded-2xl flex items-center justify-center p-3 relative transition-all duration-300 border border-zinc-800/80 overflow-hidden group-hover:border-zinc-700">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-500"
                            loading="lazy"
                          />

                          {/* Subtle Lens Dimension Tag */}
                          {product.lensWidth > 0 && (
                            <span className="absolute bottom-2 left-2 text-[9px] font-semibold text-zinc-400 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
                              {product.lensWidth}mm
                            </span>
                          )}

                          {/* Quick 3D Try-On Trigger Button */}
                          {(product.type === 'Eyeglasses' || product.type === 'Sunglasses') && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                launchTryOn(product);
                              }}
                              className="absolute top-2 right-2 text-[9px] font-semibold text-zinc-300 bg-black/80 hover:bg-[#D4AF87] hover:text-[#090909] px-2 py-1 rounded-lg border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                              title="Virtual 3D Try-On"
                            >
                              <Camera className="w-3 h-3" />
                              <span>Try-On</span>
                            </button>
                          )}
                        </div>

                        {/* Color Swatch Dots */}
                        <div className="flex items-center gap-1.5 mt-3 px-0.5">
                          {product.colorVariants && product.colorVariants.length > 0 ? (
                            product.colorVariants.map((cVar, idx) => (
                              <span
                                key={idx}
                                title={cVar.name}
                                className="w-3 h-3 rounded-full border border-zinc-700"
                                style={{ backgroundColor: cVar.hex }}
                              />
                            ))
                          ) : (
                            <span
                              className="w-3 h-3 rounded-full border border-zinc-700"
                              style={{ backgroundColor: product.hexColor || '#18181b' }}
                            />
                          )}
                          <span className="text-[10px] text-zinc-500 ml-1 truncate">
                            {product.color}
                          </span>
                        </div>

                        {/* Brand & Product Name */}
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-[#D4AF87] uppercase tracking-wider text-[10px]">
                              {product.brand}
                            </span>
                            <div className="flex items-center gap-1 text-amber-400 text-[11px] font-semibold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{product.rating || 4.9}</span>
                              <span className="text-[10px] text-zinc-500">
                                ({product.reviewsCount || 86})
                              </span>
                            </div>
                          </div>

                          <h3 className="font-serif-luxury text-base text-[#FAF7F0] group-hover:text-[#D4AF87] transition line-clamp-1">
                            {product.name}
                          </h3>

                          <p className="text-[11px] text-zinc-400 line-clamp-1">
                            {product.shape} • {product.material}
                          </p>
                        </div>

                        {/* Price & Discount Information */}
                        <div className="mt-3 pt-2.5 border-t border-[#27272A]/80 flex items-baseline justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-serif-luxury font-bold text-[#D4AF87]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {originalPrice > product.price && (
                              <span className="text-xs text-zinc-500 line-through">
                                ₹{originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                          {discountPct > 0 && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                              {discountPct}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Black Add to Cart Button with Gold Cart Icon */}
                      <div className="mt-4 pt-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#090909] hover:bg-[#1f1f23] text-white border border-[#27272A] hover:border-[#D4AF87] font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md group/btn"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF87] group-hover/btn:scale-110 transition-transform" />
                          <span>Add to Cart</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </main>

        </div>
      </section>

      {/* =========================================================================
          5. LOWER PROMOTIONAL SECTIONS matching Reference Section 5
          ========================================================================= */}

      {/* 5A. Wide Premium Lens Banner: “See Clearly Live Fully” */}
      <section className="py-16 sm:py-24 bg-[#0A0A0C] border-t border-b border-[#27272A]/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-[#27272A] bg-[#121214] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Left Lens Editorial Info */}
              <div className="lg:col-span-7 p-8 sm:p-14 space-y-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF87]/40 text-[10px] font-semibold text-[#D4AF87] uppercase tracking-[0.25em]">
                  <Sparkles className="w-3 h-3" />
                  <span>OPHTHALMIC PRECISION LAB</span>
                </div>

                <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-tight">
                  See Clearly Live Fully
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
                  Tailored ophthalmic precision optics fitted to sub-micron accuracy. We integrate Zeiss DuraVision Platinum, Essilor Crizal Sapphire HR, and Japanese ultra-thin 1.74 aspheric optics calibrated to your unique pupillary distance and lifestyle.
                </p>

                {/* 4 Lens-Benefit Icons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="bg-[#18181B] p-3 rounded-2xl border border-zinc-800 space-y-1.5 text-center">
                    <Sun className="w-5 h-5 text-[#D4AF87] mx-auto" />
                    <p className="font-semibold text-xs text-[#FAF7F0]">UV400 Shield</p>
                    <p className="text-[10px] text-zinc-400">100% Protection</p>
                  </div>

                  <div className="bg-[#18181B] p-3 rounded-2xl border border-zinc-800 space-y-1.5 text-center">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF87] mx-auto" />
                    <p className="font-semibold text-xs text-[#FAF7F0]">Anti-Scratch</p>
                    <p className="text-[10px] text-zinc-400">9-Layer Diamond</p>
                  </div>

                  <div className="bg-[#18181B] p-3 rounded-2xl border border-zinc-800 space-y-1.5 text-center">
                    <Eye className="w-5 h-5 text-[#D4AF87] mx-auto" />
                    <p className="font-semibold text-xs text-[#FAF7F0]">Blue Light Cut</p>
                    <p className="text-[10px] text-zinc-400">Digital Eye Shield</p>
                  </div>

                  <div className="bg-[#18181B] p-3 rounded-2xl border border-zinc-800 space-y-1.5 text-center">
                    <Layers className="w-5 h-5 text-[#D4AF87] mx-auto" />
                    <p className="font-semibold text-xs text-[#FAF7F0]">High-Index 1.74</p>
                    <p className="text-[10px] text-zinc-400">45% Thinner Lens</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('Prescription Lenses');
                      const el = document.getElementById('marketplace-products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-3.5 rounded-full bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-widest transition cursor-pointer shadow-lg inline-flex items-center gap-2"
                  >
                    <span>Explore Lens Options</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Lens Photography */}
              <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[320px] relative overflow-hidden">
                <img
                  src="/src/assets/images/cat_prescription_lenses_1792214450860.jpg"
                  alt="Precision optical lenses"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#121214] via-transparent to-transparent" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5B. Horizontal Trust Strip matching Reference */}
      <section className="bg-[#0E0E10] border-b border-[#27272A] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-zinc-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#D4AF87]" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold text-[#FAF7F0]">
                  100% Certified Authentic
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Direct authorized dealer for Ray-Ban, Oakley & luxury brands.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-zinc-800 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-[#D4AF87]" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold text-[#FAF7F0]">
                  Complimentary Shipping
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Free insured express delivery to all pin codes across India.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-zinc-800 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6 text-[#D4AF87]" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold text-[#FAF7F0]">
                  14-Day Easy Returns
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Zero-friction frame exchange guarantee for total peace of mind.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-zinc-800 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-[#D4AF87]" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold text-[#FAF7F0]">
                  Expert Optometry Care
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Prescription verification by Dr. Ayyadhurai (Ophthalmology).
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5C. Featured Sunglasses Collection: “Premium Sunglasses for Every Mood” (3 Image Cards) */}
      <section className="py-16 sm:py-24 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[#D4AF87] uppercase text-[11px] tracking-[0.28em] font-semibold block">
              SEASONAL EDITORIAL
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#FAF7F0]">
              Premium Sunglasses for Every Mood
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Sculpted UV400 silhouettes for sharp executive poise, weekend seaside elegance, and everyday understated luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Men's Sunglasses */}
            <div
              onClick={() => {
                setSelectedCategory('Sunglasses');
                setSelectedGender('Men');
                const el = document.getElementById('marketplace-products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-3xl overflow-hidden border border-[#27272A] hover:border-[#D4AF87] h-96 sm:h-[440px] flex flex-col justify-end p-8 transition-all duration-500 cursor-pointer shadow-xl hover:-translate-y-1.5"
            >
              <img
                src="/src/assets/images/model_man_square_1791949598792.jpg"
                alt="Men's Sunglasses"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-semibold text-[#D4AF87] uppercase tracking-[0.22em] block">
                  POISE & PERFORMANCE
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F0] group-hover:text-[#D4AF87] transition-colors">
                  Men's Collection
                </h3>
                <p className="text-xs text-zinc-300">
                  Sharp polarized navigators, browlines & sport shields.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF87] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Women's Sunglasses */}
            <div
              onClick={() => {
                setSelectedCategory('Sunglasses');
                setSelectedGender('Women');
                const el = document.getElementById('marketplace-products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-3xl overflow-hidden border border-[#27272A] hover:border-[#D4AF87] h-96 sm:h-[440px] flex flex-col justify-end p-8 transition-all duration-500 cursor-pointer shadow-xl hover:-translate-y-1.5"
            >
              <img
                src="/src/assets/images/model_female_round_1791949598824.jpg"
                alt="Women's Sunglasses"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-semibold text-[#D4AF87] uppercase tracking-[0.22em] block">
                  CHIC & GLAMOUR
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F0] group-hover:text-[#D4AF87] transition-colors">
                  Women's Collection
                </h3>
                <p className="text-xs text-zinc-300">
                  Uplifting cat-eyes, butterfly silhouettes & champagne gold accents.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF87] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Unisex Icons */}
            <div
              onClick={() => {
                setSelectedCategory('Sunglasses');
                setSelectedGender('Unisex');
                const el = document.getElementById('marketplace-products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-3xl overflow-hidden border border-[#27272A] hover:border-[#D4AF87] h-96 sm:h-[440px] flex flex-col justify-end p-8 transition-all duration-500 cursor-pointer shadow-xl hover:-translate-y-1.5"
            >
              <img
                src="/src/assets/images/model_male_oval_1791949566309.jpg"
                alt="Unisex Sunglasses"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-semibold text-[#D4AF87] uppercase tracking-[0.22em] block">
                  TIMELESS ICONS
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F0] group-hover:text-[#D4AF87] transition-colors">
                  Unisex Icons
                </h3>
                <p className="text-xs text-zinc-300">
                  Classic aviators, round metal wireframes & clubmasters.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF87] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE FILTER MODAL OVERLAY
          ========================================================================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fade-in lg:hidden">
          <div className="w-full max-w-xs bg-[#121214] h-full overflow-y-auto p-6 space-y-6 border-l border-[#27272A]">
            <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
              <span className="font-serif-luxury text-lg text-[#FAF7F0] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#D4AF87]" />
                Filters
              </span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-[#D4AF87] uppercase tracking-wider">Category</h5>
              <div className="space-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('All'); setMobileFilterOpen(false); }}
                  className={`w-full text-left py-1 px-2 rounded ${selectedCategory === 'All' ? 'bg-[#D4AF87] text-black font-bold' : 'text-zinc-300'}`}
                >
                  All Categories ({products.length})
                </button>
                {Object.keys(counts.catCount).map((cKey) => (
                  <button
                    key={cKey}
                    type="button"
                    onClick={() => { setSelectedCategory(cKey); setMobileFilterOpen(false); }}
                    className={`w-full text-left py-1 px-2 rounded flex justify-between ${selectedCategory === cKey ? 'bg-[#D4AF87] text-black font-bold' : 'text-zinc-300'}`}
                  >
                    <span>{cKey}</span>
                    <span className="font-mono text-zinc-500">{counts.catCount[cKey]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2 pt-2 border-t border-[#27272A]">
              <h5 className="text-xs font-bold text-[#D4AF87] uppercase tracking-wider">Brand</h5>
              <div className="space-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => { setSelectedBrand('All'); setMobileFilterOpen(false); }}
                  className={`w-full text-left py-1 px-2 rounded ${selectedBrand === 'All' ? 'bg-[#D4AF87] text-black font-bold' : 'text-zinc-300'}`}
                >
                  All Brands
                </button>
                {Object.keys(counts.brandCount).map((bKey) => (
                  <button
                    key={bKey}
                    type="button"
                    onClick={() => { setSelectedBrand(bKey); setMobileFilterOpen(false); }}
                    className={`w-full text-left py-1 px-2 rounded flex justify-between ${selectedBrand === bKey ? 'bg-[#D4AF87] text-black font-bold' : 'text-zinc-300'}`}
                  >
                    <span>{bKey}</span>
                    <span className="font-mono text-zinc-500">{counts.brandCount[bKey]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#27272A] flex gap-2">
              <button
                type="button"
                onClick={resetAllFilters}
                className="w-1/2 py-2.5 rounded-xl border border-zinc-700 text-xs text-zinc-300 font-semibold"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-[#D4AF87] text-[#090909] text-xs font-bold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
