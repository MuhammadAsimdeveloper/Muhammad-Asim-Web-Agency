import test from "node:test";
import assert from "node:assert/strict";
import { planLead } from "../src/pipeline.js";
import { normalizeLead } from "../src/domain.js";

test("creates demo for a qualified no-website lead", () => {
  const lead = normalizeLead({ name: "Blue Cafe", category: "Cafe", city: "Bahawalpur", email: "owner@example.com", verified: true });
  const plan = planLead(lead);
  assert.equal(plan.action, "create_demo");
  assert.equal(plan.offer.code, "business");
  assert.equal(plan.requiresApproval, false);
});

test("stops before first outbound sales contact", () => {
  const lead = normalizeLead({ name: "Blue Cafe", category: "Cafe", city: "Bahawalpur", email: "owner@example.com", status: "demo_ready" });
  const plan = planLead(lead);
  assert.equal(plan.action, "request_first_contact_approval");
  assert.equal(plan.requiresApproval, true);
});

test("refuses to prospect a lead with an existing website", () => {
  const lead = normalizeLead({ name: "Blue Cafe", category: "Cafe", city: "Bahawalpur", email: "owner@example.com", website: "https://blue.example" });
  assert.equal(planLead(lead).action, "skip");
});