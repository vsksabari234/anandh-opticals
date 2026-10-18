import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { LENS_PACKAGES } from '../data/initialData';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Camera,
  Heart,
  ChevronDown,
  ChevronUp,
  Glasses,
  Info,
  ShoppingBag
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    toggleWishlist,
    wishlist,
    launchTryOn,
    setIsCartOpen
  } = useStore();

  const product = useMemo(() => {
    return products.find(p => p.id === id) || products[0];
  }, [products, id]);

  // Gallery state
  const colorVariants = product.colorVariants || [
    { name: product.color, hex: product.hexColor || '#18181B', image: product.image }
  ];

  const [selectedColor, setSelectedColor] = useState(colorVariants[0].name);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : 'Medium (52mm)'
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Lens selection state
  const [lensMode, setLensMode] = useState('frame_only'); // 'frame_only' or 'prescription'
  const [selectedLensPackage, setSelectedLensPackage] = useState(LENS_PACKAGES[1]); // Default Blue-Shield Pro
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [rxMethod, setRxMethod] = useState('enter_now'); // 'enter_now' or 'whatsapp_later'
  const [rxData, setRxData] = useState({
    odSph: '-1.25',
    odCyl: '-0.50',
    odAxis: '90',
    osSph: '-1.50',
    osCyl: '-0.50',
    osAxis: '85',
    add: '+1.50',
    pd: '64 mm'
  });

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState('specs'); // 'specs', 'warranty', 'shipping'

  // Image zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleColorChange = (variant) => {
    setSelectedColor(variant.name);
    if (variant.image) {
      setSelectedImage(variant.image);
    }
  };

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = (product.stock || 0) <= 0;

  const currentLensPrice = lensMode === 'prescription' ? selectedLensPackage.price : 0;
  const itemUnitPrice = product.price + currentLensPrice;
  const totalPrice = itemUnitPrice * quantity;

  const handleAddToCart = (openBag = true) => {
    if (isOutOfStock) return;

    addToCart(product, {
      selectedColor,
      selectedSize,
      lens: lensMode === 'prescription' ? selectedLensPackage : null,
      rx: lensMode === 'prescription' && rxMethod === 'enter_now' ? rxData : { method: 'Send via WhatsApp' }
    });

    if (openBag) {
      setIsCartOpen(true);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart(false);
    navigate('/checkout');
  };

  // Related products (same shape or gender)
  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.id !== product.id && (p.shape === product.shape || p.gender === product.gender))
      .slice(0, 4);
  }, [products, product]);

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#D4AF87] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-[#D4AF87] transition-colors">Eyewear Collection</Link>
            <span>/</span>
            <span className="text-zinc-500">{product.type}</span>
            <span>/</span>
            <span className="text-zinc-200 font-medium truncate max-w-[200px]">{product.name}</span>
          </div>

          <Link
            to="/catalog"
            className="hidden sm:flex items-center gap-1.5 text-zinc-400 hover:text-[#D4AF87] transition-colors shrink-0 ml-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </Link>
        </div>
      </div>

      {/* Main Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Gallery & Zoom Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#18181B] rounded-2xl border border-[#27272A] overflow-hidden cursor-crosshair group flex items-center justify-center shadow-xl"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: 'scale(1.8)'
                      }
                    : undefined
                }
              />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                <span className="bg-[#D4AF87] text-[#090909] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                  {product.brand}
                </span>
                {product.tags?.[0] && (
                  <span className="bg-[#090909]/80 backdrop-blur-md text-[#D4AF87] border border-[#D4AF87]/40 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                    {product.tags[0]}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#090909]/75 backdrop-blur-md border border-white/10 hover:border-[#D4AF87] text-white hover:text-[#D4AF87] transition-all cursor-pointer shadow-md"
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D4AF87] text-[#D4AF87]' : ''}`} />
              </button>

              {/* 3D Virtual Try-On Floating Pill */}
              <button
                type="button"
                onClick={() => launchTryOn(product)}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] px-4 py-2 rounded-full font-semibold text-xs tracking-wider uppercase shadow-xl transition-all cursor-pointer hover:scale-105"
              >
                <Camera className="w-4 h-4" />
                <span>3D Virtual Try-On</span>
              </button>

              {/* Subtle zoom instruction */}
              <div className="absolute bottom-4 left-4 z-10 bg-[#090909]/70 backdrop-blur-sm text-[11px] text-zinc-300 px-3 py-1 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Hover to zoom into frame details
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {colorVariants.map((v, i) => (
                <button
                  key={v.name + i}
                  type="button"
                  onClick={() => handleColorChange(v)}
                  className={`relative w-20 h-16 rounded-xl border overflow-hidden shrink-0 transition-all cursor-pointer bg-[#18181B] ${
                    selectedColor === v.name
                      ? 'border-[#D4AF87] ring-1 ring-[#D4AF87]'
                      : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={v.image || product.image} alt={v.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-[#090909]/90 text-[9px] text-center text-zinc-300 py-0.5 truncate px-1">
                    {v.name}
                  </span>
                </button>
              ))}

              {/* Store & Clinic Ambience Thumbnail */}
              <button
                type="button"
                onClick={() => setSelectedImage('/src/assets/images/optical_showroom_1791949566865.jpg')}
                className="relative w-20 h-16 rounded-xl border border-zinc-800 overflow-hidden shrink-0 opacity-60 hover:opacity-100 transition-all cursor-pointer bg-[#18181B]"
                title="View in Showroom"
              >
                <img
                  src="/src/assets/images/optical_showroom_1791949566865.jpg"
                  alt="Showroom view"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-[#090909]/90 text-[9px] text-center text-zinc-300 py-0.5 truncate px-1">
                  Showroom
                </span>
              </button>
            </div>

            {/* Trust Assurances Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#27272A]/70 text-center">
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#141417] border border-[#27272A]/50">
                <ShieldCheck className="w-4 h-4 text-[#D4AF87]" />
                <span className="text-[11px] font-medium text-zinc-200">1-Year Warranty</span>
                <span className="text-[10px] text-zinc-500">Free frame servicing</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#141417] border border-[#27272A]/50">
                <Truck className="w-4 h-4 text-[#D4AF87]" />
                <span className="text-[11px] font-medium text-zinc-200">Free Delivery</span>
                <span className="text-[10px] text-zinc-500">Orders over ₹999</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#141417] border border-[#27272A]/50">
                <RotateCcw className="w-4 h-4 text-[#D4AF87]" />
                <span className="text-[11px] font-medium text-zinc-200">14-Day Return</span>
                <span className="text-[10px] text-zinc-500">Hassle-free exchange</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Configurator */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header / Titles */}
            <div className="space-y-2 border-b border-[#27272A]/80 pb-5">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="tracking-[0.2em] uppercase text-[#D4AF87] font-semibold">
                  {product.brand} • {product.gender}
                </span>
                <span className="font-mono text-zinc-500">SKU: {product.id}</span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0] font-normal leading-tight">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-semibold text-zinc-200">{product.rating || 4.9}</span>
                  <span className="text-zinc-500">({product.reviewsCount || 120} reviews)</span>
                </div>
                <span className="text-zinc-700">•</span>
                <div>
                  {isOutOfStock ? (
                    <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30">
                      Out of Stock
                    </span>
                  ) : (product.stock || 10) < 8 ? (
                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Only {product.stock} Left in Stock
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      In Stock & Ready to Fit
                    </span>
                  )}
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-3">
                <span className="text-3xl font-serif-luxury text-[#D4AF87] font-semibold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-zinc-500 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} (
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                Inclusive of all taxes. Free precision lens fitting at our Kallakurichi clinic.
              </p>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Selected Frame Color:</span>
                <span className="text-[#FAF7F0] font-semibold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {colorVariants.map((variant) => (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={() => handleColorChange(variant)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                      selectedColor === variant.name
                        ? 'border-[#D4AF87] bg-[#D4AF87]/15 text-[#FAF7F0] ring-1 ring-[#D4AF87]'
                        : 'border-[#27272A] bg-[#141417] text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/50 shadow-inner"
                      style={{ backgroundColor: variant.hex }}
                    />
                    <span>{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Size Selection with Dimensions */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Frame Size & Fit:</span>
                <span className="text-[#D4AF87] font-sans">
                  Lens: {product.lensWidth || 52}mm • Bridge: {product.bridgeWidth || 18}mm • Temple: {product.templeLength || 140}mm
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(product.sizes || ['Medium (52mm)', 'Wide (54mm)']).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-[#D4AF87] bg-[#D4AF87]/15 text-[#FAF7F0]'
                        : 'border-[#27272A] bg-[#141417] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Prescription Lenses Step */}
            <div className="p-4 rounded-2xl bg-[#141417] border border-[#27272A] space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Glasses className="w-4 h-4 text-[#D4AF87]" />
                  <span className="text-sm font-semibold text-[#FAF7F0]">Lens Selection</span>
                </div>
                {lensMode === 'prescription' && (
                  <span className="text-xs font-semibold text-[#D4AF87]">
                    +₹{selectedLensPackage.price.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#18181B] rounded-xl border border-[#27272A]">
                <button
                  type="button"
                  onClick={() => setLensMode('frame_only')}
                  className={`py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    lensMode === 'frame_only'
                      ? 'bg-[#D4AF87] text-[#090909] font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Frame Only (Zero Power)
                </button>
                <button
                  type="button"
                  onClick={() => setLensMode('prescription')}
                  className={`py-2 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    lensMode === 'prescription'
                      ? 'bg-[#D4AF87] text-[#090909] font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Prescription Lenses</span>
                </button>
              </div>

              {/* Prescription Package Selector */}
              {lensMode === 'prescription' && (
                <div className="space-y-3 pt-2 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 block">Choose Your Optical Lens Package:</label>
                    <div className="space-y-2">
                      {LENS_PACKAGES.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedLensPackage(pkg)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedLensPackage.id === pkg.id
                              ? 'border-[#D4AF87] bg-[#D4AF87]/10 ring-1 ring-[#D4AF87]'
                              : 'border-[#27272A] bg-[#18181B] hover:border-zinc-700'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#FAF7F0]">{pkg.name}</span>
                              {pkg.badge && (
                                <span className="text-[9px] bg-[#D4AF87]/20 text-[#D4AF87] px-2 py-0.5 rounded-full font-medium">
                                  {pkg.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-400">{pkg.material} • {pkg.suitableFor}</p>
                          </div>
                          <span className="text-xs font-semibold text-[#D4AF87]">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prescription Input Action */}
                  <div className="p-3 bg-[#18181B] rounded-xl border border-[#27272A] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-zinc-200 block">Eye Prescription:</span>
                      <span className="text-[11px] text-zinc-400">
                        {rxMethod === 'enter_now'
                          ? `OD: ${rxData.odSph} / OS: ${rxData.osSph} • PD: ${rxData.pd}`
                          : 'Send via WhatsApp or Doctor Consultation'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPrescriptionModal(true)}
                      className="text-xs text-[#D4AF87] hover:underline font-semibold cursor-pointer"
                    >
                      Configure Rx →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                {/* Quantity Spinner */}
                <div className="flex items-center border border-[#27272A] rounded-xl bg-[#141417] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-[#FAF7F0]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.min(product.stock || 10, q + 1))}
                    disabled={quantity >= (product.stock || 10) || isOutOfStock}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal Display */}
                <div className="flex-1 text-right">
                  <span className="text-xs text-zinc-400 block">Total Price</span>
                  <span className="text-2xl font-serif-luxury font-semibold text-[#D4AF87]">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  disabled={isOutOfStock}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#D4AF87] text-[#D4AF87] font-semibold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:scale-[1.01]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xl hover:scale-[1.01]"
                >
                  <span>Proceed to Buy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Accordion Specs & Warranty */}
            <div className="border-t border-[#27272A]/80 pt-4 space-y-3">
              {/* Specs */}
              <div className="border border-[#27272A] rounded-xl overflow-hidden bg-[#141417]">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                  className="w-full p-4 flex items-center justify-between text-sm font-semibold text-[#FAF7F0] cursor-pointer hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#D4AF87]" />
                    <span>Frame Specifications & Architecture</span>
                  </div>
                  {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'specs' && (
                  <div className="p-4 pt-0 text-xs text-zinc-300 space-y-3 border-t border-[#27272A]/60">
                    <p className="text-zinc-400 leading-relaxed pt-2">{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-[#18181B] border border-zinc-800">
                        <span className="text-zinc-500 block text-[10px]">Material</span>
                        <span className="font-medium text-zinc-200">{product.material}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#18181B] border border-zinc-800">
                        <span className="text-zinc-500 block text-[10px]">Shape</span>
                        <span className="font-medium text-zinc-200">{product.shape}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#18181B] border border-zinc-800">
                        <span className="text-zinc-500 block text-[10px]">Suitable Face Shapes</span>
                        <span className="font-medium text-zinc-200">{product.suitableFaceShapes?.join(', ') || 'All Face Types'}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#18181B] border border-zinc-800">
                        <span className="text-zinc-500 block text-[10px]">Hinge Engineering</span>
                        <span className="font-medium text-zinc-200">German Tension-Flex</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Warranty & Clinic Promise */}
              <div className="border border-[#27272A] rounded-xl overflow-hidden bg-[#141417]">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'warranty' ? '' : 'warranty')}
                  className="w-full p-4 flex items-center justify-between text-sm font-semibold text-[#FAF7F0] cursor-pointer hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF87]" />
                    <span>Anand Opticals Guarantee & Warranty</span>
                  </div>
                  {openAccordion === 'warranty' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'warranty' && (
                  <div className="p-4 pt-0 text-xs text-zinc-300 space-y-2 border-t border-[#27272A]/60">
                    <ul className="space-y-1.5 list-disc list-inside text-zinc-400 pt-2">
                      <li>1-Year Comprehensive Warranty covering breakage & coating peeling.</li>
                      <li>Lifetime Free Adjustments & Nosepad Replacement at our Kallakurichi Clinic.</li>
                      <li>Includes luxury hard protective case and microfiber lens cleaning cloth.</li>
                      <li>Certified Ophthalmic Lens Centering verified by automated digital lensmeters.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#27272A]/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[#D4AF87] text-xs font-semibold tracking-[0.2em] uppercase block">
                  Curated Recommendations
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F0] mt-1">
                  You May Also Admire
                </h3>
              </div>
              <Link
                to="/catalog"
                className="text-xs uppercase tracking-wider text-[#D4AF87] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group rounded-2xl bg-[#141417] border border-[#27272A] overflow-hidden hover:border-[#D4AF87]/60 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-[#18181B] overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#090909]/80 backdrop-blur-md text-[10px] text-[#D4AF87] font-semibold px-2 py-0.5 rounded-full border border-[#D4AF87]/30">
                      {p.brand}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-[#FAF7F0] group-hover:text-[#D4AF87] transition-colors truncate">
                      {p.name}
                    </h4>
                    <p className="text-xs text-zinc-400">{p.shape} • {p.material}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-serif-luxury text-base text-[#D4AF87] font-semibold">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-zinc-400 group-hover:text-white transition-colors">
                        View Frame →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prescription Configuration Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#141417] border border-[#D4AF87]/60 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Prescription Details</h3>
                <p className="text-xs text-zinc-400">Configure your vision powers for {product.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPrescriptionModal(false)}
                className="text-zinc-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Submission Mode */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setRxMethod('enter_now')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  rxMethod === 'enter_now'
                    ? 'border-[#D4AF87] bg-[#D4AF87]/15 text-[#FAF7F0]'
                    : 'border-[#27272A] bg-[#18181B] text-zinc-400'
                }`}
              >
                Enter Values Manually
              </button>
              <button
                type="button"
                onClick={() => setRxMethod('whatsapp_later')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  rxMethod === 'whatsapp_later'
                    ? 'border-[#D4AF87] bg-[#D4AF87]/15 text-[#FAF7F0]'
                    : 'border-[#27272A] bg-[#18181B] text-zinc-400'
                }`}
              >
                Submit via WhatsApp Later
              </button>
            </div>

            {rxMethod === 'enter_now' ? (
              <div className="space-y-4">
                {/* Table of Right and Left Eye */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#27272A] text-zinc-400">
                        <th className="py-2">Eye</th>
                        <th className="py-2">SPH (Sphere)</th>
                        <th className="py-2">CYL (Cylinder)</th>
                        <th className="py-2">AXIS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272A]/50 text-zinc-200">
                      <tr>
                        <td className="py-2 font-semibold text-[#D4AF87]">OD (Right)</td>
                        <td className="py-2">
                          <input
                            type="text"
                            value={rxData.odSph}
                            onChange={(e) => setRxData({ ...rxData, odSph: e.target.value })}
                            className="w-16 bg-[#18181B] border border-zinc-700 rounded px-2 py-1 text-center text-xs"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="text"
                            value={rxData.odCyl}
                            onChange={(e) => setRxData({ ...rxData, odCyl: e.target.value })}
                            className="w-16 bg-[#18181B] border border-zinc-700 rounded px-2 py-1 text-center text-xs"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="text"
                            value={rxData.odAxis}
                            onChange={(e) => setRxData({ ...rxData, odAxis: e.target.value })}
                            className="w-16 bg-[#18181B] border border-zinc-700 rounded px-2 py-1 text-center text-xs"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-[#D4AF87]">OS (Left)</td>
                        <td className="py-2">
                          <input
                            type="text"
                            value={rxData.osSph}
                            onChange={(e) => setRxData({ ...rxData, osSph: e.target.value })}
                            className="w-16 bg-[#18181B] border border-zinc-700 rounded px-2 py-1 text-center text-xs"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="text"
                            value={rxData.osCyl}
                            onChange={(e) => setRxData({ ...rxData, osCyl: e.target.value })}
                            className="w-16 bg-[#18181B] border border-zinc-700 rounded px-2 py-1 text-center text-xs"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="text"
                            value={rxData.osAxis}
                            onChange={(e) => setRxData({ ...rxData, osAxis: e.target.value })}
                            className="w-16 bg-[#18181B] border border-zinc-700 rounded px-2 py-1 text-center text-xs"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Near Add (for Reading / 40+)</label>
                    <input
                      type="text"
                      value={rxData.add}
                      onChange={(e) => setRxData({ ...rxData, add: e.target.value })}
                      placeholder="+1.50"
                      className="w-full bg-[#18181B] border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-200"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Pupillary Distance (PD)</label>
                    <input
                      type="text"
                      value={rxData.pd}
                      onChange={(e) => setRxData({ ...rxData, pd: e.target.value })}
                      placeholder="63 mm"
                      className="w-full bg-[#18181B] border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-200"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-zinc-300 space-y-2">
                <p>
                  No problem! Complete your order now. Our optometrist team will contact you on WhatsApp to review your prescription slip or previous glasses reading before cutting lenses.
                </p>
                <div className="flex items-center gap-2 text-[#D4AF87] font-semibold text-xs">
                  <span>Direct Optometrist WhatsApp Support: +91 94432 23456</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowPrescriptionModal(false)}
              className="w-full py-3 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Save Prescription & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
