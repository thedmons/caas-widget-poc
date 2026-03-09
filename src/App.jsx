// ─── POC App Shell ────────────────────────────────────────────────────────────
// Simulates the page contexts where the widget would be embedded:
//   Hub       → Installation Services hub page (full standalone flow)
//   Department → Category department page (widget scoped to a category)
//   Service   → Individual service page (widget scoped to a specific service)

import { useState } from 'react';
import { DevControlPanel } from './DevPanel/DevControlPanel';
import { CAASWidget } from './components/widget/CAASWidget';
import { CATEGORIES } from './data/categories';

const DEFAULT_CONFIG = {
  placement:        'hub',
  preCategory:      null,
  preSubcategory:   null,
  forceUnavailable: false,
  forceError:       false,
  _key:             0,
};

export default function App() {
  const [devConfig, setDevConfig] = useState(DEFAULT_CONFIG);
  const { placement, preCategory, preSubcategory, forceUnavailable, forceError, _key } = devConfig;

  // Resolve display names for the simulated page context
  const catObj = CATEGORIES.find((c) => c.slug === preCategory);
  const subObj = catObj?.subcategories.find((s) => s.slug === preSubcategory);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Simulated site nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">IS</span>
          </div>
          <span className="font-bold text-slate-800">Installation Services</span>
        </div>
        <span className="text-slate-400 text-sm hidden sm:block">·</span>
        <span className="text-sm text-slate-600 hidden sm:block">
          {placement === 'hub'
            ? 'Hub Page'
            : placement === 'department'
            ? `${catObj?.label ?? 'Department'} Page`
            : `${subObj?.label ?? 'Service'} Page`}
        </span>
        <div className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded font-mono">
          CAAS Widget POC
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        {/* Simulated page context */}
        <PageContext placement={placement} catObj={catObj} subObj={subObj} />

        {/* ── The Widget ────────────────────────────────────────────────────── */}
        <div className="mt-6">
          {/*
            key={_key} resets the widget when dev panel config changes.
            In production, the widget receives updated props from the CMS
            page context and handles re-initialization accordingly.
          */}
          <CAASWidget
            key={_key}
            placement={placement}
            preCategory={preCategory}
            preSubcategory={preSubcategory}
            forceUnavailable={forceUnavailable}
            forceError={forceError}
          />
        </div>

        {/* Below-widget page content placeholder */}
        <div className="mt-10 space-y-3 opacity-50">
          <div className="h-4 bg-slate-300 rounded w-2/3" />
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-5/6" />
          <div className="h-3 bg-slate-200 rounded w-4/5" />
        </div>
      </main>

      {/* ── Dev Control Panel footer ─────────────────────────────────────────── */}
      <footer className="border-t-4 border-slate-500 bg-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
            Dev Controls — POC Only
          </p>
          {/* –mb-6 cancels the DevControlPanel's own bottom margin inside the footer */}
          <div className="-mb-6">
            <DevControlPanel value={devConfig} onChange={setDevConfig} />
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simulated page header that changes based on placement context
function PageContext({ placement, catObj, subObj }) {
  if (placement === 'hub') {
    return (
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-200 mb-1">
          All Departments · Installation Services
        </p>
        <h1 className="text-2xl font-bold mb-2">Professional Installation Services</h1>
        <p className="text-sm text-blue-200 leading-relaxed max-w-lg">
          From flooring to HVAC, our certified installers handle every detail —
          so you can focus on enjoying your new space.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Certified Pros', 'Licensed & Insured', 'Guaranteed Work', '7 Categories'].map((t) => (
            <span key={t} className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-medium">{t}</span>
          ))}
        </div>
      </div>
    );
  }

  if (placement === 'department') {
    return (
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
          Installation Services · {catObj?.label ?? 'Department'}
        </p>
        <h1 className="text-2xl font-bold mb-2">{catObj?.label ?? 'Department'} Installation</h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
          {catObj?.description
            ? `Professional installation for ${catObj.description.toLowerCase()}. Get a quote today.`
            : 'Professional installation services for this category.'}
        </p>
      </div>
    );
  }

  // service
  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-6 text-white">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
        {catObj?.label ?? 'Installation'} · Service Page
      </p>
      <h1 className="text-2xl font-bold mb-2">
        {subObj?.label ?? 'Service'} Installation
      </h1>
      <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
        Let our certified professionals handle your{' '}
        {subObj?.label?.toLowerCase() ?? 'installation'} from start to finish.
      </p>
    </div>
  );
}
