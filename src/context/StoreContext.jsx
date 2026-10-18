import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_APPOINTMENTS,
  INITIAL_PATIENTS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  DEFAULT_CUSTOMER
} from '../data/initialData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Language: 'en' or 'ta'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('ao_lang') || 'en';
  });

  // Products / Inventory
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ao_products');
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map(p => p.id));
      const missing = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
      const combined = [...parsed, ...missing];
      return combined.map(item => {
        const initial = INITIAL_PRODUCTS.find(p => p.id === item.id);
        const isHumanImage = item.image && (
          item.image.includes('hero_editorial_eyewear') ||
          item.image.includes('hero_woman_gold') ||
          item.image.includes('store_hero_eyewear') ||
          item.image.includes('model_')
        );
        const resolvedImage = (isHumanImage && initial?.image) ? initial.image : (item.image || initial?.image || INITIAL_PRODUCTS[0].image);
        return {
          ...item,
          badge: item.badge || initial?.badge,
          brand: initial?.brand || item.brand,
          image: resolvedImage,
          colorVariants: initial?.colorVariants || item.colorVariants
        };
      });
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ao_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ao_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Appointments (Dr. Queue)
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('ao_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Patients (Clinic EMR)
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('ao_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  // Active Modals & Selected items
  const [selectedTryOnProduct, setSelectedTryOnProduct] = useState(INITIAL_PRODUCTS[0]);
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  const [isVisionTestOpen, setIsVisionTestOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isLensCalcOpen, setIsLensCalcOpen] = useState(false);
  const [isHomeEyeTestOpen, setIsHomeEyeTestOpen] = useState(false);
  const [activeAppointmentService, setActiveAppointmentService] = useState('Computerized Eye Testing');

  // Home Eye Test Bookings (Doorstep Service)
  const [homeEyeTestBookings, setHomeEyeTestBookings] = useState(() => {
    const saved = localStorage.getItem('ao_home_eye_tests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'HET-901',
        name: 'Kavitha R.',
        phone: '+91 98421 88920',
        address: 'Salem Main Rd, Anna Nagar, Kallakurichi',
        date: '2026-10-16',
        slot: '11:00 AM - 1:00 PM',
        framesRequested: 'Women Designer & Blue Cut Lenses',
        status: 'Assigned (Dr. Anand Field Unit)'
      }
    ];
  });

  // Global search & quick category filter (nav to catalog)
  const [globalSearch, setGlobalSearch] = useState('');
  const [quickCategory, setQuickCategory] = useState('All');

  // Doctor Auth state (demo staff quick access)
  const [isDoctorAuth, setIsDoctorAuth] = useState(() => {
    return localStorage.getItem('ao_doc_auth') === 'true';
  });

  // Customer User Auth
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ao_user');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER;
  });

  // Orders State (Persistent marketplace orders)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ao_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Coupons
  const [coupons] = useState(INITIAL_COUPONS);
  const [activeCoupon, setActiveCoupon] = useState(null);

  // Admin Operations Auth (Security PIN: anand2026)
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return localStorage.getItem('ao_admin_auth') === 'true';
  });

  // Cart Drawer open/close state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const bookHomeEyeTest = (data) => {
    const booking = {
      id: `HET-${Date.now().toString().slice(-4)}`,
      date: data.date,
      slot: data.slot || '10:00 AM - 12:00 PM',
      name: data.name,
      phone: data.phone,
      address: data.address,
      framesRequested: data.framesRequested || 'Curated 100+ Frames',
      status: 'Confirmed (Free Home Visit)'
    };
    setHomeEyeTestBookings(prev => {
      const updated = [booking, ...prev];
      localStorage.setItem('ao_home_eye_tests', JSON.stringify(updated));
      return updated;
    });
    showToast(`🎉 Home Eye Test booked! Optometrist team will visit ${data.address} on ${data.date}.`);
    return booking;
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ao_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('ao_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ao_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ao_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ao_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ao_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('ao_doc_auth', isDoctorAuth ? 'true' : 'false');
  }, [isDoctorAuth]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ao_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ao_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ao_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ao_admin_auth', isAdminAuth ? 'true' : 'false');
  }, [isAdminAuth]);

  // Cart operations with variant & stock validation
  const addToCart = (product, options = {}) => {
    const lens = options && options.id ? options : options?.lens || null;
    const lensId = lens?.id || 'none';
    const selectedColor = options?.selectedColor || product.color;
    const selectedSize = options?.selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
    const rx = options?.rx || null;

    setCart(prev => {
      const existing = prev.find(item =>
        item.id === product.id &&
        item.lensId === lensId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
      );

      const currentStock = product.stock !== undefined ? product.stock : 10;

      if (existing) {
        if (existing.quantity >= currentStock) {
          showToast(`Only ${currentStock} frame(s) available in stock.`, 'info');
          return prev;
        }
        showToast(`Updated quantity for ${product.name}`);
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }

      if (currentStock <= 0) {
        showToast(`${product.name} is currently out of stock.`, 'info');
        return prev;
      }

      showToast(`Added ${product.name} (${selectedColor}) to your bag`);
      return [...prev, {
        ...product,
        lens,
        lensId,
        selectedColor,
        selectedSize,
        rx,
        quantity: 1,
        addedAt: Date.now()
      }];
    });
  };

  const removeFromCart = (id, lensId, selectedColor, selectedSize) => {
    setCart(prev => prev.filter(item => {
      if (selectedColor && selectedSize) {
        return !(item.id === id && item.lensId === lensId && item.selectedColor === selectedColor && item.selectedSize === selectedSize);
      }
      return !(item.id === id && item.lensId === lensId);
    }));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQty = (id, lensId, qty, selectedColor, selectedSize) => {
    if (qty <= 0) {
      removeFromCart(id, lensId, selectedColor, selectedSize);
      return;
    }
    const product = products.find(p => p.id === id);
    const maxStock = product?.stock !== undefined ? product.stock : 99;
    if (qty > maxStock) {
      showToast(`Only ${maxStock} in stock for this frame.`, 'info');
      return;
    }
    setCart(prev => prev.map(item => {
      const match = selectedColor && selectedSize
        ? (item.id === id && item.lensId === lensId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
        : (item.id === id && item.lensId === lensId);
      return match ? { ...item, quantity: qty } : item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupons
  const applyCoupon = (code) => {
    if (!code || !code.trim()) {
      showToast('Please enter a valid coupon code', 'info');
      return { success: false };
    }
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode);
    if (!found) {
      showToast(`Invalid coupon "${code}". Try ANANDGOLD or FESTIVE15.`, 'info');
      return { success: false };
    }
    setActiveCoupon(found);
    showToast(`Coupon ${found.code} applied! ${found.description}`);
    return { success: true, coupon: found };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Coupon removed');
  };

  // Trusted price calculation engine
  const calculateCartTotals = (customCart = cart, coupon = activeCoupon) => {
    const subtotal = customCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const lensTotal = customCart.reduce((sum, item) => sum + ((item.lens?.price || 0) * item.quantity), 0);
    const baseTotal = subtotal + lensTotal;

    let discount = 0;
    if (coupon) {
      if (coupon.minOrder && baseTotal < coupon.minOrder) {
        discount = 0;
      } else if (coupon.discountPercent) {
        discount = Math.round((baseTotal * coupon.discountPercent) / 100);
      } else if (coupon.flatDiscount) {
        discount = Math.min(coupon.flatDiscount, baseTotal);
      }
    }

    const discountedBase = Math.max(0, baseTotal - discount);
    const shipping = customCart.length === 0 || discountedBase >= 999 ? 0 : 99;
    const gst = Math.round(discountedBase * 0.12);
    const grandTotal = customCart.length === 0 ? 0 : discountedBase + shipping + gst;

    return {
      subtotal,
      lensTotal,
      baseTotal,
      discount,
      shipping,
      gst,
      grandTotal,
      itemCount: customCart.reduce((sum, i) => sum + i.quantity, 0)
    };
  };

  // Order processing
  const createOrder = (orderPayload) => {
    if (cart.length === 0) {
      showToast('Your bag is empty.', 'info');
      return null;
    }

    const totals = calculateCartTotals(cart, activeCoupon);

    // Validate inventory stock
    for (const item of cart) {
      const prod = products.find(p => p.id === item.id);
      if (prod && prod.stock < item.quantity) {
        showToast(`Sorry, ${item.name} only has ${prod.stock} left in stock.`, 'info');
        return null;
      }
    }

    // Safely deduct stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    }));

    const orderId = `AO-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: orderPayload.name || user?.name || 'Customer',
        email: orderPayload.email || user?.email || '',
        phone: orderPayload.phone || user?.phone || ''
      },
      shippingAddress: orderPayload.shippingAddress,
      deliveryMethod: orderPayload.deliveryMethod || 'express_courier',
      paymentMethod: orderPayload.paymentMethod || 'razorpay_upi',
      paymentStatus: orderPayload.paymentStatus || 'paid',
      transactionId: orderPayload.transactionId || `pay_Rzp${Date.now().toString().slice(-8)}`,
      items: [...cart],
      pricing: totals,
      status: 'confirmed',
      trackingNumber: `DTDC-TN-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-CA'),
      notes: orderPayload.notes || ''
    };

    setOrders(prev => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('ao_orders', JSON.stringify(updated));
      return updated;
    });

    clearCart();
    setActiveCoupon(null);
    showToast(`🎉 Order ${orderId} confirmed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, trackingNumber = '') => {
    setOrders(prev => {
      const updated = prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: newStatus,
            trackingNumber: trackingNumber || o.trackingNumber,
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      });
      localStorage.setItem('ao_orders', JSON.stringify(updated));
      return updated;
    });
    showToast(`Order ${orderId} updated to ${newStatus}`);
  };

  const cancelOrder = (orderId, reason = '') => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    if (targetOrder.status !== 'cancelled') {
      setProducts(prev => prev.map(p => {
        const orderItem = targetOrder.items.find(oi => oi.id === p.id);
        if (orderItem) {
          return { ...p, stock: p.stock + orderItem.quantity };
        }
        return p;
      }));
    }

    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? {
        ...o,
        status: 'cancelled',
        cancelReason: reason,
        cancelledAt: new Date().toISOString()
      } : o);
      localStorage.setItem('ao_orders', JSON.stringify(updated));
      return updated;
    });
    showToast(`Order ${orderId} cancelled and stock restored`, 'info');
  };

  // Auth & Profile
  const login = (email) => {
    const loggedUser = {
      ...DEFAULT_CUSTOMER,
      email: email || DEFAULT_CUSTOMER.email
    };
    setUser(loggedUser);
    localStorage.setItem('ao_user', JSON.stringify(loggedUser));
    showToast(`Welcome back, ${loggedUser.name}!`);
    return loggedUser;
  };

  const register = (data) => {
    const newUser = {
      id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'customer',
      defaultAddressId: 'ADDR-1',
      addresses: [
        {
          id: 'ADDR-1',
          name: data.name,
          phone: data.phone,
          street: data.street || 'Salem Main Road',
          city: data.city || 'Kallakurichi',
          state: 'Tamil Nadu',
          pincode: data.pincode || '606202',
          isDefault: true,
          tag: 'Home'
        }
      ]
    };
    setUser(newUser);
    localStorage.setItem('ao_user', JSON.stringify(newUser));
    showToast(`Welcome to Anand Opticals, ${newUser.name}!`);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ao_user');
    showToast('You have been logged out.');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('ao_user', JSON.stringify(updated));
      return updated;
    });
    showToast('Profile updated successfully');
  };

  const addCustomerAddress = (addr) => {
    const newAddr = {
      id: `ADDR-${Date.now().toString().slice(-4)}`,
      isDefault: false,
      tag: 'Other',
      ...addr
    };
    setUser(prev => {
      const addresses = [...(prev?.addresses || []), newAddr];
      const updated = { ...prev, addresses };
      localStorage.setItem('ao_user', JSON.stringify(updated));
      return updated;
    });
    showToast('New delivery address saved');
    return newAddr;
  };

  const removeCustomerAddress = (addrId) => {
    setUser(prev => {
      const addresses = (prev?.addresses || []).filter(a => a.id !== addrId);
      const updated = { ...prev, addresses };
      localStorage.setItem('ao_user', JSON.stringify(updated));
      return updated;
    });
    showToast('Address removed');
  };

  const setDefaultCustomerAddress = (addrId) => {
    setUser(prev => {
      const addresses = (prev?.addresses || []).map(a => ({
        ...a,
        isDefault: a.id === addrId
      }));
      const updated = { ...prev, addresses, defaultAddressId: addrId };
      localStorage.setItem('ao_user', JSON.stringify(updated));
      return updated;
    });
    showToast('Default delivery address updated');
  };

  const adminLogin = (pin) => {
    if (pin === 'anand2026' || pin === '1234') {
      setIsAdminAuth(true);
      localStorage.setItem('ao_admin_auth', 'true');
      showToast('Admin operations unlocked');
      return true;
    }
    showToast('Invalid Admin Security PIN (hint: anand2026)', 'info');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuth(false);
    localStorage.removeItem('ao_admin_auth');
    showToast('Admin logged out');
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from saved wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to saved wishlist! ❤️');
        return [...prev, productId];
      }
    });
  };

  // Launch try-on with specific frame
  const launchTryOn = (product) => {
    if (product) setSelectedTryOnProduct(product);
    setIsTryOnModalOpen(true);
  };

  // Book an appointment
  const bookAppointment = (appointmentData) => {
    const countToday = appointments.filter(a => a.date === appointmentData.date).length;
    const tokenNumber = `T-${String(countToday + 1).padStart(2, '0')}`;
    const newApt = {
      id: `APT-2026-${Date.now().toString().slice(-4)}`,
      ...appointmentData,
      tokenNumber,
      status: 'Confirmed',
      arrivedAt: ''
    };
    setAppointments(prev => [newApt, ...prev]);
    showToast(`Appointment booked successfully! Your Token is ${tokenNumber}`);
    return newApt;
  };

  // Update appointment status from Doctor Portal
  const updateAppointmentStatus = (aptId, newStatus, doctorNotes = '') => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === aptId) {
        return {
          ...apt,
          status: newStatus,
          doctorNotes: doctorNotes !== '' ? doctorNotes : apt.doctorNotes,
          arrivedAt: newStatus === 'In Examination' && !apt.arrivedAt ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : apt.arrivedAt
        };
      }
      return apt;
    }));
    showToast(`Appointment ${aptId} status updated to ${newStatus}`);
  };

  // Add prescription to patient
  const addPrescription = (patientId, newRx) => {
    const rxRecord = {
      id: `RX-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      doctor: "Dr. S. Anand",
      ...newRx
    };

    setPatients(prev => {
      const existingPatient = prev.find(p => p.id === patientId);
      if (existingPatient) {
        return prev.map(p => p.id === patientId ? {
          ...p,
          lastVisit: rxRecord.date,
          rxHistory: [rxRecord, ...p.rxHistory]
        } : p);
      } else {
        // Create new patient record
        const newPatientObj = {
          id: patientId || `P-${Date.now().toString().slice(-3)}`,
          name: newRx.patientName || 'Walk-in Patient',
          mobile: newRx.patientMobile || '+91 94400 00000',
          age: newRx.patientAge || 30,
          gender: newRx.patientGender || 'Unspecified',
          address: newRx.patientAddress || 'Kallakurichi',
          lastVisit: rxRecord.date,
          rxHistory: [rxRecord]
        };
        return [newPatientObj, ...prev];
      }
    });

    showToast(`Prescription ${rxRecord.id} generated and saved!`);
    return rxRecord;
  };

  // Inventory update
  const updateProductStock = (id, delta) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextStock = Math.max(0, p.stock + delta);
        return { ...p, stock: nextStock };
      }
      return p;
    }));
    showToast('Inventory stock updated');
  };

  const addNewProduct = (newProd) => {
    const prod = {
      id: `AO-${Date.now().toString().slice(-3)}`,
      rating: 5.0,
      reviewsCount: 1,
      stock: 10,
      ...newProd
    };
    setProducts(prev => [prod, ...prev]);
    showToast(`Product ${prod.name} added to catalog!`);
    return prod;
  };

  return (
    <StoreContext.Provider value={{
      lang,
      setLang,
      products,
      cart,
      wishlist,
      appointments,
      patients,
      selectedTryOnProduct,
      setSelectedTryOnProduct,
      isTryOnModalOpen,
      setIsTryOnModalOpen,
      isVisionTestOpen,
      setIsVisionTestOpen,
      isAppointmentModalOpen,
      setIsAppointmentModalOpen,
      isLensCalcOpen,
      setIsLensCalcOpen,
      isHomeEyeTestOpen,
      setIsHomeEyeTestOpen,
      homeEyeTestBookings,
      bookHomeEyeTest,
      globalSearch,
      setGlobalSearch,
      quickCategory,
      setQuickCategory,
      activeAppointmentService,
      setActiveAppointmentService,
      isDoctorAuth,
      setIsDoctorAuth,
      user,
      setUser,
      orders,
      coupons,
      activeCoupon,
      applyCoupon,
      removeCoupon,
      calculateCartTotals,
      createOrder,
      updateOrderStatus,
      cancelOrder,
      login,
      register,
      logout,
      updateUserProfile,
      addCustomerAddress,
      removeCustomerAddress,
      setDefaultCustomerAddress,
      isAdminAuth,
      adminLogin,
      adminLogout,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      toast,
      showToast,
      addToCart,
      removeFromCart,
      updateCartQty,
      toggleWishlist,
      launchTryOn,
      bookAppointment,
      updateAppointmentStatus,
      addPrescription,
      updateProductStock,
      addNewProduct
    }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#18181B] text-[#FAF7F0] border border-[#D4AF87]/50 shadow-2xl px-5 py-3.5 rounded-xl animate-fade-in backdrop-blur-md">
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'error' ? 'bg-rose-500' : toast.type === 'info' ? 'bg-sky-400' : 'bg-[#D4AF87]'} animate-pulse`} />
          <span className="text-sm font-sans tracking-wide text-zinc-100">{toast.message}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
}
