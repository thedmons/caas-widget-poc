// Dev Control Panel — POC-only tool for switching placement context and service scenarios
// Not part of the widget itself; simulates what the CMS author would configure.

import { useState } from 'react';
import { Settings, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export function DevControlPanel({ value, onChange }) {
  const [open, setOpen] = useState(true);

  const {
    placement, preCategory, preSubcategory,
    forceUnavailable, forceError,
  } = value;

  const set = (patch) => onChange({ ...value, ...patch, _key: Date.now() });

  const selectedCat = CATEGORIES.find((c) => c.slug === preCategory);
  const subcategories = selectedCat?.subcategories ?? [];

  const handlePlacement = (p) => {
    set({
      placement: p,
      preCategory:    p === 'hub' ? null : (preCategory ?? CATEGORIES[0].slug),
      preSubcategory: p === 'service' ? (preSubcategory ?? CATEGORIES[0].subcategories[0].slug) : null,
    });
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden shadow-xl mb-6 border border-slate-700">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Settings size={15} className="text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">Dev Control Panel</span>
          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">POC only</span>
        </div>
        <span className="text-xs text-slate-500">{open ? '▲ collapse' : '▼ expand'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-700 pt-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

            {/* Placement mode */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">
                Page placement
              </label>
              <div className="flex flex-col gap-1">
                {['hub', 'department', 'service'].map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio" name="placement" value={p} checked={placement === p}
                      onChange={() => handlePlacement(p)}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-300 capitalize group-hover:text-white">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category (department / service) */}
            {placement !== 'hub' && (
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">
                  Category
                </label>
                <select
                  value={preCategory ?? ''}
                  onChange={(e) => set({ preCategory: e.target.value, preSubcategory: null })}
                  className="w-full bg-slate-800 text-slate-200 text-sm rounded-lg px-2 py-1.5 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Subcategory (service only) */}
            {placement === 'service' && (
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">
                  Service
                </label>
                <select
                  value={preSubcategory ?? ''}
                  onChange={(e) => set({ preSubcategory: e.target.value })}
                  className="w-full bg-slate-800 text-slate-200 text-sm rounded-lg px-2 py-1.5 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subcategories.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Scenario toggles */}
          <div className="border-t border-slate-700 pt-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Scenario overrides
            </p>
            <div className="flex flex-wrap gap-4">
              <Toggle
                label="Simulate unavailable service"
                checked={forceUnavailable}
                onChange={(v) => set({ forceUnavailable: v })}
              />
              <Toggle
                label="Simulate API error"
                checked={forceError}
                onChange={(v) => set({ forceError: v })}
              />
            </div>
          </div>

          {/* Current config summary */}
          <div className="border-t border-slate-700 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Badge label="Placement" value={placement} />
                {preCategory    && <Badge label="Category" value={preCategory} />}
                {preSubcategory && <Badge label="Service"  value={preSubcategory} />}
                {forceUnavailable && <Badge label="Override" value="unavailable" color="red" />}
                {forceError       && <Badge label="Override" value="api-error" color="red" />}
              </div>
              <button
                onClick={() => set({
                  placement: 'hub', preCategory: null, preSubcategory: null,
                  forceUnavailable: false, forceError: false,
                })}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-200 ml-4"
              >
                <RotateCcw size={11} />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={[
          'w-9 h-5 rounded-full transition-colors relative cursor-pointer',
          checked ? 'bg-blue-600' : 'bg-slate-600',
        ].join(' ')}
      >
        <div className={[
          'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0.5',
        ].join(' ')} />
      </div>
      <span className="text-sm text-slate-300 group-hover:text-white">{label}</span>
    </label>
  );
}

function Badge({ label, value, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-900/50 text-blue-300 border-blue-700',
    red:  'bg-red-900/50 text-red-300 border-red-700',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border font-mono ${colors[color]}`}>
      {label}: <span className="font-semibold">{value}</span>
    </span>
  );
}
