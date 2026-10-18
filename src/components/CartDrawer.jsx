import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Glasses,
  Tag
} from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateCartQty,
    calculateCartTotals,
    activeCoupon
  } = useStore();

  if (!isOpen) return null;

  const totals = calculateCartTotals();

  const handleCheckoutNav = () => {
    onClose();
    navigate('/checkout');
  };

  const handleCartNav = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#141417] border-l border-[#27272A] h-full flex flex-col justify-between shadow-2xl text-zinc-100">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#27272A] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#18181B] border border-[#D4AF87]/40 flex items-center justify-center text-[#D4AF87]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg text-[#FAF7F0] font-normal">
                Your Eyewear Bag ({totals.itemCount})
              </h3>
              <p className="text-[11px] text-[#D4AF87] tracking-wider uppercase font-semibold">
                Anand Opticals Marketplace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition cursor-pointer"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-6 py-2.5 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between text-xs text-zinc-300">
          <span className="text-[11px] text-zinc-400">
            {totals.baseTotal >= 999
              ? '✨ Free Insured Courier Delivery Unlocked'
              : `Add ₹${Math.max(0, 999 - totals.baseTotal).toLocaleString('en-IN')} for Free Delivery`}
          </span>
          <span className="text-[11px] text-[#D4AF87] font-semibold">
            {totals.baseTotal >= 999 ? 'Free' : '₹99'}
          </span>
        </div>

        {/* Items List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3.5">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto stroke-[1.5]" />
              <h4 className="font-serif-luxury text-2xl text-[#FAF7F0]">Your Bag is Empty</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Explore our handcrafted titanium frames, blue-cut computer spectacles, and polarized sunglasses.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/catalog');
                }}
                className="mt-2 inline-flex items-center gap-2 bg-[#D4AF87] text-[#090909] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full cursor-pointer hover:bg-[#C59F77] transition"
              >
                <span>Browse Frames</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const itemLensPrice = item.lens?.price || 0;
              const itemTotal = (item.price + itemLensPrice) * item.quantity;

              return (
                <div
                  key={`${item.id}-${item.lensId}-${item.selectedColor}-${idx}`}
                  className="bg-[#18181B] p-3.5 rounded-xl border border-[#27272A] hover:border-zinc-700 transition flex items-center gap-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-14 object-cover rounded-lg bg-black/40 border border-zinc-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between">
                      <h5 className="text-xs font-semibold text-[#FAF7F0] truncate">{item.name}</h5>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.lensId, item.selectedColor, item.selectedSize)}
                        className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <span>{item.selectedColor || item.color}</span>
                      <span>•</span>
                      <span>{item.selectedSize || 'Standard'}</span>
                    </div>

                    {item.lens && (
                      <div className="text-[10px] text-[#D4AF87] flex items-center gap-1">
                        <Glasses className="w-3 h-3" />
                        <span className="truncate">{item.lens.name}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-700 rounded-lg bg-[#141417]">
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, item.lensId, item.quantity - 1, item.selectedColor, item.selectedSize)}
                          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-zinc-200">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, item.lensId, item.quantity + 1, item.selectedColor, item.selectedSize)}
                          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="font-serif-luxury text-sm font-semibold text-[#D4AF87]">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#121214] border-t border-[#27272A] space-y-4">
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">₹{totals.baseTotal.toLocaleString('en-IN')}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Savings ({activeCoupon?.code})</span>
                  <span className="font-mono">-₹{totals.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (12%)</span>
                <span className="font-mono text-zinc-200">₹{totals.gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-[#27272A] pt-2 flex items-baseline justify-between text-sm">
                <span className="font-semibold text-zinc-100">Estimated Total</span>
                <span className="font-serif-luxury text-2xl font-bold text-[#D4AF87]">
                  ₹{totals.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleCartNav}
                className="py-3 px-3 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-zinc-200 font-semibold text-xs uppercase tracking-wider transition cursor-pointer text-center"
              >
                View Full Bag
              </button>

              <button
                type="button"
                onClick={handleCheckoutNav}
                className="py-3 px-3 rounded-xl bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF87]" />
              <span>Razorpay Verified Gateway • 1-Year Anand Warranty</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
