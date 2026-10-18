import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  Glasses,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const { orders } = useStore();

  const order = orders.find(o => o.id === orderId || o.orderNumber === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'confirmed': return 1;
      case 'processing_in_lab': return 2;
      case 'quality_checked': return 3;
      case 'dispatched': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  const currentStep = getStatusStepIndex(order?.status);

  const steps = [
    { label: 'Order Confirmed', desc: 'Payment verified & order queued' },
    { label: 'Lab Lens Cutting', desc: 'Essilor precision lens edging' },
    { label: 'Quality Verified', desc: 'UV400 & power alignment checked' },
    { label: 'Dispatched', desc: order?.trackingNumber ? `DTDC: ${order.trackingNumber}` : 'Handed to courier partner' },
    { label: 'Delivered', desc: 'Kallakurichi / Doorstep delivery' }
  ];

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-[#090909] text-zinc-100 flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h2 className="font-serif-luxury text-3xl text-[#FAF7F0]">Order Not Found</h2>
          <p className="text-zinc-400 text-sm">We could not locate this specific order number.</p>
          <Link
            to="/catalog"
            className="inline-block bg-[#D4AF87] text-[#090909] font-bold text-xs uppercase px-6 py-3 rounded-full"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  const phone = '+919443223456';
  const whatsappText = encodeURIComponent(
    `Hello Anand Opticals! I have placed Order ${order.id}. Here are my details: ${order.customer?.name}, Phone: ${order.customer?.phone}. Please confirm optical lab processing.`
  );

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      
      {/* Top Hero Banner */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#D4AF87]/15 border border-[#D4AF87] text-[#D4AF87] flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-[#D4AF87] uppercase text-xs font-semibold tracking-[0.25em] block">
              Order Confirmed & Received
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0]">
              Thank You for Trusting Anand Opticals
            </h1>
            <p className="text-sm text-zinc-400">
              Your order number is <strong className="text-[#D4AF87] font-mono">{order.id}</strong>. A digital confirmation receipt has been generated.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18181B] hover:bg-[#27272A] border border-zinc-700 text-xs font-medium text-zinc-200 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4AF87]" />
              <span>Print Invoice Receipt</span>
            </button>

            <a
              href={`https://wa.me/${phone}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
            >
              <span>Confirm on WhatsApp →</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-10 space-y-8">
        
        {/* Live Fulfillment Stepper */}
        <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-6">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#D4AF87]" />
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Live Optical Lab Status</h3>
            </div>
            <span className="text-xs font-semibold text-[#D4AF87] bg-[#D4AF87]/10 px-3 py-1 rounded-full border border-[#D4AF87]/30 uppercase tracking-wider">
              {order.status.replace(/_/g, ' ')}
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((st, i) => {
              const stepNumber = i + 1;
              const isDone = stepNumber <= currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div key={st.label} className="flex md:flex-col items-start gap-3 md:gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isDone
                        ? 'bg-[#D4AF87] text-[#090909]'
                        : 'bg-[#18181B] text-zinc-500 border border-zinc-800'
                    } ${isCurrent ? 'ring-2 ring-[#D4AF87] ring-offset-2 ring-offset-[#141417]' : ''}`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : stepNumber}
                  </div>
                  <div className="space-y-0.5">
                    <span className={`text-xs font-semibold block ${isDone ? 'text-zinc-100' : 'text-zinc-500'}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] text-zinc-400 block leading-tight">
                      {st.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {order.trackingNumber && (
            <div className="p-3.5 rounded-xl bg-[#18181B] border border-zinc-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-zinc-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF87]" />
                <span>Express Courier Tracking Number: <strong className="text-[#D4AF87] font-mono">{order.trackingNumber}</strong></span>
              </div>
              <span className="text-[11px] text-zinc-400">Est. Arrival: {order.estimatedDelivery || '3-4 Business Days'}</span>
            </div>
          )}
        </div>

        {/* Itemized Order Receipt */}
        <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-6">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Purchased Eyewear & Lenses</h3>
            <span className="text-xs text-zinc-400 font-mono">
              Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <div className="divide-y divide-[#27272A]/70">
            {order.items?.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-14 object-cover rounded-xl bg-black/40 border border-zinc-800 shrink-0"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-[#FAF7F0] truncate">{item.name}</h4>
                    <p className="text-xs text-zinc-400">
                      Brand: {item.brand} • Color: {item.selectedColor || item.color} • Size: {item.selectedSize || 'Standard'}
                    </p>
                    {item.lens && (
                      <div className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF87] bg-[#D4AF87]/10 px-2 py-0.5 rounded">
                        <Glasses className="w-3 h-3" />
                        <span>{item.lens.name} (+₹{item.lens.price})</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right sm:self-center shrink-0">
                  <span className="text-xs text-zinc-400 block">Qty: {item.quantity}</span>
                  <span className="font-serif-luxury text-base font-semibold text-[#D4AF87]">
                    ₹{((item.price + (item.lens?.price || 0)) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing breakdown summary */}
          <div className="border-t border-[#27272A] pt-4 space-y-2 text-xs text-zinc-300">
            <div className="flex justify-between">
              <span>Frames Subtotal</span>
              <span className="font-mono text-zinc-200">₹{order.pricing?.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            {order.pricing?.lensTotal > 0 && (
              <div className="flex justify-between">
                <span>Prescription Lenses</span>
                <span className="font-mono text-zinc-200">+₹{order.pricing.lensTotal.toLocaleString('en-IN')}</span>
              </div>
            )}
            {order.pricing?.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Privilege Discount ({order.pricing.couponCode || 'APPLIED'})</span>
                <span className="font-mono">-₹{order.pricing.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span className="font-mono">
                {order.pricing?.shipping === 0 ? <span className="text-emerald-400 font-semibold uppercase">Free</span> : `₹${order.pricing?.shipping}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>GST (12%)</span>
              <span className="font-mono text-zinc-200">₹{order.pricing?.gst?.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-[#27272A] pt-3 flex items-baseline justify-between text-sm">
              <span className="font-semibold text-zinc-100">Amount Paid</span>
              <span className="font-serif-luxury text-2xl font-bold text-[#D4AF87]">
                ₹{order.pricing?.grandTotal?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Meta Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-[#D4AF87] font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Delivery Details</span>
            </div>
            <p className="font-semibold text-zinc-200">{order.customer?.name}</p>
            <p className="text-zinc-400">
              {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
            </p>
            <p className="text-zinc-400">Mobile: {order.customer?.phone}</p>
            <span className="inline-block text-[10px] text-zinc-500 bg-[#18181B] px-2 py-0.5 rounded border border-zinc-800">
              {order.deliveryMethod === 'store_pickup' ? 'In-Showroom Fitting' : 'Insured Doorstep Courier'}
            </span>
          </div>

          {/* Payment & Security */}
          <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-[#D4AF87] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Payment & Guarantee</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Method</span>
              <span className="font-medium text-zinc-200 uppercase">{order.paymentMethod?.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Transaction ID</span>
              <span className="font-mono text-zinc-300">{order.transactionId || 'pay_verified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Warranty Coverage</span>
              <span className="text-emerald-400 font-semibold">1-Year Anand Warranty</span>
            </div>
            <p className="text-[10px] text-zinc-500 pt-1">
              Need to modify or add another power slip? Contact support at +91 94432 23456.
            </p>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex items-center justify-between pt-4">
          <Link
            to="/account"
            className="text-xs text-zinc-400 hover:text-[#D4AF87] transition flex items-center gap-1.5"
          >
            <span>View All My Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/catalog"
            className="bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}
