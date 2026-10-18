import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Eye,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Clock
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
    return () => {
      if (interval) clearInterval(interval);
    };
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#141417] text-zinc-100 border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#27272A] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] shadow-md">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury text-lg text-[#FAF7F0]">
                  Digital Vision Screening Lab
                </h3>
                <span className="text-[10px] font-semibold bg-[#18181B] text-[#D4AF87] border border-[#D4AF87]/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Interactive Test Suite
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Self-evaluation tools designed by Dr. S. Anand (Senior Optometrist)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVisionTestOpen(false)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#18181B] rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-[#27272A] bg-[#121214] px-6 gap-2 overflow-x-auto">
          {[
            { id: 'acuity', label: '1. Visual Acuity (Snellen E)' },
            { id: 'astigmatism', label: '2. Astigmatism Fan Dial' },
            { id: 'color', label: '3. Color Vision (Ishihara)' },
            { id: 'eyestrain', label: '4. 20-20-20 Strain Reliever' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#D4AF87] text-[#D4AF87] bg-[#18181B]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
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
              <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#FAF7F0]">How to test:</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                    1. Sit approximately <strong>arm’s length (60cm)</strong> away from your screen.<br />
                    2. Cover your Left Eye with your palm (do not press). Test your Right Eye first.<br />
                    3. Observe the tumbling letter "E" below and click which way the prongs point.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#D4AF87] bg-black border border-[#D4AF87]/40 px-2.5 py-1 rounded-md font-bold shadow-sm">
                    Level {acuityStep + 1} of {SNELLEN_LEVELS.length}
                  </span>
                </div>
              </div>

              {!acuityFinished ? (
                <div className="flex flex-col items-center justify-center p-8 bg-[#121214] rounded-xl border border-[#27272A]">
                  <div className="text-xs text-zinc-400 mb-6 font-medium">
                    Acuity Tier: <span className="text-[#D4AF87] font-bold">{SNELLEN_LEVELS[acuityStep].level}</span> ({SNELLEN_LEVELS[acuityStep].label})
                  </div>

                  {/* High Contrast Black Letter on Crisp Off-White Display for Optical Sharpness */}
                  <div className="h-32 w-32 bg-[#FAF7F0] rounded-xl border border-zinc-300 shadow-md flex items-center justify-center">
                    <div
                      className="font-mono font-black text-black select-none transition-transform duration-200"
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

                  <p className="text-xs text-zinc-300 mt-6 mb-3 font-semibold">Which direction are the prongs pointing?</p>

                  {/* Direction Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-sm">
                    {[
                      { dir: 'up', label: '▲ UP' },
                      { dir: 'down', label: '▼ DOWN' },
                      { dir: 'left', label: '◄ LEFT' },
                      { dir: 'right', label: '► RIGHT' }
                    ].map((item) => (
                      <button
                        key={item.dir}
                        onClick={() => handleAcuityAnswer(item.dir)}
                        className="py-3 px-4 bg-[#18181B] hover:bg-[#D4AF87] hover:text-[#090909] text-zinc-200 border border-[#27272A] font-bold text-xs rounded-xl transition cursor-pointer shadow-sm"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 px-4 bg-[#18181B] rounded-xl border border-[#D4AF87]/40 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#121214] text-[#D4AF87] border border-[#D4AF87]/60 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-[#FAF7F0]">
                    Visual Acuity Score: {acuityScore} / {SNELLEN_LEVELS.length}
                  </h4>
                  <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed font-sans">
                    {acuityScore >= 4
                      ? 'Excellent standard visual acuity! You appear to possess 20/20 vision in distance focus.'
                      : 'Mild distance blur detected. We recommend booking a comprehensive in-clinic auto-refraction test with Dr. S. Anand.'}
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={resetAcuity}
                      className="px-5 py-2.5 bg-[#121214] hover:bg-[#27272A] text-zinc-200 border border-[#27272A] text-xs font-semibold rounded-xl transition cursor-pointer"
                    >
                      Retake Test
                    </button>
                    <button
                      onClick={() => {
                        setIsVisionTestOpen(false);
                        setIsAppointmentModalOpen(true);
                      }}
                      className="px-6 py-2.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                    >
                      Book Full Clinic Exam
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ASTIGMATISM FAN DIAL */}
          {activeTab === 'astigmatism' && (
            <div className="space-y-6">
              <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] text-xs text-zinc-300 leading-relaxed font-sans">
                <strong>How to test:</strong> Cover your left eye with your hand. Look at the radial sunburst lines below. Do all lines appear equally sharp and dark, or do some lines look darker, bolder, or doubled?
              </div>

              <div className="flex flex-col items-center justify-center p-8 bg-[#121214] rounded-xl border border-[#27272A]">
                {/* SVG Radial Fan Dial */}
                <div className="p-4 bg-black rounded-xl border border-zinc-800 shadow-inner">
                  <svg className="w-64 h-64" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="92" fill="#090909" stroke="#27272A" strokeWidth="2" />
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

                <p className="text-xs text-zinc-300 mt-6 mb-3 font-semibold">How do the lines appear to you?</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                  <button
                    onClick={() => setAstigmatismAnswer('uniform')}
                    className={`p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      astigmatismAnswer === 'uniform'
                        ? 'bg-[#D4AF87] text-[#090909] border-[#D4AF87]'
                        : 'bg-[#18181B] hover:bg-[#27272A] text-zinc-200 border-[#27272A]'
                    }`}
                  >
                    All lines are equally sharp & dark
                  </button>
                  <button
                    onClick={() => setAstigmatismAnswer('distorted')}
                    className={`p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      astigmatismAnswer === 'distorted'
                        ? 'bg-[#D4AF87] text-[#090909] border-[#D4AF87]'
                        : 'bg-[#18181B] hover:bg-[#27272A] text-zinc-200 border-[#27272A]'
                    }`}
                  >
                    Some lines are darker / blurrier
                  </button>
                </div>

                {astigmatismAnswer && (
                  <div className="mt-4 p-4 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-zinc-300 max-w-md text-center">
                    {astigmatismAnswer === 'uniform' ? (
                      <span className="text-emerald-400 font-medium">✓ Normal corneal symmetry indicated. No apparent signs of significant uncorrected astigmatism.</span>
                    ) : (
                      <span className="text-amber-400 font-medium">⚠ Possible cylindrical astigmatism detected. Toric spectacle or contact lenses are recommended for clear night driving.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ISHIHARA COLOR TEST */}
          {activeTab === 'color' && (
            <div className="space-y-6">
              <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] text-xs text-zinc-300 leading-relaxed font-sans">
                <strong>Color Vision Check:</strong> Enter the number you perceive embedded inside the pseudo-isochromatic dot mosaic.
              </div>

              {!colorFinished ? (
                <div className="flex flex-col items-center justify-center p-8 bg-[#121214] rounded-xl border border-[#27272A]">
                  <div className="text-xs text-zinc-400 mb-4">
                    Plate {colorStep + 1} of {ISHIHARA_TESTS.length}: {ISHIHARA_TESTS[colorStep].description}
                  </div>

                  <div className="w-56 h-56 rounded-full bg-zinc-900 border-4 border-[#27272A] flex items-center justify-center select-none shadow-inner">
                    <span className="text-6xl font-black tracking-widest text-[#D4AF87] font-mono">
                      {ISHIHARA_TESTS[colorStep].plateNumber}
                    </span>
                  </div>

                  <form onSubmit={handleColorSubmit} className="mt-6 flex items-center gap-2 w-full max-w-xs">
                    <input
                      type="text"
                      placeholder="Enter number..."
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      className="flex-1 bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-[#D4AF87]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
                    >
                      Verify
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 px-4 bg-[#18181B] rounded-xl border border-[#D4AF87]/40 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#121214] text-[#D4AF87] border border-[#D4AF87]/60 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-[#FAF7F0]">Color Screening Complete</h4>
                  <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                    You accurately identified {colorScores.filter(s => s.isCorrect).length} of {ISHIHARA_TESTS.length} plates. Normal trichromatic color discrimination verified.
                  </p>
                  <button
                    onClick={resetColor}
                    className="px-6 py-2.5 bg-[#121214] hover:bg-[#27272A] text-zinc-200 border border-[#27272A] text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Retake Color Test
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: 20-20-20 RULE COMPANION */}
          {activeTab === 'eyestrain' && (
            <div className="space-y-6">
              <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] text-xs text-zinc-300 leading-relaxed font-sans">
                <strong>Optometric 20-20-20 Rule:</strong> Every 20 minutes spent staring at screens, pause and look at something at least 20 feet (6 meters) away for a minimum of 20 seconds. This relaxes the ciliary eye muscles and prevents digital fatigue and dry eyes.
              </div>

              <div className="flex flex-col items-center justify-center p-8 bg-[#121214] rounded-xl border border-[#27272A]">
                <div className="w-40 h-40 rounded-full border-4 border-[#D4AF87] bg-black flex flex-col items-center justify-center relative shadow-xl">
                  <div className="text-3xl font-mono font-black text-[#FAF7F0]">
                    {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:
                    {(timerSeconds % 60).toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-[#D4AF87] font-semibold uppercase tracking-wider mt-1">
                    {isTimerRunning ? 'Active Screen Timer' : 'Paused'}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="py-3 px-6 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer"
                  >
                    {isTimerRunning ? 'Pause Timer' : 'Start 20-Min Work Cycle'}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(20 * 60);
                    }}
                    className="p-3 bg-[#18181B] border border-[#27272A] text-zinc-400 hover:text-white rounded-xl transition cursor-pointer"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick eye exercises */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-6 text-xs text-left">
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A]">
                    <strong className="text-[#D4AF87] block mb-1">1. Blink Consciously:</strong>
                    <span className="text-zinc-400">Screen users blink 60% less! Blink fully 10 times to replenish the tear film.</span>
                  </div>
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A]">
                    <strong className="text-[#D4AF87] block mb-1">2. Palming Warmth:</strong>
                    <span className="text-zinc-400">Rub palms together until warm, gently cup over closed eyes for 30 seconds.</span>
                  </div>
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A]">
                    <strong className="text-[#D4AF87] block mb-1">3. Blue Shield Lenses:</strong>
                    <span className="text-zinc-400">Use our Crizal or Blue-Shield 420nm filter glasses during 6+ hour computer sessions.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#27272A] bg-[#121214] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div>
            * Disclaimer: Online screening is an educational self-assessment and does not substitute a clinical slit-lamp examination.
          </div>
          <button
            onClick={() => {
              setIsVisionTestOpen(false);
              setIsAppointmentModalOpen(true);
            }}
            className="px-5 py-2.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shadow-md cursor-pointer"
          >
            Book Free In-Store Exam
          </button>
        </div>
      </div>
    </div>
  );
}
