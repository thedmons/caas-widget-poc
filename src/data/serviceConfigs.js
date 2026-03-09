// ─── Mock CAAS Service Configurations ────────────────────────────────────────
// Each entry represents what GET /api/caas/v1/config would return
// for a given category + subcategory combination.
//
// Service Types:   measurement_required | third_party_contractor | simple_install
// Display Types:   form | detail_fee | scheduling_lead
//
// feeDetails is an extension added for detail_fee display type configs.
// It is not part of the widget's own feature set — content is CAAS-configured.

const FLOORING_AOI = [
  { id: 'vinyl-plank', label: 'Vinyl Plank' },
  { id: 'hardwood',    label: 'Hardwood' },
  { id: 'carpet',      label: 'Carpet' },
  { id: 'tile',        label: 'Tile' },
  { id: 'laminate',    label: 'Laminate' },
];

const WINDOW_AOI = [
  { id: 'blinds',   label: 'Blinds' },
  { id: 'shades',   label: 'Shades' },
  { id: 'shutters', label: 'Shutters' },
  { id: 'curtains', label: 'Curtains & Drapes' },
];

// ── Flooring (measurement_required · form · AOI) ─────────────────────────────

export const SERVICE_CONFIGS = {

  'flooring/hardwood': {
    serviceId: 'flooring-hardwood',
    serviceName: 'Hardwood Flooring Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: FLOORING_AOI,
    stepDescriptions: {
      consultation: 'A certified installer will visit your home to take precise measurements and review your space.',
      scheduling: null,
      quoting: 'Receive a detailed quote based on your exact measurements and chosen materials.',
      installation: 'Your independent installer will complete the project and ensure you\'re 100% satisfied.',
    },
    dynamicsCampaignId: 'CAAS-FLOORING-2024-Q1',
    landingUrl: '/flooring/hardwood-flooring/',
    feeDetails: null,
  },

  'flooring/carpet': {
    serviceId: 'flooring-carpet',
    serviceName: 'Carpet Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: FLOORING_AOI,
    stepDescriptions: {
      consultation: 'A flooring specialist will visit your home to measure each room and discuss padding and style options.',
      scheduling: null,
      quoting: 'Your custom quote will reflect your exact room dimensions and selected carpet grade.',
      installation: 'Our installer will prep the subfloor, install your carpet, and clean up when the job is done.',
    },
    dynamicsCampaignId: 'CAAS-FLOORING-2024-Q1',
    landingUrl: '/flooring/carpet/',
    feeDetails: null,
  },

  'flooring/vinyl-plank': {
    serviceId: 'flooring-vinyl-plank',
    serviceName: 'Vinyl Plank Flooring Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: FLOORING_AOI,
    stepDescriptions: {
      consultation: 'A specialist will visit your home to measure your space and review subfloor conditions.',
      scheduling: null,
      quoting: 'Receive a quote based on precise measurements and your chosen vinyl plank style.',
      installation: 'Your certified installer will handle all prep work and complete the installation efficiently.',
    },
    dynamicsCampaignId: 'CAAS-FLOORING-2024-Q1',
    landingUrl: '/flooring/vinyl-plank/',
    feeDetails: null,
  },

  'flooring/tile': {
    serviceId: 'flooring-tile',
    serviceName: 'Tile Flooring Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: FLOORING_AOI,
    stepDescriptions: {
      consultation: 'An installer will visit to measure your space and discuss layout patterns and grout options.',
      scheduling: null,
      quoting: 'Your quote will cover tile, grout, and labor based on your exact square footage.',
      installation: 'Our installer will prep the surface, set the tile, and grout — leaving your floor ready to use.',
    },
    dynamicsCampaignId: 'CAAS-FLOORING-2024-Q1',
    landingUrl: '/flooring/tile/',
    feeDetails: null,
  },

  'flooring/laminate': {
    serviceId: 'flooring-laminate',
    serviceName: 'Laminate Flooring Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: FLOORING_AOI,
    stepDescriptions: {
      consultation: 'A flooring expert will visit your home to measure and assess subfloor readiness.',
      scheduling: null,
      quoting: 'Get a detailed quote after your in-home measurement is complete.',
      installation: 'Your installer will handle underlayment, installation, and all trim work.',
    },
    dynamicsCampaignId: 'CAAS-FLOORING-2024-Q1',
    landingUrl: '/flooring/laminate/',
    feeDetails: null,
  },

  // ── Appliances (simple_install · scheduling_lead) ─────────────────────────

  'appliances/dishwasher': {
    serviceId: 'appliances-dishwasher',
    serviceName: 'Dishwasher Installation',
    serviceType: 'simple_install',
    displayType: 'scheduling_lead',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: 'Choose a time that works for you. Our certified installer will arrive ready to complete your installation in a single visit.',
      quoting: 'Your installation cost is included in your appliance purchase — no hidden fees.',
      installation: 'Your installer will disconnect the old unit, connect the new dishwasher, run a test cycle, and clean up.',
    },
    dynamicsCampaignId: 'CAAS-APPLIANCES-2024-Q1',
    landingUrl: '/appliances/dishwashers/',
    feeDetails: null,
  },

  'appliances/washing-machine': {
    serviceId: 'appliances-washing-machine',
    serviceName: 'Washing Machine Installation',
    serviceType: 'simple_install',
    displayType: 'scheduling_lead',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: 'Pick a date and time. Our installer will handle everything from hookup to haul-away.',
      quoting: 'Installation pricing is bundled with your washer purchase at checkout.',
      installation: 'Your installer will connect water lines, level the machine, run a test cycle, and remove your old unit.',
    },
    dynamicsCampaignId: 'CAAS-APPLIANCES-2024-Q1',
    landingUrl: '/appliances/washers/',
    feeDetails: null,
  },

  'appliances/dryer': {
    serviceId: 'appliances-dryer',
    serviceName: 'Dryer Installation',
    serviceType: 'simple_install',
    displayType: 'scheduling_lead',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: 'Select a convenient appointment window and our installer will take care of the rest.',
      quoting: 'Installation fees are included in your purchase — no additional charges.',
      installation: 'We\'ll connect the venting, power or gas line, and haul away your old dryer.',
    },
    dynamicsCampaignId: 'CAAS-APPLIANCES-2024-Q1',
    landingUrl: '/appliances/dryers/',
    feeDetails: null,
  },

  'appliances/refrigerator': {
    serviceId: 'appliances-refrigerator',
    serviceName: 'Refrigerator Installation & Delivery',
    serviceType: 'simple_install',
    displayType: 'scheduling_lead',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: 'Schedule your delivery and installation window. A two-person team will handle everything.',
      quoting: 'Delivery and basic installation is included with your purchase.',
      installation: 'Our team will place and level your refrigerator, connect the water line if applicable, and remove the old unit.',
    },
    dynamicsCampaignId: 'CAAS-APPLIANCES-2024-Q1',
    landingUrl: '/appliances/refrigerators/',
    feeDetails: null,
  },

  // ── Countertops (measurement_required · detail_fee) ───────────────────────

  'countertops/granite': {
    serviceId: 'countertops-granite',
    serviceName: 'Granite Countertop Installation',
    serviceType: 'measurement_required',
    displayType: 'detail_fee',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: 'A fabrication specialist will visit your home to template your countertops and discuss edge profiles, cutouts, and finish options.',
      scheduling: null,
      quoting: 'Your custom quote reflects precise measurements, your chosen slab, and any custom cutouts or edges.',
      installation: 'Our certified fabricator will deliver, cut, and install your countertops with professional-grade seaming and finishing.',
    },
    dynamicsCampaignId: 'CAAS-COUNTERTOPS-2024-Q1',
    landingUrl: '/countertops/granite/',
    feeDetails: {
      feeAmount: '$35',
      feeDescription: 'A $35 in-home measurement fee is required to get started. This fee is credited toward your full installation if you move forward with the project.',
      feeDisclaimer: 'Measurement fee is non-refundable if the project is cancelled after the visit has been scheduled.',
    },
  },

  'countertops/quartz': {
    serviceId: 'countertops-quartz',
    serviceName: 'Quartz Countertop Installation',
    serviceType: 'measurement_required',
    displayType: 'detail_fee',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: 'A countertop specialist will visit to template your space and help you finalize color, edge style, and sink cutout options.',
      scheduling: null,
      quoting: 'Receive a detailed quote based on your template measurements and selected quartz product.',
      installation: 'Your countertops will be fabricated to exact specifications and installed by our certified team.',
    },
    dynamicsCampaignId: 'CAAS-COUNTERTOPS-2024-Q1',
    landingUrl: '/countertops/quartz/',
    feeDetails: {
      feeAmount: '$35',
      feeDescription: 'A $35 in-home measurement fee is required before we can provide your final quote. This fee is credited toward installation if you proceed.',
      feeDisclaimer: 'Measurement fee is non-refundable once the appointment has been confirmed.',
    },
  },

  'countertops/laminate-ct': {
    serviceId: 'countertops-laminate',
    serviceName: 'Laminate Countertop Installation',
    serviceType: 'measurement_required',
    displayType: 'detail_fee',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: 'An installer will visit to measure your countertop run and confirm your chosen laminate pattern and edge style.',
      scheduling: null,
      quoting: 'Get a custom quote after your in-home measurement is complete.',
      installation: 'Your laminate countertops will be cut, fitted, and installed in a single visit.',
    },
    dynamicsCampaignId: 'CAAS-COUNTERTOPS-2024-Q1',
    landingUrl: '/countertops/laminate/',
    feeDetails: {
      feeAmount: '$35',
      feeDescription: 'A $35 in-home measurement fee applies before we provide your final quote. Applied as a credit toward installation.',
      feeDisclaimer: 'Measurement fee is non-refundable if the project is cancelled after scheduling.',
    },
  },

  'countertops/butcher-block': {
    serviceId: 'countertops-butcher-block',
    serviceName: 'Butcher Block Countertop Installation',
    serviceType: 'measurement_required',
    displayType: 'detail_fee',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: 'A woodworking specialist will visit to measure your space and discuss wood species, finish, and cutout requirements.',
      scheduling: null,
      quoting: 'Your quote will reflect exact dimensions, wood species selection, and any custom cutouts.',
      installation: 'Your butcher block will be fitted, finished, and installed with food-safe sealant included.',
    },
    dynamicsCampaignId: 'CAAS-COUNTERTOPS-2024-Q1',
    landingUrl: '/countertops/butcher-block/',
    feeDetails: {
      feeAmount: '$35',
      feeDescription: 'An in-home measurement visit ($35) is required to provide an accurate quote. Fee is credited toward your project.',
      feeDisclaimer: 'Measurement fee is non-refundable once the appointment is confirmed.',
    },
  },

  // ── Window Treatments (measurement_required · form · AOI) ─────────────────

  'window-treatments/blinds': {
    serviceId: 'window-treatments-blinds',
    serviceName: 'Blind Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: WINDOW_AOI,
    stepDescriptions: {
      consultation: 'A window treatment specialist will visit to measure each window and discuss style, light control, and operating options.',
      scheduling: null,
      quoting: 'Your quote will cover custom blinds sized to your exact windows and professional installation.',
      installation: 'Your installer will mount all brackets, hang your blinds, and ensure smooth operation.',
    },
    dynamicsCampaignId: 'CAAS-WINDOWS-2024-Q1',
    landingUrl: '/window-treatments/blinds/',
    feeDetails: null,
  },

  'window-treatments/shades': {
    serviceId: 'window-treatments-shades',
    serviceName: 'Shade Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: WINDOW_AOI,
    stepDescriptions: {
      consultation: 'A specialist will measure your windows and walk you through fabric, opacity, and motorization options.',
      scheduling: null,
      quoting: 'Receive a quote for custom shades sized to your windows plus professional installation.',
      installation: 'Your installer will mount and test all shades, including motorized options if selected.',
    },
    dynamicsCampaignId: 'CAAS-WINDOWS-2024-Q1',
    landingUrl: '/window-treatments/shades/',
    feeDetails: null,
  },

  'window-treatments/shutters': {
    serviceId: 'window-treatments-shutters',
    serviceName: 'Shutter Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: WINDOW_AOI,
    stepDescriptions: {
      consultation: 'A shutter specialist will measure your windows and help you choose panel configuration, louver size, and finish.',
      scheduling: null,
      quoting: 'Your custom quote covers fabrication of shutters to your exact window dimensions and full installation.',
      installation: 'Your installer will mount the frames, hang the panels, and adjust all louvers for proper operation.',
    },
    dynamicsCampaignId: 'CAAS-WINDOWS-2024-Q1',
    landingUrl: '/window-treatments/shutters/',
    feeDetails: null,
  },

  'window-treatments/curtains': {
    serviceId: 'window-treatments-curtains',
    serviceName: 'Curtain & Drapery Installation',
    serviceType: 'measurement_required',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: WINDOW_AOI,
    stepDescriptions: {
      consultation: 'A specialist will visit to measure for rods, discuss hanging height, and review drapery options.',
      scheduling: null,
      quoting: 'Your quote covers hardware, mounting, and labor for all windows in your scope.',
      installation: 'Your installer will mount all rods, hang the drapery, and ensure even, professional results.',
    },
    dynamicsCampaignId: 'CAAS-WINDOWS-2024-Q1',
    landingUrl: '/window-treatments/curtains/',
    feeDetails: null,
  },

  // ── HVAC (third_party_contractor · detail_fee) ────────────────────────────

  'hvac/central-ac': {
    serviceId: 'hvac-central-ac',
    serviceName: 'Central Air Conditioning Installation',
    serviceType: 'third_party_contractor',
    displayType: 'detail_fee',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed HVAC contractor will assess your home\'s existing ductwork, square footage, and cooling needs to provide a detailed project quote.',
      installation: 'Your assigned contractor will handle all installation, refrigerant charging, and local code compliance — including permits where required.',
    },
    dynamicsCampaignId: 'CAAS-HVAC-2024-Q1',
    landingUrl: '/hvac/central-air-conditioning/',
    feeDetails: {
      feeAmount: '$99',
      feeDescription: 'A $99 diagnostic and assessment fee covers the licensed contractor\'s time to evaluate your home\'s HVAC needs and existing infrastructure.',
      feeDisclaimer: 'The assessment fee may be applied toward your installation cost at the contractor\'s discretion.',
    },
  },

  'hvac/furnace': {
    serviceId: 'hvac-furnace',
    serviceName: 'Furnace Installation',
    serviceType: 'third_party_contractor',
    displayType: 'detail_fee',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed HVAC contractor will assess your current system, fuel type, and home heating load to size the right furnace and quote the full project.',
      installation: 'Your contractor will remove the old unit, install and connect the new furnace, and test all controls and safety devices.',
    },
    dynamicsCampaignId: 'CAAS-HVAC-2024-Q1',
    landingUrl: '/hvac/furnaces/',
    feeDetails: {
      feeAmount: '$99',
      feeDescription: 'A $99 assessment fee is required before your licensed contractor can provide an accurate installation quote.',
      feeDisclaimer: 'Fee may be credited toward installation cost at contractor\'s discretion.',
    },
  },

  'hvac/heat-pump': {
    serviceId: 'hvac-heat-pump',
    serviceName: 'Heat Pump Installation',
    serviceType: 'third_party_contractor',
    displayType: 'detail_fee',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed contractor will evaluate your home\'s insulation, existing system, and climate zone to recommend the right heat pump and provide a full quote.',
      installation: 'Your contractor handles outdoor unit placement, refrigerant lines, electrical connections, and all testing.',
    },
    dynamicsCampaignId: 'CAAS-HVAC-2024-Q1',
    landingUrl: '/hvac/heat-pumps/',
    feeDetails: {
      feeAmount: '$99',
      feeDescription: 'A $99 diagnostic assessment fee is charged before your contractor can provide a quote for heat pump installation.',
      feeDisclaimer: 'Assessment fee may be applied toward the project total at contractor\'s discretion.',
    },
  },

  'hvac/mini-split': {
    serviceId: 'hvac-mini-split',
    serviceName: 'Mini-Split System Installation',
    serviceType: 'third_party_contractor',
    displayType: 'detail_fee',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'Your contractor will assess the number of zones, placement options, and electrical requirements to build your quote.',
      installation: 'Your installer will mount indoor air handlers, run refrigerant lines, install the outdoor unit, and commission the system.',
    },
    dynamicsCampaignId: 'CAAS-HVAC-2024-Q1',
    landingUrl: '/hvac/mini-split/',
    feeDetails: {
      feeAmount: '$99',
      feeDescription: 'A $99 assessment fee covers your contractor\'s visit to evaluate placement, zone count, and electrical capacity.',
      feeDisclaimer: 'Fee may be credited toward your installation at contractor\'s discretion.',
    },
  },

  // ── Electrical (third_party_contractor · form) ────────────────────────────

  'electrical/panel-upgrade': {
    serviceId: 'electrical-panel-upgrade',
    serviceName: 'Electrical Panel Upgrade',
    serviceType: 'third_party_contractor',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed electrician will review your current panel capacity, service entrance, and project scope to provide a detailed quote including permit costs.',
      installation: 'Your electrician will install the new panel, reconnect all circuits, schedule the utility inspection, and restore power.',
    },
    dynamicsCampaignId: 'CAAS-ELECTRICAL-2024-Q1',
    landingUrl: '/electrical/panel-upgrade/',
    feeDetails: null,
  },

  'electrical/ev-charger': {
    serviceId: 'electrical-ev-charger',
    serviceName: 'EV Charger Installation',
    serviceType: 'third_party_contractor',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed electrician will assess your panel capacity, preferred charger location, and run length to provide a full quote including permit fees.',
      installation: 'Your electrician will install the dedicated circuit, mount the charger, and verify it communicates with your vehicle.',
    },
    dynamicsCampaignId: 'CAAS-ELECTRICAL-2024-Q1',
    landingUrl: '/electrical/ev-charger/',
    feeDetails: null,
  },

  'electrical/ceiling-fan': {
    serviceId: 'electrical-ceiling-fan',
    serviceName: 'Ceiling Fan Installation',
    serviceType: 'third_party_contractor',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed electrician will assess your existing wiring, box support, and any switch or dimmer upgrades needed.',
      installation: 'Your electrician will install a fan-rated box if needed, assemble and mount the fan, and wire all controls.',
    },
    dynamicsCampaignId: 'CAAS-ELECTRICAL-2024-Q1',
    landingUrl: '/electrical/ceiling-fans/',
    feeDetails: null,
  },

  'electrical/outlet-install': {
    serviceId: 'electrical-outlet-install',
    serviceName: 'Outlet Installation',
    serviceType: 'third_party_contractor',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed electrician will evaluate the run length, panel capacity, and outlet type (standard, GFCI, USB) to provide your quote.',
      installation: 'Your electrician will install the new circuit or tap an existing one, cut the box opening, and finish with a cover plate.',
    },
    dynamicsCampaignId: 'CAAS-ELECTRICAL-2024-Q1',
    landingUrl: '/electrical/outlet-installation/',
    feeDetails: null,
  },

  // ── Plumbing (third_party_contractor · form) ──────────────────────────────

  'plumbing/water-heater': {
    serviceId: 'plumbing-water-heater',
    serviceName: 'Water Heater Installation',
    serviceType: 'third_party_contractor',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed plumber will assess your current setup — tank vs. tankless, fuel type, venting — and quote the full replacement.',
      installation: 'Your plumber will disconnect and haul away the old unit, install the new water heater, and test for proper function and code compliance.',
    },
    dynamicsCampaignId: 'CAAS-PLUMBING-2024-Q1',
    landingUrl: '/plumbing/water-heaters/',
    feeDetails: null,
  },

  'plumbing/faucet': {
    serviceId: 'plumbing-faucet',
    serviceName: 'Faucet Installation',
    serviceType: 'third_party_contractor',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed plumber will review your existing supply lines, shutoffs, and drain configuration to quote your faucet swap.',
      installation: 'Your plumber will remove the old faucet, install the new one, reconnect supply lines, and test for leaks.',
    },
    dynamicsCampaignId: 'CAAS-PLUMBING-2024-Q1',
    landingUrl: '/plumbing/faucets/',
    feeDetails: null,
  },

  'plumbing/garbage-disposal': {
    serviceId: 'plumbing-garbage-disposal',
    serviceName: 'Garbage Disposal Installation',
    serviceType: 'third_party_contractor',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed plumber will assess your existing drain configuration and electrical access to provide your installation quote.',
      installation: 'Your plumber will remove the old unit, mount and wire the new disposal, and verify proper drainage and function.',
    },
    dynamicsCampaignId: 'CAAS-PLUMBING-2024-Q1',
    landingUrl: '/plumbing/garbage-disposals/',
    feeDetails: null,
  },

  'plumbing/toilet-install': {
    serviceId: 'plumbing-toilet-install',
    serviceName: 'Toilet Installation',
    serviceType: 'third_party_contractor',
    displayType: 'form',
    localServiceAvailable: true,
    areasOfInterest: [],
    stepDescriptions: {
      consultation: null,
      scheduling: null,
      quoting: 'A licensed plumber will confirm rough-in dimensions, wax ring requirements, and supply line compatibility before quoting.',
      installation: 'Your plumber will remove the old toilet, set the new one, connect supply lines, and verify there are no leaks.',
    },
    dynamicsCampaignId: 'CAAS-PLUMBING-2024-Q1',
    landingUrl: '/plumbing/toilets/',
    feeDetails: null,
  },
};

// ─── Lookup helper ────────────────────────────────────────────────────────────
export const getServiceConfig = (categorySlug, subcategorySlug) =>
  SERVICE_CONFIGS[`${categorySlug}/${subcategorySlug}`] ?? null;
