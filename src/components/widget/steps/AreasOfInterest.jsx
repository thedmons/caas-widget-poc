// Optional pre-form step: customer self-selects areas of interest
// when a service category contains multiple subcategory options.
// Selection captured as a lead attribute in the CRM payload.

import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/Button';

// Pastel background colors for AOI tiles (cycled)
const TILE_COLORS = [
  'bg-blue-100 border-blue-200',
  'bg-sky-100 border-sky-200',
  'bg-indigo-100 border-indigo-200',
  'bg-violet-100 border-violet-200',
  'bg-slate-100 border-slate-200',
];

export function AreasOfInterest({ config, onProceed }) {
  const [selected, setSelected] = useState([]);
  const items = config?.areasOfInterest ?? [];

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">What are you most interested in?</h2>
        <p className="text-sm text-slate-500 mt-1">
          Select all that apply — we'll use this to personalize your experience.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {items.map((item, idx) => {
          const isSelected = selected.includes(item.id);
          const colorClass = TILE_COLORS[idx % TILE_COLORS.length];
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={[
                'relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2',
                'transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : `${colorClass} hover:border-blue-400`,
              ].join(' ')}
            >
              {/* Placeholder for future image support from CAAS config */}
              <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center text-xl">
                {getEmoji(item.id)}
              </div>
              <span className="text-sm font-medium text-slate-800 text-center leading-tight">
                {item.label}
              </span>
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Button fullWidth size="lg" onClick={() => onProceed(selected)}>
        {selected.length === 0 ? 'Skip & Continue' : 'Continue'}
      </Button>
    </div>
  );
}

// Simple emoji mapping for POC visual polish (images would come from CAAS in production)
function getEmoji(id) {
  const map = {
    'vinyl-plank': '🟫',
    hardwood:      '🪵',
    carpet:        '🧶',
    tile:          '⬜',
    laminate:      '📋',
    blinds:        '🪟',
    shades:        '🌫️',
    shutters:      '🏠',
    curtains:      '🎭',
  };
  return map[id] ?? '✦';
}
