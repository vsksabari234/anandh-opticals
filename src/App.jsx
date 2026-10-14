import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import VisionLabPage from './pages/VisionLabPage';
import DoctorPortal from './pages/DoctorPortal';
import ContactPage from './pages/ContactPage';
import VirtualTryOn from './components/VirtualTryOn';
import VisionTestModal from './components/VisionTestModal';
import AppointmentModal from './components/AppointmentModal';
import LensCalculator from './components/LensCalculator';
import CartDrawer from './components/CartDrawer';
import HomeEyeTestModal from './components/HomeEyeTestModal';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-sky-500 selection:text-white">
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/vision-lab" element={<VisionLabPage />} />
              <Route path="/doctor" element={<DoctorPortal />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          {/* Interactive Global Modals */}
          <VirtualTryOn />
          <VisionTestModal />
          <AppointmentModal />
          <LensCalculator />
          <HomeEyeTestModal />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
