/**
 * Wealthbox CRM Integration
 *
 * Docs: https://dev.wealthbox.com/
 * Auth: Bearer token via WEALTHBOX_API_KEY env var
 *
 * Flow on each quiz submission:
 *   1. createContact()  — creates the Contact record
 *   2. createOpportunity() — attaches "Prospect Pipeline" opportunity
 *
 * TODO (once API token is active):
 *   - Replace TAG_NAMES values with exact tag names from your Wealthbox account
 *   - Replace PIPELINE_STAGE_IDS with real stage IDs (get them via GET /pipelines)
 *   - Replace CUSTOM_FIELD_IDS with real IDs (get them via GET /custom_fields)
 */

const WEALTHBOX_BASE = 'https://api.crmworkspace.com/v1';

// ── Tags — update with exact names from Wealthbox > Settings > Tags ──────────
const TAG_NAMES = {
  tierA:  'ALIGN-Tier-A',   // TODO: confirm exact name
  tierB:  'ALIGN-Tier-B',   // TODO: confirm exact name
  tierC:  'ALIGN-Tier-C',   // TODO: confirm exact name
  source: 'ALIGN-Assessment', // TODO: confirm exact name
} as const;

// ── Pipeline — update after running GET /pipelines ───────────────────────────
const PROSPECT_PIPELINE_ID = 'TODO_PIPELINE_ID';   // TODO: replace with real ID

// Stage IDs within "Prospect Pipeline" — update after GET /pipelines/:id
const PIPELINE_STAGE_IDS: Record<'A' | 'B' | 'C', string> = {
  A: 'TODO_STAGE_ID_TIER_A',   // e.g. "Qualified - Strategy Session"
  B: 'TODO_STAGE_ID_TIER_B',   // e.g. "Discovery Call"
  C: 'TODO_STAGE_ID_TIER_C',   // e.g. "Nurture"
};

// ── Custom field IDs — update after GET /custom_fields ───────────────────────
// These are the custom fields you created in Wealthbox
const CUSTOM_FIELDS = {
  alignTier:          'TODO_CF_TIER',           // "ALIGN Tier" field ID
  alignPersona:       'TODO_CF_PERSONA',        // "ALIGN Persona" field ID
  alignIncomeSource:  'TODO_CF_INCOME_SOURCE',  // "Income Source" field ID
  alignIncomeStruct:  'TODO_CF_INCOME_STRUCT',  // "Income Structure" field ID
  alignAssetsRange:   'TODO_CF_ASSETS',         // "Assets Range" field ID
  alignRetirementTL:  'TODO_CF_RETIREMENT_TL',  // "Retirement Timeline" field ID
} as const;

// ── Helpers ──────────────────────────────────────────────────────────────────

function headers() {
  const key = process.env.WEALTHBOX_API_KEY;
  if (!key) throw new Error('WEALTHBOX_API_KEY is not set');
  return {
    'Content-Type': 'application/json',
    'ACCESS_TOKEN': key,
  };
}

async function wbFetch(path: string, method: string, body?: object) {
  const res = await fetch(`${WEALTHBOX_BASE}${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Wealthbox ${method} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
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

/**
 * Creates a Contact in Wealthbox and returns the contact ID.
 */
export async function createContact(lead: WealthboxLeadPayload): Promise<string> {
  const tierTag = TAG_NAMES[`tier${lead.tier}` as keyof typeof TAG_NAMES];

  const body = {
    type: 'Person',
    first_name: lead.firstName,
    last_name: lead.lastName,
    email_addresses: [{ address: lead.email, kind: 'work' }],
    ...(lead.phone && {
      phone_numbers: [{ address: lead.phone, kind: 'mobile' }],
    }),
    tags: [TAG_NAMES.source, tierTag],
    custom_fields: [
      { id: CUSTOM_FIELDS.alignTier,         value: lead.tier },
      { id: CUSTOM_FIELDS.alignPersona,      value: lead.persona },
      { id: CUSTOM_FIELDS.alignIncomeSource, value: lead.incomeSource },
      { id: CUSTOM_FIELDS.alignIncomeStruct, value: lead.incomeStructure },
      { id: CUSTOM_FIELDS.alignAssetsRange,  value: lead.assetsRange },
      { id: CUSTOM_FIELDS.alignRetirementTL, value: lead.retirementTimeline },
    ],
  };

  const data = await wbFetch('/contacts', 'POST', body);
  return String(data.contact?.id ?? data.id);
}

/**
 * Creates a "Prospect Pipeline" Opportunity attached to the contact.
 */
export async function createOpportunity(contactId: string, lead: WealthboxLeadPayload): Promise<void> {
  const stageId = PIPELINE_STAGE_IDS[lead.tier];
  const body = {
    name: `ALIGN Assessment — ${lead.firstName} ${lead.lastName}`,
    contact_id: contactId,
    pipeline_id: PROSPECT_PIPELINE_ID,
    pipeline_stage_id: stageId,
    status: 'open',
  };
  await wbFetch('/opportunities', 'POST', body);
}

/**
 * Main entry point — creates Contact + Opportunity.
 * Returns the Wealthbox contact ID, or null if anything fails.
 * Never throws — Wealthbox failure must never block the quiz flow.
 */
export async function pushLeadToWealthbox(lead: WealthboxLeadPayload): Promise<string | null> {
  try {
    const contactId = await createContact(lead);
    await createOpportunity(contactId, lead);
    return contactId;
  } catch (err) {
    console.error('[Wealthbox] Push failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
