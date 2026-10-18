import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const shoppingLinks = [
    { label: 'Luxury Eyeglasses', to: '/catalog?category=Eyeglasses' },
    { label: 'Designer Sunglasses', to: '/catalog?category=Sunglasses' },
    { label: 'Contact Lenses', to: '/catalog?category=Contact+Lenses' },
    { label: 'Prescription Optics', to: '/catalog?category=Prescription+Lenses' },
    { label: 'Computer & Blue Cut', to: '/catalog?category=Computer+Glasses' },
    { label: 'Eyewear Accessories', to: '/catalog?category=Accessories' }
  ];

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop Marketplace', to: '/catalog' },
    { label: 'Ophthalmic Clinic', to: '/#clinic' },
    { label: 'Doctor Profile', to: '/#doctor' },
    { label: 'Vision Lab', to: '/vision-lab' },
    { label: 'Customer Account', to: '/account' },
    { label: 'Store Admin', to: '/admin' }
  ];

  const customerCareLinks = [
    { label: 'Book Eye Examination', to: '/#appointment' },
    { label: 'Track Order Status', to: '/account' },
    { label: '14-Day Free Returns', to: '/contact' },
    { label: '1-Year Frame Warranty', to: '/contact' },
    { label: 'Prescription Upload Guide', to: '/catalog' },
    { label: '3D Virtual Try-On', to: '/catalog' }
  ];

  return (
    <footer className="w-full bg-[#090909] text-zinc-300 border-t border-[#27272A]/80 transition-colors">
      {/* Upper Newsletter & VIP Club Banner */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]/60 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="text-[#D4AF87] uppercase text-[10px] tracking-[0.25em] font-semibold flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> VIP PRIVILEGES
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F0]">
              Join the Anand Connoisseurs Club
            </h3>
            <p className="text-xs text-zinc-400 max-w-lg">
              Receive exclusive private invitations to limited-edition eyewear drops, bespoke trunk shows, and priority clinic slots.
            </p>
          </div>

          {/* Newsletter Input Form */}
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#18181B] border border-[#D4AF87] px-5 py-3 rounded-full text-xs text-[#FAF7F0] animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF87]" />
                <span>Thank you for subscribing to Anand Opticals VIP updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2.5 rounded-full bg-[#18181B] border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider transition cursor-pointer shrink-0 shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Chennai Location (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-8 h-4 text-[#D4AF87] group-hover:scale-105 transition-transform"
                    viewBox="0 0 48 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="36" cy="12" r="9" />
                    <path d="M21 12 C23 9.5, 25 9.5, 27 12" />
                    <path d="M3 12 L0 10" />
                    <path d="M45 12 L48 10" />
                  </svg>
                  <span className="font-serif-luxury text-lg tracking-[0.22em] text-[#D4AF87] font-semibold leading-none">
                    ANAND
                  </span>
                </div>
                <span className="text-[8px] uppercase tracking-[0.38em] text-zinc-400 font-sans leading-none pl-10 mt-0.5">
                  OPTICALS
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed pr-4">
              Purveyors of master-crafted ophthalmic frames, aerograde Japanese beta-titanium, Italian Mazzucchelli acetate, and comprehensive clinical eye diagnostics under the medical directorship of Dr. Anitha Ravi.
            </p>

            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF87] shrink-0 mt-0.5" />
                <span>No. 142 Cathedral Road & 2nd Avenue Anna Nagar, Chennai, Tamil Nadu 600086</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF87] shrink-0" />
                <span>+91 44 2811 4455 / +91 98421 88920</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF87] shrink-0" />
                <span>concierge@anandopticals.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF87] shrink-0" />
                <span>Mon – Sat: 9:30 AM – 9:00 PM | Sun: 10:00 AM – 7:00 PM</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#18181B] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#D4AF87] hover:border-[#D4AF87] transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-currentColor stroke-[1.75]" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#18181B] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#D4AF87] hover:border-[#D4AF87] transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-currentColor stroke-[1.75]" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#18181B] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#D4AF87] hover:border-[#D4AF87] transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-currentColor stroke-[1.75]" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#18181B] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#D4AF87] hover:border-[#D4AF87] transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-currentColor stroke-[1.75]" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shopping Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF87]">
              Shopping
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {shoppingLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-[#FAF7F0] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-zinc-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF87]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-[#FAF7F0] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-zinc-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Care & Trust (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF87]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {customerCareLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-[#FAF7F0] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-zinc-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="bg-[#18181B] p-3 rounded-xl border border-zinc-800 space-y-1.5 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF7F0]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF87]" />
                <span>100% Authenticity Guaranteed</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Authorized dealer for Ray-Ban, Oakley, Titan Eye+, Carrera, Vogue, and Zeiss Ophthalmic lenses.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#27272A]/80 bg-[#060606] py-6 px-4 sm:px-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            © 2026 Anand Opticals & Eye Care Clinic. All Rights Reserved. Reg. No: TN/MED/OPT-2026.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400 text-[11px]">
            <Link to="/contact" className="hover:text-[#D4AF87] transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-[#D4AF87] transition">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#D4AF87] transition">Prescription Compliance</Link>
            <Link to="/admin" className="hover:text-[#D4AF87] transition">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
