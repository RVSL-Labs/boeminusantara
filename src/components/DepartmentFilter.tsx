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
  { key: 'tkr-otomotif', label: 'Teknik Otomotif (TKR/TSM)', icon: Car },
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
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DEPARTMENTS.map((dept) => {
          const Icon = dept.icon;
          const isActive = selectedJurusan === dept.key;
          const count = getProductCount(dept.key);

          return (
            <button
              key={dept.key}
              onClick={() => setSelectedJurusan(dept.key)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
              <span>{dept.label}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
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
