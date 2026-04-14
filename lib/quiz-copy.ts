/**
 * ALIGN Quiz Copy — sourced verbatim from ALIGN_Quiz_Master_v4 spreadsheet.
 * DO NOT edit copy here without updating the spreadsheet first.
 * Updated: 2026-04-13
 */

/* ─── QUESTIONS (34 total) ───────────────────────────────────────────────── */
export const QUESTIONS = [
  // Block 1 — Hook (Q1–3)
  { id: 1,  text: "Enjoying life when I can matters more to me than preserving spending later.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 2,  text: "A steady, reliable income matters more to me than maximizing my net worth.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 3,  text: "I'd rather spend more in the early years of retirement while I'm more active.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  // Block 2 — Trait questions (Q4–15)
  { id: 4,  text: "I want my essential living expenses covered regardless of market performance.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 5,  text: "I am okay if my retirement income changes based on market performance.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 6,  text: "Stable income for my essential needs matters more to me than chasing investment upside.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 7,  text: "I'm comfortable with income variability if it increases long-term growth of my net worth.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 8,  text: "I prefer having the ability to change my mind over locking in guaranteed long-term outcomes.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 9,  text: "I want the flexibility to adjust my retirement income strategy as life changes.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 10, text: "The longer my planning timeframe, the more important a stable, consistent retirement income strategy becomes to me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 11, text: "I would rather adapt over time than commit to one long-term strategy.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 12, text: "I'm comfortable drawing from my principal if it improves the quality of my retirement.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 13, text: "I will sacrifice lifestyle in retirement to preserve my portfolio's value.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 14, text: "I will sell some investments for 'pop-up' expenses.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 15, text: "Having a surplus of cash available helps me feel calm.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  // Block 3 — Soft intent (Q16–17)
  { id: 16, text: "What is your biggest concern today?", options: ["Do I have enough to retire?", "How do I turn assets into income?", "Am I on track?", "Tax efficiency", "Just exploring"] },
  { id: 17, text: "Are you looking for an advisor to customize or build a retirement strategy?", options: ["Build New", "Update Existing", "Neither"] },
  // Block 4 — Tier signal 1 (Q18)
  { id: 18, text: "How long until you plan to retire?", options: ["0 – 3 years", "Already Retired", "3 – 5 years", "5 – 10 years", "10 – 15 years", "15+ years"] },
  // Block 5 — Payout Pattern + Quadrant (Q19–25)
  { id: 19, text: "Structuring cash flows by time periods helps me feel in control.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 20, text: "I prefer having income streams that last the rest of my life.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 21, text: "Organizing income into time segments (every 5–7 years) makes sense to me.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 22, text: "If I see cash in the bank, I worry that it should be invested.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 23, text: "I believe a financial professional can identify risks in my retirement plan that I may overlook on my own.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 24, text: "I prefer to be presented with a few vetted options, rather than researching every available financial product myself.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 25, text: "The primary value of a financial advisor is providing access to exclusive investment opportunities I cannot reach on my own.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  // Block 6 — Self Efficacy + Tier signal 2 (Q26–29)
  { id: 26, text: "I understand financial concepts like: sequence of returns risk and tax loss harvesting.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 27, text: "I feel overwhelmed by the complexity of retirement income planning.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 28, text: "If I had to implement my retirement plan tomorrow, without any outside help, I am confident I would succeed.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 29, text: "What is your age range?", options: ["Under 50", "51–62", "62–67", "68–74", "75+"] },
  // Block 7 — Financial profile (Q30–34)
  { id: 30, text: "About how much do you currently have saved and invested (excluding your home)?", options: ["$3M+", "$1.5M – $3M", "$750k – $1.5M", "$250k – $750k", "Less than $250k"] },
  { id: 31, text: "Which of the following apply to you?", options: ["$5M+ active investments", "Net worth excl. home ≥ $2.2M", "$1.1M+ managed by advisor", "Individual income $200k+ (past 2 yrs)", "Household income $300k+ (past 2 yrs)", "Net worth excl. home ≥ $1M", "None of the above"] },
  { id: 32, text: "A financial need, late in life, keeps me up at night.", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 33, text: "Which tax buckets hold your assets? (select one that best applies)", options: ["Only 1 bucket checked", "Not sure", "2 buckets checked", "3+ buckets checked"] },
  { id: 34, text: "State of Residence", options: [], isDropdown: true },
] as const;

/* ─── US STATES ─────────────────────────────────────────────────────────── */
export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

/* ─── PRIMARY TRAIT COPY ─────────────────────────────────────────────────── */
export const PRIMARY_TRAIT_COPY: Record<string, string> = {
  Contractual: `Your score reflects a strong preference for income certainty. Contractual income — guaranteed payments that arrive regardless of how markets perform — is the foundation your plan is built around.\n\nThis isn't about being conservative in a simplistic sense. It's about recognizing that a retirement plan funded primarily by guaranteed income sources is structurally different from one that depends on portfolio performance. The guaranteed income handles the non-negotiables. It removes the anxiety of watching a balance and wondering how long it lasts.\n\nThe tradeoff is flexibility. Assets allocated to guaranteed income solutions give up some liquidity and optionality in exchange for certainty. That's not a flaw — it's the mechanism. You're converting financial capital into lifetime income certainty, which frees up the rest of the plan to pursue growth or discretionary spending without jeopardizing the baseline.\n\nYour Contractual score tells us how much of your essential income floor should be built from guaranteed sources versus portfolio withdrawals.`,

  "Market Driven": `You're comfortable letting your portfolio do the work. Market-driven income means your retirement cash flow comes from systematic withdrawals, dividends, or capital gains — not from a guaranteed payment schedule. The income isn't fixed, and you're okay with that.\n\nWhat this profile reflects is confidence. Confidence in your portfolio's long-term performance, in your ability to manage variability, and in the flexibility to adjust your spending when markets shift. That's not everyone. A lot of people say they're comfortable with market risk until they actually retire and the withdrawals start — then the math gets personal.\n\nThe honest upside of this approach is control. You stay invested, you maintain liquidity, and you're not locking assets into products that can't be unwound. The trade-off is that your income isn't guaranteed. A bad sequence of returns in the early years of retirement can do real damage to a purely market-driven strategy.\n\nYour Market-Driven score tells us how much of your income plan should stay flexible and portfolio-dependent versus anchored in something more certain.`,

  Committed: `Committed Structure means you're drawn to locking things in. You'd rather transfer risk to an institution and know exactly what your income looks like than maintain full control and deal with the variability that comes with it.\n\nThere's a lot of wisdom in that. Sequence of returns risk, longevity risk, the cognitive load of managing withdrawals in your 80s — a committed structure addresses all of it by design. The plan runs without requiring you to actively manage it.\n\nThe cost is liquidity. Assets moved into committed income solutions — annuities, certain pension-style products — aren't as accessible as assets sitting in an investment account. That's not a flaw, it's the mechanism. You're exchanging access for certainty.\n\nYour Committed score reflects how much of your retirement structure should be built around long-term commitments rather than flexibility.`,

  Adjustable: `Adjustable Structure means you want to stay in control. Your income strategy should be able to move — responding to market performance, changing spending needs, and life circumstances — rather than being locked into a fixed framework.\n\nWhat this looks like in practice is a retirement built more heavily around investment accounts, systematic withdrawal strategies, and income sources that can be dialed up or down. The plan has flexibility baked in, which means it also requires more active management and a larger asset base to absorb the volatility that comes with it.\n\nThe honest consideration here is that flexibility has a cost. Without guaranteed income as a floor, a prolonged market downturn in the early years of retirement can force spending cuts at exactly the wrong time. That risk is manageable — but it has to be planned for, not ignored.\n\nYour Adjustable score tells us how much of your structure should stay flexible versus how much should be committed to longer-term solutions.`,
};

/* ─── SECONDARY TRAIT COPY ───────────────────────────────────────────────────
 * Key format: `${traitValue}|${incomeSource}|${incomeStructure}`
 * e.g. "Income Mindset|Contractual|Committed"
 * Sourced verbatim from Copy Matrix (Sheet 6) of ALIGN_Quiz_Master_v4.
 * ─────────────────────────────────────────────────────────────────────────── */
export const SECONDARY_TRAIT_COPY: Record<string, string> = {

  // ── MINDSET ──────────────────────────────────────────────────────────────
  "Income Mindset|Contractual|Committed": `Your priority is reliable monthly cash flow, and your broader profile is built to support exactly that. Guaranteed income covers the baseline, committed structure keeps it predictable, and the goal is a retirement that funds your lifestyle without requiring you to watch the market to know if you can spend this month.\n\nExample: Guaranteed income streams — annuity payouts, pension income, Social Security — are directed toward essential monthly expenses. The investment portfolio isn't the primary income engine; it's a reserve.`,

  "Income Mindset|Contractual|Adjustable": `Monthly income is the priority, and your adjustable structure means you have room to evolve how you generate it over time. The income target stays consistent; the tools used to hit it can shift as your situation changes.\n\nExample: Core expenses are anchored by a guaranteed income product. A separate adjustable withdrawal account handles discretionary spending and scales with changing needs — more in active years, less as lifestyle costs naturally compress.`,

  "Income Mindset|Market Driven|Committed": `You want dependable monthly income and a committed withdrawal framework is what keeps a market-driven portfolio from becoming an income source that varies month to month. The structure is what transforms portfolio performance into something that feels like a paycheck.\n\nExample: A fixed monthly draw is established and held consistent regardless of short-term market movement. The portfolio funds it — the committed structure is what keeps it stable.`,

  "Income Mindset|Market Driven|Adjustable": `You want reliable cash flow and you're comfortable letting the portfolio generate it. An adaptable framework means the withdrawal rate can respond to what markets are actually doing — pulling back in down years, recovering in strong ones — without abandoning the income goal.\n\nExample: A dynamic withdrawal strategy sets a target range rather than a fixed number. Spending stays near the top of the range in strong years, pulls toward the bottom when markets compress, and the income keeps flowing either way.`,

  "Net Worth Mindset|Contractual|Committed": `You want your portfolio to keep growing, and a committed income structure is what makes that possible without forcing you to liquidate investments to fund living expenses. Guaranteed income covers the baseline; the investment portfolio stays invested for long-term growth.\n\nExample: Annuity or pension income funds essential expenses. The investment portfolio isn't touched for income — it compounds. What gets distributed at death, or passed to heirs, is whatever that portfolio has grown to.`,

  "Net Worth Mindset|Contractual|Adjustable": `You're focused on building long-term portfolio value, and your flexibility means the plan can adjust how that's structured over time. A contractual income layer handles predictable expenses without requiring the investment portfolio to do double duty.\n\nExample: A guaranteed income product covers the baseline. A growth-oriented investment portfolio is accessed only opportunistically — for large planned expenses or major life events — rather than treated as a monthly income source.`,

  "Net Worth Mindset|Market Driven|Committed": `Portfolio growth is the goal, and a committed withdrawal structure is what keeps that goal from being undermined by reactive spending decisions. The framework prevents the plan from drifting in years when markets are strong and discipline is hardest to maintain.\n\nExample: Withdrawals are limited to portfolio gains or dividends. Principal stays invested. The committed structure is what makes that discipline stick rather than eroding when markets perform well and spending temptation increases.`,

  "Net Worth Mindset|Market Driven|Adjustable": `You want the portfolio to grow and the flexibility to manage it on your terms. Withdrawals happen when the portfolio supports them — not on a fixed schedule — which keeps assets compounding as long as possible.\n\nExample: Withdrawals are triggered only when the portfolio crosses a defined value threshold. In flat or down years, the portfolio is left alone. The goal is to maximize what's there at the end, not optimize for a monthly income target.`,

  // ── LIQUIDITY ─────────────────────────────────────────────────────────────
  "Cash Liquidity|Contractual|Committed": `You want a dedicated cash reserve that isn't connected to anything else in the plan. With guaranteed income already covering essential expenses, the cash reserve functions as a true emergency buffer — not a backup income source, not a secondary investment.\n\nExample: 12 to 24 months of discretionary expenses sit in a high-yield savings account. That account doesn't fund retirement lifestyle. It exists for one thing: unexpected expenses that fall outside the normal income plan.`,

  "Cash Liquidity|Contractual|Adjustable": `A dedicated cash reserve and a flexible income structure work well together. The reserve can be sized up or down over time as income needs shift, and drawing on it or replenishing it doesn't require restructuring anything else in the plan.\n\nExample: A cash target is set at the start of retirement and revisited annually. As spending patterns become clearer, the target adjusts — the reserve stays right-sized rather than either excessive or insufficient.`,

  "Cash Liquidity|Market Driven|Committed": `Market-driven income has variability built into it. A dedicated cash reserve is what prevents that variability from forcing investment liquidation at the wrong time. The buffer absorbs the unexpected so the portfolio doesn't have to.\n\nExample: One to three years of expenses in cash or short-term instruments. The portfolio stays invested through market cycles. The cash reserve is what makes that possible without anxiety.`,

  "Cash Liquidity|Market Driven|Adjustable": `A cash buffer gives a market-driven, flexible plan room to breathe. It's what allows the portfolio to stay invested during downturns rather than getting sold down to cover a surprise expense.\n\nExample: A rolling cash reserve is maintained — replenished in strong market years, drawn on when markets compress. The investment portfolio isn't the first call when something unexpected comes up.`,

  "Investment Liquidity|Contractual|Committed": `You're comfortable accessing cash by selling investments when needed rather than holding a large dedicated reserve. With guaranteed income handling the baseline, the investment portfolio can stay more fully invested — and liquidation only happens when something genuinely unexpected arises.\n\nExample: A diversified brokerage account serves as the liquidity layer. Positions are sold selectively when a significant unplanned expense comes up. The guaranteed income floor is what makes this approach viable without creating chronic financial stress.`,

  "Investment Liquidity|Contractual|Adjustable": `Keeping assets invested rather than parked in cash aligns with a flexible structure that can adjust allocations when liquidity is needed. Contractual income handles predictable expenses — the investment portfolio is the backstop for everything else.\n\nExample: A mix of liquid holdings — ETFs, short-duration bonds — can be accessed without disrupting the core income strategy. There's no dedicated cash reserve, but there's always something that can be sold cleanly.`,

  "Investment Liquidity|Market Driven|Committed": `The investment portfolio is both the income engine and the liquidity source. A committed withdrawal structure adds the discipline that keeps those two functions from working against each other — income draws happen on schedule, and liquidations for unexpected needs come from a designated layer, not randomly.\n\nExample: A specific segment of the portfolio is set aside as the liquidity reserve — separate from the assets funding the committed withdrawal schedule. When something unexpected arises, that layer gets tapped first.`,

  "Investment Liquidity|Market Driven|Adjustable": `The portfolio handles income and liquidity both. The flexibility to shift between those two functions as circumstances change is what makes this combination work — but it requires a clear structure to prevent them from competing with each other.\n\nExample: Near-term expenses and potential liquidity needs sit in more accessible, lower-volatility assets. Longer-term growth assets stay fully invested. The structure separates the two jobs even within a single portfolio.`,

  // ── SPENDER ──────────────────────────────────────────────────────────────
  "Front Loaded|Contractual|Committed": `Spending more early in retirement — while health and mobility are at their peak — is a deliberate financial strategy, not a lack of discipline. A committed income structure supports it by locking in reliable cash flow from day one, which removes the uncertainty that makes people hesitate to actually spend.\n\nExample: Guaranteed income covers all essential expenses. A separate discretionary bucket funds elevated spending in the first decade — travel, experiences, the things that require physical capacity. That bucket has a defined size, and when it's spent, the plan shifts naturally.`,

  "Front Loaded|Contractual|Adjustable": `Spending more in the active years and less later isn't a plan that requires a dramatic strategy change — it just needs to be built in from the start. A flexible structure accommodates the shift without requiring a new financial plan every five years.\n\nExample: Higher spending in years one through twelve is planned and funded. The adjustable withdrawal strategy steps down naturally after that — not because something went wrong, but because that's how the plan was designed.`,

  "Front Loaded|Market Driven|Committed": `Front-loading retirement spending is a legitimate strategy for people who understand their own timeline. A committed withdrawal framework is what keeps it from becoming a plan that runs out of gas early — it creates guardrails without eliminating the intent.\n\nExample: A fixed elevated draw is set for the first decade, with a pre-defined reduction trigger if portfolio performance falls below a threshold. The spending is intentional; the structure prevents it from being reckless.`,

  "Front Loaded|Market Driven|Adjustable": `Spending more now and adjusting later isn't a contradiction — it's a realistic picture of how retirement actually unfolds for most people. A market-driven, flexible approach is built to accommodate that pattern rather than fight it.\n\nExample: A spending range is established rather than a fixed number. In strong market years, spending runs toward the top of the range. When markets pull back, it adjusts. The intent to spend more early stays intact; the flexibility is what keeps it sustainable.`,

  "Back Loaded|Contractual|Committed": `Spending conservatively early in retirement to protect resources for later is a strategy that reflects something most people don't think about clearly enough: retirement doesn't get cheaper as it gets older. Healthcare, long-term care, and the costs of aging tend to accelerate. A committed income structure is designed to be there when that happens.\n\nExample: Guaranteed income is structured with an eye toward covering later-life expenses — not just current lifestyle. Early retirement spending is deliberately modest, preserving flexibility for the years when the financial demands are likely to be highest.`,

  "Back Loaded|Contractual|Adjustable": `Spending less early and more later is a disciplined approach that works best when the structure can adapt as those later needs become clearer. A flexible income plan accommodates the increase without requiring a rebuild.\n\nExample: Income starts modestly and increases at specific milestones — not arbitrary age thresholds, but actual life events: a health change, a shift in living situation, a long-term care need that arrives.`,

  "Back Loaded|Market Driven|Committed": `A committed withdrawal structure is what keeps a back-loaded spending approach from drifting. Without it, strong early market performance creates the temptation to spend more now — which directly undermines the strategy's intent.\n\nExample: A conservative fixed withdrawal rate is held firm regardless of portfolio performance. The discipline of the committed structure is what ensures resources are intact when later-life costs arrive.`,

  "Back Loaded|Market Driven|Adjustable": `Drawing modestly early while letting the portfolio grow is a patient strategy. The flexibility to increase income later — when the need actually arrives — is what makes it work without forcing people to pre-commit to a spending level they can't yet define.\n\nExample: Withdrawals start low. A deliberate income increase is planned for a specific age window — typically when healthcare and care-related costs begin to rise. The portfolio has been growing in the meantime; the timing is designed to match the need.`,

  // ── PAYOUT PATTERN ────────────────────────────────────────────────────────
  "Phased Income|Contractual|Committed": `Retirement organized into distinct phases — each funded intentionally — is a structured way to handle the reality that a 30-year retirement isn't one continuous financial situation. A committed, guaranteed income layer makes phase planning more reliable because the funding for each chapter doesn't depend on what markets do when that chapter arrives.\n\nExample: Deferred income products activate at different ages — one at 65, another at 75. Each phase of retirement has a dedicated, predictable income stream. The plan doesn't need to be renegotiated every time life shifts.`,

  "Phased Income|Contractual|Adjustable": `Thinking in retirement chapters makes sense, and a flexible structure means each chapter can be designed closer to when it begins rather than locked in decades early. Contractual income anchors the phases that are most defined; the adjustable layer handles the ones that aren't.\n\nExample: Guaranteed income funds the core retirement years. Later phases stay more open — allocations and strategies are revisited as each chapter approaches rather than pre-committed years in advance.`,

  "Phased Income|Market Driven|Committed": `Organizing retirement into phases adds structure to a market-driven income strategy that can otherwise drift. A committed framework for each chapter means withdrawals follow a defined logic — not just whatever the portfolio happens to be doing.\n\nExample: Specific portions of the portfolio are allocated to each retirement phase with a committed draw rate per phase. Income comes from the portfolio, but it follows a structure rather than being pulled reactively.`,

  "Phased Income|Market Driven|Adjustable": `Planning in phases with full flexibility means each chapter of retirement can be built from scratch when it actually arrives — informed by what the portfolio looks like, what life looks like, and what the next decade actually requires.\n\nExample: A rolling five-to-seven year planning horizon. Each phase is structured as it approaches rather than committed to in advance. The portfolio and the plan evolve together.`,

  "Lifetime Income|Contractual|Committed": `Lifetime income — steady, predictable, not requiring active management — is the clearest expression of a Contractual and Committed profile. The plan is built to run. Income arrives. Decisions about withdrawal rates and market timing aren't part of the daily calculus.\n\nExample: Social Security, pension income, and an annuity product are combined to cover all essential expenses for life. The income doesn't depend on market performance. It doesn't require annual review to know it'll still be there.`,

  "Lifetime Income|Contractual|Adjustable": `Lifetime income as a goal doesn't require a rigid structure to achieve it. A flexible approach means how that income is generated can evolve — as products improve, as tax situations change, as life circumstances shift — without abandoning the goal of income that simply doesn't stop.\n\nExample: A guaranteed income product anchors the lifetime income floor. A flexible withdrawal account supplements it based on discretionary needs — more in active years, less as lifestyle naturally simplifies.`,

  "Lifetime Income|Market Driven|Committed": `A portfolio can be a lifetime income source — but only with the discipline to treat it that way. A committed withdrawal framework is what separates a portfolio that lasts 30 years from one that runs low in year 18 because spending wasn't controlled during a strong market run.\n\nExample: A sustainable withdrawal rate — designed to support income for 30 or more years — is established and held. Adjustments are made for inflation, not for market performance. The portfolio funds the income; the structure is what makes it last.`,

  "Lifetime Income|Market Driven|Adjustable": `Lifetime income from a flexible portfolio is achievable when the withdrawal strategy has clear boundaries. Flexibility within a defined range means the plan can perform well in strong markets without creating a spending pattern that's impossible to sustain when markets don't cooperate.\n\nExample: A withdrawal rate range is established — an upper bound for strong years, a lower bound for compressed ones. Income flows for life. The flexibility is in how much, not whether.`,
};

/* ─── IMPLEMENTATION PERSONA COPY ───────────────────────────────────────── */
export const PERSONA_COPY: Record<string, { quadrant: string; description: string }> = {
  "Confident Investor": {
    quadrant: "High Self Efficacy / Low Advisor Value",
    description: `You're confident in your ability to research, build, and manage your own retirement income strategy. That confidence is earned for a lot of people in this profile — financial literacy, direct investment experience, or a career that kept them close to money and markets.\n\nThe risk isn't capability. It's the blind spots that come with managing a complex plan without anyone pushing back. Retirement income planning has specific failure modes — sequence of returns risk, tax drag, healthcare cost timing, Social Security optimization — that don't announce themselves until the damage is already done. A second set of eyes on the architecture, even occasionally, tends to catch things that self-directed planning misses.\n\nA strategist relationship focused on plan design and periodic review fits this profile better than traditional ongoing advisory. The goal isn't to hand over control — it's to make sure the plan holds up under scrutiny before it's too late to adjust.`,
  },
  "Collaborative Partner": {
    quadrant: "High Advisor Value / High Self Efficacy",
    description: `You understand the landscape and you want to be part of building the plan — not just receive one. Collaborative Partners come with financial knowledge and genuine engagement. They want the rationale behind every decision, and they'll push back when something doesn't add up.\n\nThis tends to produce the most productive advisory relationships. The client brings knowledge and involvement; the advisor brings specialized depth and a framework built from working through hundreds of retirement scenarios. The dynamic is co-construction, not delegation.\n\nThe value here isn't about filling a knowledge gap. It's about applying a rigorous external process to decisions that have permanent consequences — tax efficiency, drawdown sequencing, estate strategy — where the cost of being wrong compounds quietly over years before it becomes visible.`,
  },
  "Strategic Delegator": {
    quadrant: "High Advisor Value / Low Self Efficacy",
    description: `You recognize the complexity of retirement income planning and you'd rather have someone qualified handle it than manage it yourself. That's a clear-eyed decision, not a passive one. Many of the most financially sophisticated people operate this way — they understand enough to know what they don't know, and they value their time and energy directed elsewhere.\n\nWhat matters most for this profile is the quality of the relationship itself. When primary responsibility for financial decisions is delegated, alignment on values, communication style, and long-term goals becomes the foundation. The plan is only as good as the trust and clarity between the client and the person managing it.\n\nThis profile works best with an advisor who takes reporting seriously, communicates proactively, and explains decisions without being asked rather than waiting for questions.`,
  },
  "Independent Learner": {
    quadrant: "Low Self Efficacy / Low Advisor Value",
    description: `You're not fully confident in your own ability to execute a retirement income plan, but you're also not convinced that a professional relationship would actually solve that. That combination usually reflects a lack of exposure to what a well-structured advisory engagement looks like — not a settled preference for going it alone.\n\nThe practical risk in this profile is inaction. Retirement income planning has hard deadlines embedded in it — Social Security claiming windows, RMD timelines, Medicare enrollment periods — where delayed or uninformed decisions create permanent costs, not recoverable ones. The consequences of getting those wrong don't show up immediately, which makes it easy to underestimate them.\n\nThe most productive path forward is usually education first. Building enough fluency in the core concepts to evaluate options — and evaluate the people who might help — tends to lead somewhere better than staying stuck between two versions of uncertain.`,
  },
  "Pragmatic Realist": {
    quadrant: "Balanced",
    description: `You approach retirement planning with a grounded, practical lens — weighing the cost and value of every decision before committing. That's not indifference. It's pattern-recognition built from experience.\n\nThe risk in this profile is under-acting. The same skepticism that protects you from poor decisions can delay the ones that matter — and in retirement income planning, timing is often the variable that controls the outcome more than product selection or strategy optimization.\n\nA focused, evidence-based engagement — built around your specific numbers and timeline — tends to move people in this profile faster than general education or concept-heavy conversation.`,
  },
};

/* ─── TIER CTAs ──────────────────────────────────────────────────────────── */
export const TIER_CTA = {
  A: {
    label: "Strategy Session",
    sublabel: (firstName: string) => `${firstName}, you qualify for a personalized ALIGN Strategy Session.`,
    url: "https://calendly.com/adam-kazinec/align-strategy-session",
    description: "Based on your profile, you're a strong candidate for a focused retirement income strategy conversation. This session is designed to map your ALIGN profile to a specific planning framework — not a product pitch, not a general overview.",
  },
  B: {
    label: "Discovery Call",
    sublabel: (firstName: string) => `${firstName}, you qualify for a complimentary Discovery Call.`,
    url: "https://calendly.com/adam-kazinec/align-discovery-call",
    description: "Your profile indicates you're in a meaningful planning window. A Discovery Call is a structured 30-minute conversation to assess fit and identify the highest-value next steps for your situation.",
  },
  C: {
    label: null,
    sublabel: () => "Thank you for completing the assessment. Here is your personalized report.",
    url: null,
    description: "Your ALIGN profile gives you a clear picture of your retirement income preferences and implementation style. Use this as a starting point for your planning conversations.",
  },
} as const;
