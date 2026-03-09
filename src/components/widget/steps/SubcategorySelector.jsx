// Step 2 — Select subcategory / service type within a category
// Triggers the CAAS API call to load service config.

import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../../data/categories';

export function SubcategorySelector({ selectedCategory, onSelect }) {
  // Determine which category's subs to show
  const cat = CATEGORIES.find((c) => c.id === (selectedCategory?.id ?? selectedCategory));
  const subcategories = cat?.subcategories ?? [];

  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          {cat ? `Select a ${cat.label} service` : 'Select a service'}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          We'll match you with the right installation experience.
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {subcategories.map((sub) => (
          <li key={sub.id}>
            <button
              onClick={() => onSelect(sub)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-slate-200
                         hover:border-blue-500 hover:bg-blue-50 text-left
                         transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
            >
              <span className="text-sm font-medium text-slate-900 group-hover:text-blue-800">
                {sub.label}
              </span>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
