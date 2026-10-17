const TRANSITIONS = {
  discovered: { demo_created: "demo_ready" },
  demo_ready: { approval_requested: "awaiting_approval" },
  awaiting_approval: { approved: "contacted", rejected: "closed" },
  contacted: { positive_reply: "proposal", negative_reply: "closed", opt_out: "do_not_contact" },
  proposal: { payment_verified: "paid", rejected: "closed" },
  paid: { delivered: "delivered" },
  delivered: {},
  closed: {},
  do_not_contact: {}
};

export function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export function normalizeLead(raw = {}) {
  const clean = value => typeof value === "string" && value.trim() ? value.trim() : null;
  const name = clean(raw.name);
  const city = clean(raw.city);
  if (!name || !city) throw new Error("Lead name and city are required");
  return {
    id: clean(raw.id) || slugify(name + "-" + city),
    name,
    category: clean(raw.category) || "Local Business",
    city,
    phone: clean(raw.phone),
    email: clean(raw.email),
    website: clean(raw.website),
    address: clean(raw.address),
    mapsUrl: clean(raw.mapsUrl),
    source: clean(raw.source) || "manual",
    verified: raw.verified === undefined ? null : Boolean(raw.verified),
    requiresBooking: Boolean(raw.requiresBooking),
    requiresPayments: Boolean(raw.requiresPayments),
    optOut: Boolean(raw.optOut),
    status: clean(raw.status) || "discovered"
  };
}

export function hasUsableWebsite(lead) {
  if (!lead || typeof lead.website !== "string") return false;
  try {
    const url = new URL(lead.website);
    return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function qualifiesForDemo(lead) {
  return Boolean(lead?.name && lead?.city && !hasUsableWebsite(lead) && !lead.optOut && (lead.phone || lead.email) && lead.verified !== false);
}

export function chooseOffer(lead) {
  const category = String(lead?.category || "").toLowerCase();
  if (lead?.requiresPayments || /e-?commerce|online store|retail shop/.test(category)) return { code: "premium", name: "Premium Business Website", pricePkr: 75000 };
  if (lead?.requiresBooking || /clinic|doctor|salon|spa|hotel|guest house|restaurant|cafe|coffee shop/.test(category)) return { code: "business", name: "Business Website", pricePkr: 45000 };
  return { code: "starter", name: "Starter Business Website", pricePkr: 25000 };
}

export function nextPipelineState(current, event) {
  const next = TRANSITIONS[current]?.[event];
  if (!next) throw new Error("Invalid transition: " + current + " + " + event);
  return next;
}