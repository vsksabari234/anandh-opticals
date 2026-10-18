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
      subtitle: 'Starting ₹1,650',
      badge: 'Signature',
      badgeColor: 'bg-[#D4AF87]/20 text-[#D4AF87] border-[#D4AF87]/40',
      icon: Glasses,
      image: '/src/assets/images/frame_titanium_black_1791952478324.jpg',
      action: () => handleSelectCategory('Eyeglasses')
    },
    {
      id: 'Computer Glasses',
      title: 'Screen Glasses',
      subtitle: 'Blue-Shield Pro',
      badge: 'Zero Power',
      badgeColor: 'bg-[#D4AF87]/20 text-[#D4AF87] border-[#D4AF87]/40',
      icon: Laptop,
      image: '/src/assets/images/frame_wayfarer_blue_1791952518846.jpg',
      action: () => handleSelectCategory('Computer Glasses')
    },
    {
      id: 'Sunglasses',
      title: 'Sunglasses',
      subtitle: 'UV400 Polarized',
      badge: 'Sun Shield',
      badgeColor: 'bg-[#D4AF87]/20 text-[#D4AF87] border-[#D4AF87]/40',
      icon: Sun,
      image: '/src/assets/images/frame_aviator_sunglass_1791952477672.jpg',
      action: () => handleSelectCategory('Sunglasses')
    },
    {
      id: 'Rimless',
      title: 'Air Titanium',
      subtitle: 'Ultra Light 7.2g',
      badge: 'Rimless',
      badgeColor: 'bg-[#D4AF87]/20 text-[#D4AF87] border-[#D4AF87]/40',
      icon: Award,
      image: '/src/assets/images/frame_rimless_titanium_1791952999496.jpg',
      action: () => handleSelectCategory('Rimless')
    },
    {
      id: 'Kids Eyewear',
      title: 'Kids Eyewear',
      subtitle: 'Unbreakable TR90',
      badge: 'Safe Flex',
      badgeColor: 'bg-[#D4AF87]/20 text-[#D4AF87] border-[#D4AF87]/40',
      icon: Smile,
      image: '/src/assets/images/frame_kids_flexible_1791953023678.jpg',
      action: () => handleSelectCategory('Kids Eyewear')
    },
    {
      id: 'HomeEyeTest',
      title: 'Doorstep Exam',
      subtitle: '100+ Frames @ Home',
      badge: 'Free Visit',
      badgeColor: 'bg-[#D4AF87]/20 text-[#D4AF87] border-[#D4AF87]/40',
      icon: Home,
      image: null,
      action: () => setIsHomeEyeTestOpen(true)
    },
    {
      id: 'Virtual3D',
      title: '3D Try-On',
      subtitle: 'Camera / AI Face Fit',
      badge: 'Live AR',
      badgeColor: 'bg-[#D4AF87]/20 text-[#D4AF87] border-[#D4AF87]/40',
      icon: Sparkles,
      image: null,
      action: () => setIsTryOnModalOpen(true)
    }
  ];

  return (
    <div className="w-full bg-[#121214] border-b border-[#27272A] py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={cat.action}
                className="group shrink-0 flex items-center gap-3 p-2.5 pr-4 rounded-2xl bg-[#18181B] hover:bg-[#202024] border border-[#27272A] hover:border-[#D4AF87]/60 transition-all duration-200 text-left cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-11 h-11 rounded-xl bg-black/40 flex items-center justify-center p-1 border border-zinc-800 group-hover:border-[#D4AF87]/40 overflow-hidden shrink-0">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#D4AF87]">
                      <Icon className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Text & Mini Badge */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-[#FAF7F0] group-hover:text-[#D4AF87] transition">
                      {cat.title}
                    </span>
                    {cat.badge && (
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full border ${cat.badgeColor}`}
                      >
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 block truncate mt-0.5">
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
