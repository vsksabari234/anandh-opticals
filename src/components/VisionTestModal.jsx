import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Eye,
  CheckCircle2,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

const SNELLEN_LEVELS = [
  { level: '20/100', sizePx: 56, label: 'Large Letter (Baseline)' },
  { level: '20/70', sizePx: 42, label: 'Medium-Large' },
  { level: '20/50', sizePx: 32, label: 'Standard Screen' },
  { level: '20/30', sizePx: 22, label: 'Driving Standard' },
  { level: '20/20', sizePx: 16, label: 'Normal 20/20 Sharp Vision' }
];

const E_DIRECTIONS = ['right', 'down', 'left', 'up'];

const ISHIHARA_TESTS = [
  { id: 1, plateNumber: '12', description: 'Demonstration Plate (Everyone sees 12)', expected: '12' },
  { id: 2, plateNumber: '74', description: 'Red-Green screening plate', expected: '74' },
  { id: 3, plateNumber: '6', description: 'Protan / Deutan discrimination', expected: '6' }
];

export default function VisionTestModal() {
  const { isVisionTestOpen, setIsVisionTestOpen, setIsAppointmentModalOpen, showToast } = useStore();

  const [activeTab, setActiveTab] = useState('acuity'); // acuity, astigmatism, color, eyestrain
  
  // Acuity Test State
  const [acuityStep, setAcuityStep] = useState(0);
  const [currentDirection, setCurrentDirection] = useState('right');
  const [acuityScore, setAcuityScore] = useState(0);
  const [acuityFinished, setAcuityFinished] = useState(false);

  // Astigmatism State
  const [astigmatismAnswer, setAstigmatismAnswer] = useState(null);

  // Color Vision State
  const [colorStep, setColorStep] = useState(0);
  const [colorInput, setColorInput] = useState('');
  const [colorScores, setColorScores] = useState([]);
  const [colorFinished, setColorFinished] = useState(false);

  // 20-20-20 Timer State
  const [timerSeconds, setTimerSeconds] = useState(20 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      showToast('Time for 20-20-20 rule! Look 20 feet away for 20 seconds. 🌿');
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, showToast]);

  const nextSnellenQuestion = () => {
    const randomDir = E_DIRECTIONS[Math.floor(Math.random() * E_DIRECTIONS.length)];
    setCurrentDirection(randomDir);
  };

  const handleAcuityAnswer = (direction) => {
    const isCorrect = direction === currentDirection;
    if (isCorrect) {
      setAcuityScore(prev => prev + 1);
    }

    if (acuityStep < SNELLEN_LEVELS.length - 1) {
      setAcuityStep(prev => prev + 1);
      nextSnellenQuestion();
    } else {
      setAcuityFinished(true);
    }
  };

  const resetAcuity = () => {
    setAcuityStep(0);
    setAcuityScore(0);
    setAcuityFinished(false);
    nextSnellenQuestion();
  };

  const handleColorSubmit = (e) => {
    e.preventDefault();
    const currentTest = ISHIHARA_TESTS[colorStep];
    const isCorrect = colorInput.trim() === currentTest.expected;
    setColorScores(prev => [...prev, { plate: currentTest.expected, entered: colorInput.trim(), isCorrect }]);
    setColorInput('');

    if (colorStep < ISHIHARA_TESTS.length - 1) {
      setColorStep(prev => prev + 1);
    } else {
      setColorFinished(true);
    }
  };

  const resetColor = () => {
    setColorStep(0);
    setColorScores([]);
    setColorFinished(false);
    setColorInput('');
  };

  if (!isVisionTestOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-sky-100 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sky-100 flex items-center justify-between bg-gradient-to-r from-sky-50/70 via-white to-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Digital Vision Screening Lab
                </h3>
                <span className="text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                  Interactive Test Suite
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Self-evaluation tools designed by Dr. S. Anand (Senior Optometrist)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVisionTestOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-sky-100 bg-slate-50/60 px-6 gap-2 overflow-x-auto">
          {[
            { id: 'acuity', label: '1. Visual Acuity (Snellen E)' },
            { id: 'astigmatism', label: '2. Astigmatism Fan Dial' },
            { id: 'color', label: '3. Color Vision (Ishihara)' },
            { id: 'eyestrain', label: '4. 20-20-20 Strain Reliever' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-sky-600 text-sky-800 bg-sky-50'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: VISUAL ACUITY */}
          {activeTab === 'acuity' && (
            <div className="space-y-6">
              <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">How to test:</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    1. Sit approximately <strong>arm’s length (60cm)</strong> away from your screen.<br />
                    2. Cover your Left Eye with your palm (do not press). Test your Right Eye first.<br />
                    3. Observe the tumbling letter "E" below and click which way the prongs point.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-sky-800 bg-white border border-sky-200 px-2.5 py-1 rounded-md font-bold shadow-2xs">
                    Level {acuityStep + 1} of {SNELLEN_LEVELS.length}
                  </span>
                </div>
              </div>

              {!acuityFinished ? (
                <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-sky-100">
                  <div className="text-xs text-slate-500 mb-6 font-medium">
                    Acuity Tier: <span className="text-sky-700 font-bold">{SNELLEN_LEVELS[acuityStep].level}</span> ({SNELLEN_LEVELS[acuityStep].label})
                  </div>

                  {/* High Contrast Black Letter on Pristine White for Optical Sharpness */}
                  <div className="h-32 w-32 bg-white rounded-2xl border border-sky-100 shadow-sm flex items-center justify-center">
                    <div
                      className="font-mono font-black text-slate-950 select-none transition-transform duration-200"
                      style={{
                        fontSize: `${SNELLEN_LEVELS[acuityStep].sizePx}px`,
                        lineHeight: 1,
                        transform:
                          currentDirection === 'up'
                            ? 'rotate(-90deg)'
                            : currentDirection === 'down'
                            ? 'rotate(90deg)'
                            : currentDirection === 'left'
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)'
                      }}
                    >
                      E
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-6 mb-3 font-semibold">Which direction are the prongs pointing?</p>

                  {/* Direction Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-sm">
                    {[
                      { dir: 'up', label: '▲ UP' },
                      { dir: 'down', label: '▼ DOWN' },
                      { dir: 'left', label: '◀ LEFT' },
                      { dir: 'right', label: '▶ RIGHT' }
                    ].map((btn) => (
                      <button
                        key={btn.dir}
                        onClick={() => handleAcuityAnswer(btn.dir)}
                        className="py-3 px-4 bg-white hover:bg-sky-600 text-slate-800 hover:text-white font-bold text-xs rounded-xl border border-slate-200 transition shadow-2xs"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-sky-50/50 rounded-2xl p-6 border-2 border-sky-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 font-heading">
                    Acuity Screening Complete
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    You scored <strong>{acuityScore} / {SNELLEN_LEVELS.length}</strong> correct.
                    {acuityScore >= 4
                      ? ' Your distance visual acuity appears sharp on this screen calibration.'
                      : ' You may have mild refractive error or screen fatigue. A clinical autorefractor exam is advised.'}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <button
                      onClick={resetAcuity}
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retest Left Eye
                    </button>
                    <button
                      onClick={() => {
                        setIsVisionTestOpen(false);
                        setIsAppointmentModalOpen(true);
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md glow-glacier"
                    >
                      Book Full Exam at Anand Opticals <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ASTIGMATISM FAN */}
          {activeTab === 'astigmatism' && (
            <div className="space-y-6">
              <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 text-xs text-slate-600 leading-relaxed font-medium">
                <strong>Astigmatism Dial Test:</strong> Look at the center fixation cross of the sunburst wheel below. Are all lines equally sharp and black, or do some spokes appear significantly darker or bolder than the rest?
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-sky-100">
                {/* SVG Sunburst Dial on White */}
                <svg viewBox="0 0 240 240" className="w-64 h-64 select-none bg-white rounded-full p-2 border border-slate-200 shadow-sm">
                  <circle cx="120" cy="120" r="110" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
                  {Array.from({ length: 18 }).map((_, i) => {
                    const angle = i * 10;
                    return (
                      <line
                        key={i}
                        x1="120"
                        y1="120"
                        x2={120 + 95 * Math.cos((angle * Math.PI) / 180)}
                        y2={120 + 95 * Math.sin((angle * Math.PI) / 180)}
                        stroke="#0f172a"
                        strokeWidth="2.5"
                      />
                    );
                  })}
                  <circle cx="120" cy="120" r="7" fill="#0284c7" />
                  <circle cx="120" cy="120" r="2" fill="#ffffff" />
                </svg>

                <p className="text-xs text-slate-600 mt-4 mb-3 font-semibold">How do the radiant spokes appear to your eye?</p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAstigmatismAnswer('uniform')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition ${
                      astigmatismAnswer === 'uniform'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    All Lines Equal & Uniform
                  </button>

                  <button
                    onClick={() => setAstigmatismAnswer('uneven')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition ${
                      astigmatismAnswer === 'uneven'
                        ? 'bg-amber-50 border-amber-400 text-amber-800 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Some Lines Look Bolder / Blurred
                  </button>
                </div>

                {astigmatismAnswer && (
                  <div className="mt-4 p-4 rounded-xl max-w-md w-full text-xs text-center border animate-fade-in bg-white border-slate-200 shadow-xs">
                    {astigmatismAnswer === 'uniform' ? (
                      <div className="text-emerald-700 font-medium">
                        ✓ <strong>Normal Meridian Symmetry:</strong> No pronounced sign of uncorrected astigmatism on this screening.
                      </div>
                    ) : (
                      <div className="text-amber-800 font-medium">
                        ⚠️ <strong>Possible Astigmatism (Cylinder):</strong> An uneven meridian pattern suggests the cornea may be slightly curved like a rugby ball instead of a football. Dr. S. Anand can measure your exact axis with a keratometer.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: COLOR VISION */}
          {activeTab === 'color' && (
            <div className="space-y-6">
              <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 text-xs text-slate-600 leading-relaxed font-medium">
                <strong>Ishihara Pseudoisochromatic Color Plate:</strong> Identify the hidden number disguised in the mosaic dot pattern.
              </div>

              {!colorFinished ? (
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-sky-100">
                  <div className="text-xs text-slate-500 mb-4 font-bold">
                    Plate {colorStep + 1} of {ISHIHARA_TESTS.length}: {ISHIHARA_TESTS[colorStep].description}
                  </div>

                  {/* Simulated Ishihara Dot Plate */}
                  <div className="relative w-56 h-56 rounded-full overflow-hidden bg-emerald-900 border-4 border-white flex items-center justify-center shadow-md">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:8px_8px]" />
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fb7185_2px,transparent_2px)] [background-size:12px_12px]" />
                    <span className="font-heading font-black text-6xl tracking-wider text-rose-300 drop-shadow-md select-none">
                      {ISHIHARA_TESTS[colorStep].plateNumber}
                    </span>
                  </div>

                  <form onSubmit={handleColorSubmit} className="mt-6 flex items-center gap-2">
                    <input
                      type="text"
                      maxLength="3"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      placeholder="Number"
                      className="w-32 bg-white border border-slate-200 text-slate-900 text-center py-2.5 rounded-xl font-black tracking-widest text-lg focus:outline-none focus:border-sky-500 shadow-2xs"
                    />
                    <button
                      type="submit"
                      disabled={!colorInput.trim()}
                      className="py-2.5 px-5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow-xs"
                    >
                      Next Plate
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-sky-50/50 rounded-2xl p-6 border-2 border-sky-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 font-heading">
                    Color Discrimination Result
                  </h4>
                  <p className="text-xs text-slate-600">
                    You identified all {colorScores.filter(s => s.isCorrect).length} of {ISHIHARA_TESTS.length} plates accurately. Red-Green spectrum receptors appear fully responsive.
                  </p>
                  <button
                    onClick={resetColor}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition shadow-2xs"
                  >
                    Retest Color Plates
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: 20-20-20 RULE COMPANION */}
          {activeTab === 'eyestrain' && (
            <div className="space-y-6">
              <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 text-xs text-slate-600 leading-relaxed font-medium">
                <strong>Optometric 20-20-20 Rule for Screen Workers:</strong> Every 20 minutes spent staring at screens, pause and look at something at least 20 feet (6 meters) away for a minimum of 20 seconds. This relaxes the ciliary eye muscles and prevents digital fatigue and dry eyes.
              </div>

              <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-sky-100">
                <div className="w-40 h-40 rounded-full border-4 border-sky-400 bg-white flex flex-col items-center justify-center relative shadow-md">
                  <div className="text-3xl font-mono font-black text-slate-900">
                    {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:
                    {(timerSeconds % 60).toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-sky-700 font-bold uppercase tracking-wider mt-1">
                    {isTimerRunning ? 'Active Screen Timer' : 'Paused'}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="py-2.5 px-6 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    {isTimerRunning ? 'Pause Timer' : 'Start 20-Min Work Cycle'}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(20 * 60);
                    }}
                    className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-xl transition shadow-2xs"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick eye exercises */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-6 text-xs text-left">
                  <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
                    <strong className="text-sky-700 block mb-1">1. Blink Consciously:</strong>
                    <span className="text-slate-600">Screen users blink 60% less! Blink fully 10 times to spread natural lipid tears.</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                    <strong className="text-amber-800 block mb-1">2. Palming Warmth:</strong>
                    <span className="text-slate-600">Rub palms together until warm, gently cup over closed eyes for 30 seconds.</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
                    <strong className="text-sky-700 block mb-1">3. Blue Shield Lenses:</strong>
                    <span className="text-slate-600">Use our Crizal or Blue-Shield 420nm filter glasses during 6+ hour computer sessions.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sky-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            * Disclaimer: Online screening is an educational self-assessment and does not substitute a clinical slit-lamp examination.
          </div>
          <button
            onClick={() => {
              setIsVisionTestOpen(false);
              setIsAppointmentModalOpen(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            Book Free In-Store Exam
          </button>
        </div>
      </div>
    </div>
  );
}
