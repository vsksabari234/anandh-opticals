import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import GlassesIllustration from '../components/GlassesIllustration';
import {
  Camera,
  Activity,
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  ShoppingBag,
  Upload,
  Phone
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

export default function VisionLabPage() {
  const {
    products,
    selectedTryOnProduct,
    setSelectedTryOnProduct,
    addToCart,
    setIsAppointmentModalOpen
  } = useStore();

  const [mainTab, setMainTab] = useState('tryon'); // 'tryon', 'lab-session', 'clinic-booking'

  // Try-on state
  const [activeModel, setActiveModel] = useState(PRESET_MODELS[0]);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamStream, setWebcamStream] = useState(null);
  const [customPhoto, setCustomPhoto] = useState(null);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [frameScale, setFrameScale] = useState(1);
  const [lensFilterMode, setLensFilterMode] = useState('original'); // 'original', 'bluecut', 'sun'
  const [addedNotice, setAddedNotice] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Vision Lab interactive mini-tests state
  const [snellenLevel, setSnellenLevel] = useState(0);
  const [snellenScore, setSnellenScore] = useState(0);
  const [snellenCompleted, setSnellenCompleted] = useState(false);
  const [astigmatismAnswer, setAstigmatismAnswer] = useState(null);
  const [ishiharaStep, setIshiharaStep] = useState(0);
  const [ishiharaInput, setIshiharaInput] = useState('');
  const [ishiharaResult, setIshiharaResult] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(20 * 60);

  // Screen strain timer effect
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const currentFrame = selectedTryOnProduct || products[0];

  // Stop webcam on unmount
  useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [webcamStream]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
      });
      setWebcamStream(stream);
      setIsWebcamActive(true);
      setCustomPhoto(null);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (_err) {
      alert('Camera access denied or unavailable. Please use preset face models or upload a photo.');
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((t) => t.stop());
      setWebcamStream(null);
    }
    setIsWebcamActive(false);
  };

  const handleCustomPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      stopWebcam();
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCustomPhoto(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (currentFrame) {
      addToCart(currentFrame);
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2000);
    }
  };

  // Snellen directions
  const snellenQuestions = [
    { size: 'text-7xl', dir: 'right', label: 'E' },
    { size: 'text-5xl', dir: 'up', label: 'Ш' },
    { size: 'text-4xl', dir: 'left', label: 'Ǝ' },
    { size: 'text-3xl', dir: 'down', label: 'M' },
    { size: 'text-2xl', dir: 'right', label: 'E' }
  ];

  const handleSnellenAnswer = (userDir) => {
    const currentQ = snellenQuestions[snellenLevel];
    if (userDir === currentQ.dir) {
      setSnellenScore((s) => s + 1);
    }
    if (snellenLevel < snellenQuestions.length - 1) {
      setSnellenLevel((lvl) => lvl + 1);
    } else {
      setSnellenCompleted(true);
    }
  };

  const ishiharaPlates = [
    { plateNumber: 12, hint: 'High-contrast orange dots on dark mosaic', color: 'bg-zinc-800 text-amber-400' },
    { plateNumber: 8, hint: 'Gold dots forming number on emerald pattern', color: 'bg-zinc-900 text-amber-500' },
    { plateNumber: 29, hint: 'Dual numerals on multicolored mosaic', color: 'bg-zinc-800 text-[#D4AF87]' }
  ];

  const handleIshiharaSubmit = (e) => {
    e.preventDefault();
    if (ishiharaInput.trim() === String(ishiharaPlates[ishiharaStep].plateNumber)) {
      if (ishiharaStep < ishiharaPlates.length - 1) {
        setIshiharaStep((s) => s + 1);
        setIshiharaInput('');
      } else {
        setIshiharaResult('Normal Color Perception Verified (Trichromacy)');
      }
    } else {
      setIshiharaResult('Subtle Color Discrimination Delay Detected. Book a clinical Ishihara exam with our doctor.');
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      
      {/* 1. Header Banner matching Home & Shop */}
      <section className="bg-[#121214] border-b border-[#27272A]/80 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-[#D4AF87]/40 text-[#D4AF87] text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Optical Studio
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#FAF7F0] tracking-tight">
            Virtual 3D Try-On Studio & Vision Lab
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            Experience augmented-reality frame preview with your camera, evaluate your visual acuity with interactive tests, or schedule your complimentary in-clinic vision session in Kallakurichi.
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setMainTab('tryon')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                mainTab === 'tryon'
                  ? 'bg-[#D4AF87] text-[#090909] shadow-lg scale-102'
                  : 'bg-[#18181B] hover:bg-[#27272A] text-zinc-300 border border-[#27272A]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>3D Virtual Try-On</span>
            </button>

            <button
              onClick={() => setMainTab('lab-session')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                mainTab === 'lab-session'
                  ? 'bg-[#D4AF87] text-[#090909] shadow-lg scale-102'
                  : 'bg-[#18181B] hover:bg-[#27272A] text-zinc-300 border border-[#27272A]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Free Vision Lab Tests</span>
            </button>

            <button
              onClick={() => setMainTab('clinic-booking')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                mainTab === 'clinic-booking'
                  ? 'bg-[#D4AF87] text-[#090909] shadow-lg scale-102'
                  : 'bg-[#18181B] hover:bg-[#27272A] text-zinc-300 border border-[#27272A]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>In-Clinic Vision Exam</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10">
        
        {/* ============================================================== */}
        {/* TAB 1: 3D VIRTUAL AR TRY-ON STUDIO */}
        {/* ============================================================== */}
        {mainTab === 'tryon' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive AR Mirror Stage */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-[#121214] rounded-2xl border border-[#27272A] p-5 shadow-2xl space-y-4">
                  
                  {/* Top Mirror Status Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF87] animate-pulse"></span>
                      <span className="text-xs font-semibold text-[#FAF7F0]">
                        {isWebcamActive ? 'Live Camera Feed' : customPhoto ? 'Custom Upload Preview' : `Model: ${activeModel.name}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isWebcamActive ? (
                        <button
                          onClick={stopWebcam}
                          className="px-3 py-1.5 rounded-lg bg-rose-950/60 text-rose-300 text-xs font-bold border border-rose-800 hover:bg-rose-900/60 cursor-pointer transition"
                        >
                          Stop Camera
                        </button>
                      ) : (
                        <button
                          onClick={startWebcam}
                          className="px-3 py-1.5 rounded-lg bg-[#18181B] text-[#D4AF87] text-xs font-bold border border-[#D4AF87]/40 hover:bg-[#27272A] flex items-center gap-1.5 cursor-pointer transition"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#D4AF87]" />
                          Use Webcam
                        </button>
                      )}

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-[#18181B] text-zinc-300 text-xs font-bold border border-[#27272A] hover:bg-[#27272A] flex items-center gap-1.5 cursor-pointer transition"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Photo
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleCustomPhoto}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* The Interactive Virtual Stage */}
                  <div className="relative w-full h-[400px] sm:h-[460px] rounded-xl overflow-hidden bg-black flex items-center justify-center select-none shadow-2xl border border-zinc-900">
                    
                    {/* Face Base Layer */}
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
                        alt="Custom Upload for Virtual Try-On"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={activeModel.image}
                        alt={activeModel.name}
                        className="w-full h-full object-cover object-top"
                      />
                    )}

                    {/* AR Glasses Overlay Container */}
                    <div
                      className="absolute inset-x-0 flex items-center justify-center pointer-events-none transition-all duration-150"
                      style={{
                        top: `${(activeModel.eyeY || 42) + verticalOffset}%`,
                        transform: `scale(${frameScale})`
                      }}
                    >
                      <div className="w-[280px] sm:w-[320px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]">
                        <GlassesIllustration
                          shape={currentFrame.shape}
                          color={currentFrame.color}
                          lensType={lensFilterMode === 'bluecut' ? 'blue-block' : lensFilterMode === 'sun' ? 'polarized' : 'clear'}
                        />
                      </div>
                    </div>

                    {/* Real-time AR Lens Tint Badge */}
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-zinc-200 text-[11px] font-semibold border border-[#D4AF87]/40 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF87]"></span>
                      <span>Lens: {lensFilterMode === 'bluecut' ? '420nm Blue-Shield' : lensFilterMode === 'sun' ? 'UV400 Polarized' : 'Clear Optical'}</span>
                    </div>

                    {/* Model Face Shape Pill */}
                    <div className="absolute bottom-3 left-3 bg-[#121214]/95 backdrop-blur-md px-3 py-1 rounded-full text-zinc-200 text-[11px] font-semibold border border-[#27272A] shadow-md">
                      Face Geometry: <span className="text-[#D4AF87] font-bold">{activeModel.faceShape}</span>
                    </div>
                  </div>

                  {/* Calibration Control Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#18181B] border border-[#27272A] text-xs">
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                        Vertical Height: {verticalOffset}px
                      </label>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        value={verticalOffset}
                        onChange={(e) => setVerticalOffset(Number(e.target.value))}
                        className="w-full accent-[#D4AF87]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                        Scale / Bridge Size: {Math.round(frameScale * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0.8"
                        max="1.25"
                        step="0.02"
                        value={frameScale}
                        onChange={(e) => setFrameScale(Number(e.target.value))}
                        className="w-full accent-[#D4AF87]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                        AR Lens Filter
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => setLensFilterMode('original')}
                          className={`py-1 rounded text-[10px] font-bold transition ${
                            lensFilterMode === 'original' ? 'bg-[#D4AF87] text-[#090909]' : 'bg-[#121214] text-zinc-300 border border-[#27272A]'
                          }`}
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => setLensFilterMode('bluecut')}
                          className={`py-1 rounded text-[10px] font-bold transition ${
                            lensFilterMode === 'bluecut' ? 'bg-[#D4AF87] text-[#090909]' : 'bg-[#121214] text-zinc-300 border border-[#27272A]'
                          }`}
                        >
                          BlueCut
                        </button>
                        <button
                          onClick={() => setLensFilterMode('sun')}
                          className={`py-1 rounded text-[10px] font-bold transition ${
                            lensFilterMode === 'sun' ? 'bg-[#D4AF87] text-[#090909]' : 'bg-[#121214] text-zinc-300 border border-[#27272A]'
                          }`}
                        >
                          Sun Tint
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Switch Model Preset Faces */}
                  <div className="flex flex-wrap items-center justify-between pt-2 gap-2">
                    <span className="text-xs font-semibold text-zinc-400">Preset Face Models:</span>
                    <div className="flex items-center gap-2">
                      {PRESET_MODELS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            stopWebcam();
                            setCustomPhoto(null);
                            setActiveModel(m);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                            activeModel.id === m.id && !isWebcamActive && !customPhoto
                              ? 'bg-[#D4AF87] text-[#090909] border-[#D4AF87]'
                              : 'bg-[#18181B] text-zinc-300 border-[#27272A] hover:bg-[#27272A]'
                          }`}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Frame Switcher & Instant Action Card */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Active Frame Spotlight Card */}
                <div className="bg-[#121214] rounded-2xl border border-[#27272A] p-6 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase text-[#D4AF87] tracking-[0.25em]">
                      SELECTED FRAME
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#18181B] text-[#D4AF87] border border-[#D4AF87]/40 text-xs font-bold">
                      {currentFrame.shape}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-24 h-20 bg-[#18181B] rounded-xl border border-[#27272A] flex items-center justify-center p-2 shrink-0">
                      <img
                        src={currentFrame.image}
                        alt={currentFrame.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif-luxury text-lg text-[#FAF7F0] leading-snug">
                        {currentFrame.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Brand: {currentFrame.brand} • Material: {currentFrame.material}
                      </p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-xl font-bold text-[#D4AF87]">
                          ₹{currentFrame.price?.toLocaleString('en-IN')}
                        </span>
                        {currentFrame.originalPrice && (
                          <span className="text-xs text-zinc-500 line-through">
                            ₹{currentFrame.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-zinc-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF87] shrink-0" />
                    <span>Includes Free Anti-Glare Coating + Premium Hard Case</span>
                  </div>

                  {addedNotice && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold text-center">
                      ✓ Added to Bag Successfully!
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="py-3 px-4 rounded-xl bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </button>
                    <button
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="py-3 px-4 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-[#FAF7F0] border border-[#27272A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#D4AF87]" />
                      Book Fitting
                    </button>
                  </div>
                </div>

                {/* Instant Frame Carousel Switcher */}
                <div className="bg-[#121214] rounded-2xl border border-[#27272A] p-5 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Switch Frame to Try:
                    </h4>
                    <span className="text-xs font-semibold text-[#D4AF87]">{products.length} models ready</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedTryOnProduct(p)}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition flex items-center gap-2 ${
                          currentFrame.id === p.id
                            ? 'bg-[#18181B] border-[#D4AF87] shadow-md ring-1 ring-[#D4AF87]'
                            : 'bg-[#141417] border-[#27272A] hover:border-[#D4AF87]/50'
                        }`}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-9 object-contain shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold text-zinc-100 truncate">{p.name}</p>
                          <p className="text-[10px] text-[#D4AF87] font-bold">₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: FREE VISION LAB ONLINE SCREENING TESTS */}
        {/* ============================================================== */}
        {mainTab === 'lab-session' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Snellen Tumbling E Chart */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#121214] rounded-2xl border border-[#27272A] p-6 sm:p-8 shadow-2xl space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF87]">
                        Test 1 of 3 • Snellen Acuity
                      </span>
                      <h3 className="font-serif-luxury text-2xl text-[#FAF7F0] mt-1">
                        Tumbling E Distance Vision Test
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#18181B] text-[#D4AF87] border border-[#D4AF87]/40 text-xs font-bold">
                      Step {snellenLevel + 1} / {snellenQuestions.length}
                    </span>
                  </div>

                  {!snellenCompleted ? (
                    <div className="text-center space-y-6 py-4">
                      <p className="text-xs text-zinc-400 max-w-md mx-auto">
                        Sit approximately 1 meter (arm's length) from your screen. Look at the letter below and tap the direction the legs of the 'E' point to.
                      </p>

                      {/* The Big Tumbling E */}
                      <div className="h-36 flex items-center justify-center bg-black rounded-xl border border-zinc-800 shadow-inner">
                        <span className={`font-mono font-black text-[#FAF7F0] select-none ${snellenQuestions[snellenLevel].size}`}>
                          {snellenQuestions[snellenLevel].label}
                        </span>
                      </div>

                      {/* Direction Tap Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
                        <button
                          onClick={() => handleSnellenAnswer('up')}
                          className="py-3 px-4 rounded-xl bg-[#18181B] hover:bg-[#D4AF87] hover:text-[#090909] text-zinc-200 border border-[#27272A] font-bold text-xs transition cursor-pointer"
                        >
                          Points UP ↑
                        </button>
                        <button
                          onClick={() => handleSnellenAnswer('down')}
                          className="py-3 px-4 rounded-xl bg-[#18181B] hover:bg-[#D4AF87] hover:text-[#090909] text-zinc-200 border border-[#27272A] font-bold text-xs transition cursor-pointer"
                        >
                          Points DOWN ↓
                        </button>
                        <button
                          onClick={() => handleSnellenAnswer('left')}
                          className="py-3 px-4 rounded-xl bg-[#18181B] hover:bg-[#D4AF87] hover:text-[#090909] text-zinc-200 border border-[#27272A] font-bold text-xs transition cursor-pointer"
                        >
                          Points LEFT ←
                        </button>
                        <button
                          onClick={() => handleSnellenAnswer('right')}
                          className="py-3 px-4 rounded-xl bg-[#18181B] hover:bg-[#D4AF87] hover:text-[#090909] text-zinc-200 border border-[#27272A] font-bold text-xs transition cursor-pointer"
                        >
                          Points RIGHT →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 py-8 bg-[#18181B] rounded-xl border border-[#D4AF87]/40">
                      <CheckCircle2 className="w-12 h-12 text-[#D4AF87] mx-auto" />
                      <h4 className="font-serif-luxury text-2xl text-[#FAF7F0]">
                        Snellen Acuity Score: {snellenScore} / {snellenQuestions.length}
                      </h4>
                      <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                        {snellenScore >= 4
                          ? 'Excellent standard visual acuity! You appear to possess 20/20 vision in distance focus.'
                          : 'Mild distance blur detected. We recommend booking a comprehensive in-clinic refraction test with Dr. S. Anand.'}
                      </p>
                      <button
                        onClick={() => {
                          setSnellenLevel(0);
                          setSnellenScore(0);
                          setSnellenCompleted(false);
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#D4AF87] text-[#090909] font-bold text-xs uppercase tracking-wider hover:bg-[#C59F77] transition cursor-pointer"
                      >
                        Retake Test
                      </button>
                    </div>
                  )}

                </div>

                {/* Test 2: Astigmatism Radial Starburst Fan Dial */}
                <div className="bg-[#121214] rounded-2xl border border-[#27272A] p-6 sm:p-8 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF87]">
                        Test 2 of 3 • Corneal Symmetry
                      </span>
                      <h3 className="font-serif-luxury text-2xl text-[#FAF7F0] mt-1">
                        Astigmatism Radial Sunburst Dial
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400">
                    Cover one eye with your hand. Look at the radial lines below. Do all lines appear equally sharp, dark, and uniform in contrast, or do some lines look darker, bolder, or doubled?
                  </p>

                  {/* SVG Astigmatism Starburst */}
                  <div className="flex justify-center py-6 bg-black rounded-xl border border-zinc-800">
                    <svg className="w-56 h-56" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" fill="#090909" stroke="#27272A" strokeWidth="2" />
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        const x1 = 100 + 15 * Math.cos(angle);
                        const y1 = 100 + 15 * Math.sin(angle);
                        const x2 = 100 + 85 * Math.cos(angle);
                        const y2 = 100 + 85 * Math.sin(angle);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#FAF7F0"
                            strokeWidth={i % 3 === 0 ? "3.5" : "1.8"}
                          />
                        );
                      })}
                      <circle cx="100" cy="100" r="10" fill="#D4AF87" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setAstigmatismAnswer('all-uniform')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        astigmatismAnswer === 'all-uniform'
                          ? 'bg-[#D4AF87] text-[#090909] border-[#D4AF87]'
                          : 'bg-[#18181B] hover:bg-[#27272A] text-zinc-200 border-[#27272A]'
                      }`}
                    >
                      All lines look completely equal
                    </button>
                    <button
                      onClick={() => setAstigmatismAnswer('some-darker')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        astigmatismAnswer === 'some-darker'
                          ? 'bg-[#D4AF87] text-[#090909] border-[#D4AF87]'
                          : 'bg-[#18181B] hover:bg-[#27272A] text-zinc-200 border-[#27272A]'
                      }`}
                    >
                      Some lines are darker / blurrier
                    </button>
                  </div>

                  {astigmatismAnswer && (
                    <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-zinc-300">
                      {astigmatismAnswer === 'all-uniform'
                        ? 'Corneal symmetry appears normal! Low probability of significant astigmatism.'
                        : 'Noticeable corneal curvature asymmetry indicated. Toric cylindrical lenses are likely recommended for crisp night vision.'}
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column: Ishihara Color Plate & 20-20-20 Timer */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Ishihara Color Screen */}
                <div className="bg-[#121214] rounded-2xl border border-[#27272A] p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF87]">
                        Test 3 of 3 • Color Vision
                      </span>
                      <h3 className="font-serif-luxury text-xl text-[#FAF7F0] mt-1">
                        Ishihara Mosaic Plate Screening
                      </h3>
                    </div>
                    <span className="text-xs text-[#D4AF87] font-semibold">
                      Plate {ishiharaStep + 1}/3
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400">
                    What number do you perceive inside this dot mosaic?
                  </p>

                  <div className={`h-40 rounded-xl flex items-center justify-center font-black text-6xl tracking-widest border border-zinc-800 shadow-inner select-none ${ishiharaPlates[ishiharaStep].color}`}>
                    {ishiharaPlates[ishiharaStep].plateNumber}
                  </div>

                  <form onSubmit={handleIshiharaSubmit} className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Type number..."
                      value={ishiharaInput}
                      onChange={(e) => setIshiharaInput(e.target.value)}
                      className="flex-1 p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-xs font-bold text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md transition"
                    >
                      Verify
                    </button>
                  </form>

                  {ishiharaResult && (
                    <div className="p-3 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 text-xs font-medium text-zinc-200">
                      {ishiharaResult}
                    </div>
                  )}
                </div>

                {/* 20-20-20 Digital Screen Ergonomics Companion */}
                <div className="bg-[#121214] text-zinc-100 border border-[#27272A] rounded-2xl p-6 shadow-2xl space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#D4AF87]" />
                    <h3 className="font-serif-luxury text-lg text-[#FAF7F0]">20-20-20 Screen Relief Companion</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Every 20 minutes spent on digital screens, look at an object 20 feet away for 20 seconds. This prevents ciliary muscle spasm and dry eye strain.
                  </p>

                  <div className="p-5 rounded-xl bg-black border border-zinc-800 text-center space-y-2">
                    <p className="text-3xl font-bold font-mono tracking-widest text-[#D4AF87]">
                      {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                    </p>
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="px-5 py-2 rounded-full bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md transition"
                    >
                      {timerRunning ? 'Pause Session' : 'Start 20-Min Screen Timer'}
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="w-full py-3 px-4 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-[#D4AF87] border border-[#D4AF87]/40 text-xs font-bold uppercase tracking-wider text-center transition cursor-pointer"
                    >
                      Book Free Doctor Consultation
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: BOOK FREE IN-CLINIC VISION LAB EXAM */}
        {/* ============================================================== */}
        {mainTab === 'clinic-booking' && (
          <div className="bg-[#121214] rounded-2xl border border-[#27272A] p-8 sm:p-12 shadow-2xl space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="px-3 py-1 rounded-full bg-[#18181B] text-[#D4AF87] border border-[#D4AF87]/40 text-xs font-semibold uppercase tracking-wider inline-block">
                Zero Cost • 100% Free Consultation
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0]">
                Comprehensive In-Clinic Vision Lab Exam
              </h2>
              <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                Get your eyes tested by Dr. S. Anand (M.Optom, FIACLE) with German computerized instrumentation at our Kallakurichi clinic. Free with any frame consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF87] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF7F0] text-sm">3D Auto-Refractometry</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Objective corneal curvature and refractive index within 3 seconds.</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF87] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF7F0] text-sm">Digital Slit-Lamp Exam</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Microscopic anterior eye health inspection for cornea and tear film stability.</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF87] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF7F0] text-sm">Non-Contact Glaucoma NCT Check</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Painless intraocular pressure measurement for ocular hypertension screening.</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF87] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF7F0] text-sm">Trial Lens Verification</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Walk comfortably in actual trial lenses before your prescription is cut.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-black border border-[#27272A] text-center space-y-5">
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">
                Ready to secure your free Vision Lab appointment?
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg transition"
                >
                  <Calendar className="w-4 h-4" />
                  Select Date & Time (Clinic)
                </button>
                <a
                  href="tel:+919443228456"
                  className="px-6 py-3.5 rounded-full bg-[#18181B] hover:bg-[#27272A] text-[#FAF7F0] border border-[#27272A] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-[#D4AF87]" />
                  Call Clinic: 04151-222345
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
