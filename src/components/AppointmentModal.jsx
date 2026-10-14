import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import {
  X,
  Calendar,
  CheckCircle2,
  MapPin,
  Printer
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
    return '2026-10-14';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-sky-100 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sky-100 flex items-center justify-between bg-gradient-to-r from-sky-50/70 via-white to-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Book Eye Exam at Anand Opticals
              </h3>
              <p className="text-xs text-slate-500">
                Salem Main Road, Kallakurichi • Dr. S. Anand (FIACLE)
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!confirmedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Select */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Select Eye Care Service:
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-medium"
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
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Appointment Date:
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Time Slot:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-medium"
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
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Patient Full Name: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Ramanathan"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Mobile Number (for SMS & WhatsApp Token): *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94432 00000"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Age:
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="110"
                    placeholder="e.g. 42"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Gender:
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-medium"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Symptoms or Remarks (Optional):
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g., headache while reading, blurred streetlights at night, computer eye dryness"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md glow-glacier mt-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirm Appointment & Generate Token
              </button>
            </form>
          ) : (
            /* Confirmation Slip */
            <div className="bg-sky-50/50 rounded-2xl p-6 border-2 border-sky-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">
                  Appointment Confirmed!
                </span>
                <h4 className="text-2xl font-black text-slate-900 font-heading mt-1">
                  Token: {confirmedBooking.tokenNumber}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reference ID: <span className="font-mono text-slate-800 font-bold">{confirmedBooking.id}</span>
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-sky-100 text-xs text-left space-y-2 shadow-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Slot:</span>
                  <span className="font-bold text-sky-700">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="text-slate-800 font-medium">{confirmedBooking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="text-slate-800 font-medium">{BUSINESS_INFO.doctor.name} ({BUSINESS_INFO.doctor.qualifications})</span>
                </div>
                <div className="pt-2 border-t border-slate-100 text-slate-600 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>Shop No. 14, Salem Main Road (Opp. Govt Hospital, Near New Bus Stand), Kallakurichi.</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-200 shadow-2xs"
                >
                  <Printer className="w-4 h-4 text-sky-600" /> Print Token Slip
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-xs"
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
