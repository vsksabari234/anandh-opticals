import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import GlassesIllustration from '../components/GlassesIllustration';
import {
  Stethoscope,
  Users,
  FileText,
  Package,
  Calculator,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  Lock,
  Unlock,
  Sliders,
  Home,
  MapPin,
  Phone
} from 'lucide-react';

export default function DoctorPortal() {
  const {
    appointments,
    updateAppointmentStatus,
    patients,
    addPrescription,
    products,
    updateProductStock,
    homeEyeTestBookings,
    isDoctorAuth,
    setIsDoctorAuth,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('queue'); // queue, rxpad, patients, inventory, optical-calc
  const [pinInput, setPinInput] = useState('');
  const [searchPatientQuery, setSearchPatientQuery] = useState('');

  // Prescription Pad Form State
  const [rxForm, setRxForm] = useState({
    patientId: '',
    patientName: '',
    patientMobile: '',
    patientAge: '38',
    patientGender: 'Male',
    patientAddress: 'Kallakurichi',
    diagnosis: 'Myopic Astigmatism with Early Presbyopia',
    od: { sph: '-1.50', cyl: '-0.50', axis: '90', add: '+1.50', va: '6/6' },
    os: { sph: '-1.75', cyl: '-0.75', axis: '85', add: '+1.50', va: '6/6' },
    pd: '64 mm',
    lensType: 'Digital Freeform Progressive with Glacier Blue Anti-Reflective Coating',
    frameDispensed: 'Kallakurichi Executive Pure Titanium',
    doctorRemarks: 'Recommended 20-20-20 rule during screen work. Lubricating eye drops as needed. Review in 12 months.'
  });

  // Optical Tool 1: Transposition
  const [transSph, setTransSph] = useState('-2.00');
  const [transCyl, setTransCyl] = useState('+1.00');
  const [transAxis, setTransAxis] = useState('90');

  // Optical Tool 2: Vertex Distance (Spectacle to Contact Lens)
  const [specPower, setSpecPower] = useState('-5.00');
  const [vertexMm, setVertexMm] = useState('12');

  // Handle Quick Doctor Unlock
  const handleUnlock = (e) => {
    e.preventDefault();
    if (pinInput === '1998' || pinInput === 'dr' || pinInput.toLowerCase() === 'anand') {
      setIsDoctorAuth(true);
      showToast(`Welcome back, ${BUSINESS_INFO.doctor.name}!`);
    } else {
      setIsDoctorAuth(true);
      showToast(`Welcome, ${BUSINESS_INFO.doctor.name}! Access granted.`);
    }
  };

  // Handle Rx Submit
  const handleSavePrescription = (e) => {
    e.preventDefault();
    if (!rxForm.patientName.trim()) {
      showToast('Please enter patient name', 'info');
      return;
    }

    const created = addPrescription(rxForm.patientId || `P-${Date.now().toString().slice(-3)}`, {
      ...rxForm,
      date: new Date().toISOString().split('T')[0]
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

  // If locked, show doctor access gate in light luxury theme
  if (!isDoctorAuth) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white border border-sky-100 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mx-auto shadow-2xs">
            <Stethoscope className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Dr. S. Anand Clinic Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized clinical suite for Optometrists & Opticians
            </p>
          </div>

          <div className="bg-gradient-to-r from-sky-50/70 to-amber-50/60 p-4 rounded-2xl border border-sky-100 text-left text-xs space-y-1">
            <div className="font-bold text-slate-900">{BUSINESS_INFO.doctor.name}</div>
            <div className="text-sky-700 font-semibold">{BUSINESS_INFO.doctor.qualifications}</div>
            <div className="text-slate-500 font-mono">Reg No: {BUSINESS_INFO.doctor.regNo}</div>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="text-xs text-slate-600 font-medium block mb-1">
                Enter Doctor PIN or click Instant Demo Access:
              </label>
              <input
                type="password"
                placeholder="PIN (Demo: 1998)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-center text-lg font-mono tracking-widest text-slate-900 py-2.5 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md glow-glacier"
            >
              <Unlock className="w-4 h-4" />
              Sign In as Dr. Anand
            </button>
          </form>

          <p className="text-[11px] text-slate-400">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in bg-slate-50/50">
      {/* Top Banner / Doctor Card */}
      <div className="bg-white border border-sky-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden">
        <div className="flex items-center gap-4">
          <img
            src="/src/assets/images/doctor_portrait_1791949570094.jpg"
            alt={BUSINESS_INFO.doctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-200 shadow-md shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900 font-heading">
                {BUSINESS_INFO.doctor.name}
              </span>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                Online • Kallakurichi Clinic
              </span>
            </div>
            <p className="text-xs text-sky-700 font-bold mt-0.5">
              {BUSINESS_INFO.doctor.qualifications}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Registration No: <span className="font-mono font-semibold text-slate-700">{BUSINESS_INFO.doctor.regNo}</span> • {BUSINESS_INFO.doctor.experience}
            </p>
          </div>
        </div>

        {/* Doctor Quick Stats */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-sky-50 border border-sky-100 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-initial shadow-2xs">
            <span className="text-xl font-black text-sky-700 block font-heading">
              {appointments.length}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Queue Today</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-initial shadow-2xs">
            <span className="text-xl font-black text-slate-800 block font-heading">
              {patients.length}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">EMR Records</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-initial shadow-2xs">
            <span className="text-xl font-black text-amber-700 block font-heading">
              {products.filter(p => p.stock < 10).length}
            </span>
            <span className="text-[10px] text-amber-800 uppercase tracking-wider font-bold">Low Stock</span>
          </div>

          <button
            onClick={() => {
              setIsDoctorAuth(false);
              showToast('Doctor session locked');
            }}
            className="p-3 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-2xl border border-slate-200 transition shadow-2xs"
            title="Lock Doctor Session"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-sky-100 pb-2 overflow-x-auto">
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== null && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white text-sky-800 font-extrabold' : 'bg-slate-100 text-slate-600'
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
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Live Clinic Patient Queue
              </h3>
              <p className="text-xs text-slate-500">
                Patients registered for examination at Kallakurichi clinic
              </p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time synchronization
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white border border-sky-100 rounded-2xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition hover:border-sky-300 shadow-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                    <span className="text-[10px] text-sky-700 font-bold uppercase">Token</span>
                    <span className="text-lg font-black text-slate-900 font-mono">{apt.tokenNumber}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-extrabold text-slate-900">{apt.patientName}</h4>
                      <span className="text-xs text-slate-500">
                        ({apt.age}y • {apt.gender})
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        apt.status === 'Waiting'
                          ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                          : apt.status === 'In Examination'
                          ? 'bg-sky-50 text-sky-800 border-sky-300'
                          : apt.status === 'Dispensing'
                          ? 'bg-purple-50 text-purple-800 border-purple-300'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-3">
                      <span className="text-sky-700 font-bold">{apt.service}</span>
                      <span className="text-slate-300">•</span>
                      <span>Slot: {apt.timeSlot}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-mono">Ph: {apt.mobile}</span>
                    </div>

                    {apt.symptoms && (
                      <div className="text-xs text-slate-600 mt-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80 inline-block">
                        <strong>Chief Complaint:</strong> {apt.symptoms}
                      </div>
                    )}
                  </div>
                </div>

                {/* Queue Actions */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
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
                    className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl text-xs font-bold border border-sky-300 transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <Stethoscope className="w-3.5 h-3.5" /> Start Exam in Rx Pad
                  </button>

                  <select
                    value={apt.status}
                    onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-sky-500 shadow-2xs"
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

      {/* TAB: DOORSTEP HOME EYE TESTS (Precision Optical Field Service) */}
      {activeTab === 'home-tests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Doorstep Eye Test Bookings
              </h3>
              <p className="text-xs text-slate-500">
                Home appointments dispatched to Kallakurichi certified field optometrist unit
              </p>
            </div>
            <span className="text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-300 font-bold">
              100+ Frames Box & Mobile Autorefractor
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {homeEyeTestBookings.map((het) => (
              <div
                key={het.id}
                className="bg-white border border-sky-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-slate-900 text-sm">
                        {het.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md border border-sky-200">
                        {het.id}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-sky-600" />
                        <a href={`tel:${het.phone}`} className="hover:text-sky-700 font-bold text-slate-700">
                          {het.phone}
                        </a>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {het.address}
                      </span>
                    </div>

                    <div className="text-[11px] text-sky-800 font-medium mt-1">
                      Scheduled for: <strong>{het.date}</strong> ({het.slot}) • Frames requested: {het.framesRequested}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                    {het.status}
                  </span>
                  <a
                    href={`https://wa.me/${het.phone?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(het.name)},%20this%20is%20Dr.%20Anand%20Opticals.%20Confirming%20your%20doorstep%20eye%20test%20for%20${het.date}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition shadow-2xs"
                  >
                    WhatsApp Patient
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL RX PAD */}
      {activeTab === 'rxpad' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Rx Editor (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-sky-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
            <div className="flex items-center justify-between border-b border-sky-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Ophthalmic Prescription Pad
                </h3>
                <p className="text-xs text-slate-500">
                  Fill refraction parameters (OD & OS) and generate signed Rx slip
                </p>
              </div>
              <span className="text-xs text-sky-700 font-mono font-bold bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                German Refraction Matrix
              </span>
            </div>

            <form onSubmit={handleSavePrescription} className="space-y-5">
              {/* Patient Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Patient Name: *
                  </label>
                  <input
                    type="text"
                    required
                    value={rxForm.patientName}
                    onChange={(e) => setRxForm({ ...rxForm, patientName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile:
                  </label>
                  <input
                    type="tel"
                    value={rxForm.patientMobile}
                    onChange={(e) => setRxForm({ ...rxForm, patientMobile: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Age:</label>
                    <input
                      type="number"
                      value={rxForm.patientAge}
                      onChange={(e) => setRxForm({ ...rxForm, patientAge: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Gender:</label>
                    <select
                      value={rxForm.patientGender}
                      onChange={(e) => setRxForm({ ...rxForm, patientGender: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-sky-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Refraction Table Grid */}
              <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Refractive Measurement (Diopters):
                </span>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-sky-200 text-slate-600 font-bold">
                        <th className="py-2 px-2">Eye</th>
                        <th className="py-2 px-2">Sphere (Sph)</th>
                        <th className="py-2 px-2">Cylinder (Cyl)</th>
                        <th className="py-2 px-2">Axis (°)</th>
                        <th className="py-2 px-2">Near Add (+)</th>
                        <th className="py-2 px-2">Visual Acuity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-100 font-mono">
                      {/* OD - Right Eye */}
                      <tr>
                        <td className="py-2 px-2 font-black text-sky-800">OD (Right)</td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.od.sph}
                            onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, sph: e.target.value } })}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.od.cyl}
                            onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, cyl: e.target.value } })}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.od.axis}
                            onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, axis: e.target.value } })}
                            className="w-14 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.od.add}
                            onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, add: e.target.value } })}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.od.va}
                            onChange={(e) => setRxForm({ ...rxForm, od: { ...rxForm.od, va: e.target.value } })}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                      </tr>

                      {/* OS - Left Eye */}
                      <tr>
                        <td className="py-2 px-2 font-black text-amber-800">OS (Left)</td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.os.sph}
                            onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, sph: e.target.value } })}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.os.cyl}
                            onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, cyl: e.target.value } })}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.os.axis}
                            onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, axis: e.target.value } })}
                            className="w-14 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.os.add}
                            onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, add: e.target.value } })}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={rxForm.os.va}
                            onChange={(e) => setRxForm({ ...rxForm, os: { ...rxForm.os, va: e.target.value } })}
                            className="w-16 bg-white border border-slate-200 text-slate-900 text-center py-1 rounded-md"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-600 font-semibold">Pupillary Distance (PD):</span>
                    <input
                      type="text"
                      value={rxForm.pd}
                      onChange={(e) => setRxForm({ ...rxForm, pd: e.target.value })}
                      className="w-20 bg-white border border-slate-200 text-slate-900 text-xs px-2 py-1 rounded-md font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Diagnosis and Lens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Diagnosis / Clinical Impression:
                  </label>
                  <input
                    type="text"
                    value={rxForm.diagnosis}
                    onChange={(e) => setRxForm({ ...rxForm, diagnosis: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Dispensed Lens Type:
                  </label>
                  <input
                    type="text"
                    value={rxForm.lensType}
                    onChange={(e) => setRxForm({ ...rxForm, lensType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Doctor remarks */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Doctor's Advice & Review Notes:
                </label>
                <textarea
                  rows="2"
                  value={rxForm.doctorRemarks}
                  onChange={(e) => setRxForm({ ...rxForm, doctorRemarks: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-2.5 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md glow-glacier"
              >
                <CheckCircle2 className="w-4 h-4" />
                Save & Update Patient EMR
              </button>
            </form>
          </div>

          {/* Rx Slip Clean White Paper Preview (Right - 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 text-slate-900 text-xs shadow-xl relative">
              {/* Slip Header with gold line */}
              <div className="border-b-2 border-amber-400 pb-4 text-center">
                <span className="text-base font-black font-heading tracking-wider text-slate-900 block">
                  ANAND OPTICALS & EYE CLINIC
                </span>
                <span className="text-[10px] text-sky-700 font-bold">
                  Shop 14, Salem Main Road, Opp. Govt Hospital, Kallakurichi - 606202
                </span>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Ph: +91 94432 28456 • Reg: TN-OPT-4182
                </div>
              </div>

              {/* Doctor Details */}
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100 text-[11px]">
                <div>
                  <strong className="text-slate-900">{BUSINESS_INFO.doctor.name}</strong>
                  <div className="text-[10px] text-sky-700 font-semibold">{BUSINESS_INFO.doctor.qualifications}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Date: </span>
                  <span className="text-slate-900 font-mono font-bold">2026-10-14</span>
                </div>
              </div>

              {/* Patient Meta */}
              <div className="py-2.5 border-b border-slate-100 space-y-1">
                <div className="flex justify-between">
                  <span>Patient: <strong className="text-slate-900">{rxForm.patientName || 'Patient Name'}</strong></span>
                  <span>Age: {rxForm.patientAge}y • {rxForm.patientGender}</span>
                </div>
                <div className="text-[10px] text-slate-600">
                  Diagnosis: <span className="text-slate-900 font-medium">{rxForm.diagnosis}</span>
                </div>
              </div>

              {/* Prescription Power Matrix */}
              <div className="py-3">
                <table className="w-full text-center font-mono text-[11px] border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-sky-50 text-sky-900 font-bold">
                    <tr>
                      <th className="py-1.5">Eye</th>
                      <th className="py-1.5">Sph</th>
                      <th className="py-1.5">Cyl</th>
                      <th className="py-1.5">Axis</th>
                      <th className="py-1.5">Add</th>
                      <th className="py-1.5">V/A</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-1 font-bold text-sky-700">OD</td>
                      <td>{rxForm.od.sph}</td>
                      <td>{rxForm.od.cyl}</td>
                      <td>{rxForm.od.axis}°</td>
                      <td>{rxForm.od.add}</td>
                      <td>{rxForm.od.va}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-amber-700">OS</td>
                      <td>{rxForm.os.sph}</td>
                      <td>{rxForm.os.cyl}</td>
                      <td>{rxForm.os.axis}°</td>
                      <td>{rxForm.os.add}</td>
                      <td>{rxForm.os.va}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-2 text-[10px] text-slate-600 flex justify-between">
                  <span>PD: <strong className="text-slate-900 font-mono">{rxForm.pd}</strong></span>
                  <span>Dispensed: <strong className="text-slate-900">{rxForm.lensType}</strong></span>
                </div>
              </div>

              {/* Doctor Remarks */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 italic">
                "{rxForm.doctorRemarks}"
              </div>

              {/* Slip Sign Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-end">
                <div className="text-[9px] text-slate-400">
                  Verified with Computerized Auto-Refractor & Retinoscopy
                </div>
                <div className="text-center">
                  <div className="font-heading font-serif text-sky-800 text-sm italic font-bold">
                    Dr. S. Anand
                  </div>
                  <div className="text-[9px] text-slate-500 border-t border-slate-300 pt-0.5 font-medium">
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 transition shadow-xs"
            >
              <Printer className="w-4 h-4 text-sky-600" /> Print Formal Rx Slip
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: PATIENT EMR RECORDS */}
      {activeTab === 'patients' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Patient Electronic Medical Records (EMR)
              </h3>
              <p className="text-xs text-slate-500">
                Prescription history and diopter progression tracking
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient or phone..."
                value={searchPatientQuery}
                onChange={(e) => setSearchPatientQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500 shadow-2xs"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white border border-sky-100 rounded-2xl p-5 space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-extrabold text-slate-900">{patient.name}</h4>
                      <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                        {patient.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {patient.age} years • {patient.gender} • Ph: {patient.mobile} • {patient.address}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-500">Last Consultation:</span>
                    <span className="text-xs font-mono font-bold text-slate-800 block">{patient.lastVisit}</span>
                  </div>
                </div>

                {/* Prescription History Cards */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Recorded Prescriptions ({patient.rxHistory.length}):
                  </span>
                  <div className="space-y-2">
                    {patient.rxHistory.map((rx) => (
                      <div
                        key={rx.id}
                        className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sky-700">{rx.id}</span>
                            <span className="text-slate-500">• Date: {rx.date}</span>
                            <span className="text-slate-500">• By {rx.doctor}</span>
                          </div>
                          <div className="text-slate-800 font-mono">
                            OD: {rx.od.sph} Sph / {rx.od.cyl} Cyl x {rx.od.axis}° (Add {rx.od.add}) | OS: {rx.os.sph} Sph / {rx.os.cyl} Cyl x {rx.os.axis}° (Add {rx.os.add})
                          </div>
                          <div className="text-slate-500 text-[11px]">
                            Lens: <span className="text-slate-900 font-medium">{rx.lensType}</span>
                          </div>
                        </div>

                        <div className="text-right flex items-center md:flex-col justify-between">
                          <span className="text-[11px] text-slate-500 font-mono">PD: {rx.pd}</span>
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
                            className="px-2.5 py-1 bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 rounded-lg text-[11px] font-bold mt-1 shadow-2xs"
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

      {/* TAB 4: INVENTORY & STOCK MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Clinic Optical Inventory
              </h3>
              <p className="text-xs text-slate-500">
                Frames, lenses, and sunglasses available in Kallakurichi showroom
              </p>
            </div>
            <span className="text-xs text-sky-700 font-bold bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Total Catalog SKUs: {products.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-sky-100 rounded-2xl p-4 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-mono font-bold text-sky-700">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.stock < 10
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      Stock: {item.stock}
                    </span>
                  </div>

                  <div className="h-24 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20 rounded-xl flex items-center justify-center p-2 mb-2 border border-sky-100/70 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-18 object-contain filter drop-shadow-2xs"
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

                  <h5 className="text-sm font-extrabold text-slate-900 truncate">{item.name}</h5>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {item.brand} • {item.material}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900 font-heading">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateProductStock(item.id, -1)}
                      className="w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-center font-bold text-xs"
                      title="Decrease Stock"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-900 px-1">
                      {item.stock}
                    </span>
                    <button
                      onClick={() => updateProductStock(item.id, +1)}
                      className="w-7 h-7 bg-sky-600 hover:bg-sky-500 text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-2xs"
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

      {/* TAB 5: OPTICAL CALCULATOR & TRANSPOSITION */}
      {activeTab === 'optical-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tool 1: Plus-Cyl to Minus-Cyl Transposition */}
          <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-600" />
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Optical Cylindrical Transposition Tool
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Converts ophthalmic cylinder form between plus cylinder and minus cylinder based on Sturm's conoid equivalency:
              <br /><code className="text-sky-700 font-mono font-bold">New Sph = Sph + Cyl | New Cyl = -Cyl | New Axis = (Axis ± 90)</code>
            </p>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="text-slate-600 font-bold block mb-1">Sphere:</label>
                <input
                  type="text"
                  value={transSph}
                  onChange={(e) => setTransSph(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono p-2 rounded-xl text-center"
                />
              </div>
              <div>
                <label className="text-slate-600 font-bold block mb-1">Cylinder:</label>
                <input
                  type="text"
                  value={transCyl}
                  onChange={(e) => setTransCyl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono p-2 rounded-xl text-center"
                />
              </div>
              <div>
                <label className="text-slate-600 font-bold block mb-1">Axis (°):</label>
                <input
                  type="number"
                  min="0"
                  max="180"
                  value={transAxis}
                  onChange={(e) => setTransAxis(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono p-2 rounded-xl text-center"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-sky-50/80 p-4 rounded-2xl border border-sky-200 text-center space-y-1">
              <span className="text-[11px] text-sky-800 font-bold uppercase tracking-wider">
                Transposed Prescription Formula:
              </span>
              <div className="text-xl font-mono font-black text-slate-900">
                {transposed.sph} Sph / {transposed.cyl} Cyl × {transposed.axis}°
              </div>
            </div>
          </div>

          {/* Tool 2: Vertex Distance (Spectacle to Contact Lens) */}
          <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-600" />
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Vertex Distance Compensator
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              When high prescription glasses are switched to contact lenses on the cornea (vertex 0mm), the effective power changes:
              <br /><code className="text-amber-800 font-mono font-bold">Fc = Fs / (1 - d × Fs)</code>
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-bold block mb-1">Spectacle Diopter (Fs):</label>
                <input
                  type="text"
                  value={specPower}
                  onChange={(e) => setSpecPower(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono p-2 rounded-xl text-center"
                />
              </div>
              <div>
                <label className="text-slate-600 font-bold block mb-1">Vertex Distance (mm):</label>
                <input
                  type="number"
                  value={vertexMm}
                  onChange={(e) => setVertexMm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono p-2 rounded-xl text-center"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-center space-y-1">
              <span className="text-[11px] text-amber-800 font-bold uppercase tracking-wider">
                Required Contact Lens Power (At Cornea):
              </span>
              <div className="text-2xl font-mono font-black text-slate-900">
                {contactLensEquivalent}
              </div>
              <p className="text-[10px] text-slate-500">
                (Myopes need less minus power in contacts; hyperopes need more plus power)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
