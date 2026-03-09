// ─── CAAS Widget State Machine ────────────────────────────────────────────────
// Implements the state machine defined in the System Design doc (Section 5).
// Uses useReducer + useEffect to manage async transitions.

import { useReducer, useEffect, useRef } from 'react';
import { fetchConfig, submitLead } from '../api/mockApi';

// ── States ────────────────────────────────────────────────────────────────────
export const WS = {
  CONFIG_LOADING:      'CONFIG_LOADING',      // Initial widget init
  CONFIG_ERROR:        'CONFIG_ERROR',        // Init failed
  ZIPPED_OUT:          'ZIPPED_OUT',          // Collapsed, ready
  CATEGORY_SELECTION:  'CATEGORY_SELECTION',  // Hub: pick category
  SUBCATEGORY_SELECTION: 'SUBCATEGORY_SELECTION', // Pick service type
  SERVICE_TYPE_LOADING: 'SERVICE_TYPE_LOADING',   // Loading service config
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE', // No local service
  SERVICE_DESCRIPTION: 'SERVICE_DESCRIPTION', // Service details (kept for compat)
  DETAIL_FEE_GATE:     'DETAIL_FEE_GATE',     // Fee info + contact method choice
  AOI_SELECTION:       'AOI_SELECTION',       // Areas of interest
  FORM_ENTRY:          'FORM_ENTRY',          // Lead form
  SCHEDULER:           'SCHEDULER',           // Appointment scheduling
  SUBMISSION_LOADING:  'SUBMISSION_LOADING',  // Submitting to CRM
  CONFIRMATION:        'CONFIRMATION',        // Success
};

// ── Initial state factory ─────────────────────────────────────────────────────
const makeInitialState = ({ placement, preCategory, preSubcategory }) => ({
  widgetState:         WS.CONFIG_LOADING,
  placement,
  // Stored for RESTART — need to know original pre-scoped values
  preCategory:         preCategory  ?? null,
  preSubcategory:      preSubcategory ?? null,
  config:              null,
  configError:         null,
  selectedCategory:    preCategory  ?? null,
  selectedSubcategory: preSubcategory ?? null,
  selectedAOI:         [],
  detailFeePath:       null,   // 'form' | 'scheduler'
  formData: {
    firstName: '', lastName: '',
    phone: '',    email: '',
    street: '',   city: '', state: '', zip: '',
    projectScope: '',
  },
  formErrors:  {},
  appointment: { preferredDate: null, preferredTimeSlot: null },
  leadResult:  null,
  history:     [],
});

// ── History helpers ───────────────────────────────────────────────────────────
const push = (state, nextWidgetState, patch = {}) => ({
  ...state,
  ...patch,
  history: [...state.history, state.widgetState],
  widgetState: nextWidgetState,
});

// ── First-expanded-step helper ────────────────────────────────────────────────
// Returns the first interactive state when a widget expands, based on placement.
function firstExpandedState(placement) {
  if (placement === 'hub')        return WS.CATEGORY_SELECTION;
  if (placement === 'department') return WS.SUBCATEGORY_SELECTION;
  return WS.SUBCATEGORY_SELECTION; // service — handled by EXPAND case directly
}

// ── Next step after config loads ──────────────────────────────────────────────
// SERVICE_DESCRIPTION is skipped; process steps live in the left-column timeline.
function firstStepForConfig(config, state) {
  const hasAOI = config?.areasOfInterest?.length > 0;
  if (config.displayType === 'detail_fee')      return WS.DETAIL_FEE_GATE;
  if (config.displayType === 'scheduling_lead') return hasAOI ? WS.AOI_SELECTION : WS.SCHEDULER;
  // form (default)
  return hasAOI ? WS.AOI_SELECTION : WS.FORM_ENTRY;
}

// ── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    // ── Initialisation ────────────────────────────────────────────────────────
    case 'INIT_COMPLETE':
      return { ...state, widgetState: WS.ZIPPED_OUT, config: action.config ?? state.config, configError: null };

    case 'INIT_ERROR':
      return { ...state, widgetState: WS.CONFIG_ERROR, configError: action.error };

    case 'RETRY_INIT':
      return { ...state, widgetState: WS.CONFIG_LOADING, configError: null };

    // ── Widget open ───────────────────────────────────────────────────────────
    case 'EXPAND': {
      if (state.placement === 'service' && state.config) {
        // Config already loaded for service placement — jump straight to first step
        return push(state, firstStepForConfig(state.config, state));
      }
      return push(state, firstExpandedState(state.placement));
    }

    // ── Combined category + subcategory selection (new) ───────────────────────
    // Replaces the two-step SELECT_CATEGORY → SELECT_SUBCATEGORY flow.
    // The combined CategorySelector dispatches this single action.
    case 'SELECT_SERVICE':
      return push(state, WS.SERVICE_TYPE_LOADING, {
        selectedCategory:    action.category,
        selectedSubcategory: action.subcategory,
      });

    // ── Legacy single-step actions (kept for compatibility / back-nav) ─────────
    case 'SELECT_CATEGORY':
      return push(state, WS.SUBCATEGORY_SELECTION, { selectedCategory: action.category });

    case 'SELECT_SUBCATEGORY':
      return push(state, WS.SERVICE_TYPE_LOADING, { selectedSubcategory: action.subcategory });

    // ── Service config loaded ─────────────────────────────────────────────────
    case 'SERVICE_CONFIG_LOADED': {
      const config = action.config;
      if (!config.localServiceAvailable) {
        return push({ ...state, config }, WS.SERVICE_UNAVAILABLE);
      }
      // Skip SERVICE_DESCRIPTION — content is now in the ProcessTimeline left column
      return push({ ...state, config }, firstStepForConfig(config, state));
    }

    case 'SERVICE_CONFIG_ERROR':
      return { ...state, widgetState: WS.CONFIG_ERROR, configError: action.error };

    // ── Step advances ─────────────────────────────────────────────────────────
    // PROCEED_FROM_DESCRIPTION kept for service placement (EXPAND → service starts here)
    case 'PROCEED_FROM_DESCRIPTION': {
      const { config } = state;
      const hasAOI = config?.areasOfInterest?.length > 0;
      if (config.displayType === 'detail_fee')      return push(state, WS.DETAIL_FEE_GATE);
      if (config.displayType === 'scheduling_lead') return push(state, hasAOI ? WS.AOI_SELECTION : WS.SCHEDULER);
      return push(state, hasAOI ? WS.AOI_SELECTION : WS.FORM_ENTRY);
    }

    case 'SELECT_DETAIL_FEE_PATH': {
      // "Come back later" — collapse to zipped-out, preserve loaded config
      if (action.path === 'dismiss') {
        return {
          ...makeInitialState({
            placement:     state.placement,
            preCategory:   state.preCategory,
            preSubcategory: state.preSubcategory,
          }),
          widgetState: WS.ZIPPED_OUT,
          config: state.config,
        };
      }
      const { config } = state;
      const hasAOI = config?.areasOfInterest?.length > 0;
      const next = action.path === 'scheduler'
        ? WS.SCHEDULER
        : (hasAOI ? WS.AOI_SELECTION : WS.FORM_ENTRY);
      return push(state, next, { detailFeePath: action.path });
    }

    case 'PROCEED_FROM_AOI': {
      const { config } = state;
      const next = config.displayType === 'scheduling_lead' ? WS.SCHEDULER : WS.FORM_ENTRY;
      return push({ ...state, selectedAOI: action.selection }, next);
    }

    // ── Form ──────────────────────────────────────────────────────────────────
    case 'UPDATE_FORM':
      return {
        ...state,
        formData:   { ...state.formData, [action.field]: action.value },
        formErrors: { ...state.formErrors, [action.field]: undefined },
      };

    case 'SET_FORM_ERRORS':
      return { ...state, formErrors: action.errors };

    case 'PROCEED_FROM_FORM': {
      const needsScheduler = ['measurement_required', 'simple_install'].includes(
        state.config?.serviceType
      );
      return push(state, needsScheduler ? WS.SCHEDULER : WS.SUBMISSION_LOADING);
    }

    // ── Scheduler ─────────────────────────────────────────────────────────────
    case 'SELECT_DATE':
      return { ...state, appointment: { ...state.appointment, preferredDate: action.date } };

    case 'SELECT_TIME_SLOT':
      return { ...state, appointment: { ...state.appointment, preferredTimeSlot: action.slot } };

    case 'PROCEED_FROM_SCHEDULER':
      return push(state, WS.SUBMISSION_LOADING);

    // ── Submission ────────────────────────────────────────────────────────────
    case 'SUBMISSION_SUCCESS':
    case 'SUBMISSION_ERROR':
      return push({ ...state, leadResult: action.result }, WS.CONFIRMATION);

    // ── Back navigation ───────────────────────────────────────────────────────
    case 'BACK': {
      if (state.history.length === 0) return state;
      const history = [...state.history];
      const prev = history.pop();
      return { ...state, widgetState: prev, history };
    }

    // ── Restart — return to first step (X button behavior) ───────────────────
    // Resets form data and navigation history; preserves placement + pre-scoped config.
    case 'RESTART': {
      const fresh = makeInitialState({
        placement:     state.placement,
        preCategory:   state.preCategory,
        preSubcategory: state.preSubcategory,
      });
      // Service placement: keep loaded config and jump straight to first step
      if (state.placement === 'service' && state.config) {
        return {
          ...fresh,
          widgetState: firstStepForConfig(state.config, fresh),
          config: state.config,
        };
      }
      return {
        ...fresh,
        widgetState: firstExpandedState(state.placement),
      };
    }

    default:
      return state;
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useWidgetState({ placement, preCategory, preSubcategory, forceUnavailable, forceError }) {
  const [state, dispatch] = useReducer(
    reducer,
    { placement, preCategory, preSubcategory },
    makeInitialState
  );

  const opts = useRef({ forceUnavailable, forceError });
  useEffect(() => { opts.current = { forceUnavailable, forceError }; }, [forceUnavailable, forceError]);

  // ── Init effect ───────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        if (placement === 'service' && preCategory && preSubcategory) {
          const config = await fetchConfig({
            category: preCategory,
            subcategory: preSubcategory,
            placement,
            zip: '00000',
            ...opts.current,
          });
          if (!cancelled) dispatch({ type: 'INIT_COMPLETE', config });
        } else {
          await new Promise((r) => setTimeout(r, 600));
          if (!cancelled) dispatch({ type: 'INIT_COMPLETE', config: null });
        }
      } catch (err) {
        if (!cancelled) dispatch({ type: 'INIT_ERROR', error: err.message });
      }
    }
    init();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, preCategory, preSubcategory]);

  // ── Service config load (after subcategory selected) ─────────────────────
  useEffect(() => {
    if (state.widgetState !== WS.SERVICE_TYPE_LOADING) return;
    let cancelled = false;

    const catSlug = state.selectedCategory?.slug ?? preCategory;
    const subSlug = state.selectedSubcategory?.slug ?? preSubcategory;
    if (!catSlug || !subSlug) return;

    fetchConfig({
      category: catSlug,
      subcategory: subSlug,
      placement,
      zip: state.formData.zip || '00000',
      ...opts.current,
    })
      .then((config) => { if (!cancelled) dispatch({ type: 'SERVICE_CONFIG_LOADED', config }); })
      .catch((err) => { if (!cancelled) dispatch({ type: 'SERVICE_CONFIG_ERROR', error: err.message }); });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.widgetState]);

  // ── Lead submission ───────────────────────────────────────────────────────
  useEffect(() => {
    if (state.widgetState !== WS.SUBMISSION_LOADING) return;
    let cancelled = false;

    submitLead(buildLeadPayload(state))
      .then((result) => { if (!cancelled) dispatch({ type: 'SUBMISSION_SUCCESS', result }); })
      .catch(() => {
        if (!cancelled) dispatch({
          type: 'SUBMISSION_ERROR',
          result: { leadId: `CAAS-${Date.now().toString().slice(-6)}`, status: 'queued', message: "We'll be in touch soon." },
        });
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.widgetState]);

  return { state, dispatch };
}

// ── Lead payload builder ──────────────────────────────────────────────────────
function buildLeadPayload(state) {
  const { config, formData, appointment, selectedAOI, placement } = state;
  return {
    serviceId:          config?.serviceId,
    serviceType:        config?.serviceType,
    displayType:        config?.displayType,
    placementContext:   placement,
    sourceUrl:          window.location.href,
    dynamicsCampaignId: config?.dynamicsCampaignId ?? null,
    contact: {
      firstName: formData.firstName,
      lastName:  formData.lastName,
      phone:     formData.phone.replace(/\D/g, ''),
      email:     formData.email,
      address: {
        street: formData.street,
        city:   formData.city,
        state:  formData.state,
        zip:    formData.zip,
      },
    },
    projectScope:     config?.serviceType === 'third_party_contractor' ? formData.projectScope : null,
    areasOfInterest:  selectedAOI,
    appointment:      appointment.preferredDate ? appointment : null,
    consentGiven:     true,
    consentTimestamp: new Date().toISOString(),
  };
}

// ── Form validation ───────────────────────────────────────────────────────────
// consentGiven is no longer a checkbox — consent is implied by form submission
// per the TCPA footnote disclosure shown below the submit button.
export function validateLeadForm(formData, serviceType) {
  const errors = {};
  const req = (key, label) => { if (!formData[key]?.trim()) errors[key] = `${label} is required`; };

  req('firstName', 'First name');
  req('lastName',  'Last name');
  req('street',    'Street address');
  req('city',      'City');
  req('zip',       'ZIP code');

  if (!formData.state?.trim()) errors.state = 'State is required';

  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
    errors.phone = 'Enter a valid 10-digit phone number';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!formData.zip?.trim()) {
    errors.zip = 'ZIP code is required';
  } else if (!/^\d{5}$/.test(formData.zip.trim())) {
    errors.zip = 'Enter a valid 5-digit ZIP code';
  }

  if (serviceType === 'third_party_contractor' && !formData.projectScope?.trim()) {
    errors.projectScope = 'Please describe your project so we can route your request correctly';
  }

  return errors;
}

