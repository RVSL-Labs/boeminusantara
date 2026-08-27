import React from 'react';
import { useApp } from '../context/AppContext';
import { JurusanKey } from '../types';
import { 
  Car, 
  Zap, 
  Camera, 
  Utensils, 
  Wrench, 
  Layers 
} from 'lucide-react';

interface JurusanTab {
  key: JurusanKey;
  label: string;
  icon: React.ElementType;
}

const DEPARTMENTS: JurusanTab[] = [
  { key: 'all', label: 'Semua Jurusan', icon: Layers },
  { key: 'tkr-otomotif', label: 'Teknik Otomotif', icon: Car },
  { key: 'listrik-mekatronika', label: 'Listrik & Mekatronika', icon: Zap },
  { key: 'multimedia-dkv', label: 'Multimedia & DKV', icon: Camera },
  { key: 'tata-boga-hotel', label: 'Tata Boga & Kuliner', icon: Utensils },
  { key: 'pemesinan-las', label: 'Pemesinan & Las', icon: Wrench },
];

export const DepartmentFilter: React.FC = () => {
  const { selectedJurusan, setSelectedJurusan, products } = useApp();

  const getProductCount = (key: JurusanKey) => {
    if (key === 'all') return products.filter(p => p.is_active).length;
    return products.filter(p => p.is_active && p.category_slug === key).length;
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {DEPARTMENTS.map((dept) => {
          const Icon = dept.icon;
          const isActive = selectedJurusan === dept.key;
          const count = getProductCount(dept.key);

          return (
            <button
              key={dept.key}
              onClick={() => setSelectedJurusan(dept.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-navy-800 text-white border-navy-800 shadow-navy'
                  : 'bg-white text-ink-600 border-ink-200 hover:border-steel-300 hover:bg-steel-50 hover:text-steel-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white/80' : 'text-steel-500'}`} />
              <span>{dept.label}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'bg-ink-100 text-ink-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
