import test from "node:test";
import assert from "node:assert/strict";
import { normalizeLead, hasUsableWebsite, qualifiesForDemo, chooseOffer, nextPipelineState } from "../src/domain.js";

test("normalizes a lead and keeps unspecified verification unknown", () => {
  const lead = normalizeLead({ name: "Blue Cafe", category: "Cafe", city: "Bahawalpur" });
  assert.equal(lead.website, null);
  assert.equal(lead.verified, null);
  assert.equal(lead.status, "discovered");
});

test("detects usable websites and qualifies only when no usable site exists", () => {
  const lead = normalizeLead({ name: "Blue Cafe", category: "Cafe", city: "Bahawalpur", phone: "0300" });
  assert.equal(hasUsableWebsite(lead), false);
  assert.equal(qualifiesForDemo(lead), true);
  assert.equal(hasUsableWebsite(normalizeLead({ ...lead, website: "https://example.com" })), true);
});

test("chooses offers from explicit requirements/category", () => {
  assert.equal(chooseOffer(normalizeLead({ name: "Shop", category: "Shop", city: "Bahawalpur" })).code, "starter");
  assert.equal(chooseOffer(normalizeLead({ name: "Clinic", category: "Clinic", city: "Bahawalpur" })).code, "business");
  assert.equal(chooseOffer(normalizeLead({ name: "Store", category: "Ecommerce Store", city: "Bahawalpur" })).code, "premium");
});

test("enforces safe pipeline transitions", () => {
  assert.equal(nextPipelineState("discovered", "demo_created"), "demo_ready");
  assert.throws(() => nextPipelineState("contacted", "payment_verified"), /Invalid transition/);
});