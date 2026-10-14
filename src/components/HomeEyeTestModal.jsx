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
  const { isHomeEyeTestOpen, setIsHomeEyeTestOpen, bookHomeEyeTest, isGoldMember } = useStore();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-8">
        {/* Top Header Banner with Glacier Blue & Gold */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-amber-600 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-black tracking-wide mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            LENSKART-STYLE DOORSTEP SERVICE
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black">
            Free Eye Test @ Your Doorstep
          </h2>
          <p className="text-sky-100 text-xs sm:text-sm mt-1">
            Certified optometrist visits your home in Kallakurichi with 100+ trending frames & computerized vision equipment.
          </p>

          {isGoldMember && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs font-black shadow-md">
              👑 Gold VIP Member: Free Priority Slot & Zero Visit Fee!
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isBooked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-heading">
                Doorstep Visit Confirmed!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Our certified optometrist field unit has been dispatched for{' '}
                <span className="font-bold text-sky-800">{confirmedBooking?.date}</span> during{' '}
                <span className="font-bold text-sky-800">{confirmedBooking?.slot}</span>.
              </p>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking Ref:</span>
                  <span className="font-mono font-bold text-slate-800">{confirmedBooking?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold text-slate-800">{confirmedBooking?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[200px]">{confirmedBooking?.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Frames Box:</span>
                  <span className="font-bold text-sky-700">100+ Optical & Sun Frames Included</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 text-white font-bold text-sm shadow-md"
                >
                  Done & Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Feature Perks Pills */}
              <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100 text-[11px] text-center text-slate-700">
                <div className="p-2 bg-sky-50/70 rounded-xl border border-sky-100">
                  <Glasses className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                  <span className="font-bold block">100+ Frames</span>
                  <span className="text-[10px] text-slate-500">Try in living room</span>
                </div>
                <div className="p-2 bg-amber-50/70 rounded-xl border border-amber-100">
                  <ShieldCheck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span className="font-bold block">Certified Doctor</span>
                  <span className="text-[10px] text-slate-500">12-Step eye check</span>
                </div>
                <div className="p-2 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <Sparkles className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="font-bold block">Zero Obligation</span>
                  <span className="text-[10px] text-slate-500">Buy only if loved</span>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98400 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Home Address in Kallakurichi / Nearby *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="House / Street, Landmark, Area (e.g. Near Bus Stand, Salem Main Rd)"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Time Window *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={formData.slot}
                      onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  What frames should our optometrist bring?
                </label>
                <select
                  value={formData.framesRequested}
                  onChange={(e) => setFormData({ ...formData, framesRequested: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-700 to-amber-600 hover:from-sky-500 hover:to-amber-500 text-white font-extrabold text-sm transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Confirm 100% Free Doorstep Eye Test
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
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
