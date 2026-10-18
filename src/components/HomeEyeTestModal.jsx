import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Home,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Sparkles,
  X,
  ShieldCheck,
  Glasses
} from 'lucide-react';

export default function HomeEyeTestModal() {
  const { isHomeEyeTestOpen, setIsHomeEyeTestOpen, bookHomeEyeTest } = useStore();

  const [formData, setFormData] = useState(() => ({
    name: '',
    phone: '',
    address: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    slot: '10:00 AM - 12:00 PM',
    framesRequested: 'Curated 100+ Frames (Men, Women, Computer Blu)'
  }));

  const [isBooked, setIsBooked] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isHomeEyeTestOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) return;

    const booking = bookHomeEyeTest(formData);
    setConfirmedBooking(booking);
    setIsBooked(true);
  };

  const handleClose = () => {
    setIsHomeEyeTestOpen(false);
    setIsBooked(false);
    setConfirmedBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#141417] text-zinc-100 rounded-2xl shadow-2xl border border-[#27272A] overflow-hidden my-8">
        {/* Top Header Banner */}
        <div className="bg-[#121214] border-b border-[#27272A] p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#18181B] text-zinc-400 hover:text-white hover:bg-[#27272A] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF87]/40 text-[#D4AF87] text-[10px] font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            DOORSTEP LUXURY OPTICAL CARE
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F0]">
            Complimentary Doorstep Eye Test
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Certified optometrist visits your home in Kallakurichi with 100+ luxury frames & German refraction equipment.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isBooked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#18181B] text-[#D4AF87] border border-[#D4AF87]/60 mx-auto flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#FAF7F0]">
                Doorstep Visit Confirmed!
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Our certified optometrist field unit has been booked for{' '}
                <span className="font-bold text-[#D4AF87]">{confirmedBooking?.date}</span> during{' '}
                <span className="font-bold text-[#D4AF87]">{confirmedBooking?.slot}</span>.
              </p>

              <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Booking Ref:</span>
                  <span className="font-mono font-bold text-[#D4AF87]">{confirmedBooking?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Patient:</span>
                  <span className="font-semibold text-[#FAF7F0]">{confirmedBooking?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Location:</span>
                  <span className="font-semibold text-zinc-200 truncate max-w-[200px]">{confirmedBooking?.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Frames Box:</span>
                  <span className="font-semibold text-[#D4AF87]">100+ Optical & Sun Frames Included</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-xl bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
                >
                  Done & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Feature Perks Pills */}
              <div className="grid grid-cols-3 gap-2 pb-2 border-b border-[#27272A] text-[11px] text-center text-zinc-300">
                <div className="p-2.5 bg-[#18181B] rounded-xl border border-[#27272A]">
                  <Glasses className="w-4 h-4 text-[#D4AF87] mx-auto mb-1" />
                  <span className="font-bold block text-zinc-100">100+ Frames</span>
                  <span className="text-[10px] text-zinc-500">Try in living room</span>
                </div>
                <div className="p-2.5 bg-[#18181B] rounded-xl border border-[#27272A]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF87] mx-auto mb-1" />
                  <span className="font-bold block text-zinc-100">Certified Doctor</span>
                  <span className="text-[10px] text-zinc-500">12-Step eye check</span>
                </div>
                <div className="p-2.5 bg-[#18181B] rounded-xl border border-[#27272A]">
                  <Sparkles className="w-4 h-4 text-[#D4AF87] mx-auto mb-1" />
                  <span className="font-bold block text-zinc-100">Zero Obligation</span>
                  <span className="text-[10px] text-zinc-500">Buy only if loved</span>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98400 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Home Address in Kallakurichi / Nearby *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="House / Street, Landmark, Area (e.g. Near Bus Stand, Salem Main Rd)"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#18181B] border border-[#27272A] text-sm text-zinc-100 focus:outline-none focus:border-[#D4AF87] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Time Window *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <select
                      value={formData.slot}
                      onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#18181B] border border-[#27272A] text-sm text-zinc-100 focus:outline-none focus:border-[#D4AF87]"
                    >
                      <option>10:00 AM - 12:00 PM (Morning)</option>
                      <option>01:00 PM - 03:00 PM (Afternoon)</option>
                      <option>04:00 PM - 06:00 PM (Evening)</option>
                      <option>07:00 PM - 08:30 PM (Night)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Frame Preferences */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  What frames should our optometrist bring?
                </label>
                <select
                  value={formData.framesRequested}
                  onChange={(e) => setFormData({ ...formData, framesRequested: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-zinc-100 focus:outline-none focus:border-[#D4AF87]"
                >
                  <option>Curated 100+ Frames (Men, Women, Computer Blu)</option>
                  <option>Men’s Executive Titanium & Acetate</option>
                  <option>Women’s Cat-Eye & High Fashion</option>
                  <option>Computer Zero-Power Blue Cut Glasses</option>
                  <option>Kids Flexible TR90 Eyewear</option>
                  <option>Polarized Sunglasses & Driving Glasses</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  Confirm Free Doorstep Eye Test
                </button>
                <p className="text-[11px] text-center text-zinc-500 mt-2">
                  No purchase necessary • Certified optometrist with sanitized lenses • Free trial in home
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
