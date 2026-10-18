import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useStore } from '../context/StoreContext';
import GlassesIllustration from './GlassesIllustration';
import {
  X,
  Camera,
  Upload,
  RotateCcw,
  Sliders,
  Check,
  ShoppingBag,
  Sparkles,
  Eye,
  Info
} from 'lucide-react';

const PRESET_MODELS = [
  {
    id: 'm1',
    name: 'Arjun (Oval Face)',
    faceShape: 'Oval',
    image: '/src/assets/images/model_male_oval_1791949566309.jpg',
    eyeY: 42,
    scaleDefault: 0.95
  },
  {
    id: 'm2',
    name: 'Priya (Round Face)',
    faceShape: 'Round',
    image: '/src/assets/images/model_female_round_1791949598824.jpg',
    eyeY: 42,
    scaleDefault: 0.92
  },
  {
    id: 'm3',
    name: 'Karthik (Square Jaw)',
    faceShape: 'Square',
    image: '/src/assets/images/model_man_square_1791949598792.jpg',
    eyeY: 43,
    scaleDefault: 0.98
  }
];

export default function VirtualTryOn() {
  const {
    products,
    selectedTryOnProduct,
    setSelectedTryOnProduct,
    isTryOnModalOpen,
    setIsTryOnModalOpen,
    addToCart,
    setIsAppointmentModalOpen,
    showToast
  } = useStore();

  const [activeModel, setActiveModel] = useState(PRESET_MODELS[0]);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamStream, setWebcamStream] = useState(null);
  const [customPhoto, setCustomPhoto] = useState(null);

  // Calibration adjustment sliders
  const [verticalOffset, setVerticalOffset] = useState(0); // -30 to 30px
  const [frameScale, setFrameScale] = useState(1); // 0.7 to 1.3
  const [rotationAngle, setRotationAngle] = useState(0); // -15 to 15 deg
  const [lensFilterMode, setLensFilterMode] = useState('original'); // original, bluecut, sun, transition

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const tryOnStageRef = useRef(null);

  const stopWebcam = useCallback(() => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
    setIsWebcamActive(false);
  }, [webcamStream]);

  // Stop webcam on modal close
  useEffect(() => {
    if (!isTryOnModalOpen) {
      stopWebcam();
    }
  }, [isTryOnModalOpen, stopWebcam]);

  const startWebcam = async () => {
    try {
      stopWebcam();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: 'user' }
      });
      setWebcamStream(stream);
      setIsWebcamActive(true);
      setCustomPhoto(null);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Webcam access error:', err);
      showToast('Camera access denied or unavailable. Using virtual portrait model.', 'info');
      setIsWebcamActive(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      stopWebcam();
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPhoto(event.target?.result);
        showToast('Portrait selfie uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Compute effective lens tint based on lensFilterMode
  const getLensTint = () => {
    if (!selectedTryOnProduct) return 'rgba(212, 175, 135, 0.25)';
    switch (lensFilterMode) {
      case 'bluecut':
        return 'rgba(56, 189, 248, 0.35)'; // Blue shield tint
      case 'sun':
        return 'rgba(15, 23, 42, 0.75)'; // Polarized dark tint
      case 'transition':
        return 'rgba(120, 113, 108, 0.6)'; // Amber-grey photochromic
      case 'original':
      default:
        return selectedTryOnProduct.lensColor || 'rgba(212, 175, 135, 0.25)';
    }
  };

  const isCompatible = selectedTryOnProduct?.suitableFaceShapes?.includes(activeModel.faceShape);

  if (!isTryOnModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#141417] text-zinc-100 border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header - Luxury Dark & Champagne Gold */}
        <div className="px-6 py-5 border-b border-[#27272A] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block">
                  AUGMENTED REALITY MIRROR
                </span>
              </div>
              <h3 className="font-serif-luxury text-lg text-[#FAF7F0]">
                3D Virtual Try-On Studio
              </h3>
              <p className="text-xs text-zinc-400">
                Precision frame fitting with real-time facial symmetry calibration
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopWebcam();
              setIsTryOnModalOpen(false);
            }}
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#18181B] rounded-xl transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Main Visual Try-On Stage (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-black p-6 flex flex-col items-center justify-center relative min-h-[380px] lg:min-h-[520px] border-b lg:border-b-0 lg:border-r border-[#27272A]">
            {/* Viewport Frame */}
            <div
              ref={tryOnStageRef}
              className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-800 ring-1 ring-[#D4AF87]/30 bg-black flex items-center justify-center group"
            >
              {/* Layer 1: Background Face (Webcam, Upload, or Relatable Model) */}
              {isWebcamActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : customPhoto ? (
                <img
                  src={customPhoto}
                  alt="Your uploaded portrait"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <img
                  src={activeModel.image}
                  alt={activeModel.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Layer 2: Glasses Dynamic Overlay */}
              {selectedTryOnProduct && (
                <div
                  className="absolute pointer-events-none transition-all duration-150 ease-out flex items-center justify-center"
                  style={{
                    top: `${(activeModel.eyeY || 42) + (verticalOffset * 0.15)}%`,
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) scale(${(activeModel.scaleDefault || 1) * frameScale})`,
                    width: '68%'
                  }}
                >
                  <GlassesIllustration
                    shape={selectedTryOnProduct.shape}
                    color={selectedTryOnProduct.hexColor}
                    lensColor={getLensTint()}
                    scale={1}
                    showReflection={true}
                  />
                </div>
              )}

              {/* Face Shape Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                <span className="px-3 py-1 bg-black/85 backdrop-blur-md border border-[#27272A] rounded-full text-xs font-semibold text-zinc-200 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF87] animate-ping" />
                  Face Shape: <strong className="text-[#D4AF87]">{activeModel.faceShape}</strong>
                </span>

                {isCompatible ? (
                  <span className="px-2.5 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-xs">
                    <Check className="w-3.5 h-3.5" /> Perfect Geometry Match!
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-[#18181B] text-zinc-300 border border-[#27272A] rounded-full text-[11px] font-medium flex items-center gap-1 shadow-xs">
                    <Info className="w-3.5 h-3.5 text-[#D4AF87]" /> Alternative Style
                  </span>
                )}
              </div>

              {/* Active Lens Tint Filter Indicator */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <span className="px-2.5 py-1 bg-black/85 backdrop-blur-md border border-[#27272A] rounded-md text-[11px] font-mono text-[#D4AF87] font-semibold shadow-xs">
                  Lens Coating: {lensFilterMode.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Input Switcher Bar */}
            <div className="w-full max-w-md mt-4 flex items-center justify-between gap-2 bg-[#121214] p-2 rounded-xl border border-[#27272A] shadow-md">
              <button
                onClick={isWebcamActive ? stopWebcam : startWebcam}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  isWebcamActive
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-[#18181B] text-[#D4AF87] hover:bg-[#27272A] border border-[#D4AF87]/40'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                {isWebcamActive ? 'Stop Live Camera' : 'Live Camera'}
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Selfie
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => {
                  setVerticalOffset(0);
                  setFrameScale(1);
                  setRotationAngle(0);
                  setLensFilterMode('original');
                  showToast('Sliders reset to default fit');
                }}
                className="p-2 text-zinc-400 hover:text-white hover:bg-[#18181B] rounded-lg transition cursor-pointer"
                title="Reset Adjustments"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Model Presets */}
            <div className="w-full max-w-md mt-3 flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-semibold text-zinc-400 whitespace-nowrap">Models:</span>
              {PRESET_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    stopWebcam();
                    setCustomPhoto(null);
                    setActiveModel(model);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition whitespace-nowrap cursor-pointer ${
                    activeModel.id === model.id && !isWebcamActive && !customPhoto
                      ? 'bg-[#D4AF87] border-[#D4AF87] text-[#090909] font-bold shadow-md'
                      : 'bg-[#18181B] border-[#27272A] text-zinc-300 hover:bg-[#27272A]'
                  }`}
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-4 h-4 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {model.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Control & Product Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#121214] p-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Selected Frame Info */}
              {selectedTryOnProduct && (
                <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-3">
                    {selectedTryOnProduct.image && (
                      <div className="w-16 h-12 bg-[#121214] rounded-lg flex items-center justify-center p-1 shrink-0 border border-[#27272A] overflow-hidden">
                        <img
                          src={selectedTryOnProduct.image}
                          alt={selectedTryOnProduct.name}
                          className="w-full h-full object-contain filter drop-shadow-md"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold text-[#D4AF87] uppercase tracking-wider">
                        {selectedTryOnProduct.brand}
                      </span>
                      <h4 className="font-serif-luxury text-sm text-[#FAF7F0] truncate">
                        {selectedTryOnProduct.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {selectedTryOnProduct.gender} • {selectedTryOnProduct.material}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold text-[#D4AF87]">
                        ₹{selectedTryOnProduct.price.toLocaleString('en-IN')}
                      </span>
                      {selectedTryOnProduct.originalPrice && (
                        <div className="text-[10px] text-zinc-500 line-through">
                          ₹{selectedTryOnProduct.originalPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-[#27272A] text-[11px] text-zinc-400">
                    <span className="bg-[#121214] px-2 py-0.5 rounded-md border border-[#27272A] font-mono font-medium">
                      Shape: {selectedTryOnProduct.shape}
                    </span>
                    <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-md font-bold ml-auto">
                      In Stock ({selectedTryOnProduct.stock})
                    </span>
                  </div>
                </div>
              )}

              {/* Lens Coating Tint Simulator */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between mb-2">
                  <span>Lens Coating Simulation:</span>
                  <span className="text-[11px] text-[#D4AF87] font-semibold">German Optical Tints</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'original', label: 'Clear Anti-Glare', desc: 'Everyday ARC' },
                    { id: 'bluecut', label: 'Blue Shield 420nm', desc: 'Digital Guard' },
                    { id: 'transition', label: 'Photochromic Auto', desc: 'Sun Adaptive' },
                    { id: 'sun', label: 'UV400 Polarized', desc: 'Highway Driving' }
                  ].map((tint) => (
                    <button
                      key={tint.id}
                      onClick={() => setLensFilterMode(tint.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition cursor-pointer ${
                        lensFilterMode === tint.id
                          ? 'bg-[#18181B] border-[#D4AF87] text-[#D4AF87] ring-1 ring-[#D4AF87]'
                          : 'bg-[#141417] border-[#27272A] text-zinc-300 hover:text-white hover:border-[#D4AF87]/40'
                      }`}
                    >
                      <div className="font-semibold">{tint.label}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{tint.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calibration Sliders */}
              <div className="space-y-3 bg-[#18181B] p-4 rounded-xl border border-[#27272A]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#D4AF87]" /> Frame Micro-Fit Calibrator
                  </span>
                  <span className="text-[10px] text-[#D4AF87] uppercase tracking-wider font-semibold">Custom Fit</span>
                </div>

                {/* Vertical position */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Nose Bridge Height</span>
                    <span className="font-mono font-bold text-zinc-200">{verticalOffset} px</span>
                  </div>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    value={verticalOffset}
                    onChange={(e) => setVerticalOffset(Number(e.target.value))}
                    className="w-full accent-[#D4AF87] h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Frame Scale */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Frame Width / Scale</span>
                    <span className="font-mono font-bold text-zinc-200">{Math.round(frameScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.25"
                    step="0.02"
                    value={frameScale}
                    onChange={(e) => setFrameScale(Number(e.target.value))}
                    className="w-full accent-[#D4AF87] h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Quick Frame Switcher Tray */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Try Other Showroom Frames:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {products.slice(0, 8).map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedTryOnProduct(prod)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        selectedTryOnProduct?.id === prod.id
                          ? 'border-[#D4AF87] bg-[#18181B] ring-1 ring-[#D4AF87] shadow-md'
                          : 'border-[#27272A] bg-[#141417] hover:border-[#D4AF87]/50'
                      }`}
                    >
                      <div className="w-12 h-7 my-1 flex items-center justify-center overflow-hidden">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain filter drop-shadow-sm"
                          />
                        ) : (
                          <GlassesIllustration
                            shape={prod.shape}
                            color={prod.hexColor}
                            lensColor={prod.lensColor}
                            scale={0.4}
                            showReflection={false}
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-300 font-semibold truncate w-full text-center">
                        {prod.shape}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-[#27272A] flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart(selectedTryOnProduct);
                  setIsTryOnModalOpen(false);
                }}
                className="flex-1 py-3 px-4 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag & Order
              </button>

              <button
                onClick={() => {
                  setIsTryOnModalOpen(false);
                  setIsAppointmentModalOpen(true);
                }}
                className="py-3 px-4 bg-[#18181B] hover:bg-[#27272A] text-[#FAF7F0] border border-[#27272A] font-bold rounded-xl transition flex items-center gap-1.5 text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#D4AF87]" />
                Book Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
