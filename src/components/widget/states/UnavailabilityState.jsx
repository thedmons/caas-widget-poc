// Terminal state — shown when localServiceAvailable: false
// Provides alternative contact (customer service phone number).

import { MapPinOff, Phone } from 'lucide-react';

export function UnavailabilityState({ config }) {
  return (
    <div className="flex flex-col items-center text-center py-8 px-4 animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <MapPinOff size={26} className="text-slate-500" />
      </div>
      <h2 className="text-lg font-bold text-slate-900 mb-2">Service not available in your area</h2>
      <p className="text-sm text-slate-600 leading-relaxed max-w-xs mb-6">
        {config?.serviceName
          ? `We're sorry — ${config.serviceName} isn't currently available at your location.`
          : "We don't currently offer this service in your area."}
        {' '}Our team is actively expanding coverage.
      </p>

      <div className="w-full bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg text-white shrink-0">
          <Phone size={18} />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-slate-900">Talk to us directly</p>
          <a href="tel:18005551234" className="text-sm text-blue-700 font-bold hover:text-blue-900">
            1-800-555-1234
          </a>
          <p className="text-xs text-slate-500 mt-0.5">Mon – Sat, 8am – 8pm</p>
        </div>
      </div>
    </div>
  );
}
