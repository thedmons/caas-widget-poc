// ─── Mock CAAS API ────────────────────────────────────────────────────────────
// Simulates the GET /api/caas/v1/config and POST /api/caas/v1/lead endpoints
// with realistic async delays and configurable failure modes.

import { getServiceConfig } from '../data/serviceConfigs';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ── GET /config ───────────────────────────────────────────────────────────────
// Returns service config for a given category/subcategory/placement/zip.
// Options:
//   forceUnavailable — returns localServiceAvailable: false
//   forceError       — rejects with a network-style error

export async function fetchConfig({ category, subcategory, placement, zip, forceUnavailable = false, forceError = false }) {
  await delay(900 + Math.random() * 400);

  if (forceError) {
    throw new Error('CONFIG_SERVICE_UNAVAILABLE');
  }

  const config = getServiceConfig(category, subcategory);

  if (!config) {
    const err = new Error('SERVICE_NOT_FOUND');
    err.code = 404;
    throw err;
  }

  if (forceUnavailable) {
    return {
      ...config,
      localServiceAvailable: false,
      areasOfInterest: [],
    };
  }

  return config;
}

// ── POST /lead ────────────────────────────────────────────────────────────────
// Accepts the lead payload, simulates CRM submission, returns a lead receipt.
// 90% of the time returns 201 Created; 10% returns 202 Queued (Dynamics busy).

export async function submitLead(payload) {
  await delay(1200 + Math.random() * 600);

  const leadId = `CAAS-${Date.now().toString().slice(-8)}`;
  const isQueued = Math.random() < 0.1;

  return {
    leadId,
    status: isQueued ? 'queued' : 'received',
    message: "We'll be in touch soon.",
    dynamicsLeadId: isQueued ? null : `mock-dynamics-${Math.random().toString(36).slice(2, 10)}`,
  };
}
