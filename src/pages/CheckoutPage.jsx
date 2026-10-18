import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  Building2,
  CreditCard,
  QrCode,
  Lock,
  ArrowLeft,
  AlertCircle,
  Glasses
} from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cart,
    user,
    calculateCartTotals,
    activeCoupon,
    createOrder
  } = useStore();

  const totals = calculateCartTotals();

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Saved address selection or manual entry
  const defaultAddress = user?.addresses?.find(a => a.isDefault) || user?.addresses?.[0];

  const [selectedAddressMode, setSelectedAddressMode] = useState(
    user?.addresses && user.addresses.length > 0 ? 'saved' : 'new'
  );
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id || '');

  // Form Fields
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: defaultAddress?.street || '',
    city: defaultAddress?.city || 'Kallakurichi',
    state: defaultAddress?.state || 'Tamil Nadu',
    pincode: defaultAddress?.pincode || '606202',
    deliveryMethod: 'express_courier', // 'express_courier' or 'store_pickup'
    paymentMethod: 'razorpay_upi', // 'razorpay_upi', 'razorpay_card', 'cash_on_delivery'
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Update form if user switches saved address
  const handleAddressSelect = (addr) => {
    setSelectedAddressId(addr.id);
    setFormData(prev => ({
      ...prev,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      phone: addr.phone || prev.phone
    }));
  };

  const hasPrescriptionItems = cart.some(item => !!item.lens);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setPaymentError('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setPaymentError('Please provide your full name and contact mobile number.');
      return;
    }

    if (formData.deliveryMethod === 'express_courier') {
      if (!formData.street.trim() || !formData.city.trim() || !formData.pincode.trim()) {
        setPaymentError('Please fill in complete shipping address details (Street, City, Pincode).');
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Razorpay / Payment Gateway Simulation
      // In production, an order is initialized on backend with key_secret and verified signature
      await new Promise(resolve => setTimeout(resolve, 1500));

      const transactionId = formData.paymentMethod === 'cash_on_delivery'
        ? `COD_${Date.now().toString().slice(-6)}`
        : `pay_Rzp_${Math.floor(10000000 + Math.random() * 90000000)}`;

      const shippingAddress = formData.deliveryMethod === 'store_pickup'
        ? {
            street: 'Anand Opticals Showroom & Eye Clinic, Shop 14, Salem Main Road',
            city: 'Kallakurichi',
            state: 'Tamil Nadu',
            pincode: '606202',
            method: 'In-Clinic Showroom Pickup'
          }
        : {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            method: 'Insured Express Courier'
          };

      const newOrder = createOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        shippingAddress,
        deliveryMethod: formData.deliveryMethod,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === 'cash_on_delivery' ? 'pending_cod' : 'paid',
        transactionId,
        notes: formData.notes
      });

      if (newOrder) {
        setIsProcessing(false);
        navigate(`/order-success/${newOrder.id}`);
      } else {
        setIsProcessing(false);
        setPaymentError('Could not process order. Please verify inventory and try again.');
      }
    } catch (err) {
      setIsProcessing(false);
      setPaymentError('Payment authorization failed. Please try an alternate method or contact support.');
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      {/* Header */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/cart" className="p-2 rounded-lg bg-[#18181B] text-zinc-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block">
                Express Checkout
              </span>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F0]">
                Finalize Your Order
              </h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
            <Lock className="w-3.5 h-3.5 text-[#D4AF87]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Checkout Stepper Form */}
          <div className="lg:col-span-8 space-y-6">

            {/* Error Banner */}
            {paymentError && (
              <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{paymentError}</span>
              </div>
            )}

            {/* Step 1: Customer Contact Details */}
            <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
              <div className="flex items-center gap-3 border-b border-[#27272A] pb-3">
                <div className="w-6 h-6 rounded-full bg-[#D4AF87] text-[#090909] text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Customer Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Karthik Subramanian"
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Contact Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98401 23456"
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Email (for invoice receipt)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="karthik@example.com"
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Method */}
            <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
              <div className="flex items-center gap-3 border-b border-[#27272A] pb-3">
                <div className="w-6 h-6 rounded-full bg-[#D4AF87] text-[#090909] text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Delivery Method</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Express Courier */}
                <div
                  onClick={() => setFormData({ ...formData, deliveryMethod: 'express_courier' })}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    formData.deliveryMethod === 'express_courier'
                      ? 'border-[#D4AF87] bg-[#D4AF87]/10 ring-1 ring-[#D4AF87]'
                      : 'border-[#27272A] bg-[#18181B] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#D4AF87]" />
                      <span className="text-xs font-semibold text-[#FAF7F0]">Insured Express Courier</span>
                    </div>
                    <span className="text-xs font-semibold text-[#D4AF87]">
                      {totals.shipping === 0 ? 'Free' : `₹${totals.shipping}`}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Dispatched in 48 hrs with secure hard case packaging across India.
                  </p>
                </div>

                {/* Clinic Pickup */}
                <div
                  onClick={() => setFormData({ ...formData, deliveryMethod: 'store_pickup' })}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    formData.deliveryMethod === 'store_pickup'
                      ? 'border-[#D4AF87] bg-[#D4AF87]/10 ring-1 ring-[#D4AF87]'
                      : 'border-[#27272A] bg-[#18181B] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#D4AF87]" />
                      <span className="text-xs font-semibold text-[#FAF7F0]">In-Clinic Fitting & Pickup</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">Free</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Collect at Anand Opticals Kallakurichi with personalized optometrist adjustment.
                  </p>
                </div>
              </div>

              {/* Shipping Address (if courier selected) */}
              {formData.deliveryMethod === 'express_courier' && (
                <div className="space-y-3.5 pt-2">
                  {/* Saved Address pills if available */}
                  {user?.addresses && user.addresses.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>Select Saved Address:</span>
                        <button
                          type="button"
                          onClick={() => setSelectedAddressMode(selectedAddressMode === 'saved' ? 'new' : 'saved')}
                          className="text-[#D4AF87] hover:underline"
                        >
                          {selectedAddressMode === 'saved' ? '+ Enter New Address' : 'Use Saved Address'}
                        </button>
                      </div>

                      {selectedAddressMode === 'saved' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {user.addresses.map((addr) => (
                            <div
                              key={addr.id}
                              onClick={() => handleAddressSelect(addr)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1 ${
                                selectedAddressId === addr.id
                                  ? 'border-[#D4AF87] bg-[#D4AF87]/10'
                                  : 'border-[#27272A] bg-[#18181B]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-zinc-200">{addr.tag || 'Address'}</span>
                                {addr.isDefault && (
                                  <span className="text-[10px] text-[#D4AF87] bg-[#D4AF87]/20 px-1.5 py-0.2 rounded">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-zinc-400 text-[11px] line-clamp-2">
                                {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Manual entry inputs */}
                  {(selectedAddressMode === 'new' || !user?.addresses?.length) && (
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                      <div className="sm:col-span-12">
                        <label className="text-xs text-zinc-400 block mb-1">Street Address / House No / Landmark *</label>
                        <input
                          type="text"
                          required
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          placeholder="Door No 42, Green Park Avenue, Near Bus Stand"
                          className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <label className="text-xs text-zinc-400 block mb-1">City / Town *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Kallakurichi"
                          className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <label className="text-xs text-zinc-400 block mb-1">State *</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="Tamil Nadu"
                          className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <label className="text-xs text-zinc-400 block mb-1">PIN Code *</label>
                        <input
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          placeholder="606202"
                          className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 3: Prescription Notice if applicable */}
            {hasPrescriptionItems && (
              <div className="p-5 rounded-2xl bg-[#D4AF87]/10 border border-[#D4AF87]/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF87]">
                  <Glasses className="w-4 h-4" />
                  <span>Optical Laboratory Prescription Verification Notice</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Your order contains custom prescription ophthalmic lenses. After checkout, our Kallakurichi chief optometrist will review your optical specifications. You may also send your doctor’s prescription slip anytime via WhatsApp (+91 94432 23456) before laboratory cutting begins.
                </p>
              </div>
            )}

            {/* Step 4: Payment Gateway & Method */}
            <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
              <div className="flex items-center gap-3 border-b border-[#27272A] pb-3">
                <div className="w-6 h-6 rounded-full bg-[#D4AF87] text-[#090909] text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Payment Method</h3>
              </div>

              <div className="space-y-3">
                {/* Razorpay UPI */}
                <div
                  onClick={() => setFormData({ ...formData, paymentMethod: 'razorpay_upi' })}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    formData.paymentMethod === 'razorpay_upi'
                      ? 'border-[#D4AF87] bg-[#D4AF87]/10 ring-1 ring-[#D4AF87]'
                      : 'border-[#27272A] bg-[#18181B] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-[#D4AF87]" />
                    <div>
                      <span className="text-xs font-semibold text-[#FAF7F0] block">
                        Instant UPI & QR Code (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Zero transaction fee • Official Razorpay Gateway
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 uppercase">Fastest</span>
                </div>

                {/* Razorpay Cards & NetBanking */}
                <div
                  onClick={() => setFormData({ ...formData, paymentMethod: 'razorpay_card' })}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    formData.paymentMethod === 'razorpay_card'
                      ? 'border-[#D4AF87] bg-[#D4AF87]/10 ring-1 ring-[#D4AF87]'
                      : 'border-[#27272A] bg-[#18181B] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#D4AF87]" />
                    <div>
                      <span className="text-xs font-semibold text-[#FAF7F0] block">
                        Credit / Debit Cards & Net Banking
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Visa, Mastercard, RuPay, HDFC, SBI, ICICI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery / Pay at Store */}
                <div
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    formData.paymentMethod === 'cash_on_delivery'
                      ? 'border-[#D4AF87] bg-[#D4AF87]/10 ring-1 ring-[#D4AF87]'
                      : 'border-[#27272A] bg-[#18181B] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-zinc-400" />
                    <div>
                      <span className="text-xs font-semibold text-[#FAF7F0] block">
                        {formData.deliveryMethod === 'store_pickup' ? 'Pay upon Clinic Pickup' : 'Cash on Delivery (Tamil Nadu Only)'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Pay cash or UPI on delivery / showroom visit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div className="p-4 rounded-2xl bg-[#141417] border border-[#27272A]">
              <label className="text-xs text-zinc-400 block mb-1">
                Special Fitting Notes or Eye Doctor Reference (Optional):
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Please provide slim nosepads, or reference Dr. Anand clinic record P-401."
                className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF87]"
              />
            </div>

          </div>

          {/* Right Column: Order Review & Finalize Button */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0] border-b border-[#27272A] pb-3">
                Review & Confirm
              </h3>

              {/* Items preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <img src={item.image} alt={item.name} className="w-12 h-10 object-cover rounded bg-black/40 border border-zinc-800" />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-zinc-200 truncate block">{item.name}</span>
                      <span className="text-zinc-500 text-[11px]">
                        Qty: {item.quantity} • {item.selectedColor || item.color}
                      </span>
                    </div>
                    <span className="font-mono text-zinc-300 font-medium">
                      ₹{((item.price + (item.lens?.price || 0)) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2 text-xs text-zinc-300 border-t border-[#27272A] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">₹{totals.baseTotal.toLocaleString('en-IN')}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({activeCoupon?.code})</span>
                    <span className="font-mono">-₹{totals.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-mono">
                    {totals.shipping === 0 ? <span className="text-emerald-400 font-semibold uppercase">Free</span> : `₹${totals.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (12%)</span>
                  <span className="font-mono text-zinc-200">₹{totals.gst.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-t border-[#27272A] pt-3 flex items-baseline justify-between text-base">
                  <span className="font-semibold text-zinc-100">Payable Total</span>
                  <div className="text-right">
                    <span className="font-serif-luxury text-3xl font-bold text-[#D4AF87]">
                      ₹{totals.grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] mt-4"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing Payment...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order (₹{totals.grandTotal.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>

              <div className="space-y-1.5 pt-2 text-[10px] text-zinc-500 text-center">
                <p>By placing this order, you agree to Anand Opticals terms & warranty policies.</p>
                <p>Kallakurichi Head Clinic: +91 94432 23456</p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
