import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import GlassesIllustration from '../components/GlassesIllustration';
import {
  Stethoscope,
  Users,
  Clock,
  CheckCircle2,
  FileText,
  Search,
  Package,
  Calculator,
  Sliders,
  Printer,
  Lock,
  Unlock,
  Phone,
  Home,
  MapPin
} from 'lucide-react';

export default function DoctorPortal() {
  const {
    isDoctorAuth,
    setIsDoctorAuth,
    appointments,
    updateAppointmentStatus,
    patients,
    savePrescriptionToPatient,
    products,
    updateProductStock,
    showToast,
    homeEyeTestBookings
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState('queue'); // 'queue', 'home-tests', 'rxpad', 'patients', 'inventory', 'optical-calc'
  const [searchPatientQuery, setSearchPatientQuery] = useState('');

  // Digital Rx Form State
  const [rxForm, setRxForm] = useState({
    patientName: '',
    patientMobile: '',
    patientAge: '38',
    patientGender: 'Male',
    od: { sph: '-2.00', cyl: '-0.75', axis: '90', add: '+1.50', va: '6/6' },
    os: { sph: '-1.75', cyl: '-0.50', axis: '85', add: '+1.50', va: '6/6' },
    pd: '64 mm',
    diagnosis: 'Compound Myopic Astigmatism with Early Presbyopia',
    lensType: 'Digital Progressive Blue-Shield (1.61 Index)',
    doctorRemarks: 'Recommended 20-20-20 visual hygiene. Review in 12 months.'
  });

  // Optical Tool State (Transposition)
  const [transSph, setTransSph] = useState('-2.00');
  const [transCyl, setTransCyl] = useState('+1.25');
  const [transAxis, setTransAxis] = useState('45');

  // Vertex Distance State
  const [specPower, setSpecPower] = useState('-6.50');
  const [vertexMm, setVertexMm] = useState('12');

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pinInput.trim() === '1998' || pinInput.trim() === 'anand' || pinInput.trim() === 'doctor') {
      setIsDoctorAuth(true);
      showToast('Welcome, Dr. S. Anand (FIACLE)!');
    } else {
      // Allow instant access for demo
      setIsDoctorAuth(true);
      showToast('Welcome Dr. Anand! (Demo Access Unlocked)');
    }
  };

  const handleSavePrescription = (e) => {
    e.preventDefault();
    if (!rxForm.patientName) {
      showToast('Please enter patient name', 'info');
      return;
    }

    const created = savePrescriptionToPatient({
      patientName: rxForm.patientName,
      patientMobile: rxForm.patientMobile,
      patientAge: parseInt(rxForm.patientAge) || 35,
      patientGender: rxForm.patientGender,
      od: rxForm.od,
      os: rxForm.os,
      pd: rxForm.pd,
      diagnosis: rxForm.diagnosis,
      lensType: rxForm.lensType,
      doctorRemarks: rxForm.doctorRemarks
    });

    showToast(`Prescription ${created.id} saved to patient record!`);
  };

  const calculateTransposition = () => {
    const sph = parseFloat(transSph) || 0;
    const cyl = parseFloat(transCyl) || 0;
    let axis = parseInt(transAxis) || 0;

    const newSph = (sph + cyl).toFixed(2);
    const newCyl = (-cyl).toFixed(2);
    let newAxis = (axis + 90) % 180;
    if (newAxis === 0) newAxis = 180;

    return {
      sph: (parseFloat(newSph) > 0 ? `+${newSph}` : newSph),
      cyl: (parseFloat(newCyl) > 0 ? `+${newCyl}` : newCyl),
      axis: newAxis
    };
  };

  const calculateContactLensPower = () => {
    const fs = parseFloat(specPower) || 0;
    const d = (parseFloat(vertexMm) || 12) / 1000;
    if (Math.abs(fs) < 0.1) return '0.00';
    const fc = fs / (1 - d * fs);
    const sign = fc > 0 ? '+' : '';
    return `${sign}${fc.toFixed(2)} D`;
  };

  const transposed = calculateTransposition();
  const contactLensEquivalent = calculateContactLensPower();

  // If locked, show doctor access gate in luxury dark theme
  if (!isDoctorAuth) {
    return (
      <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#141417] border border-[#27272A] rounded-2xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#18181B] border border-[#D4AF87]/60 flex items-center justify-center text-[#D4AF87] mx-auto shadow-xl">
            <Stethoscope className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block mb-1">
              CLINICAL SUITE
            </span>
            <h2 className="font-serif-luxury text-2xl text-[#FAF7F0]">
              Dr. S. Anand Clinic Portal
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              Authorized clinical suite for Optometrists & Ophthalmic Dispels
            </p>
          </div>

          <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] text-left text-xs space-y-1">
            <div className="font-bold text-[#FAF7F0]">{BUSINESS_INFO.doctor.name}</div>
            <div className="text-[#D4AF87] font-semibold">{BUSINESS_INFO.doctor.qualifications}</div>
            <div className="text-zinc-500 font-mono">Reg No: {BUSINESS_INFO.doctor.regNo}</div>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1.5">
                Enter Doctor PIN or click Instant Unlock:
              </label>
              <input
                type="password"
                placeholder="PIN (Demo: 1998)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-[#18181B] border border-[#27272A] text-center text-lg font-mono tracking-widest text-[#D4AF87] py-2.5 rounded-xl focus:outline-none focus:border-[#D4AF87]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              Sign In as Dr. Anand
            </button>
          </form>

          <p className="text-[11px] text-zinc-500">
            Authorized clinic staff at Anand Opticals, Kallakurichi.
          </p>
        </div>
      </div>
    );
  }

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchPatientQuery.toLowerCase()) ||
    p.mobile.includes(searchPatientQuery) ||
    p.id.toLowerCase().includes(searchPatientQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      
      {/* Top Banner / Doctor Card */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/src/assets/images/doctor_portrait_1791949570094.jpg"
              alt={BUSINESS_INFO.doctor.name}
              className="w-16 h-16 rounded-2xl object-cover border border-[#D4AF87]/60 shadow-xl shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-xl sm:text-2xl text-[#FAF7F0]">
                  {BUSINESS_INFO.doctor.name}
                </span>
                <span className="text-[10px] font-semibold bg-[#18181B] text-[#D4AF87] border border-[#D4AF87]/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Online • Kallakurichi Clinic
                </span>
              </div>
              <p className="text-xs text-[#D4AF87] font-semibold mt-0.5">
                {BUSINESS_INFO.doctor.qualifications}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Registration No: <span className="font-mono text-zinc-300">{BUSINESS_INFO.doctor.regNo}</span> • {BUSINESS_INFO.doctor.experience}
              </p>
            </div>
          </div>

          {/* Doctor Quick Stats */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="bg-[#18181B] border border-[#27272A] px-4 py-2.5 rounded-xl text-center flex-1 md:flex-initial shadow-md">
              <span className="text-xl font-bold text-[#D4AF87] block font-mono">
                {appointments.length}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Queue Today</span>
            </div>

            <div className="bg-[#18181B] border border-[#27272A] px-4 py-2.5 rounded-xl text-center flex-1 md:flex-initial shadow-md">
              <span className="text-xl font-bold text-[#FAF7F0] block font-mono">
                {patients.length}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">EMR Records</span>
            </div>

            <div className="bg-[#18181B] border border-[#27272A] px-4 py-2.5 rounded-xl text-center flex-1 md:flex-initial shadow-md">
              <span className="text-xl font-bold text-amber-400 block font-mono">
                {products.filter(p => (p.stock || 0) < 10).length}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Low Stock</span>
            </div>

            <button
              onClick={() => {
                setIsDoctorAuth(false);
                showToast('Doctor session locked');
              }}
              className="p-3 bg-[#18181B] hover:bg-[#27272A] text-zinc-400 hover:text-white rounded-xl border border-[#27272A] transition shadow-md cursor-pointer"
              title="Lock Doctor Session"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-[#27272A] pb-3 overflow-x-auto">
          {[
            { id: 'queue', label: "Today's Patient Queue", icon: Clock, count: appointments.length },
            { id: 'home-tests', label: 'Doorstep Eye Tests', icon: Home, count: homeEyeTestBookings.length },
            { id: 'rxpad', label: 'Digital Rx Pad', icon: FileText, count: null },
            { id: 'patients', label: 'Patient EMR Records', icon: Users, count: patients.length },
            { id: 'inventory', label: 'Frame & Lens Stock', icon: Package, count: products.length },
            { id: 'optical-calc', label: 'Optical Tools & Transposition', icon: Calculator, count: null }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF87] text-[#090909] font-bold shadow-lg'
                    : 'bg-[#141417] border border-[#27272A] text-zinc-400 hover:text-white hover:bg-[#18181B]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== null && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-[#090909] text-[#D4AF87] font-bold' : 'bg-[#18181B] text-zinc-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PATIENT QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">
                  Live Clinic Patient Queue
                </h3>
                <p className="text-xs text-zinc-400">
                  Patients registered for examination at Kallakurichi clinic
                </p>
              </div>
              <div className="text-xs text-[#D4AF87] flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#D4AF87] animate-pulse" />
                Real-time synchronization
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-[#121214] border border-[#27272A] rounded-2xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition hover:border-[#D4AF87]/50 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#18181B] border border-[#D4AF87]/40 flex flex-col items-center justify-center shrink-0 shadow-md">
                      <span className="text-[10px] text-[#D4AF87] font-bold uppercase">Token</span>
                      <span className="text-lg font-bold text-[#FAF7F0] font-mono">{apt.tokenNumber}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif-luxury text-base text-[#FAF7F0]">{apt.patientName}</h4>
                        <span className="text-xs text-zinc-400">
                          ({apt.age}y • {apt.gender})
                        </span>
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          apt.status === 'Waiting'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                            : apt.status === 'In Examination'
                            ? 'bg-[#18181B] text-[#D4AF87] border-[#D4AF87]/40'
                            : apt.status === 'Dispensing'
                            ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                            : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>

                      <div className="text-xs text-zinc-400 mt-1 flex flex-wrap items-center gap-3">
                        <span className="text-[#D4AF87] font-semibold">{apt.service}</span>
                        <span className="text-zinc-600">•</span>
                        <span>Slot: {apt.timeSlot}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="font-mono">Ph: {apt.mobile}</span>
                      </div>

                      {apt.symptoms && (
                        <div className="text-xs text-zinc-300 mt-2 bg-[#18181B] px-3 py-1.5 rounded-lg border border-[#27272A] inline-block font-sans">
                          <strong>Chief Complaint:</strong> {apt.symptoms}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Queue Actions */}
                  <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-[#27272A]">
                    <button
                      onClick={() => {
                        setRxForm(prev => ({
                          ...prev,
                          patientName: apt.patientName,
                          patientMobile: apt.mobile,
                          patientAge: String(apt.age),
                          patientGender: apt.gender,
                          diagnosis: apt.symptoms || prev.diagnosis
                        }));
                        updateAppointmentStatus(apt.id, 'In Examination');
                        setActiveTab('rxpad');
                        showToast(`Loaded ${apt.patientName} into Rx Examination Pad`);
                      }}
                      className="px-4 py-2 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Stethoscope className="w-3.5 h-3.5" /> Start Exam in Rx Pad
                    </button>

                    <select
                      value={apt.status}
                      onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                      className="bg-[#18181B] border border-[#27272A] text-zinc-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF87]"
                    >
                      <option value="Waiting">Status: Waiting</option>
                      <option value="In Examination">Status: In Examination</option>
                      <option value="Dispensing">Status: Dispensing</option>
                      <option value="Completed">Status: Completed</option>
                      <option value="Cancelled">Status: Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DOORSTEP HOME EYE TESTS */}
        {activeTab === 'home-tests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">
                  Doorstep Eye Test Bookings
                </h3>
                <p className="text-xs text-zinc-400">
                  Home appointments dispatched to Kallakurichi certified field optometrist unit
                </p>
              </div>
              <span className="text-xs text-[#D4AF87] bg-[#18181B] px-3 py-1 rounded-full border border-[#D4AF87]/40 font-semibold uppercase tracking-wider">
                100+ Frames Box & Mobile Autorefractor
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {homeEyeTestBookings.map((het) => (
                <div
                  key={het.id}
                  className="bg-[#121214] border border-[#27272A] rounded-2xl p-5 shadow-xl hover:border-[#D4AF87]/50 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#18181B] text-[#D4AF87] border border-[#D4AF87]/40 flex items-center justify-center shrink-0 shadow-md">
                      <Home className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif-luxury text-base text-[#FAF7F0]">
                          {het.name}
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-[#18181B] text-[#D4AF87] px-2 py-0.5 rounded-md border border-[#27272A]">
                          {het.id}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#D4AF87]" />
                          <a href={`tel:${het.phone}`} className="hover:text-[#D4AF87] font-semibold text-zinc-200">
                            {het.phone}
                          </a>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-zinc-300 font-medium">
                          <MapPin className="w-3 h-3 text-[#D4AF87]" />
                          {het.address}
                        </span>
                      </div>

                      <div className="text-[11px] text-zinc-400 font-medium mt-1">
                        Scheduled for: <strong className="text-[#D4AF87]">{het.date}</strong> ({het.slot}) • Frames requested: {het.framesRequested}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                      {het.status}
                    </span>
                    <a
                      href={`https://wa.me/${het.phone?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(het.name)},%20this%20is%20Dr.%20Anand%20Opticals.%20Confirming%20your%20doorstep%20eye%20test%20for%20${het.date}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#18181B] hover:bg-[#27272A] text-[#D4AF87] border border-[#D4AF87]/40 transition shadow-md"
                    >
                      WhatsApp Patient
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DIGITAL RX PAD */}
        {activeTab === 'rxpad' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Rx Editor (7 cols) */}
            <div className="lg:col-span-7 bg-[#121214] border border-[#27272A] rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
                <div>
                  <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block mb-1">
                    CLINICAL REFRACTION
                  </span>
                  <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">
                    Ophthalmic Prescription Pad
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Fill refraction parameters (OD & OS) and generate signed Rx slip
                  </p>
                </div>
                <span className="text-xs text-[#D4AF87] font-mono font-bold bg-[#18181B] px-2.5 py-1 rounded-md border border-[#D4AF87]/40">
                  German Refraction Matrix
                </span>
              </div>

              <form onSubmit={handleSavePrescription} className="space-y-5">
                {/* Patient Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                      Patient Name: *
                    </label>
                    <input
                      type="text"
                      required
                      value={rxForm.patientName}
                      onChange={(e) => setRxForm({ ...rxForm, patientName: e.target.value })}
                      className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF87]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                      Mobile:
                    </label>
                    <input
                      type="tel"
                      value={rxForm.patientMobile}
                      onChange={(e) => setRxForm({ ...rxForm, patientMobile: e.target.value })}
                      className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF87] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Age:</label>
                      <input
                        type="number"
                        value={rxForm.patientAge}
                        onChange={(e) => setRxForm({ ...rxForm, patientAge: e.target.value })}
                        className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF87]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Gender:</label>
                      <select
                        value={rxForm.patientGender}
                        onChange={(e) => setRxForm({ ...rxForm, patientGender: e.target.value })}
                        className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-[#D4AF87]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Refraction Table Grid */}
                <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-3">
                  <span className="text-xs font-semibold text-zinc-200 block">
                    Refractive Measurement (Diopters):
                  </span>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-[#27272A] text-zinc-400 font-semibold">
                          <th className="py-2 px-2">Eye</th>
                          <th className="py-2 px-2">Sphere (Sph)</th>
                          <th className="py-2 px-2">Cylinder (Cyl)</th>
                          <th className="py-2 px-2">Axis (°)</th>
                          <th className="py-2 px-2">Near Add (+)</th>
                          <th className="py-2 px-2">Visual Acuity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272A] font-mono">
                        {/* OD - Right Eye */}
                        <tr>
                          <td className="py-2.5 px-2 font-bold text-[#D4AF87]">OD (Right)</td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.od.sph}
                              onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, sph: e.target.value } })}
                              className="w-16 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.od.cyl}
                              onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, cyl: e.target.value } })}
                              className="w-16 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.od.axis}
                              onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, axis: e.target.value } })}
                              className="w-14 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.od.add}
                              onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, add: e.target.value } })}
                              className="w-16 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.od.va}
                              onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, va: e.target.value } })}
                              className="w-16 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                        </tr>

                        {/* OS - Left Eye */}
                        <tr>
                          <td className="py-2.5 px-2 font-bold text-[#E5C9A6]">OS (Left)</td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.os.sph}
                              onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, sph: e.target.value } })}
                              className="w-16 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.os.cyl}
                              onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, cyl: e.target.value } })}
                              className="w-16 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.os.axis}
                              onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, axis: e.target.value } })}
                              className="w-14 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.os.add}
                              onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, add: e.target.value } })}
                              className="w-16 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={rxForm.os.va}
                              onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, va: e.target.value } })}
                              className="w-16 bg-[#121214] border border-[#27272A] text-zinc-100 text-center py-1 rounded-md"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-400 font-semibold">Pupillary Distance (PD):</span>
                      <input
                        type="text"
                        value={rxForm.pd}
                        onChange={(e) => setRxForm({ ...rxForm, pd: e.target.value })}
                        className="w-24 bg-[#121214] border border-[#27272A] text-zinc-100 text-xs px-2.5 py-1.5 rounded-md font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Diagnosis and Lens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                      Diagnosis / Clinical Impression:
                    </label>
                    <input
                      type="text"
                      value={rxForm.diagnosis}
                      onChange={(e) => setRxForm({ ...rxForm, diagnosis: e.target.value })}
                      className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF87]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                      Dispensed Lens Type:
                    </label>
                    <input
                      type="text"
                      value={rxForm.lensType}
                      onChange={(e) => setRxForm({ ...rxForm, lensType: e.target.value })}
                      className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF87]"
                    />
                  </div>
                </div>

                {/* Doctor remarks */}
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Doctor's Advice & Review Notes:
                  </label>
                  <textarea
                    rows="2"
                    value={rxForm.doctorRemarks}
                    onChange={(e) => setRxForm({ ...rxForm, doctorRemarks: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 rounded-xl p-3 text-xs focus:outline-none focus:border-[#D4AF87] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold rounded-xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Save & Update Patient EMR
                </button>
              </form>
            </div>

            {/* Rx Slip Preview (Right - 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#FAF7F0] border-2 border-[#D4AF87] rounded-2xl p-6 text-black text-xs shadow-2xl relative">
                {/* Slip Header with gold line */}
                <div className="border-b-2 border-[#D4AF87] pb-4 text-center">
                  <span className="text-base font-bold font-serif-luxury tracking-wider text-black block">
                    ANAND OPTICALS & EYE CLINIC
                  </span>
                  <span className="text-[10px] text-zinc-700 font-semibold">
                    Shop 14, Salem Main Road, Opp. Govt Hospital, Kallakurichi - 606202
                  </span>
                  <div className="text-[10px] text-zinc-600 mt-0.5">
                    Ph: +91 94432 28456 • Reg: TN-OPT-4182
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="flex justify-between items-center py-2.5 border-b border-zinc-200 text-[11px]">
                  <div>
                    <strong className="text-black">{BUSINESS_INFO.doctor.name}</strong>
                    <div className="text-[10px] text-zinc-700 font-medium">{BUSINESS_INFO.doctor.qualifications}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-600">Date: </span>
                    <span className="text-black font-mono font-bold">2026-10-18</span>
                  </div>
                </div>

                {/* Patient Meta */}
                <div className="py-2.5 border-b border-zinc-200 space-y-1">
                  <div className="flex justify-between">
                    <span>Patient: <strong className="text-black">{rxForm.patientName || 'Patient Name'}</strong></span>
                    <span>Age: {rxForm.patientAge}y • {rxForm.patientGender}</span>
                  </div>
                  <div className="text-[10px] text-zinc-700">
                    Diagnosis: <span className="text-black font-medium">{rxForm.diagnosis}</span>
                  </div>
                </div>

                {/* Prescription Power Matrix */}
                <div className="py-3">
                  <table className="w-full text-center font-mono text-[11px] border border-zinc-300 rounded-lg overflow-hidden bg-white">
                    <thead className="bg-[#121214] text-[#D4AF87] font-bold">
                      <tr>
                        <th className="py-1.5">Eye</th>
                        <th className="py-1.5">Sph</th>
                        <th className="py-1.5">Cyl</th>
                        <th className="py-1.5">Axis</th>
                        <th className="py-1.5">Add</th>
                        <th className="py-1.5">V/A</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-black">
                      <tr>
                        <td className="py-1.5 font-bold text-zinc-900 bg-zinc-100">OD</td>
                        <td>{rxForm.od.sph}</td>
                        <td>{rxForm.od.cyl}</td>
                        <td>{rxForm.od.axis}°</td>
                        <td>{rxForm.od.add}</td>
                        <td>{rxForm.od.va}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-zinc-900 bg-zinc-100">OS</td>
                        <td>{rxForm.os.sph}</td>
                        <td>{rxForm.os.cyl}</td>
                        <td>{rxForm.os.axis}°</td>
                        <td>{rxForm.os.add}</td>
                        <td>{rxForm.os.va}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-2 text-[10px] text-zinc-700 flex justify-between">
                    <span>PD: <strong className="text-black font-mono">{rxForm.pd}</strong></span>
                    <span>Dispensed: <strong className="text-black">{rxForm.lensType}</strong></span>
                  </div>
                </div>

                {/* Doctor Remarks */}
                <div className="pt-2 border-t border-zinc-200 text-[11px] text-zinc-700 italic">
                  "{rxForm.doctorRemarks}"
                </div>

                {/* Slip Sign Footer */}
                <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-between items-end">
                  <div className="text-[9px] text-zinc-500">
                    Verified with Computerized Auto-Refractor & Retinoscopy
                  </div>
                  <div className="text-center">
                    <div className="font-serif-luxury text-black text-sm italic font-bold">
                      Dr. S. Anand
                    </div>
                    <div className="text-[9px] text-zinc-600 border-t border-zinc-400 pt-0.5 font-medium">
                      Authorized Signatory
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-3 bg-[#18181B] hover:bg-[#27272A] text-[#D4AF87] border border-[#D4AF87]/40 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#D4AF87]" /> Print Formal Rx Slip
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PATIENT EMR RECORDS */}
        {activeTab === 'patients' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">
                  Patient Electronic Medical Records (EMR)
                </h3>
                <p className="text-xs text-zinc-400">
                  Prescription history and diopter progression tracking
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search patient or phone..."
                  value={searchPatientQuery}
                  onChange={(e) => setSearchPatientQuery(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-[#121214] border border-[#27272A] rounded-2xl p-5 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#27272A] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif-luxury text-base text-[#FAF7F0]">{patient.name}</h4>
                        <span className="text-xs font-mono font-bold text-[#D4AF87] bg-[#18181B] px-2 py-0.5 rounded-md border border-[#27272A]">
                          {patient.id}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {patient.age} years • {patient.gender} • Ph: {patient.mobile} • {patient.address}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-zinc-400">Last Consultation:</span>
                      <span className="text-xs font-mono font-semibold text-[#D4AF87] block">{patient.lastVisit}</span>
                    </div>
                  </div>

                  {/* Prescription History Cards */}
                  <div>
                    <span className="text-xs font-semibold text-zinc-300 block mb-2">
                      Recorded Prescriptions ({patient.rxHistory.length}):
                    </span>
                    <div className="space-y-2">
                      {patient.rxHistory.map((rx) => (
                        <div
                          key={rx.id}
                          className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] flex flex-col md:flex-row justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[#D4AF87]">{rx.id}</span>
                              <span className="text-zinc-500">• Date: {rx.date}</span>
                              <span className="text-zinc-500">• By {rx.doctor}</span>
                            </div>
                            <div className="text-zinc-200 font-mono">
                              OD: {rx.od.sph} Sph / {rx.od.cyl} Cyl x {rx.od.axis}° (Add {rx.od.add}) | OS: {rx.os.sph} Sph / {rx.os.cyl} Cyl x {rx.os.axis}° (Add {rx.os.add})
                            </div>
                            <div className="text-zinc-400 text-[11px]">
                              Lens: <span className="text-[#FAF7F0] font-medium">{rx.lensType}</span>
                            </div>
                          </div>

                          <div className="text-right flex items-center md:flex-col justify-between">
                            <span className="text-[11px] text-zinc-400 font-mono">PD: {rx.pd}</span>
                            <button
                              onClick={() => {
                                setRxForm(prev => ({
                                  ...prev,
                                  patientName: patient.name,
                                  patientMobile: patient.mobile,
                                  patientAge: String(patient.age),
                                  patientGender: patient.gender,
                                  od: rx.od,
                                  os: rx.os,
                                  pd: rx.pd,
                                  lensType: rx.lensType
                                }));
                                setActiveTab('rxpad');
                                showToast(`Loaded ${rx.id} into Rx Pad`);
                              }}
                              className="px-3 py-1 bg-[#121214] hover:bg-[#27272A] text-[#D4AF87] border border-[#D4AF87]/40 rounded-lg text-[11px] font-semibold mt-1 transition cursor-pointer"
                            >
                              Load in Pad
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INVENTORY & STOCK MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">
                  Clinic Optical Inventory
                </h3>
                <p className="text-xs text-zinc-400">
                  Frames, lenses, and sunglasses available in Kallakurichi showroom
                </p>
              </div>
              <span className="text-xs text-[#D4AF87] font-semibold bg-[#18181B] px-3 py-1 rounded-full border border-[#D4AF87]/40 uppercase tracking-wider">
                Total Catalog SKUs: {products.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#121214] border border-[#27272A] rounded-2xl p-4 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                      <span className="font-mono font-bold text-[#D4AF87]">{item.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        (item.stock || 0) < 10
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                      }`}>
                        Stock: {item.stock}
                      </span>
                    </div>

                    <div className="h-28 bg-[#18181B] rounded-xl flex items-center justify-center p-2 mb-3 border border-[#27272A] overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-24 object-contain filter drop-shadow-md"
                          loading="lazy"
                        />
                      ) : (
                        <GlassesIllustration
                          shape={item.shape}
                          color={item.hexColor}
                          lensColor={item.lensColor}
                          scale={0.55}
                          showReflection={false}
                        />
                      )}
                    </div>

                    <h5 className="font-serif-luxury text-sm text-[#FAF7F0] truncate">{item.name}</h5>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {item.brand} • {item.material}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between">
                    <span className="text-sm font-bold text-[#D4AF87]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateProductStock(item.id, -1)}
                        className="w-7 h-7 bg-[#18181B] hover:bg-[#27272A] text-zinc-200 border border-[#27272A] rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer transition"
                        title="Decrease Stock"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold text-zinc-100 px-1">
                        {item.stock}
                      </span>
                      <button
                        onClick={() => updateProductStock(item.id, +1)}
                        className="w-7 h-7 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer shadow-sm"
                        title="Restock +1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: OPTICAL CALCULATOR & TRANSPOSITION */}
        {activeTab === 'optical-calc' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool 1: Plus-Cyl to Minus-Cyl Transposition */}
            <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#D4AF87]" />
                <h4 className="font-serif-luxury text-lg text-[#FAF7F0]">
                  Optical Cylindrical Transposition Tool
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Converts ophthalmic cylinder form between plus cylinder and minus cylinder based on Sturm's conoid equivalency:
                <br /><code className="text-[#D4AF87] font-mono font-semibold">New Sph = Sph + Cyl | New Cyl = -Cyl | New Axis = (Axis ± 90)</code>
              </p>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Sphere:</label>
                  <input
                    type="text"
                    value={transSph}
                    onChange={(e) => setTransSph(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 font-mono p-2.5 rounded-xl text-center focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Cylinder:</label>
                  <input
                    type="text"
                    value={transCyl}
                    onChange={(e) => setTransCyl(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 font-mono p-2.5 rounded-xl text-center focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Axis (°):</label>
                  <input
                    type="number"
                    min="0"
                    max="180"
                    value={transAxis}
                    onChange={(e) => setTransAxis(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 font-mono p-2.5 rounded-xl text-center focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
              </div>

              {/* Result Box */}
              <div className="bg-[#18181B] p-5 rounded-xl border border-[#D4AF87]/40 text-center space-y-1">
                <span className="text-[10px] text-[#D4AF87] font-semibold uppercase tracking-wider">
                  Transposed Prescription Formula:
                </span>
                <div className="text-xl font-mono font-bold text-[#FAF7F0]">
                  {transposed.sph} Sph / {transposed.cyl} Cyl × {transposed.axis}°
                </div>
              </div>
            </div>

            {/* Tool 2: Vertex Distance (Spectacle to Contact Lens) */}
            <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#D4AF87]" />
                <h4 className="font-serif-luxury text-lg text-[#FAF7F0]">
                  Vertex Distance Compensator
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                When high prescription glasses are switched to contact lenses on the cornea (vertex 0mm), the effective power changes:
                <br /><code className="text-[#D4AF87] font-mono font-semibold">Fc = Fs / (1 - d × Fs)</code>
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Spectacle Diopter (Fs):</label>
                  <input
                    type="text"
                    value={specPower}
                    onChange={(e) => setSpecPower(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 font-mono p-2.5 rounded-xl text-center focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Vertex Distance (mm):</label>
                  <input
                    type="number"
                    value={vertexMm}
                    onChange={(e) => setVertexMm(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] text-zinc-100 font-mono p-2.5 rounded-xl text-center focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
              </div>

              {/* Result Box */}
              <div className="bg-[#18181B] p-5 rounded-xl border border-[#D4AF87]/40 text-center space-y-1">
                <span className="text-[10px] text-[#D4AF87] font-semibold uppercase tracking-wider">
                  Required Contact Lens Power (At Cornea):
                </span>
                <div className="text-2xl font-mono font-bold text-[#FAF7F0]">
                  {contactLensEquivalent}
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">
                  (Myopes need less minus power in contacts; hyperopes need more plus power)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
