import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_APPOINTMENTS, INITIAL_PATIENTS } from '../data/initialData';

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
      return parsed.map(item => {
        const initial = INITIAL_PRODUCTS.find(p => p.id === item.id);
        return { ...item, image: item.image || initial?.image || INITIAL_PRODUCTS[0].image };
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

  // Cart operations
  const addToCart = (product, lensSelection = null) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.lensId === (lensSelection?.id || 'none'));
      if (existing) {
        showToast(`Updated quantity for ${product.name}`);
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      showToast(`Added ${product.name} to cart`);
      return [...prev, {
        ...product,
        lens: lensSelection,
        lensId: lensSelection?.id || 'none',
        quantity: 1
      }];
    });
  };

  const removeFromCart = (id, lensId) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.lensId === lensId)));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQty = (id, lensId, qty) => {
    if (qty <= 0) {
      removeFromCart(id, lensId);
      return;
    }
    setCart(prev => prev.map(item => item.id === id && item.lensId === lensId ? { ...item, quantity: qty } : item));
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
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 text-white border border-teal-500/40 shadow-2xl px-5 py-3.5 rounded-xl animate-fade-in backdrop-blur-md">
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'info' ? 'bg-cyan-400' : 'bg-emerald-400'} animate-ping`} />
          <span className="text-sm font-medium">{toast.message}</span>
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
