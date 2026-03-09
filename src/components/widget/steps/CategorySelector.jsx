// ─── Combined Category + Subcategory Selector ─────────────────────────────────
// Redesigned to match wireframe: horizontal pill tabs for category filtering,
// inline tile buttons for subcategory selection (grouped by category label).
//
// For hub placement:   shows all 7 category tabs + all subcategory groups.
// For dept placement:  preCategory is set, only that category's subs are shown.
//
// Replaces the two-step CategorySelector → SubcategorySelector flow.
// Dispatches SELECT_SERVICE with both category + subcategory objects.

import { useState } from 'react';
import {
  LayoutGrid,
  Layers,
  Refrigerator,
  Gem,
  AlignJustify,
  Thermometer,
  Zap,
  Droplets,
} from 'lucide-react';
import { CATEGORIES } from '../../../data/categories';
import { Button } from '../../ui/Button';

// ── Icon mapping by category id ───────────────────────────────────────────────
const CATEGORY_ICONS = {
  all:                LayoutGrid,
  flooring:           Layers,
  appliances:         Refrigerator,
  countertops:        Gem,
  'window-treatments': AlignJustify,
  hvac:               Thermometer,
  electrical:         Zap,
  plumbing:           Droplets,
};

export function CategorySelector({ onSelect, preCategory, placement }) {
  // Scoped category (dept/service placement)
  const scopedCat = preCategory
    ? CATEGORIES.find((c) => c.slug === preCategory)
    : null;

  // Active tab — default to scoped category or 'all'
  const [activeTab, setActiveTab] = useState(scopedCat?.id ?? 'all');
  const [selectedSub, setSelectedSub] = useState(null);

  // Which category groups to render in the tile grid
  const visibleCats = activeTab === 'all'
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.id === activeTab);

  const handleContinue = () => {
    if (!selectedSub) return;
    const parentCat = CATEGORIES.find((c) =>
      c.subcategories.some((s) => s.id === selectedSub.id)
    );
    onSelect(parentCat, selectedSub);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-slate-900">
          {scopedCat ? `Select a ${scopedCat.label} service` : 'What can we install for you?'}
        </h2>
        {!scopedCat && (
          <p className="text-xs text-slate-500 mt-0.5">
            Select a category then choose your specific service.
          </p>
        )}
      </div>

      {/* ── Category tabs (hub only) ─────────────────────────────────────── */}
      {!scopedCat && (
        <div className="flex gap-2 overflow-x-auto py-2 -mx-1 px-1 scrollbar-hide">
          <CategoryTab
            id="all"
            label="All"
            active={activeTab === 'all'}
            onClick={() => { setActiveTab('all'); setSelectedSub(null); }}
          />
          {CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat.id}
              id={cat.id}
              label={cat.label}
              active={activeTab === cat.id}
              onClick={() => { setActiveTab(cat.id); setSelectedSub(null); }}
            />
          ))}
        </div>
      )}

      {/* ── Subcategory tile groups ─────────────────────────────────────── */}
      <div className="overflow-y-auto max-h-[280px] flex flex-col gap-4 px-1 py-1">
        {visibleCats.map((cat) => (
          <div key={cat.id}>
            {/* Category heading — shown when multiple groups are visible */}
            {(!scopedCat || visibleCats.length > 1) && (
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                {cat.label}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {cat.subcategories.map((sub) => {
                const isSelected = selectedSub?.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSub(sub)}
                    className={[
                      'px-3 py-1.5 text-xs rounded-full border-2 font-medium transition-all duration-100',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50',
                    ].join(' ')}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Continue CTA ────────────────────────────────────────────────── */}
      <div className="pt-2 border-t border-slate-100">
        <Button
          className="w-1/2"
          size="md"
          onClick={handleContinue}
          disabled={!selectedSub}
        >
          {selectedSub ? `Continue with ${selectedSub.label}` : 'Select a service to continue'}
        </Button>
      </div>
    </div>
  );
}

// ── Category pill tab ──────────────────────────────────────────────────────────
function CategoryTab({ id, label, active, onClick }) {
  const Icon = CATEGORY_ICONS[id];
  return (
    <button
      key={id}
      onClick={onClick}
      className={[
        'shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border font-medium',
        'transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
        active
          ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50',
      ].join(' ')}
    >
      {Icon && <Icon size={11} />}
      {label}
    </button>
  );
}
