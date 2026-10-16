import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  Heart,
  User,
  Building2,
  Cpu,
  Phone,
  MapPin,
  Clock,
  Play,
  Compass,
  CheckCircle2,
  Glasses,
  Disc,
  Droplets
} from 'lucide-react';

// Visual Assets exactly matching Reference Image
import heroVideo from '../assets/gemini_generated_video_046b9ff6.mp4';
import showroomImg from '../assets/images/optical_showroom_1791949566865.jpg';
import doctorPortraitImg from '../assets/images/doctor_portrait_1791949570094.jpg';
import macroEyeImg from '../assets/images/macro_human_eye_iris_1792123622728.jpg';
import goldSunglassesTableImg from '../assets/images/luxury_gold_sunglasses_table_1792123622864.jpg';
import menCategoryImg from '../assets/images/model_man_square_1791949598792.jpg';
import womenCategoryImg from '../assets/images/model_female_round_1791949598824.jpg';
import unisexCategoryImg from '../assets/images/frame_geometric_gold_1791952519461.jpg';

export default function HomePage() {
  const navigate = useNavigate();
  const {
    bookAppointment
  } = useStore();

  // Slide state for hero
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;

  // Appointment Form state
  const [bookingData, setBookingData] = useState({
    fullName: '',
    phone: '',
    date: '',
    time: '11:00 AM'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.fullName.trim() || !bookingData.phone.trim() || !bookingData.date) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setFormError('');

    // Book via StoreContext
    if (bookAppointment) {
      bookAppointment({
        patientName: bookingData.fullName,
        phone: bookingData.phone,
        preferredDate: bookingData.date,
        preferredTime: bookingData.time,
        service: 'Comprehensive Eye Examination',
        doctor: 'Dr. Anitha Ravi',
        branch: 'Chennai / Kallakurichi'
      });
    }

    setFormSubmitted(true);
  };

  const openWhatsApp = () => {
    const phone = (BUSINESS_INFO.contact?.whatsapp || '+919443223456').replace('+', '');
    const text = encodeURIComponent(
      `Hello Anand Opticals! I would like to confirm my eye test appointment for ${bookingData.fullName || 'myself'}.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const navigateToCategory = (gender) => {
    navigate(`/catalog?gender=${gender.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 overflow-hidden font-sans selection:bg-[#D4AF87] selection:text-black">
      {/* =========================================================================
          SECTION 2: CINEMATIC HERO
          Large full-width eyewear advertisement featuring woman in gold-framed glasses.
          Headline "See the World Differently" on left, script accent on right.
      ========================================================================== */}
      <section className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex items-center bg-[#090909] overflow-hidden">
        {/* Layer 1: Single continuous full-width background video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
            <source src="/gemini_generated_video_046b9ff6.mp4" type="video/mp4" />
          </video>
          {/* Layer 2: Subtle dark overlay above video ensuring high-contrast legibility */}
          <div className="absolute inset-0 bg-[#090909]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/75 to-transparent w-full md:w-3/4"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full flex flex-col justify-between min-h-[85vh]">
          {/* Top spacer for navbar balance */}
          <div className="hidden sm:block"></div>

          {/* Main Hero Split Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
            {/* Left Headline & Content */}
            <div className="lg:col-span-7 pt-8 sm:pt-0">
              <span className="text-[#D4AF87] uppercase text-xs sm:text-sm font-semibold tracking-[0.25em] block">
                ANAND OPTICALS
              </span>

              <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal leading-[1.05] tracking-tight text-[#FAF7F0] mt-4 mb-6">
                See the<br />
                World Differently
              </h1>

              {/* Subtitle with dividers */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300 font-sans tracking-wide mb-8">
                <span>Premium Eyewear</span>
                <span className="text-zinc-600">|</span>
                <span>Advanced Eye Care</span>
                <span className="text-zinc-600">|</span>
                <span>Timeless Style</span>
              </div>

              {/* Watch Our Story Circular Action */}
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => scrollTo('#clinic')}
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border border-[#D4AF87]/80 flex items-center justify-center bg-[#D4AF87]/15 group-hover:bg-[#D4AF87] transition-all duration-300">
                    <Play className="w-4 h-4 fill-[#D4AF87] group-hover:fill-[#090909] text-[#D4AF87] group-hover:text-[#090909] ml-0.5 transition-colors" />
                  </div>
                  <span className="text-sm font-sans tracking-wide text-zinc-200 group-hover:text-white transition-colors">
                    Watch Our Story
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side: Cursive Script Accent */}
            <div className="lg:col-span-5 flex justify-end lg:pr-8">
              <div className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#D4AF87] leading-tight select-none rotate-[-6deg] drop-shadow-md">
                Clear Vision<br />
                <span className="ml-8 sm:ml-12">Brighter Future</span>
              </div>
            </div>
          </div>

          {/* Bottom Hero Bar: Scroll Down Indicator & Slide Pagination */}
          <div className="flex items-center justify-between pt-8 border-t border-white/5">
            {/* Scroll Down */}
            <button
              type="button"
              onClick={() => scrollTo('#clinic')}
              className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
            >
              <div className="w-5 h-8 rounded-full border border-zinc-600 group-hover:border-[#D4AF87] flex items-start justify-center p-1 transition-colors">
                <div className="w-1 h-2 bg-[#D4AF87] rounded-full animate-bounce"></div>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-sans">
                Scroll Down
              </span>
            </button>

            {/* Slide Pagination & Arrows */}
            <div className="flex items-center gap-5 text-xs text-zinc-400 font-sans tracking-widest">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    onClick={() => setCurrentSlide(dot)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                      currentSlide === dot ? 'bg-[#D4AF87]' : 'bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 text-zinc-300">
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides))}
                  className="hover:text-[#D4AF87] transition-colors p-1"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <span className="tabular-nums font-mono text-[11px] text-zinc-300">
                  0{currentSlide} / 0{totalSlides}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1))}
                  className="hover:text-[#D4AF87] transition-colors p-1"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CLINIC INTRODUCTION ("More Than Just An Opticals Store")
          Dark text panel on the left, luxury optical showroom photography on the right,
          4 feature trust icons, and Explore Our Clinic action.
      ========================================================================== */}
      <section id="clinic" className="w-full bg-[#0d0d0d] py-20 lg:py-28 border-t border-[#27272A]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Text & 4 Trust Highlights */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[#D4AF87] uppercase text-xs font-semibold tracking-[0.25em]">
                  OUR CLINIC
                </span>

                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#FAF7F0] mt-3 mb-5">
                  More Than Just<br />
                  An Opticals Store
                </h2>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans mb-8">
                  At Anand Opticals, we believe clear vision is a better life. Our modern clinic combines advanced technology with personalized care to give you the best in eyewear and eye health.
                </p>

                <div className="mb-12">
                  <button
                    type="button"
                    onClick={() => scrollTo('#about')}
                    className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#D4AF87]/60 text-xs uppercase tracking-widest text-[#D4AF87] hover:bg-[#D4AF87] hover:text-[#090909] font-medium transition-all duration-300 group"
                  >
                    <span>Explore Our Clinic</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* 4 Feature Trust Icons in a 4-Column Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-zinc-800">
                <div className="flex flex-col items-start gap-2">
                  <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-[#161616] flex items-center justify-center text-[#D4AF87]">
                    <Building2 className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-xs text-zinc-300 font-sans leading-tight">
                    Modern<br />Infrastructure
                  </span>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-[#161616] flex items-center justify-center text-[#D4AF87]">
                    <Cpu className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-xs text-zinc-300 font-sans leading-tight">
                    Advanced<br />Technology
                  </span>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-[#161616] flex items-center justify-center text-[#D4AF87]">
                    <Eye className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-xs text-zinc-300 font-sans leading-tight">
                    Expert<br />Care
                  </span>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-[#161616] flex items-center justify-center text-[#D4AF87]">
                    <Heart className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-xs text-zinc-300 font-sans leading-tight">
                    Trusted<br />By Thousands
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Showroom Interior Image with Explore More badge */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                <img
                  src={showroomImg}
                  alt="Anand Opticals Modern Showroom & Clinic Lounge Interior"
                  className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Explore More Circular Badge on Bottom Right */}
                <button
                  type="button"
                  onClick={() => scrollTo('#services')}
                  className="absolute bottom-5 right-5 flex items-center gap-2 px-4 py-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-zinc-200 hover:text-white hover:border-[#D4AF87] transition-all cursor-pointer group"
                >
                  <Compass className="w-4 h-4 text-[#D4AF87] group-hover:rotate-45 transition-transform" />
                  <span className="text-xs tracking-wider font-sans">Explore More</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DOCTOR PROFILE ("Dr. Anitha Ravi" / Eye Care Specialist)
          Warm ivory background, doctor portrait on left with "Your Vision Our Priority"
          script badge, credentials & bio in center, 3 specialist cards & decorative script on right.
      ========================================================================== */}
      <section id="about" className="w-full bg-[#F6F3EC] text-[#18181B] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Doctor Portrait with Script Badge */}
            <div className="lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D5]">
                <img
                  src={doctorPortraitImg}
                  alt="Dr. Anitha Ravi, Consultant Ophthalmologist at Anand Opticals"
                  className="w-full h-[440px] sm:h-[480px] object-cover object-top"
                  referrerPolicy="no-referrer"
                />

                {/* Handwritten Script Badge Over Photo: "Your Vision Our Priority" */}
                <div className="absolute bottom-5 left-5 bg-[#090909]/90 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10 shadow-lg">
                  <span className="font-script text-2xl sm:text-3xl text-white tracking-wide">
                    Your Vision Our Priority
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: Doctor Bio & Credentials */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <span className="text-[#C5A070] uppercase text-xs font-semibold tracking-[0.2em] mb-2 block">
                MEET OUR EYE CARE SPECIALIST
              </span>

              <h2 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#18181B] leading-tight mb-2">
                Dr. Anitha Ravi
              </h2>

              <p className="text-xs font-medium uppercase tracking-wider text-zinc-600 mb-1">
                MBBS, DNB (Ophthalmology)
              </p>
              <p className="text-xs text-zinc-500 tracking-wide mb-5">
                Consultant Ophthalmologist
              </p>

              <p className="text-zinc-700 text-sm leading-relaxed mb-8">
                With a passion for clear vision and healthy eyes, Dr. Anitha Ravi brings years of experience in diagnosing and treating a wide range of eye conditions.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => scrollTo('#appointment')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-800 text-xs uppercase tracking-widest text-[#18181B] hover:bg-[#18181B] hover:text-white font-medium transition-all group"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: 3 Specialist Cards & Decorative Script */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
              {/* 3 Trust Cards */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E8E3D8] shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#F6F3EC] border border-[#D4AF87]/60 flex items-center justify-center text-[#C5A070] shrink-0">
                    <Eye className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-zinc-900">
                      Expert in Vision Correction
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E8E3D8] shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#F6F3EC] border border-[#D4AF87]/60 flex items-center justify-center text-[#C5A070] shrink-0">
                    <Heart className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-zinc-900">
                      Specialist in Eye Health & Wellness
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E8E3D8] shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#F6F3EC] border border-[#D4AF87]/60 flex items-center justify-center text-[#C5A070] shrink-0">
                    <User className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-zinc-900">
                      Patient-Centric Approach
                    </h3>
                  </div>
                </div>
              </div>

              {/* Decorative Handwritten Script */}
              <div className="pt-4 flex justify-end">
                <div className="font-script text-3xl sm:text-4xl text-[#18181B]/80 leading-tight select-none rotate-[-6deg]">
                  Healthy Eyes<br />
                  <span className="ml-4">Better Tomorrows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: EYE-CARE SERVICES ("Complete Eye Care Under One Roof")
          Dark cinematic background with macro eye iris on the right,
          4 dark glass cards: Eye Examination, Contact Lenses, Prescription Glasses, Lens Solutions.
      ========================================================================== */}
      <section id="services" className="relative w-full bg-[#090909] py-20 lg:py-28 overflow-hidden border-t border-[#27272A]/80">
        {/* Right side macro human eye background with subtle smooth fade */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-40 lg:opacity-60 pointer-events-none">
          <img
            src={macroEyeImg}
            alt="Human eye iris macro photography - Anand Opticals vision care"
            className="w-full h-full object-cover object-right"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Header & CTA */}
            <div className="lg:col-span-4">
              <span className="text-[#D4AF87] uppercase text-xs font-semibold tracking-[0.25em]">
                OUR SERVICES
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FAF7F0] mt-3 mb-4">
                Complete Eye Care<br />
                Under One Roof
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed font-sans mb-8">
                From routine checkups to advanced treatments, we're here for your vision at every step.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => scrollTo('#appointment')}
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#D4AF87]/60 text-xs uppercase tracking-widest text-[#D4AF87] hover:bg-[#D4AF87] hover:text-[#090909] font-medium transition-all group"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: 4 Dark Glass Service Cards */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Service 1: Eye Examination */}
                <div
                  onClick={() => scrollTo('#appointment')}
                  className="bg-[#161616]/85 backdrop-blur-md border border-white/10 hover:border-[#D4AF87]/70 rounded-2xl p-5 flex flex-col justify-between min-h-[220px] transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#202020] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] mb-4 group-hover:border-[#D4AF87] transition-colors">
                      <Eye className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <h3 className="font-serif-luxury text-base font-medium text-white mb-2">
                      Eye Examination
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Comprehensive eye tests with advanced technology.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-start text-[#D4AF87] group-hover:text-white transition-colors">
                    <div className="w-7 h-7 rounded-full border border-[#D4AF87]/50 flex items-center justify-center group-hover:border-white">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Service 2: Contact Lenses */}
                <div
                  onClick={() => scrollTo('#appointment')}
                  className="bg-[#161616]/85 backdrop-blur-md border border-white/10 hover:border-[#D4AF87]/70 rounded-2xl p-5 flex flex-col justify-between min-h-[220px] transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#202020] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] mb-4 group-hover:border-[#D4AF87] transition-colors">
                      <Disc className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <h3 className="font-serif-luxury text-base font-medium text-white mb-2">
                      Contact Lenses
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Comfortable & custom fitting lenses.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-start text-[#D4AF87] group-hover:text-white transition-colors">
                    <div className="w-7 h-7 rounded-full border border-[#D4AF87]/50 flex items-center justify-center group-hover:border-white">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Service 3: Prescription Glasses */}
                <div
                  onClick={() => navigate('/catalog')}
                  className="bg-[#161616]/85 backdrop-blur-md border border-white/10 hover:border-[#D4AF87]/70 rounded-2xl p-5 flex flex-col justify-between min-h-[220px] transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#202020] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] mb-4 group-hover:border-[#D4AF87] transition-colors">
                      <Glasses className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <h3 className="font-serif-luxury text-base font-medium text-white mb-2">
                      Prescription Glasses
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Stylish frames for every personality.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-start text-[#D4AF87] group-hover:text-white transition-colors">
                    <div className="w-7 h-7 rounded-full border border-[#D4AF87]/50 flex items-center justify-center group-hover:border-white">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Service 4: Lens Solutions */}
                <div
                  onClick={() => scrollTo('#appointment')}
                  className="bg-[#161616]/85 backdrop-blur-md border border-white/10 hover:border-[#D4AF87]/70 rounded-2xl p-5 flex flex-col justify-between min-h-[220px] transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#202020] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] mb-4 group-hover:border-[#D4AF87] transition-colors">
                      <Droplets className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <h3 className="font-serif-luxury text-base font-medium text-white mb-2">
                      Lens Solutions
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Single vision, progressive & more.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-start text-[#D4AF87] group-hover:text-white transition-colors">
                    <div className="w-7 h-7 rounded-full border border-[#D4AF87]/50 flex items-center justify-center group-hover:border-white">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: EYEWEAR COLLECTION ("Find Your Perfect Frame")
          Warm ivory background, hero gold sunglasses photo on travertine,
          collection text on left, and 3 category cards: Men, Women, Unisex on the right.
      ========================================================================== */}
      <section id="eyewear" className="w-full bg-[#F6F3EC] text-[#18181B] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Heading & Shop Now CTA */}
            <div className="lg:col-span-3">
              <span className="text-[#C5A070] uppercase text-xs font-semibold tracking-[0.2em] block mb-2">
                EYEWEAR COLLECTION
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#18181B] mb-4">
                Find Your<br />
                Perfect Frame
              </h2>

              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                Explore our premium collection of eyewear, crafted for comfort, style and clarity.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => navigate('/catalog')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-800 text-xs uppercase tracking-widest text-[#18181B] hover:bg-[#18181B] hover:text-white font-medium transition-all group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Center Column: Hero Gold Sunglasses on Travertine Pedestal */}
            <div className="lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-[#E5E0D5] group">
                <img
                  src={goldSunglassesTableImg}
                  alt="Luxury Gold Aviator Sunglasses - Anand Opticals Collection"
                  className="w-full h-[320px] sm:h-[360px] object-cover group-hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Circular Gold Badge Overlay: "Premium Frames" */}
                <div className="absolute top-4 right-4 bg-[#D4AF87]/90 text-[#090909] text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                  Premium Frames
                </div>

                {/* Arrow navigation indicators at bottom right */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm p-1 rounded-full text-white">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/40">
                    ←
                  </span>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/40">
                    →
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Category Cards (Men, Women, Unisex) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Category 1: Men */}
                <div
                  onClick={() => navigateToCategory('men')}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md h-[280px] sm:h-[320px]"
                >
                  <img
                    src={menCategoryImg}
                    alt="Men Eyewear Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif-luxury text-lg text-white font-medium">
                      Men
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#D4AF87] font-sans group-hover:text-white transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Category 2: Women */}
                <div
                  onClick={() => navigateToCategory('women')}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md h-[280px] sm:h-[320px]"
                >
                  <img
                    src={womenCategoryImg}
                    alt="Women Eyewear Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif-luxury text-lg text-white font-medium">
                      Women
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#D4AF87] font-sans group-hover:text-white transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Category 3: Unisex */}
                <div
                  onClick={() => navigateToCategory('unisex')}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md h-[280px] sm:h-[320px]"
                >
                  <img
                    src={unisexCategoryImg}
                    alt="Unisex Eyewear Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif-luxury text-lg text-white font-medium">
                      Unisex
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#D4AF87] font-sans group-hover:text-white transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: APPOINTMENT BOOKING ("BOOK YOUR APPOINTMENT")
          Dark luxury layout, clinic contact details on left, interactive 4-field form in center,
          and vertical gold emblem "Better Vision Better You" on the right.
      ========================================================================== */}
      <section id="appointment" className="w-full bg-[#0c0c0e] py-20 lg:py-28 border-t border-[#27272A]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Contact Info & Address */}
            <div className="lg:col-span-4">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#FAF7F0] mb-3 leading-tight">
                BOOK YOUR<br />
                APPOINTMENT
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-8">
                Take the first step towards better vision.
              </p>

              <div className="space-y-4 mb-8 text-xs sm:text-sm text-zinc-300 font-sans">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF87] shrink-0" />
                  <span>+91 44 1234 5678 / +91 94432 23456</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF87] shrink-0 mt-0.5" />
                  <span>
                    No. 12, 3rd Street, Anna Nagar, Chennai - 600040<br />
                    <span className="text-zinc-500 text-xs">Also at: Main Road, Kallakurichi - 606202</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF87] shrink-0" />
                  <span>Mon - Sat 9:00 AM - 8:00 PM</span>
                </div>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=Anand+Opticals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF87] hover:text-white transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Get Directions →</span>
                </a>
              </div>
            </div>

            {/* Center: Embedded 4-Field Booking Form matching Reference */}
            <div className="lg:col-span-6 bg-[#161616]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF87]/20 border border-[#D4AF87] flex items-center justify-center text-[#D4AF87] mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-white">
                    Appointment Requested!
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-md mx-auto">
                    Thank you, <span className="text-[#D4AF87] font-semibold">{bookingData.fullName}</span>. Our clinic desk will confirm your appointment for <span className="text-white">{bookingData.date}</span> at <span className="text-white">{bookingData.time}</span>.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Instant WhatsApp Confirmation
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs tracking-wider transition-colors"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                        Full Name <span className="text-[#D4AF87]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={bookingData.fullName}
                        onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                        className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D4AF87] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                        Phone Number <span className="text-[#D4AF87]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter your mobile number"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D4AF87] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                        Preferred Date <span className="text-[#D4AF87]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-[#D4AF87] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                        Preferred Time <span className="text-[#D4AF87]">*</span>
                      </label>
                      <select
                        value={bookingData.time}
                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                        className="w-full bg-[#0d0d0f] border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-[#D4AF87] transition-colors"
                      >
                        <option value="09:30 AM">09:30 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="07:30 PM">07:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg bg-[#D4AF87] hover:bg-[#c59f75] text-[#090909] font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-500 text-center font-sans">
                    We will confirm your appointment shortly via call or WhatsApp.
                  </p>
                </form>
              )}
            </div>

            {/* Right: Vertical Gold Emblem "Better Vision Better You" */}
            <div className="lg:col-span-2 hidden lg:flex items-center pl-4 border-l border-zinc-800">
              <div className="flex flex-col items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#D4AF87]/60 flex items-center justify-center text-[#D4AF87]">
                  <Eye className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="font-serif-luxury text-2xl tracking-[0.16em] text-[#D4AF87] flex flex-col leading-snug">
                  <span>Better</span>
                  <span>Vision</span>
                  <span>Better</span>
                  <span>You</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
