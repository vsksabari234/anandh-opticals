import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../data/business';
import { useStore } from '../context/StoreContext';
import {
  Eye,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Stethoscope,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function Footer() {
  const { lang, setIsAppointmentModalOpen, setIsVisionTestOpen, setIsTryOnModalOpen } = useStore();

  return (
    <footer className="bg-gradient-to-b from-sky-50/50 via-white to-slate-50 border-t border-sky-100 text-slate-600 text-xs">
      {/* Upper highlight row with Glacier Blue & Gold Badges */}
      <div className="border-b border-sky-100 bg-white/70 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm">German 3D Refractometry</div>
              <div className="text-[11px] text-slate-500">Micro-precision diopter calibration</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm">1-Hour Lens Edging Lab</div>
              <div className="text-[11px] text-slate-500">In-clinic automated robotic fitting</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-2xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm">FIACLE Certified Optometrist</div>
              <div className="text-[11px] text-slate-500">26+ Years of Community Trust</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm">WhatsApp Consultation</div>
              <div className="text-[11px] text-slate-500">Instant lens advice & quotes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Brand & Doctor Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-amber-400 flex items-center justify-center text-white font-black shadow-xs">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-black text-slate-900 text-base tracking-tight">
              ANAND OPTICALS
            </span>
          </div>

          <p className="text-slate-600 text-xs leading-relaxed">
            {lang === 'ta'
              ? 'கள்ளக்குறிச்சியின் முன்னணி கண் பரிசோதனை நிலையம் மற்றும் சர்வதேச பிராண்டட் கண்ணாடிகள் மையம்.'
              : 'Kallakurichi’s trusted eye care center offering computerized 3D objective eye testing, progressive lens specialization, and designer frames since 1998.'}
          </p>

          <div className="p-3.5 bg-white rounded-2xl border border-sky-100 text-[11px] shadow-xs">
            <div className="font-bold text-slate-900">{BUSINESS_INFO.doctor.name}</div>
            <div className="text-sky-700 font-semibold">{BUSINESS_INFO.doctor.qualifications}</div>
            <div className="text-slate-500 mt-0.5">Reg: {BUSINESS_INFO.doctor.regNo}</div>
          </div>
        </div>

        {/* Col 2: Services & Interactive Tools */}
        <div className="space-y-3">
          <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider font-heading">
            Interactive Tools
          </h4>
          <ul className="space-y-2 text-slate-600 font-medium">
            <li>
              <button
                onClick={() => setIsTryOnModalOpen(true)}
                className="hover:text-sky-700 transition"
              >
                3D Virtual Frame Try-On
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsVisionTestOpen(true)}
                className="hover:text-sky-700 transition"
              >
                Interactive Vision Screening Lab
              </button>
            </li>
            <li>
              <Link to="/vision-lab" className="hover:text-sky-700 transition">
                Digital Eye Strain & 20-20-20 Guide
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-sky-700 transition">
                Eyewear Catalog & Frame Specs
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="hover:text-sky-700 transition"
              >
                Book Clinic Eye Examination
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Doctor & Staff Admin */}
        <div className="space-y-3">
          <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider font-heading">
            Clinic & Doctor Portal
          </h4>
          <ul className="space-y-2 text-slate-600 font-medium">
            <li>
              <Link
                to="/doctor"
                className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1.5"
              >
                <Stethoscope className="w-3.5 h-3.5 text-amber-600" /> Doctor Admin & Rx Pad
              </Link>
            </li>
            <li>
              <Link to="/doctor" className="hover:text-sky-700 transition">
                Today's Patient Examination Queue
              </Link>
            </li>
            <li>
              <Link to="/doctor" className="hover:text-sky-700 transition">
                Digital Ophthalmic Rx Generator
              </Link>
            </li>
            <li>
              <Link to="/doctor" className="hover:text-sky-700 transition">
                Inventory & Frame Stock Alert
              </Link>
            </li>
          </ul>

          <div className="pt-2">
            <span className="text-[11px] text-slate-800 block font-bold">
              Clinic Working Hours:
            </span>
            <div className="text-[11px] text-slate-500 mt-1">
              Mon - Sat: 9:30 AM - 9:00 PM<br />
              Sunday: 10:00 AM - 2:00 PM
            </div>
          </div>
        </div>

        {/* Col 4: Address & Contact */}
        <div className="space-y-3">
          <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider font-heading">
            Kallakurichi Clinic Location
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span className="text-slate-600 leading-relaxed">
                {BUSINESS_INFO.address.line1}, {BUSINESS_INFO.address.line2}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} - {BUSINESS_INFO.address.pincode}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-600 shrink-0" />
              <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="text-slate-700 hover:text-sky-700 font-bold transition">
                {BUSINESS_INFO.contact.phone} / {BUSINESS_INFO.contact.landline}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-600 shrink-0" />
              <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="text-slate-600 hover:text-sky-700 transition">
                {BUSINESS_INFO.contact.email}
              </a>
            </div>

            <a
              href={BUSINESS_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition text-[11px] font-bold mt-2 shadow-2xs"
            >
              Get Directions on Google Maps <ExternalLink className="w-3 h-3 text-sky-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-sky-100 py-4 px-4 sm:px-8 text-center text-slate-500 text-[11px] bg-white">
        © 2026 Anand Opticals (ஆனந்த் ஆப்டிக்கல்ஸ்), Kallakurichi. All rights reserved. Precision eye care, optical lenses & designer eyewear.
      </div>
    </footer>
  );
}
