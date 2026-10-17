# AI BUILD START HERE — Muhammad Asim Web Agency

Read README plus `docs/AI_BUILD_START_HERE.md`, `docs/INDUSTRY_TOOL_ARSENAL.md`, and `docs/ZEE_TOOLS_ECOSYSTEM.md`.

Mission: make agency delivery repeatable through audit → recommendation → approval → generated change → verification → deploy-ready report.

Consume canonical Build Vibe utilities for SEO metadata, sitemap, robots, favicon, OG, SEO/performance/accessibility audits, image optimization and QR. Keep this repo focused on agency/portfolio delivery, not a generic toolbox.

Inspect first. Use TDD for behavior changes. Never claim an audit, deployment or external integration succeeded without evidence. Update docs whenever the delivery workflow changes.

## Optional Shodan-assisted client exposure review (planned; additive)

**Status:** Planned — not implemented or tested. Use only for a specific client engagement with written authorization and a clearly documented asset scope.

- Enrich the existing audit → recommendation → approval → generated change → verification → deploy-ready report with public indexed service observations where relevant.
- Record client authorization, in-scope domains/IPs, source, observation/retrieval timestamps, freshness, confidence, and limitations.
- Label findings OBSERVED_BY_SHODAN, NEEDS_VALIDATION, VALIDATED, or NOT_CONFIRMED; independently validate before calling a vulnerability confirmed.
- Keep credentials server-side and out of client reports/logs. Respect current Shodan API limits, plan entitlements, terms, and commercial/data-use rights.
- Keep the capability optional and fail gracefully when unavailable. Do not perform intrusive scans or exploit attempts merely because a service appears in Shodan.
- Provide evidence-backed remediation recommendations and state that Shodan data does not guarantee website security.
- Add authorization, scope, secret-redaction, stale-data, quota/provider failure, and report-provenance tests before implementation.

Implementation-time reference: https://developer.shodan.io/api.

Supplemental details: [Shodan Integration Plan](SHODAN_INTEGRATION_PLAN.md).
