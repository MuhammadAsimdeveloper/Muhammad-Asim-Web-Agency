import test from "node:test";
import assert from "node:assert/strict";
import { canContact, draftIntroEmail } from "../src/outreach.js";
import { normalizeLead } from "../src/domain.js";

test("drafts transparent outreach with demo and opt-out", () => {
  const lead = normalizeLead({ name: "Blue Cafe", category: "Cafe", city: "Bahawalpur", email: "owner@example.com" });
  const msg = draftIntroEmail(lead, { demoUrl: "https://demo.example/blue-cafe", agencyName: "Muhammad Asim Web Agency" });
  assert.equal(msg.to, "owner@example.com");
  assert.match(msg.body, /https:\/\/demo\.example\/blue-cafe/);
  assert.match(msg.body.toLowerCase(), /reply.*stop/);
});

test("blocks first contact without explicit approval or after opt-out", () => {
  const lead = normalizeLead({ name: "Blue Cafe", category: "Cafe", city: "Bahawalpur", email: "owner@example.com" });
  assert.equal(canContact(lead, { firstContactApproved: false }), false);
  assert.equal(canContact({ ...lead, optOut: true }, { firstContactApproved: true }), false);
  assert.equal(canContact(lead, { firstContactApproved: true }), true);
});