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
  Calendar
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12 animate-fade-in bg-slate-50/50">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-700">
          Reach Us in Kallakurichi
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
          Visit Our Clinic & Showroom
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Located centrally on Salem Main Road opposite Government Headquarters Hospital
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-sky-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
          <div>
            <h3 className="text-lg font-black text-slate-900 font-heading">
              {BUSINESS_INFO.name}
            </h3>
            <p className="text-xs text-sky-700 font-bold mt-0.5">
              {BUSINESS_INFO.nameTamil}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-2xs">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Clinic Address:</span>
                <span className="text-slate-600 leading-relaxed font-normal">
                  {BUSINESS_INFO.address.line1},<br />
                  {BUSINESS_INFO.address.line2},<br />
                  {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} - {BUSINESS_INFO.address.pincode}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-2xs">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Direct Line & WhatsApp:</span>
                <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="text-sky-700 font-bold hover:underline block font-mono text-sm">
                  {BUSINESS_INFO.contact.phone}
                </a>
                <span className="text-slate-500 text-[11px]">Landline: {BUSINESS_INFO.contact.landline}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-2xs">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Consultation Hours:</span>
                {BUSINESS_INFO.hours.map((h) => (
                  <div key={h.days} className="text-slate-600">
                    <strong>{h.days}:</strong> {h.time}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <a
              href={`https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=Hello%20Anand%20Opticals,%20I%20have%20an%20enquiry%20regarding%20eyewear`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
            </a>

            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md glow-glacier"
            >
              <Calendar className="w-4 h-4" /> Book Eye Examination Slot
            </button>
          </div>
        </div>

        {/* Enquiry Form & Map Placeholder (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-6 md:p-8 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
              Send us a Message or Prescription Query
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our optical team will review your requirement and call you back
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Message Sent!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you. Dr. S. Anand and the optical staff at Kallakurichi will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl hover:bg-slate-200 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. R. Karthikeyan"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 94432 00000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Your Message or Eye Problem</label>
                  <textarea
                    rows="3"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="e.g. Need progressive glasses for reading and computer work. Can I get frames fitted in 1 hour?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md glow-glacier"
                >
                  <Send className="w-4 h-4" /> Send Enquiry to Clinic
                </button>
              </form>
            )}
          </div>

          {/* Kallakurichi Location Map Visual Card */}
          <div className="bg-white border border-sky-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-2xs">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Find Us in Kallakurichi</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Salem Main Road (Opposite Govt Hospital, near New Bus Stand)
                </p>
              </div>
            </div>

            <a
              href={BUSINESS_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold rounded-xl border border-sky-200 transition flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
            >
              Open Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
