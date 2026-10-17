# LeadForge

GitHub-centered operating system for a small web agency.

Flow:
discover local business -> verify official website status -> create proposal demo -> approval queue -> outreach -> requirements -> proposal -> verified payment -> production -> handoff.

Tool roles:
- Maps/business search: discover public local businesses and listed contact channels.
- Web search/Firecrawl: verify official website status and public facts.
- GitHub: source of truth for lead records, demos, revisions and audit history.
- Vercel: preview and production hosting.
- AgentMail: approved outbound email and two-way replies.
- HubSpot: CRM pipeline, follow-ups and notes.

Safety:
- Social/directory pages are not automatically treated as official websites.
- Do not invent business facts.
- First outbound sales contact always requires a human approval gate.
- Stop immediately on opt-out.
- Do not mark payment verified from an unverified screenshot/message.
- Do not release production access before verified payment.
- Never email passwords or bypass permissions.

Local test:
npm test

Generate a demo:
node bin/build-demo.js leads/example.json demos/blue-cafe/index.html
