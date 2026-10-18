import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/business';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function ContactPage() {
  const { setIsAppointmentModalOpen, showToast } = useStore();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      showToast('Please fill in your name and phone number', 'info');
      return;
    }
    setSubmitted(true);
    showToast('Enquiry received! Dr. Anand Opticals will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      {/* Top Banner matching Home & Shop */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-[#D4AF87]/40 text-[#D4AF87] text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Anand Opticals Flagship Boutiques
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#FAF7F0] tracking-tight">
            Visit Our Clinic & Showroom
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto font-sans">
            Salem Main Road, Kallakurichi • Advanced Ophthalmic Testing & Designer Eyewear Boutique
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 bg-[#121214] border border-[#27272A] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block mb-1">
                BOUTIQUE & CLINIC
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#FAF7F0]">
                {BUSINESS_INFO.name}
              </h3>
              <p className="text-xs text-[#D4AF87] font-medium mt-0.5">
                {BUSINESS_INFO.nameTamil}
              </p>
            </div>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] shrink-0 shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#FAF7F0] block mb-1">Flagship Address:</span>
                  <span className="text-zinc-400 leading-relaxed font-normal">
                    {BUSINESS_INFO.address.line1},<br />
                    {BUSINESS_INFO.address.line2},<br />
                    {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} - {BUSINESS_INFO.address.pincode}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] shrink-0 shadow-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#FAF7F0] block mb-1">Direct Line & WhatsApp:</span>
                  <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="text-[#D4AF87] font-bold hover:underline block font-mono text-sm">
                    {BUSINESS_INFO.contact.phone}
                  </a>
                  <span className="text-zinc-500 text-[11px]">Landline: {BUSINESS_INFO.contact.landline}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] shrink-0 shadow-md">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#FAF7F0] block mb-1">Consultation Hours:</span>
                  {BUSINESS_INFO.hours.map((h) => (
                    <div key={h.days} className="text-zinc-400">
                      <strong className="text-zinc-300">{h.days}:</strong> {h.time}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#27272A] space-y-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hello%20Anand%20Opticals,%20I%20have%20an%20enquiry%20regarding%20eyewear`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setIsAppointmentModalOpen(true)}
                className="w-full py-3 px-4 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Book Eye Examination Slot
              </button>
            </div>
          </div>

          {/* Enquiry Form & Map Placeholder (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 md:p-8 shadow-xl">
              <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block mb-1">
                GET IN TOUCH
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#FAF7F0] mb-1">
                Send us a Message or Prescription Query
              </h3>
              <p className="text-xs text-zinc-400 mb-6 font-sans">
                Our optical specialist team will review your requirement and reach out within 2 hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#18181B] text-[#D4AF87] border border-[#D4AF87]/60 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-[#FAF7F0]">Message Sent Successfully</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Thank you. Dr. S. Anand and the optical team at Kallakurichi will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#18181B] border border-[#27272A] text-[#D4AF87] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#27272A] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-300 font-medium block mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. R. Karthikeyan"
                        className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87] transition"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-300 font-medium block mb-1.5">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 94432 00000"
                        className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87] font-mono transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-300 font-medium block mb-1.5">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87] transition"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-300 font-medium block mb-1.5">Your Message or Eye Problem</label>
                    <textarea
                      rows="4"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. Need progressive lenses with anti-reflective coating. Can I get custom frames fitted today?"
                      className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87] transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Send Enquiry to Clinic
                  </button>
                </form>
              )}
            </div>

            {/* Location Map Visual Card */}
            <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base text-[#FAF7F0]">Find Us in Kallakurichi</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Salem Main Road (Opposite Govt Hospital, near New Bus Stand)
                  </p>
                </div>
              </div>

              <a
                href={BUSINESS_INFO.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#18181B] hover:bg-[#27272A] text-[#D4AF87] text-xs font-semibold rounded-xl border border-[#D4AF87]/40 transition flex items-center gap-2 whitespace-nowrap shadow-md"
              >
                Open Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
