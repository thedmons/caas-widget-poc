// Error state — shown when CAAS config API fails
// Provides retry CTA and customer service fallback.

import { AlertCircle, RotateCcw, Phone } from 'lucide-react';
import { Button } from '../../ui/Button';

export function ConfigError({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center text-center py-8 px-4 animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertCircle size={26} className="text-red-500" />
      </div>
      <h2 className="text-lg font-bold text-slate-900 mb-2">Something went wrong</h2>
      <p className="text-sm text-slate-600 mb-1 max-w-xs">
        We couldn't load your service configuration. This is usually temporary.
      </p>
      {error && (
        <p className="text-xs text-slate-400 mb-5 font-mono">{error}</p>
      )}

      <Button onClick={onRetry} variant="secondary" icon={RotateCcw} className="mb-4">
        Try again
      </Button>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Phone size={13} />
        <span>Or call us: <a href="tel:18005551234" className="text-blue-700 font-semibold">1-800-555-1234</a></span>
      </div>
    </div>
  );
}
