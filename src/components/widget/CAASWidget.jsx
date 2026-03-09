// ─── CAAS Widget Root ─────────────────────────────────────────────────────────
// Orchestrates state machine transitions and renders the correct step or state.
//
// Layout modes:
//   Single-column — category/subcategory selection, loading, terminal states
//   Two-column    — all lead-flow steps (AOI, form, scheduler, confirmation)
//                   Left: ProcessTimeline (persistent process steps)
//                   Right: active step content
//
// Fixed height: expanded widget is always 650px tall to eliminate layout shift
// and dynamic height calculations. Content areas scroll internally.
//
// Responsive: two-column layout collapses to single-column on mobile (< sm).
// ProcessTimeline renders as a compact horizontal strip at the top on mobile.

import { useCallback, Suspense, lazy } from 'react';
import { ChevronLeft, RotateCcw } from 'lucide-react';

import { useWidgetState, WS } from '../../hooks/useWidgetState';
import { LoadingBlock } from '../ui/Spinner';
import { ProcessTimeline } from './ProcessTimeline';

import { ZippedOutState }    from './ZippedOutState';
import { CategorySelector }  from './steps/CategorySelector';
import { DetailFeeGate }     from './steps/DetailFeeGate';
import { AreasOfInterest }   from './steps/AreasOfInterest';
import { LeadForm }          from './steps/LeadForm';
import { Confirmation }      from './steps/Confirmation';

// Lazy-loaded — only fetched when the user reaches the Scheduler step
const Scheduler = lazy(() => import('./steps/Scheduler').then((m) => ({ default: m.Scheduler })));

import { UnavailabilityState } from './states/UnavailabilityState';
import { ConfigError }         from './states/ConfigError';

// States where back navigation is suppressed
const NO_BACK_STATES = new Set([
  WS.CONFIG_LOADING, WS.ZIPPED_OUT, WS.CONFIRMATION,
  WS.SERVICE_UNAVAILABLE, WS.SUBMISSION_LOADING, WS.SERVICE_TYPE_LOADING,
]);

// States rendered in the two-column layout (ProcessTimeline + step content)
const TWO_COLUMN_STATES = new Set([
  WS.DETAIL_FEE_GATE, WS.AOI_SELECTION, WS.FORM_ENTRY,
  WS.SCHEDULER, WS.SUBMISSION_LOADING, WS.CONFIRMATION,
]);

