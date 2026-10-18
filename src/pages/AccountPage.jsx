import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  Heart,
  MapPin,
  FileText,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Glasses,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Edit2
} from 'lucide-react';

export default function AccountPage() {
  const navigate = useNavigate();
  const {
    user,
    logout,
    orders,
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    addCustomerAddress,
    removeCustomerAddress,
    setDefaultCustomerAddress,
    updateUserProfile,
    patients
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'addresses', 'wishlist', 'prescriptions', 'profile'
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: 'Kallakurichi',
    state: 'Tamil Nadu',
    pincode: '606202',
    tag: 'Home'
  });

  // Profile Edit
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  // If user is not logged in, redirect to login
  if (!user) {
    return (
      <div className="min-h-[80vh] bg-[#090909] text-zinc-100 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-6 bg-[#141417] border border-[#27272A] p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#18181B] border border-[#D4AF87]/40 text-[#D4AF87] flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif-luxury text-3xl text-[#FAF7F0]">Sign in to Your Account</h2>
            <p className="text-xs text-zinc-400">
              Access your saved addresses, track optical orders, and view eye prescriptions.
            </p>
          </div>
          <Link
            to="/login"
            className="block w-full py-3.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg"
          >
            Log In / Register
          </Link>
        </div>
      </div>
    );
  }

  // Filter orders for this customer (or all orders in demo)
  const userOrders = orders.filter(
    o => o.customer?.email === user.email || o.customer?.phone === user.phone || orders.length > 0
  );

  // Wishlist items from products catalogue
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  // Patient prescriptions linked with clinic
  const clinicPatient = patients.find(p => p.name?.toLowerCase().includes(user.name?.toLowerCase().split(' ')[0]));
  const prescriptionRecords = clinicPatient?.rxHistory || [];

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.pincode) return;
    addCustomerAddress(newAddr);
    setShowAddAddressModal(false);
    setNewAddr({
      name: user.name,
      phone: user.phone,
      street: '',
      city: 'Kallakurichi',
      state: 'Tamil Nadu',
      pincode: '606202',
      tag: 'Home'
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      {/* Top Banner */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#18181B] border border-[#D4AF87]/60 text-[#D4AF87] flex items-center justify-center font-serif-luxury text-2xl font-bold shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block">
                Privilege Member
              </span>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F0]">
                {user.name}
              </h1>
              <p className="text-xs text-zinc-400">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] border border-zinc-700 text-xs text-zinc-300 hover:text-rose-400 hover:border-rose-500/50 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-6 overflow-x-auto text-xs border-t border-[#27272A]/50">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#D4AF87] text-[#D4AF87]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({userOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`py-3.5 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-[#D4AF87] text-[#D4AF87]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses ({user.addresses?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            className={`py-3.5 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-[#D4AF87] text-[#D4AF87]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Frames ({wishlistedProducts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prescriptions')}
            className={`py-3.5 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'prescriptions'
                ? 'border-[#D4AF87] text-[#D4AF87]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Eye Prescriptions (EMR)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#D4AF87] text-[#D4AF87]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Settings</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <div className="text-center py-16 bg-[#141417] border border-[#27272A] rounded-2xl p-8 space-y-3">
                <Package className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">No Orders Yet</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  When you purchase designer frames or prescription lenses, your order tracker and invoices will appear here.
                </p>
                <Link
                  to="/catalog"
                  className="inline-block bg-[#D4AF87] text-[#090909] font-bold text-xs uppercase px-6 py-2.5 rounded-full mt-2"
                >
                  Explore Eyewear
                </Link>
              </div>
            ) : (
              userOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] hover:border-zinc-700 transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-3 text-xs">
                    <div>
                      <span className="font-mono text-[#D4AF87] font-semibold text-sm">
                        {order.id}
                      </span>
                      <span className="text-zinc-500 ml-2">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#D4AF87]/15 text-[#D4AF87] border border-[#D4AF87]/30 uppercase tracking-wider">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                      <Link
                        to={`/order/${order.id}`}
                        className="text-xs text-[#D4AF87] hover:underline flex items-center gap-1 font-medium"
                      >
                        <span>Track Order & Invoice</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-12 object-cover rounded-lg bg-black/40 border border-zinc-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <h4 className="font-semibold text-zinc-200 truncate">{item.name}</h4>
                          <p className="text-zinc-400 text-[11px]">
                            {item.selectedColor || item.color} • {item.selectedSize || 'Standard'} • Qty: {item.quantity}
                          </p>
                          {item.lens && (
                            <span className="text-[10px] text-[#D4AF87]">
                              Lens: {item.lens.name}
                            </span>
                          )}
                        </div>
                        <span className="font-serif-luxury text-sm font-semibold text-[#D4AF87]">
                          ₹{((item.price + (item.lens?.price || 0)) * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-3 border-t border-[#27272A]/70 text-zinc-400 gap-2">
                    <div>
                      <span>Delivery: </span>
                      <strong className="text-zinc-200">
                        {order.shippingAddress?.street}, {order.shippingAddress?.city}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span>Total Paid: </span>
                      <strong className="font-serif-luxury text-base text-[#D4AF87]">
                        ₹{order.pricing?.grandTotal?.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Saved Delivery Addresses</h3>
                <p className="text-xs text-zinc-400">Used for auto-filling express courier shipments</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddAddressModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF87] text-[#090909] font-bold text-xs uppercase tracking-wider transition hover:bg-[#C59F77] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.addresses?.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-5 rounded-2xl bg-[#141417] border space-y-3 ${
                    addr.isDefault ? 'border-[#D4AF87]' : 'border-[#27272A]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                        {addr.tag}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-[#D4AF87]/20 text-[#D4AF87] px-2 py-0.5 rounded-full font-medium">
                          Default Address
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCustomerAddress(addr.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer"
                      title="Delete address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs text-zinc-300 space-y-0.5">
                    <p className="font-semibold text-zinc-100">{addr.name}</p>
                    <p className="text-zinc-400">{addr.street}</p>
                    <p className="text-zinc-400">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-zinc-400">Phone: {addr.phone}</p>
                  </div>

                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefaultCustomerAddress(addr.id)}
                      className="text-xs text-[#D4AF87] hover:underline cursor-pointer font-medium pt-1 block"
                    >
                      Set as Default Shipping Address
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Saved Wishlist Frames</h3>
              <p className="text-xs text-zinc-400">Frames you have favorited for future purchases or clinic trial</p>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#141417] border border-[#27272A] rounded-2xl p-8 space-y-3">
                <Heart className="w-10 h-10 text-zinc-600 mx-auto" />
                <h4 className="font-serif-luxury text-xl text-[#FAF7F0]">No Frames in Wishlist</h4>
                <p className="text-xs text-zinc-400">
                  Click the heart icon on any product in our store to save it here.
                </p>
                <Link
                  to="/catalog"
                  className="inline-block bg-[#D4AF87] text-[#090909] font-bold text-xs uppercase px-6 py-2.5 rounded-full mt-2"
                >
                  Browse Frames
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-[#141417] border border-[#27272A] space-y-3 flex flex-col justify-between"
                  >
                    <Link to={`/product/${p.id}`} className="aspect-[4/3] rounded-xl bg-[#18181B] overflow-hidden block">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition" />
                    </Link>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#D4AF87] uppercase text-[10px] font-semibold">{p.brand}</span>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(p.id)}
                          className="text-zinc-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <Link to={`/product/${p.id}`} className="text-sm font-semibold text-[#FAF7F0] hover:text-[#D4AF87] truncate block">
                        {p.name}
                      </Link>
                      <p className="text-xs text-zinc-400">{p.material} • {p.shape}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#27272A]">
                      <span className="font-serif-luxury text-base text-[#D4AF87] font-semibold">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(p)}
                        className="px-3.5 py-1.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] text-xs font-bold rounded-lg transition"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PRESCRIPTIONS (CLINIC EMR) */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Clinical Eye Prescriptions (EMR)</h3>
              <p className="text-xs text-zinc-400">
                Verified prescription records from Dr. S. Anand Eye Examination Clinic in Kallakurichi
              </p>
            </div>

            {prescriptionRecords.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-3 text-xs text-zinc-300">
                <p>
                  No active in-clinic prescriptions found for <strong>{user.name}</strong>.
                </p>
                <p className="text-zinc-400">
                  Book a computerized 3D refraction eye test at our Kallakurichi clinic or schedule a free Doorstep Home Eye Test to have your prescription automatically synced here.
                </p>
                <div className="pt-2">
                  <Link
                    to="/#appointment"
                    className="inline-block bg-[#D4AF87] text-[#090909] font-bold text-xs uppercase px-6 py-2.5 rounded-full"
                  >
                    Book Eye Examination
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {prescriptionRecords.map((rx) => (
                  <div key={rx.id} className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#27272A] pb-3 text-xs">
                      <div>
                        <span className="font-mono text-[#D4AF87] font-semibold text-sm">{rx.id}</span>
                        <span className="text-zinc-400 ml-2">Consultant: {rx.doctor}</span>
                      </div>
                      <span className="text-zinc-500 font-mono">Date: {rx.date}</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-[#27272A] text-zinc-400">
                            <th className="py-2">Eye</th>
                            <th className="py-2">Sphere</th>
                            <th className="py-2">Cylinder</th>
                            <th className="py-2">Axis</th>
                            <th className="py-2">Add</th>
                            <th className="py-2">Visual Acuity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272A]/50 text-zinc-200">
                          <tr>
                            <td className="py-2 font-semibold text-[#D4AF87]">OD (Right)</td>
                            <td className="py-2">{rx.od?.sph}</td>
                            <td className="py-2">{rx.od?.cyl}</td>
                            <td className="py-2">{rx.od?.axis}°</td>
                            <td className="py-2">{rx.od?.add || '-'}</td>
                            <td className="py-2 text-emerald-400 font-mono">{rx.od?.va}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold text-[#D4AF87]">OS (Left)</td>
                            <td className="py-2">{rx.os?.sph}</td>
                            <td className="py-2">{rx.os?.cyl}</td>
                            <td className="py-2">{rx.os?.axis}°</td>
                            <td className="py-2">{rx.os?.add || '-'}</td>
                            <td className="py-2 text-emerald-400 font-mono">{rx.os?.va}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 bg-[#18181B] rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1">
                      <p><strong>Recommended Lens:</strong> {rx.lensType}</p>
                      <p><strong>Dispensed Frame:</strong> {rx.frameDispensed} • Pupillary Distance: {rx.pd}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-xl p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-6">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Personal Profile</h3>
                <p className="text-xs text-zinc-400">Manage your contact credentials and preferences</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs text-[#D4AF87] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-zinc-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Full Name</span>
                  <span className="font-semibold text-zinc-100">{user.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Email</span>
                  <span className="font-semibold text-zinc-100">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Phone</span>
                  <span className="font-semibold text-zinc-100">{user.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Preferred Clinic Branch</span>
                  <span className="text-[#D4AF87] font-semibold">Kallakurichi Head Showroom</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#141417] border border-[#D4AF87]/60 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Add Delivery Address</h3>
              <button
                type="button"
                onClick={() => setShowAddAddressModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3">
              <div>
                <label className="text-zinc-400 block mb-1">Tag (Home / Office / Other)</label>
                <input
                  type="text"
                  value={newAddr.tag}
                  onChange={(e) => setNewAddr({ ...newAddr, tag: e.target.value })}
                  placeholder="Home"
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  placeholder="Plot 10, Main Street"
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer mt-2"
              >
                Save Delivery Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
