# ALIGN Retirement Assessment — Backend API

Production-grade REST API for the ALIGN retirement quiz assessment. Built with Next.js 14, TypeScript, and PostgreSQL (Neon).

## Features

✅ **Scoring Engine** — 34-question quiz with sophisticated scoring logic
✅ **Tier Calculation** — Waterfall rules for A/B/C tier assignment
✅ **Bipolar Traits** — 6 trait categories with tie-breaking logic
✅ **Quadrant Mapping** — Advisor value + Self efficacy → Implementation persona
✅ **Database Storage** — Neon PostgreSQL with connection pooling
✅ **Redtail Integration** — Automatic tag application + sequence triggering (ready to wire)
✅ **Trust Stacking** — Real-time counters for social proof

## Tech Stack

- **Runtime**: Node.js v24+
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL (Neon)
- **API**: RESTful (JSON)

## Quick Start

### 1. Prerequisites

- Node.js v24.14.0 or higher
- Neon PostgreSQL account (free tier available)
- GitHub account (for version control)

### 2. Setup

```bash
# Clone the repository
git clone https://github.com/kazskorner/align-assessment.git
cd align-assessment

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your credentials
# DATABASE_URL=postgresql://...
nano .env.local

# Create database schema
npm run db:setup

# Seed test data (optional)
npm run db:seed
```

### 3. Development

```bash
# Start local dev server
npm run dev

# Open http://localhost:3000
# API endpoint: http://localhost:3000/api/score
```

### 4. Test the Scoring Engine

```bash
# Run scoring tests with sample data
npm run test

# Or manually test with curl:
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "responses": {
      "1": "Strongly Agree",
      "2": "Agree",
      ...
    }
  }'
```

## API Reference

### POST `/api/score`

**Request:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "555-1234",
  "responses": {
    "1": "Strongly Agree",
    "2": "Agree",
    "3": "Neutral",
    ...
    "36": "CA"
  }
}
```

**Response:**
```json
{
  "respondentName": "John Doe",
  "email": "user@example.com",
  "tier": "A",
  "leadScore": 28,
  "traitResults": {
    "incomeSource": "Contractual",
    "incomeStructure": "Committed",
    "mindset": "Income Mindset",
    "liquidity": "Cash Liquidity",
    "spender": "Back Loaded",
    "payoutPattern": "Lifetime Income"
  },
  "quadrant": {
    "advisorValue": 5,
    "selfEfficacy": 3
  },
  "persona": "Lifestyle Curator",
  "copy": {
    "primaryTraits": "...",
    "secondaryTraits": "...",
    "personaDescription": "..."
  },
  "redtailTags": [
    "ALIGN: Tier A",
    "ALIGN: Time to Retirement 0-3 Yrs",
    "ALIGN: Age Range 62-67"
  ],
  "demographics": {
    "ageRange": "62–67",
    "timeToRetirement": "0–3 years",
    "assetsSaved": "$3M+",
    "taxBuckets": "Only 1 bucket checked"
  }
}
```

## Deployment to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "ALIGN backend initial build"
git push origin main

# 2. Connect to Vercel
# Go to vercel.com, import from GitHub, select this repo

# 3. Set environment variables in Vercel dashboard
# Add DATABASE_URL and other secrets

# 4. Deploy
# Vercel will auto-deploy on push to main
```

## Database Schema

See `schema.sql` for complete schema. Key tables:

- `quiz_responses` — Every quiz taken (email, tier, persona, traits)
- `scoring_rules` — Question → point value mappings
- `copy_matrix` — 40 copy descriptions for results pages
- `tier_rules` — Waterfall logic for tier assignment
- `trust_counters` — Aggregated metrics (total quizzes, bookings, etc.)
- `redtail_tag_config` — Mapping quiz results to Redtail tags

## Tier Assignment Rules

### Waterfall Logic

1. **Hard Knockout** — Assets < $750k AND Retirement > 10 yrs → Tier C (overrides all)
2. **Tier A** — Assets ≥ $1.5M AND Retirement ≤ 5 yrs → Tier A
3. **Tier B** — Tier score ≥ 6 (cumulative) → Tier B
4. **Default** — Everything else → Tier C

### Tier Scoring

- Q20 (Time to Retire): 0–10 pts (dominates)
- Q32 (Assets): 0–8 pts
- Q33 (Income/NW): 0–4 pts
- Q31 (Age): 0–3 pts
- Q18 (Advisor Intent): 0–2 pts
- Q17 (Concern): 0–1 pt
- Q35 Bonus: +1 pt (single tax bucket)

## Bipolar Traits

| Category | Trait A | Trait B | Questions |
|----------|---------|---------|-----------|
| Income Source | Contractual | Market Driven | Q4–7 |
| Income Structure | Committed | Adjustable | Q8–11 |
| Mindset | Income Mindset | Net Worth Mindset | Q2, Q12, Q13 |
| Liquidity | Cash Liquidity | Investment Liquidity | Q14, Q15, Q24 |
| Spender | Back Loaded | Front Loaded | Q1, Q3, Q34 |
| Payout Pattern | Lifetime Income | Phased Income | Q21–23 |

**Tie-breaking:** Primary traits default to conservative (A side). Secondary traits follow Income Source decision.

## Implementation Personas

Based on Advisor Value (Q25–27) and Self Efficacy (Q28–30):

- **Confident Investor** — High self efficacy, low advisor value
- **Collaborative Visionary** — High both
- **Lifestyle Curator** — High advisor value, low self efficacy
- **Pragmatic Realist** — Low both

## Redtail Integration

Once you have Redtail API credentials:

1. Update `.env.local` with `REDTAIL_API_KEY` and `REDTAIL_PARTNER_ID`
2. Wire `POST /api/redtail/create-contact` to sync quiz responses
3. API will automatically apply tier + timeline + age tags
4. Sequences will trigger based on tag application

## Troubleshooting

**Port 3000 already in use?**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Database connection error?**
```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

**Scoring engine not calculating correctly?**
```bash
# Run test suite
npm run test

# Check scoring-engine.ts for logic
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Lint code
- `npm run db:setup` — Initialize Neon database
- `npm run db:seed` — Seed sample data
- `npm run test` — Run scoring tests

## License

Proprietary — Convergent Financial Partners / Kaz's Korner

## Support

For issues or questions, contact: adam.kazinec@convergentfp.com

---

**Next Steps:**
1. ✅ Backend API ready
2. ⏳ Frontend (React/Next.js) for landing + results pages
3. ⏳ Redtail CRM integration (wire in once you have API credentials)
4. ⏳ Vercel deployment
5. ⏳ FMG email sequence setup

Happy building! 🚀
