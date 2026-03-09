// Zipped-out (collapsed) widget state
// Visible on page before user expands the widget.
// Copy and icon adapt based on placement context and loaded config.
//
// Mobile: stacked layout with CTA below content.
// Desktop: single-row layout with CTA on the right.

import { Wrench, ChevronRight } from 'lucide-react';

const PLACEMENT_COPY = {
  hub: {
    eyebrow: 'Professional Installation Services',
    heading: 'Get your project installed by experts',
    sub:     'Certified installers · All leads to one place',
    cta:     'Get started',
  },
  department: {
    eyebrow: 'Installation Services',
    heading: 'Have this professionally installed',
    sub:     'Schedule a measurement or submit your project details in minutes.',
    cta:     'Get started',
  },
  service: {
    eyebrow: 'Professional Installation',
    heading: null, // replaced by serviceName from config
    sub:     'Certified installers · Guaranteed work · Simple process',
    cta:     'Get started',
  },
};

export function ZippedOutState({ placement, config, onExpand }) {
  const copy = PLACEMENT_COPY[placement] ?? PLACEMENT_COPY.hub;
  const heading = placement === 'service' && config?.serviceName
    ? config.serviceName
    : (copy.heading ?? 'Professional Installation');

  return (
    <button
      onClick={onExpand}
      className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5
                 bg-white rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:shadow-md
                 transition-all duration-200 text-left group
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Icon + copy */}
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center
                        group-hover:bg-blue-700 transition-colors">
          <Wrench size={22} />
        </div>
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">
            {copy.eyebrow}
          </p>
          <p className="text-base font-bold text-slate-900 leading-tight">{heading}</p>
          <p className="text-xs text-slate-500 mt-0.5">{copy.sub}</p>
        </div>
      </div>

      {/* CTA pill — full-width on mobile, auto-width on desktop */}
      <div className="shrink-0 flex items-center justify-center gap-1 bg-blue-600 text-white
                      text-sm font-semibold px-5 py-2 rounded-full
                      group-hover:bg-blue-700 transition-colors whitespace-nowrap
                      w-full sm:w-auto">
        {copy.cta}
        <ChevronRight size={16} />
      </div>
    </button>
  );
}
