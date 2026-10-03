#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { normalizeLead, slugify } from "../src/domain.js";
import { generateDemoSite } from "../src/site.js";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error("Usage: node bin/build-demo.js <lead.json> <output.html>");
  process.exit(2);
}
const raw = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const lead = normalizeLead(raw);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, generateDemoSite(lead), "utf8");
console.log("Generated " + outputPath + " for " + slugify(lead.id));