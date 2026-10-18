import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Glasses,
  X,
  Plus,
  Minus,
  RotateCcw
} from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateCartQty,
    clearCart,
    calculateCartTotals,
    activeCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const totals = calculateCartTotals();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - (totals.baseTotal - totals.discount));
  const shippingProgress = Math.min(100, Math.round(((totals.baseTotal - totals.discount) / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#090909] text-zinc-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 py-16">
          <div className="w-20 h-20 rounded-full bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center mx-auto text-[#D4AF87] shadow-xl">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0]">Your Bag is Empty</h2>
            <p className="text-sm text-zinc-400">
              Discover our handcrafted titanium frames, luxury acetate spectacles, and polarized sunglasses.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all shadow-lg hover:scale-105"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      {/* Header */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[#D4AF87] uppercase text-xs font-semibold tracking-[0.25em] block">
              Shopping Bag
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF7F0] mt-1">
              Your Selected Eyewear ({totals.itemCount} {totals.itemCount === 1 ? 'Frame' : 'Frames'})
            </h1>
          </div>
          <Link
            to="/catalog"
            className="text-xs text-zinc-400 hover:text-[#D4AF87] transition-colors flex items-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Free Shipping Alert Bar */}
        <div className="p-4 rounded-2xl bg-[#141417] border border-[#27272A] mb-8 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF87]" />
              <span className="font-semibold text-zinc-200">
                {amountNeededForFreeShipping === 0
                  ? '🎉 Congratulations! You have unlocked Free Insured Express Courier Delivery across India!'
                  : `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more to unlock Free Express Delivery!`}
              </span>
            </div>
            <span className="font-mono text-zinc-400">{shippingProgress}%</span>
          </div>
          <div className="w-full bg-[#18181B] h-1.5 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="bg-[#D4AF87] h-full transition-all duration-500 rounded-full"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 text-xs text-zinc-400 border-b border-[#27272A]/80">
              <span>Item Description</span>
              <button
                type="button"
                onClick={clearCart}
                className="text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Clear Bag
              </button>
            </div>

            {cart.map((item, index) => {
              const itemLensPrice = item.lens?.price || 0;
              const itemTotal = (item.price + itemLensPrice) * item.quantity;

              return (
                <div
                  key={`${item.id}-${item.lensId}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] hover:border-zinc-700 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl bg-[#18181B] border border-zinc-800 overflow-hidden shrink-0 group relative"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] tracking-wider uppercase text-[#D4AF87] font-semibold bg-[#D4AF87]/10 px-2 py-0.5 rounded-full">
                        {item.brand}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">#{item.id}</span>
                    </div>

                    <Link
                      to={`/product/${item.id}`}
                      className="text-base font-semibold text-[#FAF7F0] hover:text-[#D4AF87] transition-colors truncate block"
                    >
                      {item.name}
                    </Link>

                    {/* Variant details */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>Color: <strong className="text-zinc-200">{item.selectedColor || item.color}</strong></span>
                      <span className="text-zinc-600">•</span>
                      <span>Size: <strong className="text-zinc-200">{item.selectedSize || 'Standard'}</strong></span>
                    </div>

                    {/* Lens selection pill */}
                    <div className="pt-1">
                      {item.lens ? (
                        <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF87] bg-[#D4AF87]/10 border border-[#D4AF87]/30 px-2.5 py-1 rounded-lg">
                          <Glasses className="w-3.5 h-3.5" />
                          <span>{item.lens.name} (+₹{item.lens.price})</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-zinc-500 bg-[#18181B] px-2 py-0.5 rounded-md border border-zinc-800">
                          Frame Only (Zero Power)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#27272A]/60">
                    <div className="flex items-center border border-[#27272A] rounded-xl bg-[#18181B] p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, item.lensId, item.quantity - 1, item.selectedColor, item.selectedSize)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-zinc-100">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, item.lensId, item.quantity + 1, item.selectedColor, item.selectedSize)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif-luxury text-lg text-[#D4AF87] font-semibold block">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.lensId, item.selectedColor, item.selectedSize)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors text-xs flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Box */}
            <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <Tag className="w-4 h-4 text-[#D4AF87]" />
                <span>Have a Privilege Coupon?</span>
              </div>

              {activeCoupon ? (
                <div className="p-3 rounded-xl bg-[#D4AF87]/10 border border-[#D4AF87]/40 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#D4AF87] tracking-wider font-mono">
                      {activeCoupon.code}
                    </span>
                    <p className="text-[11px] text-zinc-400">{activeCoupon.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="p-1 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                    aria-label="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter code (e.g. ANANDGOLD)"
                    className="flex-1 bg-[#18181B] border border-zinc-700 rounded-xl px-3 py-2 text-xs uppercase font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
                <span>Available:</span>
                <button
                  type="button"
                  onClick={() => applyCoupon('ANANDGOLD')}
                  className="text-[#D4AF87] hover:underline font-mono"
                >
                  ANANDGOLD (10%)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => applyCoupon('FESTIVE15')}
                  className="text-[#D4AF87] hover:underline font-mono"
                >
                  FESTIVE15 (15%)
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0] border-b border-[#27272A] pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Frames Subtotal</span>
                  <span className="font-mono text-zinc-200">₹{totals.subtotal.toLocaleString('en-IN')}</span>
                </div>

                {totals.lensTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Prescription Lenses</span>
                    <span className="font-mono text-zinc-200">+₹{totals.lensTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-₹{totals.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Express Courier</span>
                  <span className="font-mono">
                    {totals.shipping === 0 ? (
                      <span className="text-emerald-400 font-semibold uppercase">Free</span>
                    ) : (
                      `₹${totals.shipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Applicable GST (12%)</span>
                  <span className="font-mono text-zinc-200">₹{totals.gst.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-t border-[#27272A] pt-3 flex items-baseline justify-between text-base">
                  <span className="font-semibold text-zinc-100">Grand Total</span>
                  <div className="text-right">
                    <span className="font-serif-luxury text-3xl font-bold text-[#D4AF87]">
                      ₹{totals.grandTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">
                      All taxes & clinic fitting included
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer hover:scale-[1.02] mt-4"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Security badges */}
              <div className="pt-4 border-t border-[#27272A]/70 space-y-2 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF87]" />
                  <span>256-Bit Encrypted Payments & Razorpay Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#D4AF87]" />
                  <span>14-Day Free Exchange at Kallakurichi Showroom</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
