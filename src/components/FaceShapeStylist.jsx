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
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-sky-600 mx-auto">
        <ellipse cx="50" cy="60" rx="36" ry="48" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
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
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-sky-600 mx-auto">
        <circle cx="50" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
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
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-sky-600 mx-auto">
        <rect x="14" y="20" width="72" height="80" rx="12" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
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
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-sky-600 mx-auto">
        <path d="M 50 105 Q 16 65 20 35 Q 24 15 50 28 Q 76 15 80 35 Q 84 65 50 105 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
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
      <svg viewBox="0 0 100 120" className="w-16 h-20 text-sky-600 mx-auto">
        <polygon points="50,15 85,60 50,105 15,60" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
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
    <div className="bg-white border border-sky-100 rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            AI Facial Geometry Stylist
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Find Your Perfect Frame Geometry
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Science-backed optical styling tailored to your facial proportions
          </p>
        </div>

        {/* Shape selector tabs */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-sky-100 overflow-x-auto">
          {Object.keys(FACE_SHAPES_INFO).map((shapeKey) => (
            <button
              key={shapeKey}
              onClick={() => setSelectedShape(shapeKey)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedShape === shapeKey
                  ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {shapeKey}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50/70 rounded-2xl p-6 border border-sky-100">
        <div className="lg:col-span-4 flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-sky-100 shadow-xs">
          <div className="my-2">{activeInfo.iconSvg}</div>
          <h4 className="text-xl font-extrabold text-slate-900 font-heading mt-2">
            {activeInfo.shape} Face Shape
          </h4>
          <p className="text-xs text-sky-700 font-bold mt-0.5">{activeInfo.title}</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">{activeInfo.description}</p>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 shadow-2xs">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Dr. Anand's Optical Styling Advice
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">{activeInfo.styleTip}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
              <span className="text-emerald-700 font-bold block mb-1">
                ✓ Best Harmonizing Shapes:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {activeInfo.bestFrames.map((f) => (
                  <span
                    key={f}
                    className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-semibold"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
              <span className="text-rose-700 font-bold block mb-1">✕ Shapes to Avoid:</span>
              <p className="text-slate-500 mt-1 leading-snug">{activeInfo.avoidFrames.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Frames Live Carousel */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            Recommended Showroom Frames for {selectedShape} Face:
          </h4>
          <span className="text-xs text-sky-700 font-bold">
            {matchedProducts.length} frames matched
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {matchedProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white border border-sky-100 hover:border-amber-300 rounded-2xl p-4 transition-all duration-200 group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span className="font-bold text-sky-700">{product.brand}</span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-600">
                    {product.shape}
                  </span>
                </div>

                <div className="h-28 my-2 flex items-center justify-center bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20 rounded-xl group-hover:bg-white group-hover:shadow-xs transition border border-sky-100/60 overflow-hidden p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-20 object-contain transform group-hover:scale-105 transition-transform duration-300 filter drop-shadow-2xs"
                    loading="lazy"
                  />
                </div>

                <h5 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition truncate mt-2">
                  {product.name}
                </h5>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{product.material}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-sm font-black text-slate-900 font-heading">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => launchTryOn(product)}
                  className="px-3 py-1.5 bg-sky-50 hover:bg-sky-600 text-sky-800 hover:text-white text-xs font-bold rounded-lg border border-sky-200 transition flex items-center gap-1 shadow-2xs"
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
