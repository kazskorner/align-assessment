/**
 * Wealthbox CRM Integration
 * Docs: https://dev.wealthbox.com/
 *
 * Flow: createContact → createOpportunity (Prospect Pipeline)
 *
 * Pipeline: "Prospect Pipeline" (ID: 123026)
 * Stage IDs confirmed via GET /v1/categories/opportunity_stages
 */

const WB_BASE = 'https://api.crmworkspace.com/v1';

// Tags auto-create in Wealthbox on first use.
const TAGS = {
  source: 'ALIGN-Assessment',
  tierA:  'ALIGN-Tier-A',
  tierB:  'ALIGN-Tier-B',
  tierC:  'ALIGN-Tier-C',
} as const;

// Prospect Pipeline (123026) stage IDs per tier.
const STAGE_IDS: Record<'A' | 'B' | 'C', number> = {
  A: 988759,  // New Lead
  B: 988759,  // New Lead
  C: 989670,  // Nurturing/Long Game
};

// Probabilities per tier (percentage).
const PROBABILITY: Record<'A' | 'B' | 'C', number> = {
  A: 70,
  B: 40,
  C: 10,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function authHeaders() {
  const key = process.env.WEALTHBOX_API_KEY;
  if (!key) throw new Error('WEALTHBOX_API_KEY is not set');
  return { 'Content-Type': 'application/json', 'ACCESS_TOKEN': key };
}

async function wbPost(path: string, body: object): Promise<any> {
  const res = await fetch(`${WB_BASE}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Wealthbox POST ${path} → ${res.status}: ${text}`);
  return JSON.parse(text);
}

// ── Public API ────────────────────────────────────────────────────────────────

export interface WealthboxLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tier: 'A' | 'B' | 'C';
  persona: string;
  incomeSource: string;
  incomeStructure: string;
  assetsRange: string;
  retirementTimeline: string;
}

async function createContact(lead: WealthboxLeadPayload): Promise<string> {
  const tierTag = TAGS[`tier${lead.tier}` as keyof typeof TAGS];

  const body: Record<string, unknown> = {
    type: 'Person',
    first_name: lead.firstName,
    last_name: lead.lastName,
    email_addresses: [{ address: lead.email, kind: 'work' }],
    tags: [TAGS.source, tierTag],
    important_information: `ALIGN Tier: ${lead.tier} | Persona: ${lead.persona} | Income Source: ${lead.incomeSource} | Income Structure: ${lead.incomeStructure} | Assets: ${lead.assetsRange} | Retirement Timeline: ${lead.retirementTimeline}`,
  };

  if (lead.phone) {
    body.phone_numbers = [{ address: lead.phone, kind: 'mobile' }];
  }

  const data = await wbPost('/contacts', body);
  const id = data.id;
  if (!id) throw new Error(`createContact: no id in response — ${JSON.stringify(data)}`);
  return String(id);
}

async function createOpportunity(contactId: string, lead: WealthboxLeadPayload): Promise<void> {
  const closeDate = new Date();
  closeDate.setFullYear(closeDate.getFullYear() + 1);
  const mm = String(closeDate.getMonth() + 1).padStart(2, '0');
  const dd = String(closeDate.getDate()).padStart(2, '0');
  const yyyy = closeDate.getFullYear();

  await wbPost('/opportunities', {
    name: `ALIGN Assessment — ${lead.firstName} ${lead.lastName}`,
    linked_to: [{ id: Number(contactId), type: 'Contact' }],
    stage: STAGE_IDS[lead.tier],
    probability: PROBABILITY[lead.tier],
    target_close: `${mm}/${dd}/${yyyy}`,
    amounts: [{ amount: 0, currency: '$', kind: 'AUM' }],
  });
}

/**
 * Creates a Contact + Opportunity in Wealthbox.
 * Returns the contact ID, or null on failure.
 * Never throws — Wealthbox failure must never block the quiz response.
 */
export async function pushLeadToWealthbox(lead: WealthboxLeadPayload): Promise<string | null> {
  try {
    const contactId = await createContact(lead);
    await createOpportunity(contactId, lead).catch(err =>
      console.error('[Wealthbox] Opportunity failed (non-fatal):', err instanceof Error ? err.message : err)
    );
    return contactId;
  } catch (err) {
    console.error('[Wealthbox] Contact creation failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
