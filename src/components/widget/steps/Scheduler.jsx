// Step 5 — Appointment Scheduling
// Used for: measurement_required · simple_install · scheduling_lead (combined with contact)
//
// For scheduling_lead display type this step ALSO collects contact information
// since the form step is skipped in that flow.

import { useState } from 'react';
import { CalendarDays, Sun, Sunset, Moon, Phone } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input, Select } from '../../ui/Input';
import { validateLeadForm } from '../../../hooks/useWidgetState';

const TIME_SLOTS = [
  { id: 'morning',   label: 'Morning',   sub: '8am – 12pm', icon: Sun },
  { id: 'afternoon', label: 'Afternoon', sub: '12pm – 5pm',  icon: Sunset },
  { id: 'evening',   label: 'Evening',   sub: '5pm – 8pm',   icon: Moon },
];

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

// Build a list of the next 14 available weekdays from today
function getAvailableDates() {
  const dates = [];
  const d = new Date();
  d.setDate(d.getDate() + 2); // earliest = 2 days out
  while (dates.length < 14) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

const AVAILABLE_DATES = getAvailableDates();

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
function isoDate(d) {
  return d.toISOString().split('T')[0];
}

export function Scheduler({
  config,
  appointment,
  onSelectDate,
  onSelectTimeSlot,
  onSubmit,
  // scheduling_lead contact collection
  isSchedulingLead = false,
  formData,
  formErrors,
  onUpdate,
  onSetErrors,
}) {
  const [dateTab, setDateTab] = useState(0); // for pagination of dates

  const schedulingDesc = config?.stepDescriptions?.scheduling;

  const handleSubmit = () => {
    if (!appointment.preferredDate) return; // basic guard

    if (isSchedulingLead) {
      // Validate contact fields too
      const errors = validateLeadForm(formData, config?.serviceType);
      if (Object.keys(errors).length > 0) {
        onSetErrors(errors);
        return;
      }
    }
    onSubmit();
  };

  const shownDates = AVAILABLE_DATES.slice(dateTab * 7, dateTab * 7 + 7);

  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          {isSchedulingLead ? 'Schedule your installation' : 'Choose an appointment time'}
        </h2>
        {schedulingDesc ? (
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{schedulingDesc}</p>
        ) : (
          <p className="text-sm text-slate-500 mt-1">
            Select a date and time window that works for you.
          </p>
        )}
      </div>

      {/* Contact fields for scheduling_lead */}
      {isSchedulingLead && (
        <div className="mb-5 space-y-3 pb-5 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Your details</p>
          <div className="grid grid-cols-2 gap-3">
            <Input id="s-firstName" label="First name *" placeholder="First name"
              value={formData.firstName} error={formErrors.firstName}
              onChange={(e) => onUpdate('firstName', e.target.value)} />
            <Input id="s-lastName" label="Last name *" placeholder="Last name"
              value={formData.lastName} error={formErrors.lastName}
              onChange={(e) => onUpdate('lastName', e.target.value)} />
          </div>
          <Input id="s-phone" label="Phone *" placeholder="(555) 555-0100" type="tel"
            value={formData.phone} error={formErrors.phone}
            onChange={(e) => onUpdate('phone', e.target.value)} />
          <Input id="s-email" label="Email *" placeholder="you@example.com" type="email"
            value={formData.email} error={formErrors.email}
            onChange={(e) => onUpdate('email', e.target.value)} />
          <Input id="s-street" label="Street address *" placeholder="Street address"
            value={formData.street} error={formErrors.street}
            onChange={(e) => onUpdate('street', e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="s-city" label="City *" placeholder="City"
              value={formData.city} error={formErrors.city}
              onChange={(e) => onUpdate('city', e.target.value)} />
            <Input id="s-zip" label="ZIP *" placeholder="ZIP code" maxLength={5}
              value={formData.zip} error={formErrors.zip}
              onChange={(e) => onUpdate('zip', e.target.value.replace(/\D/g, ''))} />
          </div>
          <Select id="s-state" label="State *" value={formData.state} error={formErrors.state}
            onChange={(e) => onUpdate('state', e.target.value)}>
            <option value="">Select state</option>
            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
      )}

      {/* Date picker */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-slate-700">Select a date</p>
          <div className="flex gap-1">
            <button onClick={() => setDateTab((t) => Math.max(0, t - 1))} disabled={dateTab === 0}
              className="px-2 py-1 text-xs text-blue-700 hover:text-blue-900 disabled:opacity-30">← Prev</button>
            <button onClick={() => setDateTab((t) => Math.min(1, t + 1))} disabled={dateTab === 1}
              className="px-2 py-1 text-xs text-blue-700 hover:text-blue-900 disabled:opacity-30">Next →</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {shownDates.map((d) => {
            const iso = isoDate(d);
            const isSelected = appointment.preferredDate === iso;
            return (
              <button key={iso} onClick={() => onSelectDate(iso)}
                className={[
                  'flex flex-col items-center py-2 px-1 rounded-lg border-2 text-center transition-all duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  isSelected
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50',
                ].join(' ')}
              >
                <span className={`text-xs font-medium ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {d.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>
        {appointment.preferredDate && (
          <p className="text-xs text-blue-700 mt-2 font-medium">
            ✓ {fmtDate(new Date(appointment.preferredDate + 'T12:00:00'))} selected
          </p>
        )}
      </div>

      {/* Time slot */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-slate-700 mb-2">Select a time window</p>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map(({ id, label, sub, icon: Icon }) => {
            const isSelected = appointment.preferredTimeSlot === id;
            return (
              <button key={id} onClick={() => onSelectTimeSlot(id)}
                className={[
                  'flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50',
                ].join(' ')}
              >
                <Icon size={18} className={isSelected ? 'text-blue-600' : 'text-slate-500'} />
                <span className={`text-xs font-semibold ${isSelected ? 'text-blue-800' : 'text-slate-700'}`}>
                  {label}
                </span>
                <span className="text-xs text-slate-500">{sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        fullWidth size="lg"
        disabled={!appointment.preferredDate || !appointment.preferredTimeSlot}
        onClick={handleSubmit}
      >
        Confirm Appointment
      </Button>

      {/* Phone consultation fallback */}
      <button
        type="button"
        className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-blue-700 hover:text-blue-900 py-2"
        onClick={() => {}}
      >
        <Phone size={14} />
        Prefer a free phone consultation?
      </button>
    </div>
  );
}
