import { chooseOffer, slugify } from "./domain.js";

export function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function generateDemoSite(lead) {
  const offer = chooseOffer(lead);
  const title = safeText(lead.name + " — " + lead.category);
  const buttons = [
    lead.phone ? '<a class="btn primary" href="tel:' + safeText(lead.phone.replace(/[^+\\d]/g, "")) + '">Call now</a>' : "",
    lead.mapsUrl ? '<a class="btn" href="' + safeText(lead.mapsUrl) + '" rel="noopener">Open map</a>' : ""
  ].filter(Boolean).join(" ");
  return [
    "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">",
    "<title>" + title + "</title>",
    "<style>body{margin:0;font:16px system-ui,sans-serif;background:#f6f4ec;color:#173404}.wrap{max-width:980px;margin:auto;padding:28px}.nav{display:flex;justify-content:space-between}.hero{padding:86px 0 54px;display:grid;grid-template-columns:1.4fr .8fr;gap:30px}h1{font-size:clamp(42px,7vw,78px);line-height:.98}.card{background:#fff;border:1px solid #dce6dc;border-radius:24px;padding:26px;box-shadow:0 18px 50px rgba(23,52,4,.07)}.btn{display:inline-block;text-decoration:none;padding:13px 18px;border-radius:12px;border:1px solid #dce6dc;margin:6px 6px 0 0;color:#173404}.primary{background:#1e6b3e;color:#fff}@media(max-width:780px){.hero{grid-template-columns:1fr;padding-top:50px}}</style>",
    "</head><body><div class=\"wrap\">",
    "<nav class=\"nav\"><strong>" + safeText(lead.name) + "</strong><span>" + safeText(offer.name) + "</span></nav>",
    "<main><section class=\"hero\"><div><p>" + safeText(lead.category) + " · " + safeText(lead.city) + "</p><h1>" + safeText(lead.name) + "</h1><p>A modern mobile-first website concept for local customers to discover the business and get in touch.</p><div>" + buttons + "</div></div>",
    "<aside class=\"card\"><h2>Business details</h2><p><strong>Location</strong><br>" + safeText(lead.city) + (lead.address ? "<br>" + safeText(lead.address) : "") + "</p>" +
    (lead.phone ? "<p><strong>Phone</strong><br>" + safeText(lead.phone) + "</p>" : "") +
    "<p><strong>Proposal</strong><br>" + safeText(offer.name) + " · PKR " + offer.pricePkr.toLocaleString() + "</p></aside></section>",
    "<section class=\"card\"><strong>This is a proposal demo.</strong><br><small>Final copy, services, branding, booking, payments and domain setup are completed only after the business approves scope and provides missing information.</small></section></main>",
    "<footer style=\"padding:28px 0;opacity:.65\">Demo ID: " + safeText(slugify(lead.id)) + "</footer></div></body></html>"
  ].join("");
}