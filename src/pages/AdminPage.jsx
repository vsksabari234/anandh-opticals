import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShieldAlert,
  ShieldCheck,
  Package,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Lock,
  Unlock,
  Eye,
  Filter,
  Glasses,
  Printer,
  ChevronDown,
  Building2,
  RefreshCw
} from 'lucide-react';

export default function AdminPage() {
  const {
    products,
    updateProductStock,
    addNewProduct,
    orders,
    updateOrderStatus,
    cancelOrder,
    isAdminAuth,
    adminLogin,
    adminLogout,
    showToast
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'inventory', 'analytics'
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // New Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    brand: 'Anand Signature',
    shape: 'Rectangle',
    type: 'Eyeglasses',
    gender: 'Unisex',
    material: 'Pure Titanium',
    color: 'Midnight Matte Black',
    price: 2999,
    originalPrice: 3800,
    stock: 12,
    image: '/src/assets/images/frame_titanium_black_1791952478324.jpg',
    description: 'Masterfully hand-finished optical frame designed for long-wear optical precision.',
    bridgeWidth: 18,
    lensWidth: 52,
    templeLength: 140
  });

  // Tracking number edit state
  const [editingTrackingOrderId, setEditingTrackingOrderId] = useState(null);
  const [newTrackingNumber, setNewTrackingNumber] = useState('');

  // PIN Authentication Gate
  if (!isAdminAuth) {
    return (
      <div className="min-h-[85vh] bg-[#090909] text-zinc-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#141417] border border-[#D4AF87]/50 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#18181B] border border-[#D4AF87] text-[#D4AF87] flex items-center justify-center mx-auto shadow-xl">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block">
              Restricted Operations
            </span>
            <h2 className="font-serif-luxury text-3xl text-[#FAF7F0]">
              Store Administrator Gateway
            </h2>
            <p className="text-xs text-zinc-400">
              Enter administrative security PIN to access inventory, orders, and fulfillment operations.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin(pinInput);
            }}
            className="space-y-4"
          >
            <input
              type="password"
              autoFocus
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Security PIN (hint: anand2026)"
              className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-4 py-3 text-center text-sm font-mono tracking-widest text-[#D4AF87] focus:outline-none focus:border-[#D4AF87]"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg"
            >
              Unlock Administration Suite
            </button>
          </form>

          <div className="text-[11px] text-zinc-500 pt-2 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF87]" />
            <span>Authorized staff only • Default PIN: anand2026</span>
          </div>
        </div>
      </div>
    );
  }

  // Analytics Calculations
  const totalRevenue = orders.reduce((sum, o) => {
    return o.status !== 'cancelled' ? sum + (o.pricing?.grandTotal || 0) : sum;
  }, 0);

  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockCount = products.filter(p => (p.stock || 0) < 10).length;

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter !== 'all' && order.status !== orderStatusFilter) return false;
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const match =
        order.id.toLowerCase().includes(q) ||
        order.customer?.name?.toLowerCase().includes(q) ||
        order.customer?.phone?.includes(q) ||
        order.trackingNumber?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    addNewProduct(newProd);
    setShowAddProductModal(false);
  };

  const handleSaveTracking = (orderId) => {
    updateOrderStatus(orderId, 'dispatched', newTrackingNumber);
    setEditingTrackingOrderId(null);
    setNewTrackingNumber('');
  };

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#D4AF87] selection:text-black pb-24">
      
      {/* Admin Top Header */}
      <div className="border-b border-[#27272A]/80 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#D4AF87]/60 text-[#D4AF87] flex items-center justify-center font-bold">
              AO
            </div>
            <div>
              <span className="text-[#D4AF87] uppercase text-[10px] font-semibold tracking-[0.25em] block">
                Administrative Operations Suite
              </span>
              <h1 className="font-serif-luxury text-2xl text-[#FAF7F0]">
                E-Commerce Store & Inventory Manager
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/doctor-portal"
              className="text-xs text-zinc-400 hover:text-[#D4AF87] border border-zinc-800 bg-[#18181B] px-3.5 py-2 rounded-xl transition"
            >
              Doctor & EMR Queue →
            </Link>

            <button
              type="button"
              onClick={adminLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-xs text-zinc-300 transition cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
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
            <span>Fulfillment & Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`py-3.5 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-[#D4AF87] text-[#D4AF87]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>Product Inventory ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 border-b-2 font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-[#D4AF87] text-[#D4AF87]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Sales & Revenue Analytics</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400">Total Net Revenue</span>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#D4AF87]">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-400">All completed orders</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400">Total Orders</span>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-zinc-100">
              {totalOrdersCount}
            </div>
            <span className="text-[10px] text-zinc-500">Live order records</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400">Avg. Order Value</span>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-zinc-100">
              ₹{avgOrderValue.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-zinc-500">Per patient/customer</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400">Low Stock Alerts</span>
            <div className={`font-serif-luxury text-2xl sm:text-3xl font-bold ${lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {lowStockCount}
            </div>
            <span className="text-[10px] text-zinc-500">Frames with &lt; 10 units</span>
          </div>
        </div>

        {/* TAB 1: ORDERS FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#141417] p-4 rounded-2xl border border-[#27272A]">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="Search by Order ID, customer name, mobile..."
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl px-3.5 py-2 pl-9 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF87]"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-zinc-400" />
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-[#18181B] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing_in_lab">Lab Processing</option>
                  <option value="quality_checked">Quality Checked</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#27272A] bg-[#141417]">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-[#18181B] border-b border-[#27272A] text-zinc-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Order ID & Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total & Payment</th>
                    <th className="p-4">Fulfillment Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A]/70">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-zinc-500">
                        No orders match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition">
                        <td className="p-4 align-top">
                          <Link to={`/order/${order.id}`} className="font-mono font-bold text-[#D4AF87] hover:underline block">
                            {order.id}
                          </Link>
                          <span className="text-[10px] text-zinc-500 block">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </td>

                        <td className="p-4 align-top">
                          <span className="font-semibold text-zinc-200 block">{order.customer?.name}</span>
                          <span className="text-[11px] text-zinc-400 block">{order.customer?.phone}</span>
                          <span className="text-[10px] text-zinc-500 block truncate max-w-[150px]">
                            {order.shippingAddress?.city}, {order.shippingAddress?.pincode}
                          </span>
                        </td>

                        <td className="p-4 align-top space-y-1">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="text-[11px] text-zinc-300">
                              <span>{item.quantity}x {item.name}</span>
                              {item.lens && (
                                <span className="block text-[10px] text-[#D4AF87]">
                                  + {item.lens.name}
                                </span>
                              )}
                            </div>
                          ))}
                        </td>

                        <td className="p-4 align-top">
                          <span className="font-serif-luxury text-sm font-bold text-[#D4AF87] block">
                            ₹{order.pricing?.grandTotal?.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] uppercase font-mono text-emerald-400">
                            {order.paymentStatus}
                          </span>
                        </td>

                        <td className="p-4 align-top space-y-1.5">
                          {/* Status Dropdown */}
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-[#18181B] border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="processing_in_lab">Lab Cutting</option>
                            <option value="quality_checked">Quality Checked</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          {order.trackingNumber && (
                            <span className="text-[10px] text-zinc-400 block font-mono">
                              DTDC: {order.trackingNumber}
                            </span>
                          )}
                        </td>

                        <td className="p-4 align-top text-right space-y-1.5">
                          <Link
                            to={`/order/${order.id}`}
                            className="inline-block text-xs text-[#D4AF87] hover:underline"
                          >
                            View Receipt
                          </Link>

                          {order.status !== 'cancelled' && (
                            <button
                              type="button"
                              onClick={() => cancelOrder(order.id, 'Cancelled by Admin')}
                              className="block text-[11px] text-rose-400 hover:underline ml-auto cursor-pointer"
                            >
                              Cancel & Restock
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: INVENTORY & PRODUCT CREATION */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Frames & Lens Inventory</h3>
                <p className="text-xs text-zinc-400">Live catalogue stock counts with instant adjustments</p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF87] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#C59F77] transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Eyewear</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#27272A] bg-[#141417]">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-[#18181B] border-b border-[#27272A] text-zinc-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Frame</th>
                    <th className="p-4">Brand & Category</th>
                    <th className="p-4">Material / Shape</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Current Stock</th>
                    <th className="p-4 text-right">Quick Stock Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A]/70">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/[0.02] transition">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-10 object-cover rounded-lg bg-black/40 border border-zinc-800"
                        />
                        <div>
                          <span className="font-semibold text-zinc-200 block truncate max-w-[200px]">
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">#{prod.id}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="text-xs font-medium text-zinc-200 block">{prod.brand}</span>
                        <span className="text-[10px] text-zinc-400">{prod.type} • {prod.gender}</span>
                      </td>

                      <td className="p-4">
                        <span className="text-xs text-zinc-200 block">{prod.material}</span>
                        <span className="text-[10px] text-zinc-400">{prod.shape}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-serif-luxury text-sm font-semibold text-[#D4AF87]">
                          ₹{prod.price?.toLocaleString('en-IN')}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-block ${
                            (prod.stock || 0) <= 0
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                              : (prod.stock || 0) < 10
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {prod.stock || 0} Units
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5 bg-[#18181B] p-1 rounded-xl border border-zinc-800">
                          <button
                            type="button"
                            onClick={() => updateProductStock(prod.id, -1)}
                            className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs rounded text-zinc-300"
                            title="Decrement 1"
                          >
                            -1
                          </button>
                          <button
                            type="button"
                            onClick={() => updateProductStock(prod.id, 5)}
                            className="px-2 py-1 bg-[#D4AF87]/15 hover:bg-[#D4AF87]/30 text-xs rounded text-[#D4AF87] font-semibold"
                            title="Add 5 units"
                          >
                            +5
                          </button>
                          <button
                            type="button"
                            onClick={() => updateProductStock(prod.id, 10)}
                            className="px-2 py-1 bg-[#D4AF87]/20 hover:bg-[#D4AF87]/40 text-xs rounded text-[#D4AF87] font-semibold"
                            title="Add 10 units"
                          >
                            +10
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ANALYTICS & REVENUE */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0] border-b border-[#27272A] pb-3">
                Top Selling Frames
              </h3>
              <div className="space-y-3">
                {products.slice(0, 5).map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 text-center font-bold text-[#D4AF87]">#{i + 1}</span>
                      <span className="font-semibold text-zinc-200">{p.name}</span>
                    </div>
                    <span className="font-mono text-[#D4AF87] font-bold">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0] border-b border-[#27272A] pb-3">
                Store Operations Notice
              </h3>
              <div className="space-y-2 text-xs text-zinc-300">
                <p>
                  Orders placed through the Anand Opticals marketplace directly sync with the in-store optical lab.
                </p>
                <p className="text-zinc-400">
                  Prescription lenses are cut using automated bevel edgers in our Kallakurichi branch and verified with digital focimeters before packing.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#141417] border border-[#D4AF87]/60 rounded-2xl p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h3 className="font-serif-luxury text-xl text-[#FAF7F0]">Add New Eyewear to Store</h3>
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="text-zinc-400 block mb-1">Model Name *</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Sovereign Pure Titanium Round"
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">Brand</label>
                  <select
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                  >
                    <option value="Anand Signature">Anand Signature</option>
                    <option value="Vogue Elegance">Vogue Elegance</option>
                    <option value="Ray-Ban Classic">Ray-Ban Classic</option>
                    <option value="Titan Eyewear">Titan Eyewear</option>
                    <option value="Anand Heritage">Anand Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Shape</label>
                  <select
                    value={newProd.shape}
                    onChange={(e) => setNewProd({ ...newProd, shape: e.target.value })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                  >
                    <option value="Rectangle">Rectangle</option>
                    <option value="Round">Round</option>
                    <option value="Cat-Eye">Cat-Eye</option>
                    <option value="Aviator">Aviator</option>
                    <option value="Geometric">Geometric</option>
                    <option value="Wayfarer">Wayfarer</option>
                    <option value="Rimless">Rimless</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Material</label>
                <input
                  type="text"
                  value={newProd.material}
                  onChange={(e) => setNewProd({ ...newProd, material: e.target.value })}
                  placeholder="e.g. Japanese Beta Titanium"
                  className="w-full bg-[#18181B] border border-zinc-700 rounded-xl p-2.5 text-zinc-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF87] hover:bg-[#C59F77] text-[#090909] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer mt-2"
              >
                Add Eyewear to Catalogue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
