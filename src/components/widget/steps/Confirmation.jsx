// Step 6 — Confirmation
// Terminal success state shown after lead submission (201 or 202 response).
// Includes a clearly marked CMS-authored zone for the product carousel.
// Per PRD: the product carousel is placed by a CMS author — not rendered by the widget.

import { CheckCircle2, Clock, Phone } from 'lucide-react';

const SERVICE_TYPE_NEXT_STEPS = {
  measurement_required: [
    'A scheduling coordinator will call to confirm your measurement appointment.',
    'Your installer will visit your home and take precise measurements.',
    'You\'ll receive a detailed quote within 2 business days of your visit.',
  ],
  third_party_contractor: [
    'A project coordinator will review your request and reach out within 1 business day.',
    'You\'ll be matched with a licensed contractor in your area.',
    'The contractor will contact you directly to discuss scope and scheduling.',
  ],
  simple_install: [
    'An installation coordinator will confirm your appointment via email and phone.',
    'Your installer will arrive during your selected window with all necessary equipment.',
    'Installation is typically completed in a single visit.',
  ],
};

export function Confirmation({ config, leadResult }) {
  const serviceType = config?.serviceType ?? 'simple_install';
  const nextSteps = SERVICE_TYPE_NEXT_STEPS[serviceType] ?? SERVICE_TYPE_NEXT_STEPS.simple_install;
  const isQueued = leadResult?.status === 'queued';

  return (
    <div className="animate-fade-in">
      {/* Success header */}
      <div className="flex flex-col items-center text-center py-6 px-4 bg-blue-50 rounded-xl border border-blue-100 mb-5">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mb-3">
          <CheckCircle2 size={28} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">We'll be in touch soon!</h2>
        <p className="text-sm text-slate-600">
          Your installation request has been received.{' '}
          {isQueued && (
            <span className="text-xs text-slate-500">(Confirmation reference: {leadResult?.leadId})</span>
          )}
        </p>
      </div>

      {/* Expected timeline */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
        <Clock size={15} className="text-blue-600 shrink-0" />
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Expected follow-up: </span>
          {serviceType === 'third_party_contractor' ? 'Within 1 business day' : 'Within 2 hours during business hours'}
        </p>
      </div>

      {/* Next steps */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">What happens next</p>
        <ol className="flex flex-col gap-3">
          {nextSteps.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Contact fallback */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 mb-6">
        <Phone size={14} className="text-slate-500 shrink-0" />
        <p className="text-sm text-slate-600">
          Questions? Call us at{' '}
          <a href="tel:18005551234" className="font-semibold text-blue-700 hover:text-blue-900">
            1-800-555-1234
          </a>
        </p>
      </div>

      {/* ─── CMS-Authored Zone ─────────────────────────────────────────────────────
           The product carousel below this line is placed by a CMS author.
           It is NOT rendered by the widget — the widget exposes this slot.
           In production, the CMS injects a product carousel component here
           based on the service type and Areas of Interest selection.
      ─────────────────────────────────────────────────────────────────────────── */}
      <CMSProductCarouselSlot serviceType={serviceType} />
    </div>
  );
}

// Visual placeholder representing the CMS-authored product carousel zone.
// Shows a dashed border with a label to distinguish it from widget-rendered content.
function CMSProductCarouselSlot({ serviceType }) {
  const products = SAMPLE_PRODUCTS[serviceType] ?? SAMPLE_PRODUCTS.simple_install;

  return (
    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4">
      {/* CMS zone indicator */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Start shopping for your project</p>
          <p className="text-xs text-slate-500">Find products that pair with your installation</p>
        </div>
        <span className="shrink-0 text-xs bg-amber-100 text-amber-800 border border-amber-200 px-2 py-1 rounded-full font-semibold">
          CMS zone
        </span>
      </div>

      {/* Mock product cards */}
      <div className="grid grid-cols-3 gap-2">
        {products.map((p) => (
          <div key={p.id} className="flex flex-col rounded-lg border border-slate-200 overflow-hidden bg-white">
            <div className="aspect-square bg-slate-100 flex items-center justify-center text-3xl">
              {p.emoji}
            </div>
            <div className="p-2">
              <p className="text-xs font-semibold text-slate-800 leading-tight">{p.name}</p>
              <p className="text-xs text-blue-700 font-bold mt-1">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sample product data for POC — in production this comes from the product catalog API
const SAMPLE_PRODUCTS = {
  measurement_required: [
    { id: 1, name: 'Hardwood Flooring Sample Kit', price: '$4.99/sq ft', emoji: '🪵' },
    { id: 2, name: 'Carpet Pad Premium',           price: '$0.89/sq ft', emoji: '🧶' },
    { id: 3, name: 'Tile Adhesive & Grout Set',    price: '$34.99',      emoji: '🪣' },
  ],
  third_party_contractor: [
    { id: 1, name: 'Smart Thermostat',   price: '$129.00', emoji: '🌡️' },
    { id: 2, name: 'Air Filter 6-Pack',  price: '$39.99',  emoji: '💨' },
    { id: 3, name: 'Circuit Tester Kit', price: '$24.99',  emoji: '⚡' },
  ],
  simple_install: [
    { id: 1, name: 'Dishwasher Installation Kit', price: '$19.99',  emoji: '🔧' },
    { id: 2, name: 'Stainless Braided Supply Line', price: '$12.99', emoji: '🔩' },
    { id: 3, name: 'Appliance Touch-Up Paint',     price: '$9.99',   emoji: '🎨' },
  ],
};
