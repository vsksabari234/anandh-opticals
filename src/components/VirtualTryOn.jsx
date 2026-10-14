import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useStore } from '../context/StoreContext';
import GlassesIllustration from './GlassesIllustration';
import {
  Camera,
  X,
  Upload,
  Sparkles,
  Sliders,
  Check,
  RotateCcw,
  ShoppingBag,
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
    if (!selectedTryOnProduct) return 'rgba(224, 242, 254, 0.4)';
    switch (lensFilterMode) {
      case 'bluecut':
        return 'rgba(2, 132, 199, 0.35)';
      case 'sun':
        return 'rgba(15, 23, 42, 0.88)';
      case 'transition':
        return 'rgba(75, 85, 99, 0.65)';
      case 'original':
      default:
        return selectedTryOnProduct.lensColor;
    }
  };

  // Face compatibility check
  const isCompatible = selectedTryOnProduct?.suitableFaceShapes?.includes(activeModel.faceShape);

  if (!isTryOnModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-sky-100 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header - White with Glacier Blue accent */}
        <div className="px-6 py-4 border-b border-sky-100 flex items-center justify-between bg-gradient-to-r from-sky-50/70 via-white to-amber-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-300 flex items-center justify-center text-sky-600 shadow-xs">
              <Sparkles className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  3D Virtual Try-On Studio
                </h3>
                <span className="text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                  AI Calibrated
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Precision frame fitting with real-time facial symmetry calibration
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopWebcam();
              setIsTryOnModalOpen(false);
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Main Visual Try-On Stage (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/80 p-6 flex flex-col items-center justify-center relative min-h-[380px] lg:min-h-[520px] border-b lg:border-b-0 lg:border-r border-sky-100">
            {/* Viewport Frame */}
            <div
              ref={tryOnStageRef}
              className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-2 border-white ring-1 ring-sky-200 bg-white flex items-center justify-center group"
            >
              {/* Layer 1: Background Face (Webcam, Upload, or Relatable Generated Indian Model) */}
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
                <span className="px-3 py-1 bg-white/95 backdrop-blur-md border border-sky-200 rounded-full text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                  Face Shape: <strong className="text-sky-700">{activeModel.faceShape}</strong>
                </span>

                {isCompatible ? (
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-xs">
                    <Check className="w-3.5 h-3.5" /> Perfect Geometry Match!
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded-full text-[11px] font-medium flex items-center gap-1 shadow-xs">
                    <Info className="w-3.5 h-3.5" /> Alternative Style
                  </span>
                )}
              </div>

              {/* Active Lens Tint Filter Indicator */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md border border-sky-200 rounded-md text-[11px] font-mono text-sky-800 font-semibold shadow-xs">
                  Lens Coating: {lensFilterMode.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Input Switcher Bar */}
            <div className="w-full max-w-md mt-4 flex items-center justify-between gap-2 bg-white p-2 rounded-2xl border border-sky-100 shadow-xs">
              <button
                onClick={isWebcamActive ? stopWebcam : startWebcam}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition ${
                  isWebcamActive
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                {isWebcamActive ? 'Stop Live Camera' : 'Live Camera'}
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition"
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
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
                title="Reset Adjustments"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Model Presets */}
            <div className="w-full max-w-md mt-3 flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">Models:</span>
              {PRESET_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    stopWebcam();
                    setCustomPhoto(null);
                    setActiveModel(model);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition whitespace-nowrap shadow-2xs ${
                    activeModel.id === model.id && !isWebcamActive && !customPhoto
                      ? 'bg-sky-50 border-sky-400 text-sky-900 font-bold ring-1 ring-sky-300'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
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
          <div className="lg:col-span-5 bg-white p-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Selected Frame Info */}
              {selectedTryOnProduct && (
                <div className="bg-gradient-to-br from-sky-50/60 to-amber-50/40 border border-sky-100 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center gap-3">
                    {selectedTryOnProduct.image && (
                      <div className="w-16 h-12 bg-white rounded-xl flex items-center justify-center p-1 shrink-0 border border-sky-100 shadow-2xs overflow-hidden">
                        <img
                          src={selectedTryOnProduct.image}
                          alt={selectedTryOnProduct.name}
                          className="w-full h-full object-contain filter drop-shadow-2xs"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                        {selectedTryOnProduct.brand}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 truncate font-heading">
                        {selectedTryOnProduct.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {selectedTryOnProduct.gender} • {selectedTryOnProduct.material}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-black text-sky-700 font-heading">
                        ₹{selectedTryOnProduct.price.toLocaleString('en-IN')}
                      </span>
                      <div className="text-[10px] text-slate-400 line-through">
                        ₹{selectedTryOnProduct.originalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-sky-100/70 text-[11px] text-slate-600">
                    <span className="bg-white px-2 py-0.5 rounded-md border border-sky-100 font-mono font-medium">
                      Shape: {selectedTryOnProduct.shape}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold ml-auto">
                      In Stock ({selectedTryOnProduct.stock})
                    </span>
                  </div>
                </div>
              )}

              {/* Lens Coating Tint Simulator */}
              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between mb-2">
                  <span>Lens Coating Simulation:</span>
                  <span className="text-[11px] text-sky-600 font-semibold">German Optical Tints</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'original', label: 'Clear Anti-Glare', desc: 'Everyday ARC' },
                    { id: 'bluecut', label: 'Glacier Blue Shield', desc: 'Screen Guard' },
                    { id: 'transition', label: 'Photochromic Auto', desc: 'Sun Adaptive' },
                    { id: 'sun', label: 'UV400 Polarized', desc: 'Highway Driving' }
                  ].map((tint) => (
                    <button
                      key={tint.id}
                      onClick={() => setLensFilterMode(tint.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition ${
                        lensFilterMode === tint.id
                          ? 'bg-sky-50 border-sky-400 text-sky-900 font-bold ring-1 ring-sky-300'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-sky-200'
                      }`}
                    >
                      <div className="font-bold text-slate-800">{tint.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{tint.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calibration Sliders */}
              <div className="space-y-3 bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-sky-600" /> Frame Micro-Fit Calibrator
                  </span>
                  <span className="text-[11px] text-amber-700 font-semibold">Custom Fit</span>
                </div>

                {/* Vertical position */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                    <span>Nose Bridge Height</span>
                    <span className="font-mono font-bold">{verticalOffset} px</span>
                  </div>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    value={verticalOffset}
                    onChange={(e) => setVerticalOffset(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Frame Scale */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                    <span>Frame Width / Scale</span>
                    <span className="font-mono font-bold">{Math.round(frameScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.25"
                    step="0.02"
                    value={frameScale}
                    onChange={(e) => setFrameScale(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Quick Frame Switcher Tray */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">
                  Try Other Showroom Frames:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {products.slice(0, 8).map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedTryOnProduct(prod)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition ${
                        selectedTryOnProduct?.id === prod.id
                          ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-300 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-sky-200'
                      }`}
                    >
                      <div className="w-12 h-7 my-1 flex items-center justify-center overflow-hidden">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain filter drop-shadow-2xs"
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
                      <span className="text-[10px] text-slate-700 font-semibold truncate w-full text-center">
                        {prod.shape}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-sky-100 flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart(selectedTryOnProduct);
                  setIsTryOnModalOpen(false);
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md glow-glacier"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart & Order
              </button>

              <button
                onClick={() => {
                  setIsTryOnModalOpen(false);
                  setIsAppointmentModalOpen(true);
                }}
                className="py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-1.5 text-xs whitespace-nowrap shadow-xs glow-gold"
              >
                <Eye className="w-4 h-4" />
                Book Clinic Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
