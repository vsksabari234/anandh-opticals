import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import GlassesIllustration from '../components/GlassesIllustration';
import {
  Camera,
  Eye,
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

  // Ishihara plates
  const ishiharaPlates = [
    { plateNumber: 12, hint: 'High-contrast orange dots on green background', color: 'bg-emerald-100 text-amber-600' },
    { plateNumber: 8, hint: 'Red dots forming the number on mixed green circles', color: 'bg-teal-100 text-rose-600' },
    { plateNumber: 29, hint: 'Dual numerals on multicolored mosaic', color: 'bg-lime-100 text-orange-600' }
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
      setIshiharaResult('Subtle Color Discrimination Delay Detected. Book a clinical Ishihara exam.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 animate-fade-in text-slate-900">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-950 text-white py-12 px-4 sm:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-700/60 border border-blue-400 text-blue-100 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Next-Gen Optical Technology
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            Virtual 3D Try-On Studio & Free Vision Lab
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Experience photorealistic augmented-reality frame preview with your camera, evaluate your visual acuity with interactive tests, or schedule your complimentary in-clinic vision lab session in Kallakurichi.
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setMainTab('tryon')}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
                mainTab === 'tryon'
                  ? 'bg-white text-blue-900 shadow-lg scale-102'
                  : 'bg-blue-800/80 hover:bg-blue-700/80 text-white border border-blue-600'
              }`}
            >
              <Camera className="w-4 h-4 text-blue-600" />
              <span>3D Virtual Try-On Studio</span>
            </button>

            <button
              onClick={() => setMainTab('lab-session')}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
                mainTab === 'lab-session'
                  ? 'bg-white text-blue-900 shadow-lg scale-102'
                  : 'bg-blue-800/80 hover:bg-blue-700/80 text-white border border-blue-600'
              }`}
            >
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Free Vision Lab Tests (Online)</span>
            </button>

            <button
              onClick={() => setMainTab('clinic-booking')}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
                mainTab === 'clinic-booking'
                  ? 'bg-white text-blue-900 shadow-lg scale-102'
                  : 'bg-blue-800/80 hover:bg-blue-700/80 text-white border border-blue-600'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Free In-Clinic Vision Lab Exam</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* ============================================================== */}
        {/* TAB 1: 3D VIRTUAL AR TRY-ON STUDIO */}
        {/* ============================================================== */}
        {mainTab === 'tryon' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive AR Mirror Stage */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-3xl border-2 border-blue-200/80 p-5 shadow-xl space-y-4">
                  
                  {/* Top Mirror Status Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-bold text-slate-900">
                        {isWebcamActive ? 'Live Camera Feed' : customPhoto ? 'Custom Upload Preview' : `Model: ${activeModel.name}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isWebcamActive ? (
                        <button
                          onClick={stopWebcam}
                          className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 hover:bg-rose-100 cursor-pointer"
                        >
                          Stop Camera
                        </button>
                      ) : (
                        <button
                          onClick={startWebcam}
                          className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 hover:bg-blue-100 flex items-center gap-1 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5 text-blue-600" />
                          Use My Webcam
                        </button>
                      )}

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
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
                  <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center select-none shadow-inner">
                    
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
                      <div className="w-[280px] sm:w-[320px] drop-shadow-2xl">
                        <GlassesIllustration
                          shape={currentFrame.shape}
                          color={currentFrame.color}
                          lensType={lensFilterMode === 'bluecut' ? 'blue-block' : lensFilterMode === 'sun' ? 'polarized' : 'clear'}
                        />
                      </div>
                    </div>

                    {/* Real-time AR Lens Tint Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>Lens: {lensFilterMode === 'bluecut' ? '420nm Blue-Shield' : lensFilterMode === 'sun' ? 'UV400 Polarized' : 'Clear Optical'}</span>
                    </div>

                    {/* Model Face Shape Pill */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-slate-900 text-[11px] font-bold border border-slate-200 shadow-md">
                      Face Geometry: <span className="text-blue-700 font-extrabold">{activeModel.faceShape}</span>
                    </div>

                  </div>

                  {/* Calibration Control Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                        Vertical Height: {verticalOffset}px
                      </label>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        value={verticalOffset}
                        onChange={(e) => setVerticalOffset(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                        Scale / Bridge Size: {Math.round(frameScale * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0.8"
                        max="1.25"
                        step="0.02"
                        value={frameScale}
                        onChange={(e) => setFrameScale(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                        AR Lens Filter
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => setLensFilterMode('original')}
                          className={`py-1 rounded text-[10px] font-bold ${
                            lensFilterMode === 'original' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => setLensFilterMode('bluecut')}
                          className={`py-1 rounded text-[10px] font-bold ${
                            lensFilterMode === 'bluecut' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          BlueCut
                        </button>
                        <button
                          onClick={() => setLensFilterMode('sun')}
                          className={`py-1 rounded text-[10px] font-bold ${
                            lensFilterMode === 'sun' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          Sun Tint
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Switch Model Preset Faces */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-slate-500">Preset Face Models:</span>
                    <div className="flex items-center gap-2">
                      {PRESET_MODELS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            stopWebcam();
                            setCustomPhoto(null);
                            setActiveModel(m);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            activeModel.id === m.id && !isWebcamActive && !customPhoto
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
                <div className="bg-white rounded-3xl border border-blue-200/80 p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase text-blue-800 tracking-wider">
                      Selected Frame
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                      {currentFrame.shape}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-24 h-20 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center p-2 shrink-0">
                      <img
                        src={currentFrame.image}
                        alt={currentFrame.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                        {currentFrame.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Brand: {currentFrame.brand} • Material: {currentFrame.material}
                      </p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-xl font-black text-slate-900 font-heading">
                          ₹{currentFrame.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{Math.round(currentFrame.price * 1.35).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Includes Free Anti-Glare Coating + Free Hard Case</span>
                  </div>

                  {addedNotice && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold text-center">
                      ✓ Added to Cart Successfully!
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="py-3 px-4 rounded-xl btn-primary-blue font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Book Fitting
                    </button>
                  </div>
                </div>

                {/* Instant Frame Carousel Switcher */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Switch Frame to Try:
                    </h4>
                    <span className="text-xs font-semibold text-blue-600">{products.length} models ready</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedTryOnProduct(p)}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition flex items-center gap-2 ${
                          currentFrame.id === p.id
                            ? 'bg-blue-50 border-blue-500 shadow-xs ring-1 ring-blue-400'
                            : 'bg-white border-slate-200 hover:border-blue-200'
                        }`}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-9 object-contain shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-slate-900 truncate">{p.name}</p>
                          <p className="text-[10px] text-blue-800 font-semibold">₹{p.price}</p>
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
                <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-xl space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                        Test 1 of 3 • Snellen Acuity
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                        Tumbling E Distance Vision Test
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold">
                      Step {snellenLevel + 1} / {snellenQuestions.length}
                    </span>
                  </div>

                  {!snellenCompleted ? (
                    <div className="text-center space-y-6 py-4">
                      <p className="text-xs text-slate-500">
                        Sit approximately 1 meter (arm's length) from your monitor. Look at the letter below and tap the direction the legs of the 'E' point to.
                      </p>

                      {/* The Big Tumbling E */}
                      <div className="h-32 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                        <span className={`font-mono font-black text-slate-950 ${snellenQuestions[snellenLevel].size}`}>
                          {snellenQuestions[snellenLevel].label}
                        </span>
                      </div>

                      {/* Direction Tap Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
                        <button
                          onClick={() => handleSnellenAnswer('up')}
                          className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white font-bold text-xs transition cursor-pointer"
                        >
                          Points UP ↑
                        </button>
                        <button
                          onClick={() => handleSnellenAnswer('down')}
                          className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white font-bold text-xs transition cursor-pointer"
                        >
                          Points DOWN ↓
                        </button>
                        <button
                          onClick={() => handleSnellenAnswer('left')}
                          className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white font-bold text-xs transition cursor-pointer"
                        >
                          Points LEFT ←
                        </button>
                        <button
                          onClick={() => handleSnellenAnswer('right')}
                          className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white font-bold text-xs transition cursor-pointer"
                        >
                          Points RIGHT →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 py-6 bg-blue-50/60 rounded-2xl border border-blue-200">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                      <h4 className="text-xl font-black text-slate-900">
                        Snellen Acuity Score: {snellenScore} / {snellenQuestions.length}
                      </h4>
                      <p className="text-xs text-slate-600 max-w-md mx-auto">
                        {snellenScore >= 4
                          ? 'Excellent standard visual acuity! You appear to possess 20/20 vision in distance focus.'
                          : 'Mild distance blur detected. We recommend booking a comprehensive in-clinic auto-refraction test with Dr. S. Anand.'}
                      </p>
                      <button
                        onClick={() => {
                          setSnellenLevel(0);
                          setSnellenScore(0);
                          setSnellenCompleted(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-blue-800 border border-blue-300 font-bold text-xs"
                      >
                        Retake Test
                      </button>
                    </div>
                  )}

                </div>

                {/* Test 2: Astigmatism Radial Starburst Fan Dial */}
                <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                        Test 2 of 3 • Corneal Symmetry
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                        Astigmatism Radial Sunburst Dial
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    Cover one eye with your hand. Look at the radial lines below. Do all lines appear equally sharp, dark, and uniform in contrast, or do some lines look darker, bolder, or doubled?
                  </p>

                  {/* SVG Astigmatism Starburst */}
                  <div className="flex justify-center py-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <svg className="w-56 h-56" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" fill="white" stroke="#e2e8f0" strokeWidth="2" />
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
                            stroke="#0f172a"
                            strokeWidth={i % 3 === 0 ? "3.5" : "2"}
                          />
                        );
                      })}
                      <circle cx="100" cy="100" r="10" fill="#2563eb" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setAstigmatismAnswer('all-uniform')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition ${
                        astigmatismAnswer === 'all-uniform'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      All lines look completely equal
                    </button>
                    <button
                      onClick={() => setAstigmatismAnswer('some-darker')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition ${
                        astigmatismAnswer === 'some-darker'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      Some lines are darker / blurrier
                    </button>
                  </div>

                  {astigmatismAnswer && (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                      {astigmatismAnswer === 'all-uniform'
                        ? 'Corneal symmetry appears normal! Low probability of significant astigmatism.'
                        : 'Noticeable corneal curvature asymmetry indicated. Toric cylindrical lenses are likely required for sharp night vision.'}
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column: Ishihara Color Plate & 20-20-20 Timer */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Ishihara Color Screen */}
                <div className="bg-white rounded-3xl border border-blue-200 p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                        Test 3 of 3 • Color Vision
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        Ishihara Mosaic Plate Screening
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 font-bold">
                      Plate {ishiharaStep + 1}/3
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    What number do you perceive inside this dot mosaic?
                  </p>

                  <div className={`h-40 rounded-2xl flex items-center justify-center font-black text-6xl tracking-widest border border-slate-300 shadow-inner select-none ${ishiharaPlates[ishiharaStep].color}`}>
                    {ishiharaPlates[ishiharaStep].plateNumber}
                  </div>

                  <form onSubmit={handleIshiharaSubmit} className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Type number..."
                      value={ishiharaInput}
                      onChange={(e) => setIshiharaInput(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl btn-primary-blue text-xs font-bold cursor-pointer"
                    >
                      Verify
                    </button>
                  </form>

                  {ishiharaResult && (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900">
                      {ishiharaResult}
                    </div>
                  )}
                </div>

                {/* 20-20-20 Digital Screen Ergonomics Companion */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-sky-400" />
                    <h3 className="font-bold text-base">20-20-20 Screen Relief Companion</h3>
                  </div>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Every 20 minutes spent on a screen, look at an object 20 feet away for 20 seconds. This prevents ciliary muscle spasm and dry eyes.
                  </p>

                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md text-center space-y-2">
                    <p className="text-3xl font-black font-mono tracking-widest text-sky-300">
                      {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                    </p>
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="px-4 py-1.5 rounded-xl bg-white text-blue-950 font-bold text-xs cursor-pointer shadow-md"
                    >
                      {timerRunning ? 'Pause Session' : 'Start 20-Min Screen Timer'}
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center transition cursor-pointer"
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
          <div className="bg-white rounded-3xl border border-blue-200 p-8 sm:p-12 shadow-xl space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold inline-block">
                Zero Cost • 100% Free Session
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
                Comprehensive In-Clinic Vision Lab Exam
              </h2>
              <p className="text-slate-600 text-sm">
                Get your eyes tested by Dr. S. Anand (M.Optom, FIACLE) with German computerized instrumentation at our Kallakurichi clinic. Free with any frame consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">3D Auto-Refractometry</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Objective corneal curvature and refractive index within 3 seconds.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Digital Slit-Lamp Exam</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Microscopic anterior eye health inspection for cornea and tear film stability.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Non-Contact Glaucoma NCT Check</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Painless intraocular pressure measurement for ocular hypertension screening.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Trial Lens Verification</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Walk comfortably in actual trial lenses before your prescription is cut.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-4">
              <h3 className="font-bold text-slate-900 text-base">
                Ready to secure your free Vision Lab appointment?
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl btn-primary-blue text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  Select Date & Time (Clinic)
                </button>
                <a
                  href="tel:+919443228456"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
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
