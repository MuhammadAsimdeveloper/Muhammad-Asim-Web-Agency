import { hasUsableWebsite, qualifiesForDemo, chooseOffer } from "./domain.js";

export function planLead(lead) {
  if (lead?.optOut) return { action: "skip", reason: "Lead opted out", requiresApproval: false };
  if (hasUsableWebsite(lead)) return { action: "skip", reason: "Business already has a usable website", requiresApproval: false };

  if (lead?.status === "discovered") {
    if (!qualifiesForDemo(lead)) return { action: "manual_review", reason: "Needs verification or reachable public contact channel", requiresApproval: true };
    return { action: "create_demo", offer: chooseOffer(lead), requiresApproval: false };
  }
  if (lead?.status === "demo_ready") return { action: "request_first_contact_approval", offer: chooseOffer(lead), requiresApproval: true };
  if (lead?.status === "awaiting_approval") return { action: "await_approval", requiresApproval: true };
  if (lead?.status === "proposal") return { action: "await_payment", offer: chooseOffer(lead), requiresApproval: false };
  if (lead?.status === "paid") return { action: "deliver", offer: chooseOffer(lead), requiresApproval: false };
  return { action: "observe", reason: "No automated action for current state", requiresApproval: false };
}