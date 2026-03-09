// Detail Fee display type — shown after service description
// Presents fee transparency and lets customer choose contact path:
//   • "Submit Your Information" → form entry flow
//   • "Come back later"        → collapses widget back to zipped-out state

import { DollarSign, AlertCircle, Clock, FileText } from 'lucide-react';
import { Button } from '../../ui/Button';

export function DetailFeeGate({ config, onSelectPath }) {
  if (!config?.feeDetails) return null;

  const { feeAmount, feeDescription, feeDisclaimer } = config.feeDetails;

  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">{config.serviceName}</h2>
        <p className="text-sm text-slate-500 mt-1">Review the service details and choose how you'd like to proceed.</p>
      </div>

      {/* Fee details card */}
      <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="p-1.5 bg-blue-600 rounded-lg text-white">
            <DollarSign size={16} />
          </span>
          <div>
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Service Fee</p>
            <p className="text-2xl font-bold text-slate-900 leading-none mt-0.5">{feeAmount}</p>
          </div>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{feeDescription}</p>

        {feeDisclaimer && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-blue-200">
            <AlertCircle size={14} className="text-slate-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">{feeDisclaimer}</p>
          </div>
        )}
      </div>

      {/* Contact method selector */}
      <p className="text-sm font-medium text-slate-700 mb-3">How would you like to proceed?</p>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onSelectPath('form')}
          className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200
                     hover:border-blue-500 hover:bg-blue-50 text-left
                     transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
        >
          <span className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
            <FileText size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Submit your information</p>
            <p className="text-xs text-slate-500 mt-0.5">Fill out a quick form and we'll be in touch to schedule.</p>
          </div>
        </button>

        <button
          onClick={() => onSelectPath('dismiss')}
          className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200
                     hover:border-slate-400 hover:bg-slate-50 text-left
                     transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 group"
        >
          <span className="p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-600 transition-colors">
            <Clock size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-700">Come back later</p>
            <p className="text-xs text-slate-500 mt-0.5">No problem — you can return any time to get started.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