// ── Root component ─────────────────────────────────────────────────────────────
export function CAASWidget({ placement, preCategory, preSubcategory, forceUnavailable, forceError }) {
  const { state, dispatch } = useWidgetState({ placement, preCategory, preSubcategory, forceUnavailable, forceError });
  const { widgetState: ws, config, formData, formErrors, appointment } = state;

  const update  = useCallback((field, value) => dispatch({ type: 'UPDATE_FORM', field, value }), [dispatch]);
  const setErrs = useCallback((errors) => dispatch({ type: 'SET_FORM_ERRORS', errors }), [dispatch]);

  // ── Pre-expanded loading / error states ─────────────────────────────────────
  if (ws === WS.CONFIG_LOADING) {
    return (
      <div className="caas-widget p-5">
        <LoadingBlock message="Loading installation services…" />
      </div>
    );
  }

  if (ws === WS.CONFIG_ERROR) {
    return (
      <div className="caas-widget">
        <ConfigError error={state.configError} onRetry={() => dispatch({ type: 'RETRY_INIT' })} />
      </div>
    );
  }

  // ── Collapsed / zipped-out state ────────────────────────────────────────────
  if (ws === WS.ZIPPED_OUT) {
    return (
      <ZippedOutState
        placement={placement}
        config={config}
        onExpand={() => dispatch({ type: 'EXPAND' })}
      />
    );
  }

  // ── Expanded state ──────────────────────────────────────────────────────────
  const showBack    = !NO_BACK_STATES.has(ws) && state.history.length > 0;
  const isTwoCol    = TWO_COLUMN_STATES.has(ws);

  // Header title: contextual to layout mode
  const headerTitle = isTwoCol ? 'Ready to Get Started?' : 'Installation Services';

  return (
    // Fixed 650px height — always consistent, no layout shift on state transitions.
    // flex-col so header is shrink-0 and the content area fills the rest.
    <div className="caas-widget animate-slide-down h-[650px] flex flex-col">

      {/* ── Widget header ────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-slate-100">
        {showBack ? (
          <button
            onClick={() => dispatch({ type: 'BACK' })}
            className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900 font-medium
                       focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        ) : (
          <span className="text-sm font-semibold text-slate-700">{headerTitle}</span>
        )}

        {/* Restart: returns user to the first step of the widget flow */}
        <button
          onClick={() => dispatch({ type: 'RESTART' })}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Start over"
          title="Start over"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* ── Two-column lead flow ─────────────────────────────────────────── */}
      {isTwoCol && (
        // overflow-hidden ensures children's overflow-y-auto scrolls within this container.
        // flex-col on mobile (ProcessTimeline strip on top, content below),
        // flex-row on sm+ (ProcessTimeline left column, content right column).
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">

          {/* Left — process timeline
              Mobile:  compact horizontal strip, fixed height (shrink-0), bottom border separator.
              Desktop: 42% column, right border separator, independently scrollable. */}
          <div className="shrink-0 border-b border-slate-100 bg-slate-50/60 p-4
                          sm:w-[42%] sm:border-b-0 sm:border-r sm:p-5 sm:overflow-y-auto sm:shrink-0">
            <ProcessTimeline config={config} widgetState={ws} />
          </div>

          {/* Right — active step content, always scrollable */}
          <div className="flex-1 min-w-0 p-5 overflow-y-auto">
            <Suspense fallback={<LoadingBlock message="Loading…" />}>
              <StepContent
                ws={ws} config={config}
                formData={formData} formErrors={formErrors} appointment={appointment}
                leadResult={state.leadResult}
                placement={placement}
                dispatch={dispatch} update={update} setErrs={setErrs}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* ── Single-column selection / loading / terminal states ─────────── */}
      {!isTwoCol && (
        <div className="flex-1 p-5 overflow-y-auto">

          {/* ── Combined category + subcategory selector ── */}
          {(ws === WS.CATEGORY_SELECTION || ws === WS.SUBCATEGORY_SELECTION) && (
            <CategorySelector
              placement={placement}
              preCategory={
                ws === WS.SUBCATEGORY_SELECTION
                  ? (state.selectedCategory?.slug ?? preCategory)
                  : null
              }
              onSelect={(cat, sub) =>
                dispatch({ type: 'SELECT_SERVICE', category: cat, subcategory: sub })
              }
            />
          )}

          {/* ── Service config loading ── */}
          {ws === WS.SERVICE_TYPE_LOADING && (
            <LoadingBlock message="Loading service details…" />
          )}

          {/* ── Service unavailable ── */}
          {ws === WS.SERVICE_UNAVAILABLE && (
            <UnavailabilityState config={config} />
          )}
        </div>
      )}
    </div>
  );
}

// ── Step content router (right column of two-column layout) ───────────────────
function StepContent({
  ws, config, formData, formErrors, appointment, leadResult,
  placement, dispatch, update, setErrs,
}) {
  switch (ws) {
    case WS.DETAIL_FEE_GATE:
      return (
        <DetailFeeGate
          config={config}
          onSelectPath={(path) => dispatch({ type: 'SELECT_DETAIL_FEE_PATH', path })}
        />
      );

    case WS.AOI_SELECTION:
      return (
        <AreasOfInterest
          config={config}
          onProceed={(selection) => dispatch({ type: 'PROCEED_FROM_AOI', selection })}
        />
      );

    case WS.FORM_ENTRY:
      return (
        <LeadForm
          config={config}
          formData={formData}
          formErrors={formErrors}
          onUpdate={update}
          onSetErrors={setErrs}
          onSubmit={() => dispatch({ type: 'PROCEED_FROM_FORM' })}
        />
      );

    case WS.SCHEDULER:
      return (
        <Scheduler
          config={config}
          appointment={appointment}
          onSelectDate={(date) => dispatch({ type: 'SELECT_DATE', date })}
          onSelectTimeSlot={(slot) => dispatch({ type: 'SELECT_TIME_SLOT', slot })}
          onSubmit={() => dispatch({ type: 'PROCEED_FROM_SCHEDULER' })}
          isSchedulingLead={config?.displayType === 'scheduling_lead'}
          formData={formData}
          formErrors={formErrors}
          onUpdate={update}
          onSetErrors={setErrs}
        />
      );

    case WS.SUBMISSION_LOADING:
      return <LoadingBlock message="Submitting your request…" />;

    case WS.CONFIRMATION:
      return <Confirmation config={config} leadResult={leadResult} />;

    default:
      return null;
  }
}
