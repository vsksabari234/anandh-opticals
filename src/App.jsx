import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import VisionLabPage from './pages/VisionLabPage';
import DoctorPortal from './pages/DoctorPortal';
import ContactPage from './pages/ContactPage';
import VirtualTryOn from './components/VirtualTryOn';
import VisionTestModal from './components/VisionTestModal';
import AppointmentModal from './components/AppointmentModal';
import LensCalculator from './components/LensCalculator';
import CartDrawer from './components/CartDrawer';
import HomeEyeTestModal from './components/HomeEyeTestModal';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const { isCartOpen, setIsCartOpen } = useStore();

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100 flex flex-col selection:bg-[#D4AF87] selection:text-black">
      <ScrollToTop />
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/order/:orderId" element={<OrderSuccessPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/vision-lab" element={<VisionLabPage />} />
          <Route path="/doctor" element={<DoctorPortal />} />
          <Route path="/doctor-portal" element={<DoctorPortal />} />
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
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </StoreProvider>
  );
}
