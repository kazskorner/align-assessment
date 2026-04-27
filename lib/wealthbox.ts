/**
 * Wealthbox CRM Integration
 * Docs: https://dev.wealthbox.com/
 *
 * Flow: createContact (always) → createOpportunity (if stage configured)
 *
 * To activate opportunity creation:
 *   1. Go to Wealthbox → Settings → Pipelines and create stages
 *   2. Fill in OPPORTUNITY_STAGES below with the exact stage names you created
 *      (e.g. "Strategy Session Scheduled", "Discovery Call", "Nurture")
 *
 * To add custom ALIGN fields to contacts:
 *   1. Go to Wealthbox → Settings → Custom Fields → Create fields
 *   2. Add them to the custom_fields array in createContact()
 */

const WB_BASE = 'https://api.crmworkspace.com/v1';

// Tags auto-create in Wealthbox on first use — these exact strings become tag names.
const TAGS = {
  source: 'ALIGN-Assessment',
  tierA:  'ALIGN-Tier-A',
  tierB:  'ALIGN-Tier-B',
  tierC:  'ALIGN-Tier-C',
} as const;

// TODO: Set these to the exact stage names you create in Wealthbox → Settings → Pipelines.
// Leave empty ('') to skip opportunity creation until stages are configured.
const OPPORTUNITY_STAGES: Record<'A' | 'B' | 'C', string> = {
  A: '',  // e.g. 'Strategy Session Scheduled'
  B: '',  // e.g. 'Discovery Call Scheduled'
  C: '',  // e.g. 'Nurture'
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
  const stage = OPPORTUNITY_STAGES[lead.tier];
  if (!stage) return; // skip until stages are configured

  const closeDate = new Date();
  closeDate.setFullYear(closeDate.getFullYear() + 1);
  const mm = String(closeDate.getMonth() + 1).padStart(2, '0');
  const dd = String(closeDate.getDate()).padStart(2, '0');
  const yyyy = closeDate.getFullYear();

  await wbPost('/opportunities', {
    name: `ALIGN Assessment — ${lead.firstName} ${lead.lastName}`,
    contact_id: Number(contactId),
    stage,
    probability: lead.tier === 'A' ? 70 : lead.tier === 'B' ? 40 : 10,
    projected_close_date: `${mm}/${dd}/${yyyy}`,
    revenue: 0,
  });
}

/**
 * Creates a Contact in Wealthbox (and optionally an Opportunity).
 * Returns the contact ID, or null on failure.
 * Never throws — Wealthbox failure must never block the quiz response.
 */
export async function pushLeadToWealthbox(lead: WealthboxLeadPayload): Promise<string | null> {
  try {
    const contactId = await createContact(lead);
    await createOpportunity(contactId, lead).catch(err =>
      console.error('[Wealthbox] Opportunity creation failed (non-fatal):', err instanceof Error ? err.message : err)
    );
    return contactId;
  } catch (err) {
    console.error('[Wealthbox] Contact creation failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
