export function canContact(lead, { firstContactApproved = false } = {}) {
  return Boolean(lead?.email && firstContactApproved && !lead?.optOut);
}

export function draftIntroEmail(lead, { demoUrl, agencyName }) {
  if (!lead?.email) throw new Error("Lead email is required");
  if (!demoUrl) throw new Error("Demo URL is required");
  return {
    to: lead.email,
    subject: "Website demo for " + lead.name,
    body:
      "Hello " + lead.name + " team,\n\n" +
      "I’m reaching out from " + agencyName + ". I created a small website concept for " + lead.name +
      " using only public business information I could verify.\n\n" +
      "Demo: " + demoUrl + "\n\n" +
      "This is only a proposal preview. If you’re interested, I can customize the pages, content, branding and contact/booking flow around your requirements.\n\n" +
      "There is no obligation to proceed. Reply “stop” and I’ll close the outreach record.\n\nRegards,\n" + agencyName
  };
}