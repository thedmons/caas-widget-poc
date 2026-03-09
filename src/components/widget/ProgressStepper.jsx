// Progress stepper — shown when widget is expanded
// Step list is computed dynamically based on placement + config.
// Completed steps shown with a check; current step highlighted; future steps dimmed.

import { Check } from 'lucide-react';
import { computeSteps, widgetStateToStepId } from '../../hooks/useWidgetState';

export function ProgressStepper({ placement, config, widgetState }) {
  const steps = computeSteps(placement, config);
  const activeId = widgetStateToStepId(widgetState);
  const activeIdx = steps.findIndex((s) => s.id === activeId);

  return (
    <div className="flex items-center px-5 py-4 border-b border-slate-100 bg-slate-50 overflow-x-auto">
      {steps.map((step, idx) => {
        const isDone    = activeIdx > idx;
        const isActive  = activeIdx === idx;
        const isPending = activeIdx < idx;

        return (
          <div key={step.id} className="flex items-center shrink-0">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1">
              <div className={[
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                isDone    ? 'bg-blue-600 text-white' :
                isActive  ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                'bg-slate-200 text-slate-500',
              ].join(' ')}>
                {isDone ? <Check size={12} /> : idx + 1}
              </div>
              <span className={[
                'text-xs font-medium whitespace-nowrap transition-colors',
                isActive  ? 'text-blue-700' :
                isDone    ? 'text-blue-500' :
                'text-slate-400',
              ].join(' ')}>
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {idx < steps.length - 1 && (
              <div className={[
                'h-px w-8 mx-1 mb-4 transition-colors',
                isDone ? 'bg-blue-400' : 'bg-slate-200',
              ].join(' ')} />
            )}
          </div>
        );
      })}
    </div>
  );
}
