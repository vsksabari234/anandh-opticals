import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LENS_PACKAGES } from '../data/initialData';
import { X, Check, Calculator, Layers, ShoppingBag, Sparkles } from 'lucide-react';

export default function LensCalculator() {
  const { isLensCalcOpen, setIsLensCalcOpen, addToCart, selectedTryOnProduct, showToast } = useStore();

  const [prescriptionType, setPrescriptionType] = useState('single');
  const [selectedLensIndex, setSelectedLensIndex] = useState(LENS_PACKAGES[1] || LENS_PACKAGES[0]); // Blue cut default
  const [spherePower, setSpherePower] = useState('-1.50');
  const [coatingOption] = useState('arc');

  if (!isLensCalcOpen) return null;

  const basePrice = selectedLensIndex.price;
  const coatingExtra = 0;
  const framePrice = selectedTryOnProduct ? selectedTryOnProduct.price : 2490;
  const totalEstimate = basePrice + coatingExtra + framePrice;

  // Lens thickness simulation percentage based on power and index
  const absPower = Math.abs(parseFloat(spherePower) || 0);
  const thicknessIndexFactor = selectedLensIndex.id === 'lens-ultrathin' ? 0.55 : selectedLensIndex.id === 'lens-progressive' ? 0.7 : selectedLensIndex.id === 'lens-bluecut' ? 0.8 : 1.0;
  const simulatedEdgeMm = Math.max(1.8, (2.0 + absPower * 0.9 * thicknessIndexFactor)).toFixed(1);

  const handleApplyToCart = () => {
    if (selectedTryOnProduct) {
      addToCart(selectedTryOnProduct, {
        id: selectedLensIndex.id,
        name: `${selectedLensIndex.name} (${coatingOption.toUpperCase()})`,
        price: basePrice + coatingExtra
      });
      setIsLensCalcOpen(false);
    } else {
      showToast('Lens package selected! Add any frame to complete your pair.');
      setIsLensCalcOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#141417] text-zinc-100 border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#27272A] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block">
                PRECISION LENS CONFIGURATOR
              </span>
              <h3 className="font-serif-luxury text-lg text-[#FAF7F0]">
                Smart Lens & Prescription Calculator
              </h3>
              <p className="text-xs text-zinc-400">
                Transparent lens pricing, thickness simulator & coating selector
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLensCalcOpen(false)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#18181B] rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Step 1: Prescription Type */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-2.5">
              1. Select Vision Type:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'single', label: 'Single Vision Distance', sub: 'For driving, TV & everyday' },
                { id: 'progressive', label: 'No-Line Progressive', sub: 'Distance + Computer + Reading' },
                { id: 'reading', label: 'Reading Only', sub: 'Near reading & mobile' },
                { id: 'zero', label: 'Zero Power (Plano)', sub: 'Anti-glare screen protection' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPrescriptionType(item.id)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    prescriptionType === item.id
                      ? 'bg-[#18181B] border-[#D4AF87] ring-1 ring-[#D4AF87] shadow-md'
                      : 'bg-[#121214] border-[#27272A] text-zinc-300 hover:border-[#D4AF87]/50'
                  }`}
                >
                  <div className="text-xs font-bold text-[#FAF7F0]">{item.label}</div>
                  <div className="text-[10px] text-zinc-500 mt-1">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Estimated Power for thickness simulation */}
          <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <span className="text-xs font-semibold text-zinc-300 block mb-1.5">
                2. Enter Approximate Diopter (Sphere):
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={spherePower}
                  onChange={(e) => setSpherePower(e.target.value)}
                  placeholder="-1.50"
                  className="w-24 bg-[#121214] border border-[#27272A] px-3 py-1.5 rounded-lg text-[#D4AF87] font-mono text-sm text-center font-bold focus:outline-none focus:border-[#D4AF87]"
                />
                <span className="text-xs text-zinc-400 font-medium">Diopters (OD/OS)</span>
              </div>
            </div>

            {/* Thickness Gauge Indicator */}
            <div className="w-full sm:w-auto flex items-center gap-3 bg-[#121214] px-4 py-2.5 rounded-xl border border-[#27272A]">
              <Layers className="w-5 h-5 text-[#D4AF87]" />
              <div>
                <div className="text-[11px] text-zinc-400">Simulated Edge Thickness:</div>
                <div className="text-sm font-bold text-[#FAF7F0] font-mono">
                  ~{simulatedEdgeMm} mm{' '}
                  <span className="text-[10px] text-[#D4AF87]">
                    ({selectedLensIndex.material})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Lens Packages */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-2.5">
              3. Choose Lens Index & Coating Package:
            </label>
            <div className="space-y-2.5">
              {LENS_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedLensIndex(pkg)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    selectedLensIndex.id === pkg.id
                      ? 'bg-[#18181B] border-[#D4AF87] ring-1 ring-[#D4AF87] shadow-md'
                      : 'bg-[#121214] border-[#27272A] hover:border-[#D4AF87]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif-luxury text-sm text-[#FAF7F0]">{pkg.name}</h4>
                      <span className="text-[10px] font-semibold bg-[#121214] text-[#D4AF87] px-2.5 py-0.5 rounded-full border border-[#D4AF87]/40 uppercase tracking-wider">
                        {pkg.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">{pkg.material} • {pkg.suitableFor}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pkg.features.map((feat) => (
                        <span key={feat} className="text-[10px] text-zinc-300 bg-[#121214] px-2 py-0.5 rounded-md border border-[#27272A]">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right sm:pl-4 sm:border-l sm:border-[#27272A] flex sm:flex-col items-center sm:items-end justify-between">
                    <div>
                      <span className="text-base font-bold text-[#D4AF87]">
                        +₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <div className="text-[10px] text-zinc-500">per pair</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-2 border ${
                      selectedLensIndex.id === pkg.id ? 'bg-[#D4AF87] border-[#D4AF87] text-[#090909]' : 'border-zinc-700'
                    }`}>
                      {selectedLensIndex.id === pkg.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Summary Price */}
        <div className="p-5 border-t border-[#27272A] bg-[#121214] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <div className="text-xs text-zinc-400">
              Estimated Total (Frame + Custom Lenses):
            </div>
            <div className="text-2xl font-serif-luxury text-[#FAF7F0] flex items-baseline gap-2">
              <span className="text-[#D4AF87] font-bold">₹{totalEstimate.toLocaleString('en-IN')}</span>
              <span className="text-xs font-semibold text-zinc-400">
                (Includes 1-Year Coating Warranty)
              </span>
            </div>
          </div>

          <button
            onClick={handleApplyToCart}
            className="w-full sm:w-auto px-6 py-3 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Apply Lenses to Selection
          </button>
        </div>
      </div>
    </div>
  );
}
