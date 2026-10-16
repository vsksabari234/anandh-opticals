import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import CategoryCapsuleBar from '../components/CategoryCapsuleBar';
import {
  Search,
  Sliders,
  RotateCcw,
  Layers,
  X,
  Heart,
  Camera,
  Eye,
  ShoppingBag,
  Sparkles,
  Tag,
  ShieldCheck,
  Check,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function CatalogPage() {
  const {
    products,
    launchTryOn,
    addToCart,
    toggleWishlist,
    wishlist,
    setIsLensCalcOpen,
    globalSearch,
    setGlobalSearch,
    quickCategory,
    setQuickCategory
  } = useStore();

  const [search, setSearch] = useState(globalSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(
    quickCategory && quickCategory !== 'Rimless' ? quickCategory : 'All'
  );
  const [selectedShape, setSelectedShape] = useState(
    quickCategory === 'Rimless' ? 'Rimless' : 'All'
  );
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [priceRange, setPriceRange] = useState('All'); // 'All', 'under2000', '2000-3500', 'above3500'
  const [sortBy, setSortBy] = useState('featured');
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  // Compare frames mode (up to 2 frames)
  const [compareList, setCompareList] = useState([]);

  // Sync when globalSearch changes
  useEffect(() => {
    if (globalSearch !== undefined && globalSearch !== search) {
      setSearch(globalSearch);
    }
  }, [globalSearch]);

  // Sync when quickCategory changes
  useEffect(() => {
    if (quickCategory === 'Rimless') {
      setSelectedShape('Rimless');
      setSelectedCategory('All');
    } else if (quickCategory && quickCategory !== 'All') {
      setSelectedCategory(quickCategory);
      setSelectedShape('All');
    }
  }, [quickCategory]);

  // Filtering
  const filtered = products.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shape.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedCategory !== 'All' && p.type !== selectedCategory) return false;
    if (selectedShape !== 'All' && p.shape !== selectedShape) return false;
    if (selectedGender !== 'All' && p.gender !== selectedGender && p.gender !== 'Unisex') return false;
    if (selectedMaterial !== 'All' && !p.material.includes(selectedMaterial)) return false;

    if (priceRange === 'under2000' && p.price >= 2000) return false;
    if (priceRange === '2000-3500' && (p.price < 2000 || p.price > 3500)) return false;
    if (priceRange === 'above3500' && p.price <= 3500) return false;

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const toggleCompare = (p) => {
    if (compareList.some((item) => item.id === p.id)) {
      setCompareList((prev) => prev.filter((item) => item.id !== p.id));
    } else {
      if (compareList.length >= 2) {
        setCompareList([compareList[1], p]);
      } else {
        setCompareList([...compareList, p]);
      }
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItemNotice(product.name);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2400);
  };

  const resetFilters = () => {
    setSearch('');
    setGlobalSearch('');
    setQuickCategory('All');
    setSelectedCategory('All');
    setSelectedShape('All');
    setSelectedGender('All');
    setSelectedMaterial('All');
    setPriceRange('All');
    setSortBy('featured');
  };

  const shapes = [
    { label: 'All Shapes', value: 'All' },
    { label: 'Rectangle', value: 'Rectangle' },
    { label: 'Round', value: 'Round' },
    { label: 'Cat-Eye', value: 'Cat-Eye' },
    { label: 'Aviator', value: 'Aviator' },
    { label: 'Geometric', value: 'Geometric' },
    { label: 'Wayfarer', value: 'Wayfarer' },
    { label: 'Rimless', value: 'Rimless' }
  ];

  return (
    <div className="space-y-6 pb-20 animate-fade-in bg-slate-50/50">
      
      {/* 1. Category Quick Pill Navigator */}
      <CategoryCapsuleBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* 2. FIXED DIGITAL STORE HERO BANNER IMAGE WITH OFFERS */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-200/80 bg-slate-950 group">
          <img
            src="/src/assets/images/store_hero_eyewear_1792037958544.jpg"
            alt="Designer Eyewear Boutique Digital Showroom"
            className="w-full h-64 sm:h-80 md:h-[340px] object-cover object-center group-hover:scale-102 transition-transform duration-700 opacity-90"
          />

          {/* Luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent flex flex-col justify-center px-6 sm:px-12 max-w-2xl text-white space-y-3 sm:space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold tracking-wider uppercase w-fit shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Digital Optical Showroom
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading leading-tight tracking-tight">
              The Ultimate Collection <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-white">
                Designer Spectacles & Sunglasses
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Over 1,000+ curated titanium, lightweight acetate, and flexible TR90 frames. Complete with transparent clinical pricing, anti-glare blue lenses, and instant 3D camera try-on.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  const el = document.getElementById('frames-showroom');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl btn-primary-blue text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Browse Frames & Prices</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLensCalcOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-sky-300" />
                Lens Packages & Pricing
              </button>
            </div>

          </div>

          {/* Floating Top Right Tag */}
          <div className="hidden sm:flex absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-200 text-slate-900 text-xs font-bold shadow-md items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>All Frames Ready in Kallakurichi Lab</span>
          </div>
        </div>

        {/* 3. EXCLUSIVE STORE OFFERS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">Direct Clinic Offer</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold">
                  Save ₹800+
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Up to 35% OFF on designer Titanium & Acetate spectacles.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">Free Anti-Glare Coating</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                  Included
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Complimentary 420nm Blue-Shield coating with every prescription frame.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">1-Hour Express Fitting</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-extrabold">
                  Fast
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                In-house computerized robotic edging lab ready in 60 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Added item notification toast */}
        {addedItemNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-blue-500 animate-slide-up">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Added to Cart!</p>
              <p className="text-[11px] text-slate-300">{addedItemNotice}</p>
            </div>
          </div>
        )}

        {/* 4. Compared Frames Tray (if any) */}
        {compareList.length > 0 && (
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" /> Side-by-Side Frame Comparison ({compareList.length}/2)
              </span>
              <button onClick={() => setCompareList([])} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {compareList.map((cProd) => (
                <div key={cProd.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                  <div className="w-24 h-16 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-blue-100 shadow-2xs overflow-hidden">
                    <img
                      src={cProd.image}
                      alt={cProd.name}
                      className="w-full h-full object-contain filter drop-shadow-2xs"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-slate-900 text-xs truncate">{cProd.name}</h4>
                    <p className="text-[11px] text-slate-500">{cProd.shape} • {cProd.material} • ₹{cProd.price}</p>
                    <p className="text-[10px] text-blue-700 font-mono">Lens: {cProd.lensWidth}mm | Bridge: {cProd.bridgeWidth}mm</p>
                  </div>
                  <button
                    onClick={() => launchTryOn(cProd)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 cursor-pointer"
                  >
                    3D Try-On
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. SEARCH & FILTER CONTROLS (White & Premium Blue) */}
        <div id="frames-showroom" className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm space-y-4">
          
          {/* Search, Sort, and Reset */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search frames by name, brand, shape, titanium, acetate, color..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-700 w-full sm:w-auto">
                <span className="text-slate-400 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated ★</option>
                </select>
              </div>

              {(search || selectedCategory !== 'All' || selectedShape !== 'All' || selectedGender !== 'All' || selectedMaterial !== 'All' || priceRange !== 'All') && (
                <button
                  onClick={resetFilters}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1 cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Capsules */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-slate-400 mr-2">Category:</span>
            {['All', 'Eyeglasses', 'Sunglasses', 'Computer Glasses', 'Reading Glasses', 'Kids Eyewear'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Shape, Gender, Material, Price Tier */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100">
            
            {/* Shape Filter */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Frame Shape
              </label>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {shapes.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Gender / Fit
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Genders</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            {/* Material Filter */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Frame Material
              </label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Materials</option>
                <option value="Titanium">Japanese Titanium</option>
                <option value="Acetate">Handmade Acetate</option>
                <option value="TR90">TR90 Ultra-Light</option>
                <option value="Metal">Precision Alloy</option>
              </select>
            </div>

            {/* Price Tier Filter */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Prices</option>
                <option value="under2000">Under ₹2,000</option>
                <option value="2000-3500">₹2,000 - ₹3,500</option>
                <option value="above3500">Above ₹3,500 (Titanium)</option>
              </select>
            </div>

          </div>
        </div>

        {/* 6. Results Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Showing <strong className="text-blue-800 font-bold">{sorted.length}</strong> designer frames</span>
          <span className="hidden sm:inline">100% Genuine Ophthalmic Frames • 1-Year Warranty</span>
        </div>

        {/* 7. DIGITAL STORE FRAME CARDS (High-End White & Blue Boutique Aesthetic) */}
        {sorted.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-blue-100 shadow-sm space-y-3">
            <Eye className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No frames match this filter</h3>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting All Categories</p>
            <button
              onClick={resetFilters}
              className="py-2.5 px-5 rounded-xl btn-primary-blue text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product) => {
              const isSaved = wishlist.includes(product.id);
              const isCompared = compareList.some((item) => item.id === product.id);
              const originalPrice = Math.round(product.price * 1.35);
              const savings = originalPrice - product.price;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200/80 hover:border-blue-400 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl shadow-xs relative"
                >
                  <div>
                    {/* Top Row: Brand & Actions */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-extrabold text-blue-900 tracking-wide text-[11px] uppercase">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleCompare(product)}
                          className={`text-[9px] px-2 py-0.5 rounded-md font-bold border transition cursor-pointer ${
                            isCompared
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                          }`}
                          title="Compare Frame Specs"
                        >
                          {isCompared ? '✓ Compared' : '+ Compare'}
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-1.5 rounded-full transition cursor-pointer ${
                            isSaved ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Frame Visual Showcase */}
                    <div className="h-44 bg-gradient-to-b from-blue-50/30 via-white to-blue-50/10 rounded-2xl flex items-center justify-center p-3 relative group-hover:bg-white transition-all duration-300 border border-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-34 object-contain transform group-hover:scale-108 transition-transform duration-500 filter drop-shadow-sm"
                        loading="lazy"
                      />

                      {/* Lens Width Fit Tag */}
                      <span className="absolute top-2.5 left-2.5 text-[9px] font-extrabold text-slate-700 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                        {product.lensWidth ? `Size • ${product.lensWidth}mm` : 'Standard Fit'}
                      </span>

                      {/* Material Tag */}
                      <span className="absolute bottom-2.5 right-2.5 text-[9px] font-bold text-blue-900 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-blue-200/80 shadow-2xs">
                        {product.material}
                      </span>
                    </div>

                    {/* Frame Details */}
                    <div className="mt-3.5 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono font-medium">
                        <span>
                          {product.shape} • {product.gender}
                        </span>
                        <span className="text-blue-700 font-bold">
                          ★ {product.rating}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-700 transition line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Color: {product.color} • Frame wt: 14g
                      </p>
                    </div>

                    {/* Transparent Price & Offer Tag */}
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-900 font-heading">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          Save ₹{savings}
                        </span>
                      </div>
                      <p className="text-[10px] text-blue-700 font-medium">
                        Free Anti-Glare Lenses Included
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-2 space-y-2">
                    <button
                      onClick={() => launchTryOn(product)}
                      className="w-full py-2.5 px-3 rounded-xl btn-primary-blue font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      3D Virtual Try-On
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => setIsLensCalcOpen(true)}
                        className="py-2 px-2 rounded-xl bg-white hover:bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                      >
                        <Sliders className="w-3 h-3 text-blue-600" />
                        Lenses
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
