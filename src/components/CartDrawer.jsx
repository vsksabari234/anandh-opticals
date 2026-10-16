import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Sparkles,
  Tag
} from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    showToast
  } = useStore();

  const [isOrdered, setIsOrdered] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState('home'); // 'home' or 'store'
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => {
    const itemLensPrice = item.lens ? item.lens.price : 0;
    return sum + (item.price + itemLensPrice) * item.quantity;
  }, 0);

  // Total quantity of frames
  const totalQty = cart.reduce((c, i) => c + i.quantity, 0);

  // Direct Showroom Festive Discount (15% off orders over ₹2,500)
  const discount = subtotal >= 2500 ? Math.round(subtotal * 0.15) : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast('Please enter your name and contact phone number', 'info');
      return;
    }
    setIsOrdered(true);
    showToast('🎉 Order received! Our Kallakurichi optical lab will prepare your eyewear.');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white border-l border-blue-100 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-blue-100 flex items-center justify-between bg-gradient-to-r from-blue-50/70 via-white to-blue-50/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 font-heading">
                Your Eyewear Bag ({totalQty})
              </h3>
              <p className="text-[11px] text-blue-700 font-semibold">Anand Opticals • Precision Clinic</p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsOrdered(false);
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Anti-Glare Lenses Included Banner */}
        {cart.length > 0 && !isOrdered && (
          <div className="px-6 py-2.5 bg-blue-50 border-b border-blue-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-blue-900 font-extrabold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Complimentary Anti-Glare 420nm Blue Coating Included!</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {isOrdered ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900 font-heading">
                Order Placed Successfully!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto font-medium">
                Thank you <strong>{customerName}</strong>! Our optometrist will contact you at{' '}
                <strong className="text-blue-800">{customerPhone}</strong> to verify your lens power prescription and arrange {deliveryType === 'home' ? 'free home delivery' : 'in-clinic fitting'}.
              </p>

              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 text-xs text-slate-600 text-left space-y-1">
                <div className="font-bold text-slate-900 mb-1">Clinic & Showroom Address:</div>
                <p>Anand Opticals, Shop 14, Salem Main Road (Opp. Govt Hospital), Kallakurichi.</p>
                <p className="text-slate-500 text-[11px] pt-1">Phone: +91 94432 28456 • Open 9:30 AM - 9:00 PM</p>
              </div>

              <button
                onClick={() => {
                  setIsOrdered(false);
                  onClose();
                }}
                className="w-full py-3 btn-primary-blue font-bold rounded-2xl text-xs transition shadow-md cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto stroke-[1.5]" />
              <h4 className="text-base font-bold text-slate-900">Your bag is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our Japanese titanium frames, blue-cut computer glasses, and Italian acetate sunglasses!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${item.lensId}-${idx}`}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-2xs hover:border-blue-200 transition"
                >
                  <div className="w-16 h-14 bg-gradient-to-b from-blue-50/40 to-white rounded-xl flex items-center justify-center p-1 shrink-0 border border-blue-100 shadow-2xs overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-2xs"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h5 className="text-xs font-black text-slate-900 truncate">{item.name}</h5>
                      <button
                        onClick={() => removeFromCart(item.id, item.lensId)}
                        className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-blue-700 font-extrabold">
                      ₹{item.price.toLocaleString('en-IN')}
                      {item.lens && (
                        <span className="text-slate-500 font-normal"> + ₹{item.lens.price} lens</span>
                      )}
                    </div>

                    {item.lens ? (
                      <div className="text-[10px] text-blue-800 font-semibold truncate mt-0.5">
                        Lens: {item.lens.name}
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        Demo Optical Lenses (Custom Power Fitted in Clinic)
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200">
                        <button
                          onClick={() => updateCartQty(item.id, item.lensId, item.quantity - 1)}
                          className="p-1 hover:text-slate-900 text-slate-500 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, item.lensId, item.quantity + 1)}
                          className="p-1 hover:text-slate-900 text-slate-500 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {item.material && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.material}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Preference */}
              <div className="pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Delivery & Fitting Option:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('home')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      deliveryType === 'home'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 text-blue-600" /> Free Doorstep
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('store')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      deliveryType === 'store'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Pickup in Showroom
                  </button>
                </div>
              </div>

              {/* Express checkout details */}
              <div className="space-y-2 pt-2">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile Number *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
                />
                {deliveryType === 'home' && (
                  <input
                    type="text"
                    placeholder="Delivery Address in Kallakurichi *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && !isOrdered && (
          <div className="p-5 border-t border-blue-100 bg-slate-50/80 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Total Frame & Lens Value:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" /> Showroom Clinic Offer (15%):
                  </span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                <span>Final Payable Amount:</span>
                <span className="text-blue-700 font-heading text-lg font-black">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 btn-primary-blue font-extrabold rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              Confirm & Book with 14-Day Free Trial <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1.5 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Free 1-Year Warranty • 100% Computerized Accuracy
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
