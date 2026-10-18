import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import {
  X,
  Calendar,
  CheckCircle2,
  MapPin,
  Printer,
  Sparkles
} from 'lucide-react';

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:15 AM', '12:00 PM',
  '04:30 PM', '05:15 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

export default function AppointmentModal() {
  const {
    isAppointmentModalOpen,
    setIsAppointmentModalOpen,
    bookAppointment,
    activeAppointmentService,
    showToast
  } = useStore();

  const [service, setService] = useState(activeAppointmentService || 'Computerized Eye Testing');
  const [date, setDate] = useState(() => {
    return '2026-10-18';
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [patientName, setPatientName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [symptoms, setSymptoms] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isAppointmentModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !mobile.trim()) {
      showToast('Please fill in your Name and Mobile Number.', 'info');
      return;
    }

    const newApt = bookAppointment({
      patientName: patientName.trim(),
      mobile: mobile.trim(),
      age: parseInt(age) || 35,
      gender,
      service,
      date,
      timeSlot,
      symptoms: symptoms.trim() || 'General eye examination'
    });

    setConfirmedBooking(newApt);
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    setIsAppointmentModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#141417] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] text-zinc-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#27272A] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87] shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block">
                FLAGSHIP CLINIC APPOINTMENT
              </span>
              <h3 className="font-serif-luxury text-lg text-[#FAF7F0]">
                Book Eye Exam at Anand Opticals
              </h3>
              <p className="text-xs text-zinc-400">
                Salem Main Road, Kallakurichi • Dr. S. Anand (FIACLE)
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#18181B] rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!confirmedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Select */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Select Eye Care Service:
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-[#D4AF87]"
                >
                  <option value="Computerized Eye Testing">Computerized Objective Eye Testing (Refractometer)</option>
                  <option value="Digital Progressive Lens Consultation">Digital Progressive Lens Consultation (No-Line)</option>
                  <option value="Computer Vision Strain & Blue Light Exam">Computer Vision Strain & Blue Light Exam</option>
                  <option value="Diabetic Eye & Cataract Screening">Diabetic Eye & Cataract Screening</option>
                  <option value="Pediatric Myopia Eye Check">Pediatric Myopia Eye Check (Kids)</option>
                  <option value="Specialty Toric Contact Lens Trial">Specialty Contact Lens Fitting Trial</option>
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Appointment Date:
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-[#D4AF87] font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Time Slot:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-[#D4AF87]"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Patient Full Name: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Ramanathan"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Mobile Number (for SMS & WhatsApp Token): *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94432 00000"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-[#D4AF87] font-mono"
                  />
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Age:
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="110"
                    placeholder="e.g. 42"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Gender:
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-[#D4AF87]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Symptoms or Remarks (Optional):
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g., eye fatigue while reading, night glare while driving, digital screen strain"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-3 text-zinc-100 text-xs focus:outline-none focus:border-[#D4AF87] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 shadow-lg mt-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirm Appointment & Generate Token
              </button>
            </form>
          ) : (
            /* Confirmation Slip */
            <div className="bg-[#18181B] rounded-xl p-6 border border-[#D4AF87]/40 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#121214] text-[#D4AF87] border border-[#D4AF87]/60 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF87] font-semibold">
                  APPOINTMENT CONFIRMED
                </span>
                <h4 className="font-serif-luxury text-2xl text-[#FAF7F0] mt-1">
                  Token: {confirmedBooking.tokenNumber}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Reference ID: <span className="font-mono text-[#D4AF87]">{confirmedBooking.id}</span>
                </p>
              </div>

              <div className="bg-[#121214] rounded-xl p-4 border border-[#27272A] text-xs text-left space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Patient:</span>
                  <span className="font-semibold text-[#FAF7F0]">{confirmedBooking.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Date & Slot:</span>
                  <span className="font-semibold text-[#D4AF87]">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Service:</span>
                  <span className="text-zinc-200">{confirmedBooking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Doctor:</span>
                  <span className="text-zinc-200">{BUSINESS_INFO.doctor.name} ({BUSINESS_INFO.doctor.qualifications})</span>
                </div>
                <div className="pt-2 border-t border-[#27272A] text-zinc-400 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF87] shrink-0 mt-0.5" />
                  <span>Shop No. 14, Salem Main Road (Opp. Govt Hospital, Near New Bus Stand), Kallakurichi.</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-[#121214] hover:bg-[#27272A] text-zinc-200 text-xs font-semibold rounded-xl flex items-center gap-2 border border-[#27272A] transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#D4AF87]" /> Print Token Slip
                </button>
                <button
                  onClick={handleClose}
                  className="px-8 py-2.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
