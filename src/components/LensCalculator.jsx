import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LENS_PACKAGES } from '../data/initialData';
import { X, Check, Calculator, Layers, ShoppingBag } from 'lucide-react';

export default function LensCalculator() {
  const { isLensCalcOpen, setIsLensCalcOpen, addToCart, selectedTryOnProduct, showToast } = useStore();

  const [prescriptionType, setPrescriptionType] = useState('single');
  const [selectedLensIndex, setSelectedLensIndex] = useState(LENS_PACKAGES[1]); // Blue cut default
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-sky-100 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sky-100 flex items-center justify-between bg-gradient-to-r from-sky-50/70 via-white to-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Smart Lens & Prescription Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Transparent lens pricing, thickness simulator & coating selector
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLensCalcOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Step 1: Prescription Type */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
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
                  className={`p-3 rounded-2xl border text-left transition ${
                    prescriptionType === item.id
                      ? 'bg-sky-50 border-sky-400 ring-1 ring-sky-300 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-sky-200'
                  }`}
                >
                  <div className="text-xs font-extrabold text-slate-900">{item.label}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Estimated Power for thickness simulation */}
          <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-700 block mb-1">
                2. Enter Approximate Diopter (Sphere):
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={spherePower}
                  onChange={(e) => setSpherePower(e.target.value)}
                  placeholder="-1.50"
                  className="w-24 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-900 font-mono text-sm text-center shadow-2xs font-bold"
                />
                <span className="text-xs text-slate-500 font-medium">Diopters (OD/OS)</span>
              </div>
            </div>

            {/* Thickness Gauge Indicator */}
            <div className="w-full sm:w-auto flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-sky-200 shadow-xs">
              <Layers className="w-5 h-5 text-sky-600" />
              <div>
                <div className="text-[11px] text-slate-500">Simulated Edge Thickness:</div>
                <div className="text-sm font-black text-slate-900 font-mono">
                  ~{simulatedEdgeMm} mm{' '}
                  <span className="text-[10px] text-sky-700 font-bold">
                    ({selectedLensIndex.material})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Lens Packages */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              3. Choose Lens Index & Coating Package:
            </label>
            <div className="space-y-2.5">
              {LENS_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedLensIndex(pkg)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    selectedLensIndex.id === pkg.id
                      ? 'bg-gradient-to-r from-sky-50/90 to-amber-50/40 border-sky-300 ring-1 ring-sky-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-sky-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">{pkg.name}</h4>
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200 shadow-2xs">
                        {pkg.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{pkg.material} • {pkg.suitableFor}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pkg.features.map((feat) => (
                        <span key={feat} className="text-[10px] text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right sm:pl-4 sm:border-l sm:border-slate-200 flex sm:flex-col items-center sm:items-end justify-between">
                    <div>
                      <span className="text-base font-black text-sky-700 font-heading">
                        +₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <div className="text-[10px] text-slate-400">per pair</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-2 border ${
                      selectedLensIndex.id === pkg.id ? 'bg-sky-600 border-sky-600 text-white shadow-2xs' : 'border-slate-300'
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
        <div className="p-5 border-t border-sky-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <div className="text-xs text-slate-500">
              Estimated Total (Frame + Custom Lenses):
            </div>
            <div className="text-2xl font-black text-slate-900 font-heading flex items-baseline gap-2">
              <span>₹{totalEstimate.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-amber-700">
                (Includes 1-Year Coating Warranty)
              </span>
            </div>
          </div>

          <button
            onClick={handleApplyToCart}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md glow-glacier"
          >
            <ShoppingBag className="w-4 h-4" />
            Apply Lenses to Selection
          </button>
        </div>
      </div>
    </div>
  );
}
