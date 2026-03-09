// Step 3 — Service description
// Presents CAAS-configured service details and process explanation.
// Primary CTA advances to next step (determined by state machine based on displayType).

import { ClipboardCheck, FileText, Wrench } from 'lucide-react';
import { Button } from '../../ui/Button';

const SERVICE_TYPE_BADGE = {
  measurement_required:   { label: 'Measurement Required', color: 'bg-blue-100 text-blue-800' },
  third_party_contractor: { label: 'Professional Contractor', color: 'bg-purple-100 text-purple-800' },
  simple_install:         { label: 'Standard Installation', color: 'bg-green-100 text-green-800' },
};

const DISPLAY_TYPE_CTA = {
  form:             'Get a Quote',
  detail_fee:       'View Service Details & Pricing',
  scheduling_lead:  'Schedule Your Installation',
};

export function ServiceDescription({ config, onProceed }) {
  if (!config) return null;

  const badge = SERVICE_TYPE_BADGE[config.serviceType];
  const ctaLabel = DISPLAY_TYPE_CTA[config.displayType] ?? 'Get Started';
  const { stepDescriptions: desc } = config;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${badge.color}`}>
          {badge.label}
        </span>
        <h2 className="text-xl font-bold text-slate-900">{config.serviceName}</h2>
      </div>

      {/* 3-step process */}
      <div className="bg-blue-50 rounded-xl p-4 mb-5 border border-blue-100">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-3">How it works</p>
        <div className="flex flex-col gap-3">
          <ProcessStep
            icon={FileText}
            number="1"
            title="Submit your request"
            description={desc?.consultation ?? "Tell us about your project and we'll get the process started."}
          />
          <ProcessStep
            icon={ClipboardCheck}
            number="2"
            title="Receive your quote"
            description={desc?.quoting ?? "We'll prepare a detailed quote based on your project specifics."}
          />
          <ProcessStep
            icon={Wrench}
            number="3"
            title="Installation begins"
            description={desc?.installation ?? 'Our certified installer completes your project to professional standards.'}
          />
        </div>
      </div>

      <Button fullWidth size="lg" onClick={onProceed}>
        {ctaLabel}
      </Button>
    </div>
  );
}

function ProcessStep({ icon: Icon, number, title, description }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
        {number}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
          <Icon size={13} className="text-blue-600" />
          {title}
        </p>
        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
