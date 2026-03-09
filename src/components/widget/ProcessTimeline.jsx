// ─── Process Timeline ─────────────────────────────────────────────────────────
// Persistent component rendered alongside all lead-flow steps.
//
// Desktop (sm+): vertical step list in the left column.
// Mobile (<sm):  horizontal icon progress row at the top, then the active
//                step's title + description below the row.
//
// Step completion rule:
//   Steps explicitly completed within the widget show as done (blue checkmark).
//   Steps that occur post-submission (Consultation, Quote, Installation) stay
//   pending at Confirmation — they haven't happened yet.
//
// Contrast: pending step text uses text-slate-500 (~5:1 on bg-slate-50/60),
//   passing WCAG AA for small text. Active title uses text-slate-800.

import { FileText, Phone, DollarSign, Wrench, CalendarDays, CheckCircle2 } from 'lucide-react';
import { WS } from '../../hooks/useWidgetState';

// ── Step definitions by displayType ──────────────────────────────────────────
function getSteps(displayType, desc) {
  switch (displayType) {
    case 'scheduling_lead':
      return [
        {
          icon: CalendarDays,
          title: 'Schedule Your Free Consultation',
          text: desc?.scheduling
            ?? 'Our project specialist will call you to get the details of your project and help select the right product.',
        },
        {
          icon: DollarSign,
          title: 'Get Your Quote',
          text: desc?.quoting
            ?? "When your consultation is complete, we'll follow up with a quote including product and labor costs.",
        },
        {
          icon: Wrench,
          title: 'Installation Begins',
          text: desc?.installation
            ?? "Your professional installer will complete the work, clean up, and ensure you're 100% satisfied.",
        },
      ];

    case 'detail_fee':
      return [
        {
          icon: FileText,
          title: "Let's Get Started",
          text: 'Choose your preferred contact method below.',
        },
        {
          icon: Phone,
          title: 'Submit Your Information',
          text: desc?.submission
            ?? 'Fill out the online form and we will be in touch soon.',
        },
        {
          icon: DollarSign,
          title: 'Personalized Consultation',
          text: desc?.consultation
            ?? 'Be on the lookout for a communication to get your project started.',
        },
        {
          icon: Wrench,
          title: 'Installation Begins',
          text: desc?.installation
            ?? "Your installer will complete your project and ensure you're 100% satisfied.",
        },
      ];

    default: // form
      return [
        {
          icon: FileText,
          title: 'Submit Your Information',
          text: desc?.submission
            ?? 'Fill out the online form and we will be in touch soon.',
        },
        {
          icon: Phone,
          title: 'Personalized Consultation',
          text: desc?.consultation
            ?? 'Be on the lookout for a communication to get your project started.',
        },
        {
          icon: DollarSign,
          title: 'Get Your Quote',
          text: desc?.quoting
            ?? "We'll follow up with a quote including product and labor costs along with financing options.",
        },
        {
          icon: Wrench,
          title: 'Installation Begins',
          text: desc?.installation
            ?? "Your installer will clean up, review any manufacturer instructions, and ensure you're 100% satisfied.",
        },
      ];
  }
}

