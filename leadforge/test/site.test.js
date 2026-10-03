import test from "node:test";
import assert from "node:assert/strict";
import { generateDemoSite, safeText } from "../src/site.js";
import { normalizeLead } from "../src/domain.js";

test("generates mobile-first demo from verified business facts", () => {
  const lead = normalizeLead({ name: "Blue Cafe", category: "Cafe", city: "Bahawalpur", phone: "03001234567" });
  const html = generateDemoSite(lead);
  assert.match(html, /Blue Cafe/);
  assert.match(html, /Bahawalpur/);
  assert.match(html, /03001234567/);
  assert.doesNotMatch(html, /123 Main Street/);
});

test("escapes business-provided HTML", () => {
  assert.equal(safeText("<script>alert(1)</script>"), "&lt;script&gt;alert(1)&lt;/script&gt;");
});