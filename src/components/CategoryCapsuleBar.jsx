import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Home,
  Laptop,
  Smile,
  Sun,
  Glasses,
  Award
} from 'lucide-react';

export default function CategoryCapsuleBar() {
  const navigate = useNavigate();
  const {
    setQuickCategory,
    setIsHomeEyeTestOpen,
    setIsTryOnModalOpen
  } = useStore();

  const handleSelectCategory = (cat) => {
    setQuickCategory(cat);
    navigate('/catalog');
  };

  const categories = [
    {
      id: 'Eyeglasses',
      title: 'Eyeglasses',
      subtitle: 'Starting ₹1,499',
      badge: 'Best Seller',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      icon: Glasses,
      image: '/src/assets/images/frame_titanium_black_1791952478324.jpg',
      action: () => handleSelectCategory('Eyeglasses')
    },
    {
      id: 'Computer Glasses',
      title: 'Screen Glasses',
      subtitle: 'Zero Power Blu-Cut',
      badge: 'Anti-Glare',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      icon: Laptop,
      image: '/src/assets/images/frame_wayfarer_blue_1791952518846.jpg',
      action: () => handleSelectCategory('Computer Glasses')
    },
    {
      id: 'Kids Eyewear',
      title: 'Kids Glasses',
      subtitle: 'Unbreakable TR90',
      badge: 'Safe & Flex',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Smile,
      image: '/src/assets/images/frame_kids_flexible_1791953023678.jpg',
      action: () => handleSelectCategory('Kids Eyewear')
    },
    {
      id: 'Sunglasses',
      title: 'Sunglasses',
      subtitle: 'UV400 Polarized',
      badge: '100% UV Protection',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: Sun,
      image: '/src/assets/images/frame_aviator_sunglass_1791952477672.jpg',
      action: () => handleSelectCategory('Sunglasses')
    },
    {
      id: 'Rimless',
      title: 'Air Titanium',
      subtitle: 'Ultra Light 7g',
      badge: 'Pure Titanium',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: Award,
      image: '/src/assets/images/frame_rimless_titanium_1791952999496.jpg',
      action: () => handleSelectCategory('Rimless')
    },
    {
      id: 'HomeEyeTest',
      title: 'Home Eye-Test',
      subtitle: '100+ Frames @ Home',
      badge: '100% Free',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: Home,
      image: null,
      action: () => setIsHomeEyeTestOpen(true)
    },
    {
      id: 'Virtual3D',
      title: '3D Try On',
      subtitle: 'Real AR Face Fit',
      badge: 'Interactive',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      icon: Sparkles,
      image: null,
      action: () => setIsTryOnModalOpen(true)
    }
  ];

  return (
    <div className="w-full bg-white border-b border-sky-100 shadow-xs py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={cat.action}
                className="group shrink-0 flex items-center gap-3 p-2 pr-4 rounded-2xl bg-slate-50/70 hover:bg-sky-50/80 border border-slate-200/80 hover:border-sky-300 transition-all duration-200 shadow-2xs hover:shadow-xs text-left"
              >
                {/* Visual Thumbnail */}
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1 border border-slate-200/80 group-hover:border-sky-200 shadow-2xs overflow-hidden shrink-0">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-2xs"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Text & Mini Badge */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-xs text-slate-900 group-hover:text-sky-700 transition">
                      {cat.title}
                    </span>
                    {cat.badge && (
                      <span
                        className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md border ${cat.badgeColor}`}
                      >
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block truncate mt-0.5">
                    {cat.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