// ── Step computation (for ProgressStepper) ────────────────────────────────────
export function computeSteps(placement, config) {
  const steps = [];

  if (placement === 'hub')     steps.push({ id: 'category',    label: 'Category' });
  if (placement !== 'service') steps.push({ id: 'subcategory', label: 'Service Type' });

  if (config?.areasOfInterest?.length > 0) steps.push({ id: 'aoi', label: 'Interests' });

  if (config?.displayType !== 'scheduling_lead') {
    steps.push({ id: 'form', label: 'Your Info' });
  }

  const needsScheduler =
    config == null ||
    config.displayType === 'scheduling_lead' ||
    ['measurement_required', 'simple_install'].includes(config.serviceType);

  if (needsScheduler) steps.push({ id: 'schedule', label: 'Schedule' });

  steps.push({ id: 'done', label: 'Done' });
  return steps;
}

// Map widget state → step id
export function widgetStateToStepId(ws) {
  return {
    [WS.CATEGORY_SELECTION]:    'category',
    [WS.SUBCATEGORY_SELECTION]: 'subcategory',
    [WS.SERVICE_TYPE_LOADING]:  'subcategory',
    [WS.SERVICE_DESCRIPTION]:   'description',
    [WS.DETAIL_FEE_GATE]:       'description',
    [WS.AOI_SELECTION]:         'aoi',
    [WS.FORM_ENTRY]:            'form',
    [WS.SCHEDULER]:             'schedule',
    [WS.SUBMISSION_LOADING]:    'schedule',
    [WS.CONFIRMATION]:          'done',
    [WS.SERVICE_UNAVAILABLE]:   null,
  }[ws] ?? null;
}
