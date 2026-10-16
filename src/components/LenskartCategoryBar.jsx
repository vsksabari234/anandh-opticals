import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Layers,
  Glasses,
  Sun,
  Eye,
  Disc
} from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All', icon: Layers },
  { id: 'Frames', label: 'Frames', icon: Glasses },
  { id: 'Sunglasses', label: 'Sunglasses', icon: Sun },
  { id: 'Lenses', label: 'Lenses', icon: Eye },
  { id: 'Contact Lenses', label: 'Contact Lenses', icon: Disc }
];

export default function CategoryBar({ activeCategory, onChange, className = '' }) {
  const store = useStore();
  const [internalActive, setInternalActive] = useState('All');

  const currentActive = activeCategory !== undefined ? activeCategory : internalActive;

  const handleSelect = (catId) => {
    setInternalActive(catId);
    if (onChange) {
      onChange(catId);
    } else if (store && store.setQuickCategory) {
      // Map to store quick category conventions if no custom onChange is supplied
      if (catId === 'Frames') {
        store.setQuickCategory('Eyeglasses');
      } else if (catId === 'Sunglasses') {
        store.setQuickCategory('Sunglasses');
      } else {
        store.setQuickCategory(catId);
      }
    }
  };

  return (
    <div className={`w-full bg-white border-b border-sky-100 shadow-xs py-3 px-4 sm:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none pb-0.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = currentActive === cat.id || currentActive === cat.label;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat.id)}
                className={`group shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-200'
                    : 'bg-slate-50 hover:bg-sky-50/80 text-slate-700 hover:text-sky-900 border-slate-200/80 hover:border-sky-300'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-sky-600'
                  }`}
                />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