// ── Active step index (0-based) based on widgetState ─────────────────────────
// At CONFIRMATION, returns the number of steps completed in-widget (not -1).
// Steps with idx < returned value show as done; idx >= returned value stay pending.
// This keeps post-submission steps (Consultation, Quote, Install) visually pending.
function getActiveStep(ws, displayType) {
  if (displayType === 'scheduling_lead') {
    if (ws === WS.CONFIRMATION) return 1; // step 0 (Scheduling) completed in-widget
    if ([WS.DETAIL_FEE_GATE, WS.AOI_SELECTION, WS.SCHEDULER, WS.SUBMISSION_LOADING].includes(ws)) return 0;
    return 0;
  }

  if (displayType === 'detail_fee') {
    if (ws === WS.CONFIRMATION)                                       return 2; // steps 0+1 completed in-widget
    if ([WS.DETAIL_FEE_GATE].includes(ws))                           return 0;
    if ([WS.AOI_SELECTION, WS.FORM_ENTRY].includes(ws))              return 1;
    if ([WS.SCHEDULER, WS.SUBMISSION_LOADING].includes(ws))          return 2;
    return 0;
  }

  // form (default)
  if (ws === WS.CONFIRMATION)                                         return 1; // step 0 (Form) completed in-widget
  if ([WS.AOI_SELECTION, WS.FORM_ENTRY].includes(ws))                return 0;
  if ([WS.SCHEDULER, WS.SUBMISSION_LOADING].includes(ws))            return 1;
  return 0;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ProcessTimeline({ config, widgetState }) {
  if (!config) return null;

  const displayType    = config.displayType ?? 'form';
  const steps          = getSteps(displayType, config.stepDescriptions);
  const activeIdx      = getActiveStep(widgetState, displayType);
  const isConfirmation = widgetState === WS.CONFIRMATION;

  return (
    <div className="h-full">

      {/* ── Mobile: horizontal icon row + full step list (hidden on sm+) ───── */}
      <div className="sm:hidden">
        {/* Service name */}
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-3 leading-tight">
          {config.serviceName}
        </p>

        {/* Horizontal icon row with connecting lines */}
        <div className="flex items-center mb-4">
          {steps.map((step, idx) => {
            const Icon   = step.icon;
            const isDone = idx < activeIdx;
            const isActive = !isConfirmation && idx === activeIdx;
            const isLast = idx === steps.length - 1;

            return (
              <div key={idx} className="contents">
                <div
                  className={[
                    'shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                    isDone   ? 'bg-blue-600 text-white' :
                    isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                               'bg-slate-100 text-slate-400',
                  ].join(' ')}
                >
                  {isDone ? <CheckCircle2 size={13} /> : <Icon size={13} />}
                </div>
                {!isLast && (
                  <div
                    className={[
                      'flex-1 h-px mx-1',
                      isDone ? 'bg-blue-300' : 'bg-slate-200',
                    ].join(' ')}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Active step text — only shown when not on confirmation */}
        {!isConfirmation && steps[activeIdx] && (
          <div>
            <p className="text-xs font-semibold text-slate-800 leading-tight">
              {steps[activeIdx].title}
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {steps[activeIdx].text}
            </p>
          </div>
        )}
      </div>

      {/* ── Desktop: vertical step list (hidden below sm) ────────────────── */}
      <div className="hidden sm:flex flex-col h-full">
        {/* Service name eyebrow */}
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-4 leading-tight">
          {config.serviceName}
        </p>

        {/* Step list */}
        <div className="flex-1">
          {steps.map((step, idx) => {
            const Icon      = step.icon;
            const isDone    = idx < activeIdx;
            const isActive  = !isConfirmation && idx === activeIdx;
            const isPending = idx > activeIdx || (isConfirmation && idx >= activeIdx);
            const isLast    = idx === steps.length - 1;

            return (
              <div key={idx} className="flex gap-3">
                {/* Icon column + connector line */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={[
                      'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                      isDone   ? 'bg-blue-600 text-white' :
                      isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                                 'bg-slate-100 text-slate-400',
                    ].join(' ')}
                  >
                    {isDone
                      ? <CheckCircle2 size={13} />
                      : <Icon size={13} />
                    }
                  </div>
                  {!isLast && (
                    <div
                      className={[
                        'w-px flex-1 my-1 min-h-[16px]',
                        isDone ? 'bg-blue-300' : 'bg-slate-200',
                      ].join(' ')}
                    />
                  )}
                </div>

                {/* Step text */}
                <div className={['pb-4', isLast ? 'pb-0' : ''].join(' ')}>
                  <p
                    className={[
                      'text-xs font-semibold leading-tight',
                      isPending ? 'text-slate-500' : 'text-slate-800',
                    ].join(' ')}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
