import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Eye,
  Activity,
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  ArrowRight
} from 'lucide-react';

export default function VisionLabPage() {
  const { setIsVisionTestOpen, setIsAppointmentModalOpen } = useStore();

  const eyeConditions = [
    {
      title: 'Myopia (Short-Sightedness / கிட்டப்பார்வை)',
      desc: 'Distant streetlights, TV subtitles, and road signboards appear blurred while near text is clear. Eyeball is slightly longer than normal.',
      solution: 'Concave (-) Spherical Lenses or Blue-Shield 1.60 High-Index'
    },
    {
      title: 'Astigmatism (Cylinder / சிதறல் பார்வை)',
      desc: 'Uneven curvature of the cornea causes light to focus at multiple points. Objects appear stretched, doubled, or have halos at night.',
      solution: 'Toric Cylindrical Lenses with precise axis verification'
    },
    {
      title: 'Presbyopia (Age-Related Near Blur / வெள்ளெழுத்து)',
      desc: 'Usually begins around age 40 when natural crystalline lens stiffens. Holding mobile or book at arm’s length to read small print.',
      solution: 'Digital Freeform No-Line Progressive Lenses for smooth distance & reading'
    },
    {
      title: 'Digital Eye Strain & Dry Eye Syndrome',
      desc: '6+ hours staring at computer, tablet, or phone screens results in burning, redness, headaches, and fluctuating vision.',
      solution: '20-20-20 ergonomics + 420nm Blue-Cut Anti-Reflective Lenses'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12 animate-fade-in bg-slate-50/50">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Activity className="w-3.5 h-3.5 text-sky-600" />
          Clinical Screening Center
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading">
          Interactive Digital Vision Lab
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Test your visual acuity, check for astigmatism symmetry, evaluate color perception, and learn healthy screen habits — calibrated by Senior Optometrist Dr. S. Anand.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsVisionTestOpen(true)}
            className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-md glow-glacier"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Launch Interactive Test Suite
          </button>

          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition flex items-center gap-2 shadow-xs"
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            Book Full In-Clinic Exam
          </button>
        </div>
      </div>

      {/* 4 Interactive Test Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Visual Acuity Test',
            sub: 'Snellen Tumbling E Chart',
            desc: 'Check if you have 20/20 vision or distance blur. Includes distance calibration guides.',
            icon: Eye,
            badge: 'Essential'
          },
          {
            title: 'Astigmatism Dial',
            sub: 'Radial Fan Starburst',
            desc: 'Detects whether corneal distortion causes specific angles to look darker or distorted.',
            icon: Activity,
            badge: 'Corneal'
          },
          {
            title: 'Ishihara Color Test',
            sub: 'Red-Green Discrimination',
            desc: 'Screen for Daltonism / color deficiency using pseudoisochromatic mosaic number plates.',
            icon: Sparkles,
            badge: 'Photoreceptors'
          },
          {
            title: '20-20-20 Companion',
            sub: 'Digital Strain Relief',
            desc: 'Interactive 20-minute timer with audio cues and conscious blinking guides for screen workers.',
            icon: Clock,
            badge: 'Ergonomic'
          }
        ].map((test) => {
          const Icon = test.icon;
          return (
            <div
              key={test.title}
              onClick={() => setIsVisionTestOpen(true)}
              className="bg-white border border-sky-100 hover:border-amber-300 rounded-3xl p-6 cursor-pointer transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-105 transition shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {test.badge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-700 transition">
                  {test.title}
                </h3>
                <span className="text-xs text-sky-700 font-bold block mt-0.5">{test.sub}</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{test.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-bold text-sky-700 flex items-center gap-1">
                Start Test <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Clinical Refractive Conditions Explainer */}
      <div className="bg-white border border-sky-100 rounded-3xl p-8 md:p-10 space-y-6 shadow-sm">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-700">
            Optometric Knowledge
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
            Understanding Common Eye Conditions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            How optical lenses correct light convergence onto the retina
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eyeConditions.map((cond) => (
            <div key={cond.title} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900">{cond.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{cond.desc}</p>
              <div className="pt-2 text-xs text-sky-800 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Lens Solution: {cond.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
