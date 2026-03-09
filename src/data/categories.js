// ─── 7 Service Categories ────────────────────────────────────────────────────
// Mirrors the 7 overarching categories referenced in the PRD.
// Each category contains its subcategories used to populate Hub + Department flows.

export const CATEGORIES = [
  {
    id: 'flooring',
    slug: 'flooring',
    label: 'Flooring',
    description: 'Hardwood, carpet, vinyl, tile & laminate',
    icon: 'flooring',
    subcategories: [
      { id: 'hardwood',    slug: 'hardwood',    label: 'Hardwood Flooring' },
      { id: 'carpet',      slug: 'carpet',      label: 'Carpet' },
      { id: 'vinyl-plank', slug: 'vinyl-plank', label: 'Vinyl Plank' },
      { id: 'tile',        slug: 'tile',        label: 'Tile Flooring' },
      { id: 'laminate',    slug: 'laminate',    label: 'Laminate' },
    ],
  },
  {
    id: 'appliances',
    slug: 'appliances',
    label: 'Appliances',
    description: 'Dishwashers, washers, dryers & refrigerators',
    icon: 'appliances',
    subcategories: [
      { id: 'dishwasher',      slug: 'dishwasher',      label: 'Dishwasher' },
      { id: 'washing-machine', slug: 'washing-machine', label: 'Washing Machine' },
      { id: 'dryer',           slug: 'dryer',           label: 'Dryer' },
      { id: 'refrigerator',    slug: 'refrigerator',    label: 'Refrigerator' },
    ],
  },
  {
    id: 'countertops',
    slug: 'countertops',
    label: 'Countertops',
    description: 'Granite, quartz, laminate & butcher block',
    icon: 'countertops',
    subcategories: [
      { id: 'granite',       slug: 'granite',       label: 'Granite' },
      { id: 'quartz',        slug: 'quartz',        label: 'Quartz' },
      { id: 'laminate-ct',   slug: 'laminate-ct',   label: 'Laminate' },
      { id: 'butcher-block', slug: 'butcher-block', label: 'Butcher Block' },
    ],
  },
  {
    id: 'window-treatments',
    slug: 'window-treatments',
    label: 'Window Treatments',
    description: 'Custom blinds, shades, shutters & drapery',
    icon: 'window-treatments',
    subcategories: [
      { id: 'blinds',   slug: 'blinds',   label: 'Blinds' },
      { id: 'shades',   slug: 'shades',   label: 'Shades' },
      { id: 'shutters', slug: 'shutters', label: 'Shutters' },
      { id: 'curtains', slug: 'curtains', label: 'Curtains & Drapes' },
    ],
  },
  {
    id: 'hvac',
    slug: 'hvac',
    label: 'HVAC',
    description: 'Central AC, furnaces, heat pumps & mini-splits',
    icon: 'hvac',
    subcategories: [
      { id: 'central-ac',  slug: 'central-ac',  label: 'Central Air Conditioning' },
      { id: 'furnace',     slug: 'furnace',     label: 'Furnace' },
      { id: 'heat-pump',   slug: 'heat-pump',   label: 'Heat Pump' },
      { id: 'mini-split',  slug: 'mini-split',  label: 'Mini-Split System' },
    ],
  },
  {
    id: 'electrical',
    slug: 'electrical',
    label: 'Electrical',
    description: 'Panel upgrades, EV chargers, ceiling fans & outlets',
    icon: 'electrical',
    subcategories: [
      { id: 'panel-upgrade',  slug: 'panel-upgrade',  label: 'Panel Upgrade' },
      { id: 'ev-charger',     slug: 'ev-charger',     label: 'EV Charger' },
      { id: 'ceiling-fan',    slug: 'ceiling-fan',    label: 'Ceiling Fan' },
      { id: 'outlet-install', slug: 'outlet-install', label: 'Outlet Installation' },
    ],
  },
  {
    id: 'plumbing',
    slug: 'plumbing',
    label: 'Plumbing',
    description: 'Water heaters, faucets, disposals & toilets',
    icon: 'plumbing',
    subcategories: [
      { id: 'water-heater',       slug: 'water-heater',       label: 'Water Heater' },
      { id: 'faucet',             slug: 'faucet',             label: 'Faucet Installation' },
      { id: 'garbage-disposal',   slug: 'garbage-disposal',   label: 'Garbage Disposal' },
      { id: 'toilet-install',     slug: 'toilet-install',     label: 'Toilet Installation' },
    ],
  },
];

// Lookup helpers
export const getCategoryBySlug = (slug) =>
  CATEGORIES.find((c) => c.slug === slug);

export const getSubcategoryBySlug = (categorySlug, subcategorySlug) => {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.subcategories.find((s) => s.slug === subcategorySlug);
};
