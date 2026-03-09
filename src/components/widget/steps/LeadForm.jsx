// ─── Lead Form ────────────────────────────────────────────────────────────────
// Collects contact + address information for lead submission.
// Renders in the right column of the two-column widget layout.
//
// Adapts required fields based on serviceType:
//   • All types:              Name, Phone, Email, Address
//   • third_party_contractor: + Project scope textarea
//
// TCPA: consent is disclosed via footnote text below the submit button.
// No checkbox required — submission implies consent (per wireframe pattern).

import { Phone } from 'lucide-react';
import { Input, Textarea, Select } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { validateLeadForm } from '../../../hooks/useWidgetState';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

export function LeadForm({ config, formData, formErrors, onUpdate, onSubmit, onSetErrors }) {
  const isThirdParty    = config?.serviceType === 'third_party_contractor';
  const isSchedulingLead = config?.displayType === 'scheduling_lead';

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateLeadForm(formData, config?.serviceType);
    if (Object.keys(errors).length > 0) {
      onSetErrors(errors);
      const firstErr = document.querySelector('[data-error="true"]');
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="animate-fade-in flex flex-col gap-4">

      {/* Contact fields */}
      <div className="grid grid-cols-2 gap-3">
        <div data-error={!!formErrors.firstName}>
          <Input
            id="firstName" label="First name *" placeholder="First name"
            value={formData.firstName} error={formErrors.firstName}
            onChange={(e) => onUpdate('firstName', e.target.value)}
          />
        </div>
        <div data-error={!!formErrors.lastName}>
          <Input
            id="lastName" label="Last name *" placeholder="Last name"
            value={formData.lastName} error={formErrors.lastName}
            onChange={(e) => onUpdate('lastName', e.target.value)}
          />
        </div>
      </div>

      <div data-error={!!formErrors.phone}>
        <Input
          id="phone" label="Phone number *" placeholder="(555) 555-0100"
          type="tel" value={formData.phone} error={formErrors.phone}
          onChange={(e) => onUpdate('phone', e.target.value)}
        />
      </div>

      <div data-error={!!formErrors.email}>
        <Input
          id="email" label="Email address *" placeholder="you@example.com"
          type="email" value={formData.email} error={formErrors.email}
          onChange={(e) => onUpdate('email', e.target.value)}
        />
      </div>

      {/* Address block */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Service address
        </p>
        <div className="flex flex-col gap-3">
          <div data-error={!!formErrors.street}>
            <Input
              id="street" label="Street address *" placeholder="Street address"
              value={formData.street} error={formErrors.street}
              onChange={(e) => onUpdate('street', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div data-error={!!formErrors.city}>
              <Input
                id="city" label="City *" placeholder="City"
                value={formData.city} error={formErrors.city}
                onChange={(e) => onUpdate('city', e.target.value)}
              />
            </div>
            <div data-error={!!formErrors.zip}>
              <Input
                id="zip" label="ZIP code *" placeholder="ZIP code"
                value={formData.zip} error={formErrors.zip}
                maxLength={5}
                onChange={(e) => onUpdate('zip', e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
          <div data-error={!!formErrors.state}>
            <Select
              id="state" label="State *"
              value={formData.state} error={formErrors.state}
              onChange={(e) => onUpdate('state', e.target.value)}
            >
              <option value="">Select state</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
        </div>
      </div>

      {/* Project scope — third-party contractor only */}
      {isThirdParty && (
        <div data-error={!!formErrors.projectScope}>
          <Textarea
            id="projectScope"
            label="Project description *"
            placeholder="Describe your project — include the type of work, number of units, any relevant specs or existing system details…"
            rows={3}
            value={formData.projectScope} error={formErrors.projectScope}
            onChange={(e) => onUpdate('projectScope', e.target.value)}
          />
          <p className="text-xs text-slate-400 mt-1">
            The more detail you provide, the more accurate your quote will be.
          </p>
        </div>
      )}

      {/* Submit */}
      <div className="pt-1">
        <Button type="submit" fullWidth size="md">
          {isThirdParty ? 'Submit Request' : 'Continue to Scheduling'}
        </Button>

        {/* Phone consultation fallback */}
        {!isThirdParty && (
          <button
            type="button"
            className="mt-2 w-full flex items-center justify-center gap-2 text-xs text-blue-700 hover:text-blue-900 py-1.5"
            onClick={() => {}}
          >
            <Phone size={12} />
            Prefer a free phone consultation instead?
          </button>
        )}

        {/* TCPA / consent footnotes */}
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
          <p className="text-xs text-slate-400 leading-relaxed">
            You may be contacted by automated means at the email or phone number you provided.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your consent to such contact is not required as a condition of purchasing goods or services.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed flex items-start gap-1">
            <span>🔒</span>
            <span>The information in this form will be transmitted via a secure channel.</span>
          </p>
        </div>
      </div>
    </form>
  );
}
