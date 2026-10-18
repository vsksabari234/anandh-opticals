import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const FACE_SHAPES_INFO = {
  Oval: {
    shape: 'Oval',
    title: 'Balanced & Versatile Face Structure',
    description: 'Even proportions with slightly rounded jawline and forehead slightly wider than the chin.',
    bestFrames: ['Rectangle', 'Geometric', 'Wayfarer', 'Aviator'],
    avoidFrames: ['Oversized round frames that swallow your facial balance'],
    styleTip: 'Lucky you! Oval is the universal face shape — almost any frame works, especially bold geometric and rectangular frames.',
    iconSvg: (
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-[#D4AF87] mx-auto">
        <ellipse cx="50" cy="60" rx="36" ry="48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
    )
  },
  Round: {
    shape: 'Round',
    title: 'Curved Contours & Soft Cheeks',
    description: 'Width and length are roughly equal with soft, full cheeks and a gently curved chin.',
    bestFrames: ['Rectangle', 'Cat-Eye', 'Geometric', 'Wayfarer'],
    avoidFrames: ['Small round frames which make the face appear rounder'],
    styleTip: 'Angular, square, and rectangular frames add structure and contrast to soften fullness and elongate the face.',
    iconSvg: (
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-[#D4AF87] mx-auto">
        <circle cx="50" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
    )
  },
  Square: {
    shape: 'Square',
    title: 'Bold Angles & Defined Jawline',
    description: 'Strong, angular jawline with proportional forehead and cheek width.',
    bestFrames: ['Round', 'Aviator', 'Rimless', 'Cat-Eye'],
    avoidFrames: ['Boxy square frames with sharp corners'],
    styleTip: 'Curved and rounded frames soften strong jawlines and lengthen the profile gracefully.',
    iconSvg: (
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-[#D4AF87] mx-auto">
        <rect x="14" y="20" width="72" height="80" rx="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
    )
  },
  Heart: {
    shape: 'Heart',
    title: 'Broad Brow & Sculpted Chin',
    description: 'Widest at the forehead and temples, tapering down to a delicate, pointed chin.',
    bestFrames: ['Aviator', 'Round', 'Rimless', 'Geometric'],
    avoidFrames: ['Top-heavy embellished frames that draw attention upward'],
    styleTip: 'Frames that are wider than your forehead or have bottom-heavy accents restore natural symmetry.',
    iconSvg: (
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-[#D4AF87] mx-auto">
        <path d="M 50 105 Q 16 65 20 35 Q 24 15 50 28 Q 76 15 80 35 Q 84 65 50 105 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
    )
  },
  Diamond: {
    shape: 'Diamond',
    title: 'High Cheekbones & Slender Forehead',
    description: 'Striking high cheekbones with narrower forehead and delicate jawline.',
    bestFrames: ['Cat-Eye', 'Rimless', 'Oval', 'Geometric'],
    avoidFrames: ['Narrow frames that minimize cheekbone elegance'],
    styleTip: 'Rimless and upswept cat-eye frames highlight your dramatic cheekbones while softening angles.',
    iconSvg: (
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-[#D4AF87] mx-auto">
        <polygon points="50,15 85,60 50,105 15,60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
    )
  }
};

export default function FaceShapeStylist() {
  const { products, launchTryOn } = useStore();
  const [selectedShape, setSelectedShape] = useState('Oval');

  const activeInfo = FACE_SHAPES_INFO[selectedShape];

  // Filter products matching this face shape
  const matchedProducts = products.filter(p =>
    p.suitableFaceShapes?.includes(selectedShape) || activeInfo.bestFrames.includes(p.shape)
  );

  return (
    <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-zinc-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF87]/40 text-[#D4AF87] text-[10px] font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            AI Facial Geometry Stylist
          </div>
          <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#FAF7F0]">
            Find Your Perfect Frame Geometry
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Science-backed optical styling tailored to your facial proportions
          </p>
        </div>

        {/* Shape selector tabs */}
        <div className="flex items-center gap-1.5 bg-[#18181B] p-1.5 rounded-xl border border-[#27272A] overflow-x-auto">
          {Object.keys(FACE_SHAPES_INFO).map((shapeKey) => (
            <button
              key={shapeKey}
              onClick={() => setSelectedShape(shapeKey)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                selectedShape === shapeKey
                  ? 'bg-[#D4AF87] text-[#090909] font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#27272A]'
              }`}
            >
              {shapeKey}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#18181B] rounded-xl p-6 border border-[#27272A]">
        <div className="lg:col-span-4 flex flex-col items-center text-center p-4 bg-[#121214] rounded-xl border border-[#27272A] shadow-md">
          <div className="my-2">{activeInfo.iconSvg}</div>
          <h4 className="font-serif-luxury text-xl text-[#FAF7F0] mt-2">
            {activeInfo.shape} Face Shape
          </h4>
          <p className="text-xs text-[#D4AF87] font-semibold mt-0.5">{activeInfo.title}</p>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{activeInfo.description}</p>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#141417] border border-[#D4AF87]/30 rounded-xl p-4 shadow-sm">
            <div className="text-[10px] font-semibold text-[#D4AF87] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF87]" /> Dr. Anand's Optical Styling Advice
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed font-sans">{activeInfo.styleTip}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#121214] p-3.5 rounded-xl border border-[#27272A]">
              <span className="text-[#D4AF87] font-bold block mb-1">
                ✓ Best Harmonizing Shapes:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {activeInfo.bestFrames.map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-0.5 bg-[#18181B] border border-[#27272A] text-zinc-200 rounded-md font-medium text-[11px]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#121214] p-3.5 rounded-xl border border-[#27272A]">
              <span className="text-zinc-400 font-bold block mb-1">✕ Shapes to Avoid:</span>
              <p className="text-zinc-400 mt-1 leading-snug">{activeInfo.avoidFrames.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Frames Live Carousel */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Recommended Showroom Frames for {selectedShape} Face:
          </h4>
          <span className="text-xs text-[#D4AF87] font-semibold">
            {matchedProducts.length} frames matched
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {matchedProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-[#141417] border border-[#27272A] hover:border-[#D4AF87]/60 rounded-xl p-4 transition-all duration-200 group flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                  <span className="font-semibold text-[#D4AF87]">{product.brand}</span>
                  <span className="bg-[#18181B] px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-[#27272A]">
                    {product.shape}
                  </span>
                </div>

                <div className="h-28 my-2 flex items-center justify-center bg-[#18181B] rounded-xl transition border border-[#27272A] overflow-hidden p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-20 object-contain transform group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
                    loading="lazy"
                  />
                </div>

                <h5 className="font-serif-luxury text-sm text-[#FAF7F0] group-hover:text-[#D4AF87] transition truncate mt-2">
                  {product.name}
                </h5>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">{product.material}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-[#D4AF87]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => launchTryOn(product)}
                  className="px-3.5 py-1.5 bg-[#18181B] hover:bg-[#D4AF87] text-[#D4AF87] hover:text-[#090909] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#D4AF87]/40 transition flex items-center gap-1 cursor-pointer"
                >
                  Try On <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
