import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  User,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register, adminLogin } = useStore();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register Form
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    street: '',
    city: 'Kallakurichi',
    pincode: '606202'
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(email);
    navigate('/account');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(regData);
    navigate('/account');
  };

  const handleQuickCustomer = () => {
    login('karthik.subramanian@gmail.com');
    navigate('/account');
  };

  const handleQuickAdmin = () => {
    adminLogin('anand2026');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black flex items-center justify-center p-4 py-16">
      <div className="max-w-md w-full bg-[#141417] border border-[#27272A] rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group">
            <span className="font-serif-luxury text-2xl tracking-[0.2em] text-[#D4AF87] font-semibold block">
              ANAND OPTICALS
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-400 font-sans block">
              LUXURY EYEWEAR & CLINIC
            </span>
          </Link>
          <h2 className="font-serif-luxury text-2xl text-[#FAF7F0] pt-1">
            {mode === 'login' ? 'Welcome Back' : 'Create Customer Account'}
          </h2>
          <p className="text-xs text-zinc-400">
            {mode === 'login'
              ? 'Access your orders, saved addresses, and clinic prescription history.'
              : 'Join our privilege membership for exclusive offers and automated prescription tracking.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 bg-[#18181B] rounded-xl border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg font-semibold transition cursor-pointer ${
              mode === 'login' ? 'bg-[#D4AF87] text-[#090909]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Customer Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 rounded-lg font-semibold transition cursor-pointer ${
              mode === 'register' ? 'bg-[#D4AF87] text-[#090909]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            New Registration
          </button>
        </div>

        {/* 1-Click Fast Access Test Buttons */}
        <div className="p-3 bg-[#18181B] rounded-2xl border border-zinc-800/80 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF87]" />
            <span>Fast One-Click Demo Access:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="p-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-200 text-center font-medium transition cursor-pointer"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="p-2 rounded-xl bg-[#D4AF87]/15 hover:bg-[#D4AF87]/25 border border-[#D4AF87]/40 text-[11px] text-[#D4AF87] text-center font-semibold transition cursor-pointer"
            >
              Store Admin Portal
            </button>
          </div>
        </div>

        {/* Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Email or Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="karthik.subramanian@gmail.com"
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 pl-9 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 pl-9 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={regData.name}
                onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                placeholder="e.g. Ananya Ravi"
                className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                placeholder="ananya@example.com"
                className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-zinc-400 block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  value={regData.phone}
                  onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                  placeholder="+91 98400 00000"
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">City / Town</label>
              <input
                type="text"
                value={regData.city}
                onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-[11px] text-zinc-500">
          <span>Protected by Anand Opticals E-Commerce Security • </span>
          <Link to="/#appointment" className="text-[#D4AF87] hover:underline">Clinic Support</Link>
        </div>

      </div>
    </div>
  );
}
