# CaaS Install Widget — POC
### AI-Assisted Prototype · Content as a Service · React + Vite

---

| | |
|---|---|
| **Type** | Proof of Concept — AI-Assisted Prototype |
| **Stack** | React, Vite, Tailwind CSS |
| **Built with** | Claude (Anthropic) as coding collaborator |
| **Status** | Prototype — not production |
| **Live demo** | [caas-widget-poc.vercel.app](https://caas-widget-poc.vercel.app/) |
| **Built by** | Thomas Edmons — Digital Product Owner |
| **Related work** | [PRD: Installation Services Lead Capture Widget](https://github.com/thedmons/prd-installation-services-widget) · [API Spec: CAAS Lead Capture](https://github.com/thedmons/prd-installation-services-widget/blob/main/api-spec-caas-installation-services.md) |

---

## What This Is

This is a working prototype of a Content as a Service (CaaS) installation services widget — built independently, using AI as a coding collaborator, across a few sessions over two days.

The underlying product concept comes from platform work I led at a previous employer: a configurable, stepped-form widget designed to replace 40+ individually maintained installation service forms across 7 categories on a large home improvement retailer's e-commerce platform. The widget guides customers through service selection, adapts its data collection experience based on service type, and consolidates all leads into a single Microsoft Dynamics CRM endpoint. This prototype brings that product concept to life as a runnable artifact.

**The goal was not to ship production code.** The goal was to close the loop between product work I had already done — a PRD, an API spec, a system design — and a tangible, runnable artifact that demonstrates the concept works, without requiring engineering sprint capacity to get there.

---

## Why I Built This

Most PMs describe systems. I wanted to build one.

After working on the CAAS architecture at the product level — writing the requirements, defining the API contracts, aligning engineering and stakeholders — I had a clear mental model of how the installation services widget should work. What I didn't have was a way to show it to someone who hadn't been in the room.

Using Claude as a coding collaborator, I was able to translate that mental model into a working React application over a couple of sessions. I drove the architecture decisions, the component structure, and the user flow. Claude handled the implementation syntax and helped debug along the way.

The result: a prototype I can run locally, share as a link, and use as a conversation artifact in interviews and stakeholder discussions — without a single engineering ticket.

---

## What It Demonstrates

**From a product standpoint:**
- Adaptive stepped lead capture flow driven by service type (Measurement Required · Third-Party Contractor · Simple Install)
- Service type determination via CAAS config API, with the widget rendering the appropriate experience per type
- Widget state management across a multi-step flow including zipped-in / zipped-out states

**From a PM capability standpoint:**
- Ability to take a system design from concept → working prototype independently
- Fluency with modern frontend tooling (React, Vite, Tailwind) sufficient to direct and validate AI-generated code
- Comfort working across the full product lifecycle — not just the PRD

---

## How It Was Built

This prototype was built collaboratively with Claude (Anthropic) as the AI coding pair. The workflow:

1. **I defined the architecture** — component structure, state shape, user flow, step sequence
2. **Claude generated implementation** — component code, Tailwind styling, state management
3. **I reviewed, redirected, and iterated** — catching UX gaps, correcting logic, refining the flow
4. **Repeat across ~3 sessions over 2 days**

This is the same workflow I'd use to direct an engineering team — except the feedback loop was hours, not sprints. The AI didn't replace product judgment. It replaced the time and syntax overhead that would otherwise require a dedicated engineer.

---

## Live Demo

▶️ **[caas-widget-poc.vercel.app](https://caas-widget-poc.vercel.app/)**

No setup required — runs in the browser.

---
## Running Locally
```bash
npm install
npm run dev
```

Requires Node 18+. No external API keys required for the prototype — data is mocked.

---

## Status & Next Steps

This is a proof of concept, not a production build. Known limitations:

- API calls are mocked — no live CAAS backend connection
- No authentication layer
- Mobile layout not fully optimized
- Not accessibility-reviewed

If this concept were to move toward production, the next steps would be:
- Connect to live CAAS config and lead endpoints (see [API Spec](https://github.com/thedmons/prd-installation-services-widget/blob/main/api-spec-caas-installation-services.md) for reference architecture)
- Add Microsoft Dynamics lead submission with retry and queuing logic
- Conduct usability testing with representative installation customers
- Write formal PRD scoping production requirements

---

## Related Portfolio Work

This prototype doesn't exist in isolation — it's the executable end of a chain of product work:

| Artifact | Link |
|---|---|
| PRD: Installation Services Lead Capture Widget | [github.com/thedmons/prd-installation-services-widget](https://github.com/thedmons/prd-installation-services-widget) |
| System Design: CAAS Architecture | [github.com/thedmons/prd-installation-services-widget](https://github.com/thedmons/prd-installation-services-widget/blob/main/system-design-caas-installation-services.md) |
| API Spec: CAAS Lead Capture | [github.com/thedmons/prd-installation-services-widget](https://github.com/thedmons/prd-installation-services-widget/blob/main/api-spec-caas-installation-services.md) |
