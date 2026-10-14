import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import LenskartCategoryBar from '../components/LenskartCategoryBar';
import {
  Search,
  Sliders,
  ArrowUpDown,
  RotateCcw,
  Layers,
  X,
  Crown,
  Heart,
  Camera,
  Eye
} from 'lucide-react';

export default function CatalogPage() {
  const {
    products,
    launchTryOn,
    addToCart,
    toggleWishlist,
    wishlist,
    setIsLensCalcOpen,
    isGoldMember,
    setIsGoldModalOpen,
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
  const [priceRange, setPriceRange] = useState('All'); // 'All', 'under2500', '2500-3500', 'above3500'
  const [sortBy, setSortBy] = useState('featured');

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

    if (priceRange === 'under2500' && p.price >= 2500) return false;
    if (priceRange === '2500-3500' && (p.price < 2500 || p.price > 3500)) return false;
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
    <div className="space-y-6 pb-16 animate-fade-in bg-slate-50/60">
      {/* 1. Lenskart Category Bar */}
      <LenskartCategoryBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        {/* 2. Catalog Header & Lenskart Gold VIP Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sky-100 pb-5">
          <div>
            <span className="text-xs uppercase font-black tracking-widest text-amber-700">
              Anand Opticals Showroom Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading mt-1">
              Eyewear Frames & Sunglasses
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Photorealistic preview, 3D Virtual AR Try-On, and precision optical lens configurations
            </p>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={() => setCompareList([])}
                className="text-xs font-bold text-rose-700 hover:text-rose-800 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200"
              >
                Clear Comparison ({compareList.length}/2)
              </button>
            )}

            <button
              onClick={() => setIsLensCalcOpen(true)}
              className="px-4 py-2 bg-amber-50 text-amber-900 hover:bg-amber-100 font-bold text-xs rounded-xl border border-amber-300 transition flex items-center gap-1.5 shadow-2xs"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-600" /> Lens Pricing Guide
            </button>
          </div>
        </div>

        {/* 3. Lenskart Gold VIP Offer Pill Banner */}
        <div
          onClick={() => setIsGoldModalOpen(true)}
          className="cursor-pointer bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-3.5 sm:p-4 rounded-2xl text-white shadow-md flex items-center justify-between gap-4 hover:shadow-lg transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Crown className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-sm sm:text-base">
                  LENSKART GOLD VIP OFFER
                </span>
                <span className="text-[10px] font-black uppercase bg-slate-950/40 px-2 py-0.5 rounded-full text-amber-200">
                  Buy 1 Get 1 Free
                </span>
              </div>
              <p className="text-amber-100 text-xs mt-0.5">
                {isGoldMember
                  ? '👑 Gold VIP Active: Add any 2 frames to your cart to receive the 2nd pair 100% Free!'
                  : 'Get a 2nd pair free + 2 free home eye tests. Click to claim 1-year free VIP pass.'}
              </p>
            </div>
          </div>

          <span className="shrink-0 text-xs font-black bg-slate-950 hover:bg-slate-900 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-400/40">
            {isGoldMember ? 'VIP Member' : 'Activate Free'}
          </span>
        </div>

        {/* 4. Compared Frames Tray (if any) */}
        {compareList.length > 0 && (
          <div className="bg-white border-2 border-sky-200 rounded-3xl p-5 shadow-xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-sky-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-600" /> Side-by-Side Frame Comparison ({compareList.length}/2)
              </span>
              <button onClick={() => setCompareList([])} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {compareList.map((cProd) => (
                <div key={cProd.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                  <div className="w-24 h-16 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-sky-100 shadow-2xs overflow-hidden">
                    <img
                      src={cProd.image}
                      alt={cProd.name}
                      className="w-full h-full object-contain filter drop-shadow-2xs"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-slate-900 text-xs truncate">{cProd.name}</h4>
                    <p className="text-[11px] text-slate-500">{cProd.shape} • {cProd.material} • ₹{cProd.price}</p>
                    <p className="text-[10px] text-sky-700 font-mono">Lens: {cProd.lensWidth}mm | Bridge: {cProd.bridgeWidth}mm</p>
                  </div>
                  <button
                    onClick={() => launchTryOn(cProd)}
                    className="px-3 py-1.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-500"
                  >
                    Try On
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Lenskart Filters & Search Control Bar */}
        <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs space-y-4">
          {/* Search, Sort, and Reset */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search frames by name, brand, shape, titanium, color..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full sm:w-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-700 font-bold focus:outline-none text-xs"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Shape Filter Pills (Signature Lenskart Style) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              Browse by Frame Shape
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {shapes.map((shp) => (
                <button
                  key={shp.value}
                  onClick={() => setSelectedShape(shp.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                    selectedShape === shp.value
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {shp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Filters Row */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Category */}
            <div>
              <label className="text-slate-500 text-[10px] uppercase font-bold block mb-1">
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Categories</option>
                <option value="Eyeglasses">Eyeglasses</option>
                <option value="Sunglasses">Sunglasses</option>
                <option value="Computer Glasses">Computer Glasses</option>
                <option value="Kids Eyewear">Kids Eyewear</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="text-slate-500 text-[10px] uppercase font-bold block mb-1">
                Gender:
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Genders</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            {/* Material */}
            <div>
              <label className="text-slate-500 text-[10px] uppercase font-bold block mb-1">
                Material:
              </label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Materials</option>
                <option value="Titanium">Pure Titanium</option>
                <option value="Acetate">Handcrafted Acetate</option>
                <option value="Steel">Stainless Steel</option>
                <option value="TR90">TR90 Memory Plastic</option>
              </select>
            </div>

            {/* Price Brackets */}
            <div>
              <label className="text-slate-500 text-[10px] uppercase font-bold block mb-1">
                Price Range:
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Price Points</option>
                <option value="under2500">Under ₹2,500</option>
                <option value="2500-3500">₹2,500 - ₹3,500</option>
                <option value="above3500">Above ₹3,500</option>
              </select>
            </div>
          </div>
        </div>

        {/* 6. Results Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Showing {sorted.length} premium frames</span>
          <span className="hidden sm:inline">All frames in stock at Kallakurichi Showroom</span>
        </div>

        {/* 7. Grid of Lenskart-Style Product Cards */}
        {sorted.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-sky-100 space-y-3">
            <Eye className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No frames match this filter</h3>
            <p className="text-xs text-slate-500">Try clearing search or relaxing filters</p>
            <button
              onClick={resetFilters}
              className="py-2 px-4 rounded-xl bg-sky-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product) => {
              const isSaved = wishlist.includes(product.id);
              const isCompared = compareList.some((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-sky-100 hover:border-amber-300 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl shadow-xs relative"
                >
                  {/* BOGO Tag */}
                  {isGoldMember && (
                    <div className="absolute -top-2.5 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md z-20">
                      👑 Gold: 2nd Pair Free
                    </div>
                  )}

                  <div>
                    {/* Brand, Compare & Wishlist */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-extrabold text-sky-800 tracking-wide text-[11px] uppercase">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleCompare(product)}
                          className={`text-[9px] px-2 py-0.5 rounded-md font-bold border transition ${
                            isCompared
                              ? 'bg-sky-50 text-sky-800 border-sky-300'
                              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                          }`}
                          title="Compare Frame Specs"
                        >
                          {isCompared ? '✓ Compare' : '+ Compare'}
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-1.5 rounded-full transition ${
                            isSaved ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Eyewear Visual Container */}
                    <div className="h-44 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20 rounded-2xl flex items-center justify-center p-3 relative group-hover:bg-white group-hover:shadow-md transition-all duration-300 border border-sky-100/70 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-34 object-contain transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-sm"
                        loading="lazy"
                      />

                      {/* Size tag (Lenskart hallmark) */}
                      <span className="absolute top-2.5 left-2.5 text-[9px] font-extrabold text-slate-700 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                        {product.lensWidth ? `Wide • ${product.lensWidth}mm` : 'Standard Fit'}
                      </span>

                      {/* Material Tag */}
                      <span className="absolute bottom-2.5 right-2.5 text-[9px] font-bold text-sky-900 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-sky-200/80 shadow-2xs">
                        {product.material}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="mt-3.5 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono font-medium">
                        <span>
                          {product.shape} • {product.gender}
                        </span>
                        <span className="text-amber-700 font-bold">
                          ★ {product.rating} ({product.reviewsCount})
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700 transition truncate mt-0.5">
                        {product.name}
                      </h3>

                      {/* Color Swatch Dot */}
                      <div className="flex items-center gap-1.5 pt-0.5">
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
                        {isGoldMember ? '👑 2nd Pair Free' : 'Free Fitting'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => launchTryOn(product)}
                        className="p-2 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl text-xs font-bold border border-sky-200 transition flex items-center gap-1 shadow-2xs"
                        title="3D Virtual AR Try-On"
                      >
                        <Camera className="w-3.5 h-3.5 text-sky-600" />
                        <span className="text-[10px] font-black">3D</span>
                      </button>

                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-2 bg-slate-900 hover:bg-sky-600 text-white rounded-xl font-extrabold text-xs transition shadow-xs"
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
        )}
      </div>
    </div>
  );
}
