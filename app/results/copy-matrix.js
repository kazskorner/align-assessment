/**
 * ALIGN Copy Matrix — All trait descriptions pulled from ALIGN_Quiz_Master_v4.xlsx
 * Used by Tier A, B, and C results pages.
 *
 * HOW TO LOOK UP COPY:
 *   PRIMARY_TRAITS[traitName][traitValue]
 *   SECONDARY_TRAITS[traitName][traitValue][primaryCombo]
 *     where primaryCombo = `${incomeSource} + ${incomeStructure}`
 *     e.g. "Contractual + Committed" | "Market Driven + Adjustable"
 *   PERSONAS[personaName]
 */

// ── PRIMARY TRAITS ────────────────────────────────────────────────────────────

export const PRIMARY_TRAITS = {
  incomeSource: {
    "Contractual": `You prefer retirement income that shows up the same way every month, regardless of what the market is doing. Contractual income sources — annuities, pensions, structured payouts — are built around that preference. The payment is defined upfront, and it doesn't move.

This matters because one of the biggest challenges in retirement isn't growing wealth — it's converting it into something you can actually spend without second-guessing every market headline. Contractual income solves that problem directly.

The trade-off is real though. Money committed to guaranteed income structures is less accessible than money sitting in a brokerage account. You're exchanging flexibility for certainty, and for some people that's exactly the right trade. For others, it's a constraint worth knowing about before committing.

Your Contractual score reflects how much of your retirement income strategy should be anchored in guarantees rather than portfolio performance.`,

    "Market Driven": `You're comfortable letting your portfolio do the work. Market-driven income means your retirement cash flow comes from systematic withdrawals, dividends, or capital gains — not from a guaranteed payment schedule. The income isn't fixed, and you're okay with that.

What this profile reflects is confidence. Confidence in your portfolio's long-term performance, in your ability to manage variability, and in the flexibility to adjust your spending when markets shift. That's not everyone. A lot of people say they're comfortable with market risk until they actually retire and the withdrawals start — then the math gets personal.

The honest upside of this approach is control. You stay invested, you maintain liquidity, and you're not locking assets into products that can't be unwound. The trade-off is that your income isn't guaranteed. A bad sequence of returns in the early years of retirement can do real damage to a purely market-driven strategy.

Your Market-Driven score tells us how much of your income plan should stay flexible and portfolio-dependent versus anchored in something more certain.`,
  },

  incomeStructure: {
    "Committed": `Committed Structure means you're drawn to locking things in. You'd rather transfer risk to an institution and know exactly what your income looks like than maintain full control and deal with the variability that comes with it.

There's a lot of wisdom in that. Sequence of returns risk, longevity risk, the cognitive load of managing withdrawals in your 80s — a committed structure addresses all of it by design. The plan runs without requiring you to actively manage it.

The cost is liquidity. Assets moved into committed income solutions — annuities, certain pension-style products — aren't as accessible as assets sitting in an investment account. That's not a flaw, it's the mechanism. You're exchanging access for certainty.

Your Committed score reflects how much of your retirement structure should be built around long-term commitments rather than flexibility.`,

    "Adjustable": `Adjustable Structure means you want to stay in control. Your income strategy should be able to move — responding to market performance, changing spending needs, and life circumstances — rather than being locked into a fixed framework.

What this looks like in practice is a retirement built more heavily around investment accounts, systematic withdrawal strategies, and income sources that can be dialed up or down. The plan has flexibility baked in, which means it also requires more active management and a larger asset base to absorb the volatility that comes with it.

The honest consideration here is that flexibility has a cost. Without guaranteed income as a floor, a prolonged market downturn in the early years of retirement can force spending cuts at exactly the wrong time. That risk is manageable — but it has to be planned for, not ignored.

Your Adjustable score tells us how much of your structure should stay flexible versus how much should be committed to longer-term solutions.`,
  },
};

// ── SECONDARY TRAITS ──────────────────────────────────────────────────────────
// Key format: SECONDARY_TRAITS[category][value][primaryCombo]

export const SECONDARY_TRAITS = {
  mindset: {
    "Income Mindset": {
      "Contractual + Committed": `Your priority is reliable monthly cash flow, and your broader profile is built to support exactly that. Guaranteed income covers the baseline, committed structure keeps it predictable, and the goal is a retirement that funds your lifestyle without requiring you to watch the market to know if you can spend this month.

Example: Guaranteed income streams — annuity payouts, pension income, Social Security — are directed toward essential monthly expenses. The investment portfolio isn't the primary income engine; it's a reserve.`,
      "Contractual + Adjustable": `Monthly income is the priority, and your adjustable structure means you have room to evolve how you generate it over time. The income target stays consistent; the tools used to hit it can shift as your situation changes.

Example: Core expenses are anchored by a guaranteed income product. A separate adjustable withdrawal account handles discretionary spending and scales with changing needs — more in active years, less as lifestyle costs naturally compress.`,
      "Market Driven + Committed": `You want dependable monthly income and a committed withdrawal framework is what keeps a market-driven portfolio from becoming an income source that varies month to month. The structure is what transforms portfolio performance into something that feels like a paycheck.

Example: A fixed monthly draw is established and held consistent regardless of short-term market movement. The portfolio funds it — the committed structure is what keeps it stable.`,
      "Market Driven + Adjustable": `You want reliable cash flow and you're comfortable letting the portfolio generate it. An adaptable framework means the withdrawal rate can respond to what markets are actually doing — pulling back in down years, recovering in strong ones — without abandoning the income goal.

Example: A dynamic withdrawal strategy sets a target range rather than a fixed number. Spending stays near the top of the range in strong years, pulls toward the bottom when markets compress, and the income keeps flowing either way.`,
    },
    "Net Worth Mindset": {
      "Contractual + Committed": `You want your portfolio to keep growing, and a committed income structure is what makes that possible without forcing you to liquidate investments to fund living expenses. Guaranteed income covers the baseline; the investment portfolio stays invested for long-term growth.

Example: Annuity or pension income funds essential expenses. The investment portfolio isn't touched for income — it compounds. What gets distributed at death, or passed to heirs, is whatever that portfolio has grown to.`,
      "Contractual + Adjustable": `You're focused on building long-term portfolio value, and your flexibility means the plan can adjust how that's structured over time. A contractual income layer handles predictable expenses without requiring the investment portfolio to do double duty.

Example: A guaranteed income product covers the baseline. A growth-oriented investment portfolio is accessed only opportunistically — for large planned expenses or major life events — rather than treated as a monthly income source.`,
      "Market Driven + Committed": `Portfolio growth is the goal, and a committed withdrawal structure is what keeps that goal from being undermined by reactive spending decisions. The framework prevents the plan from drifting in years when markets are strong and discipline is hardest to maintain.

Example: Withdrawals are limited to portfolio gains or dividends. Principal stays invested. The committed structure is what makes that discipline stick rather than eroding when markets perform well and spending temptation increases.`,
      "Market Driven + Adjustable": `You want the portfolio to grow and the flexibility to manage it on your terms. Withdrawals happen when the portfolio supports them — not on a fixed schedule — which keeps assets compounding as long as possible.

Example: Withdrawals are triggered only when the portfolio crosses a defined value threshold. In flat or down years, the portfolio is left alone. The goal is to maximize what's there at the end, not optimize for a monthly income target.`,
    },
  },

  liquidity: {
    "Cash Liquidity": {
      "Contractual + Committed": `You want a dedicated cash reserve that isn't connected to anything else in the plan. With guaranteed income already covering essential expenses, the cash reserve functions as a true emergency buffer — not a backup income source, not a secondary investment.

Example: 12 to 24 months of discretionary expenses sit in a high-yield savings account. That account doesn't fund retirement lifestyle. It exists for one thing: unexpected expenses that fall outside the normal income plan.`,
      "Contractual + Adjustable": `A dedicated cash reserve and a flexible income structure work well together. The reserve can be sized up or down over time as income needs shift, and drawing on it or replenishing it doesn't require restructuring anything else in the plan.

Example: A cash target is set at the start of retirement and revisited annually. As spending patterns become clearer, the target adjusts — the reserve stays right-sized rather than either excessive or insufficient.`,
      "Market Driven + Committed": `Market-driven income has variability built into it. A dedicated cash reserve is what prevents that variability from forcing investment liquidation at the wrong time. The buffer absorbs the unexpected so the portfolio doesn't have to.

Example: One to three years of expenses in cash or short-term instruments. The portfolio stays invested through market cycles. The cash reserve is what makes that possible without anxiety.`,
      "Market Driven + Adjustable": `A cash buffer gives a market-driven, flexible plan room to breathe. It's what allows the portfolio to stay invested during downturns rather than getting sold down to cover a surprise expense.

Example: A rolling cash reserve is maintained — replenished in strong market years, drawn on when markets compress. The investment portfolio isn't the first call when something unexpected comes up.`,
    },
    "Investment Liquidity": {
      "Contractual + Committed": `You're comfortable accessing cash by selling investments when needed rather than holding a large dedicated reserve. With guaranteed income handling the baseline, the investment portfolio can stay more fully invested — and liquidation only happens when something genuinely unexpected arises.

Example: A diversified brokerage account serves as the liquidity layer. Positions are sold selectively when a significant unplanned expense comes up. The guaranteed income floor is what makes this approach viable without creating chronic financial stress.`,
      "Contractual + Adjustable": `Keeping assets invested rather than parked in cash aligns with a flexible structure that can adjust allocations when liquidity is needed. Contractual income handles predictable expenses — the investment portfolio is the backstop for everything else.

Example: A mix of liquid holdings — ETFs, short-duration bonds — can be accessed without disrupting the core income strategy. There's no dedicated cash reserve, but there's always something that can be sold cleanly.`,
      "Market Driven + Committed": `The investment portfolio is both the income engine and the liquidity source. A committed withdrawal structure adds the discipline that keeps those two functions from working against each other — income draws happen on schedule, and liquidations for unexpected needs come from a designated layer, not randomly.

Example: A specific segment of the portfolio is set aside as the liquidity reserve — separate from the assets funding the committed withdrawal schedule. When something unexpected arises, that layer gets tapped first.`,
      "Market Driven + Adjustable": `The portfolio handles income and liquidity both. The flexibility to shift between those two functions as circumstances change is what makes this combination work — but it requires a clear structure to prevent them from competing with each other.

Example: Near-term expenses and potential liquidity needs sit in more accessible, lower-volatility assets. Longer-term growth assets stay fully invested. The structure separates the two jobs even within a single portfolio.`,
    },
  },

  spender: {
    "Front Loaded": {
      "Contractual + Committed": `Spending more early in retirement — while health and mobility are at their peak — is a deliberate financial strategy, not a lack of discipline. A committed income structure supports it by locking in reliable cash flow from day one, which removes the uncertainty that makes people hesitate to actually spend.

Example: Guaranteed income covers all essential expenses. A separate discretionary bucket funds elevated spending in the first decade — travel, experiences, the things that require physical capacity. That bucket has a defined size, and when it's spent, the plan shifts naturally.`,
      "Contractual + Adjustable": `Spending more in the active years and less later isn't a plan that requires a dramatic strategy change — it just needs to be built in from the start. A flexible structure accommodates the shift without requiring a new financial plan every five years.

Example: Higher spending in years one through twelve is planned and funded. The adjustable withdrawal strategy steps down naturally after that — not because something went wrong, but because that's how the plan was designed.`,
      "Market Driven + Committed": `Front-loading retirement spending is a legitimate strategy for people who understand their own timeline. A committed withdrawal framework is what keeps it from becoming a plan that runs out of gas early — it creates guardrails without eliminating the intent.

Example: A fixed elevated draw is set for the first decade, with a pre-defined reduction trigger if portfolio performance falls below a threshold. The spending is intentional; the structure prevents it from being reckless.`,
      "Market Driven + Adjustable": `Spending more now and adjusting later isn't a contradiction — it's a realistic picture of how retirement actually unfolds for most people. A market-driven, flexible approach is built to accommodate that pattern rather than fight it.

Example: A spending range is established rather than a fixed number. In strong market years, spending runs toward the top of the range. When markets pull back, it adjusts. The intent to spend more early stays intact; the flexibility is what keeps it sustainable.`,
    },
    "Back Loaded": {
      "Contractual + Committed": `Spending conservatively early in retirement to protect resources for later is a strategy that reflects something most people don't think about clearly enough: retirement doesn't get cheaper as it gets older. Healthcare, long-term care, and the costs of aging tend to accelerate. A committed income structure is designed to be there when that happens.

Example: Guaranteed income is structured with an eye toward covering later-life expenses — not just current lifestyle. Early retirement spending is deliberately modest, preserving flexibility for the years when the financial demands are likely to be highest.`,
      "Contractual + Adjustable": `Spending less early and more later is a disciplined approach that works best when the structure can adapt as those later needs become clearer. A flexible income plan accommodates the increase without requiring a rebuild.

Example: Income starts modestly and increases at specific milestones — not arbitrary age thresholds, but actual life events: a health change, a shift in living situation, a long-term care need that arrives.`,
      "Market Driven + Committed": `A committed withdrawal structure is what keeps a back-loaded spending approach from drifting. Without it, strong early market performance creates the temptation to spend more now — which directly undermines the strategy's intent.

Example: A conservative fixed withdrawal rate is held firm regardless of portfolio performance. The discipline of the committed structure is what ensures resources are intact when later-life costs arrive.`,
      "Market Driven + Adjustable": `Drawing modestly early while letting the portfolio grow is a patient strategy. The flexibility to increase income later — when the need actually arrives — is what makes it work without forcing people to pre-commit to a spending level they can't yet define.

Example: Withdrawals start low. A deliberate income increase is planned for a specific age window — typically when healthcare and care-related costs begin to rise. The portfolio has been growing in the meantime; the timing is designed to match the need.`,
    },
  },

  payoutPattern: {
    "Phased Income": {
      "Contractual + Committed": `Retirement organized into distinct phases — each funded intentionally — is a structured way to handle the reality that a 30-year retirement isn't one continuous financial situation. A committed, guaranteed income layer makes phase planning more reliable because the funding for each chapter doesn't depend on what markets do when that chapter arrives.

Example: Deferred income products activate at different ages — one at 65, another at 75. Each phase of retirement has a dedicated, predictable income stream. The plan doesn't need to be renegotiated every time life shifts.`,
      "Contractual + Adjustable": `Thinking in retirement chapters makes sense, and a flexible structure means each chapter can be designed closer to when it begins rather than locked in decades early. Contractual income anchors the phases that are most defined; the adjustable layer handles the ones that aren't.

Example: Guaranteed income funds the core retirement years. Later phases stay more open — allocations and strategies are revisited as each chapter approaches rather than pre-committed years in advance.`,
      "Market Driven + Committed": `Organizing retirement into phases adds structure to a market-driven income strategy that can otherwise drift. A committed framework for each chapter means withdrawals follow a defined logic — not just whatever the portfolio happens to be doing.

Example: Specific portions of the portfolio are allocated to each retirement phase with a committed draw rate per phase. Income comes from the portfolio, but it follows a structure rather than being pulled reactively.`,
      "Market Driven + Adjustable": `Planning in phases with full flexibility means each chapter of retirement can be built from scratch when it actually arrives — informed by what the portfolio looks like, what life looks like, and what the next decade actually requires.

Example: A rolling five-to-seven year planning horizon. Each phase is structured as it approaches rather than committed to in advance. The portfolio and the plan evolve together.`,
    },
    "Lifetime Income": {
      "Contractual + Committed": `Lifetime income — steady, predictable, not requiring active management — is the clearest expression of a Contractual and Committed profile. The plan is built to run. Income arrives. Decisions about withdrawal rates and market timing aren't part of the daily calculus.

Example: Social Security, pension income, and an annuity product are combined to cover all essential expenses for life. The income doesn't depend on market performance. It doesn't require annual review to know it'll still be there.`,
      "Contractual + Adjustable": `Lifetime income as a goal doesn't require a rigid structure to achieve it. A flexible approach means how that income is generated can evolve — as products improve, as tax situations change, as life circumstances shift — without abandoning the goal of income that simply doesn't stop.

Example: A guaranteed income product anchors the lifetime income floor. A flexible withdrawal account supplements it based on discretionary needs — more in active years, less as lifestyle naturally simplifies.`,
      "Market Driven + Committed": `A portfolio can be a lifetime income source — but only with the discipline to treat it that way. A committed withdrawal framework is what separates a portfolio that lasts 30 years from one that runs low in year 18 because spending wasn't controlled during a strong market run.

Example: A sustainable withdrawal rate — designed to support income for 30 or more years — is established and held. Adjustments are made for inflation, not for market performance. The portfolio funds the income; the structure is what makes it last.`,
      "Market Driven + Adjustable": `Lifetime income from a flexible portfolio is achievable when the withdrawal strategy has clear boundaries. Flexibility within a defined range means the plan can perform well in strong markets without creating a spending pattern that's impossible to sustain when markets don't cooperate.

Example: A withdrawal rate range is established — an upper bound for strong years, a lower bound for compressed ones. Income flows for life. The flexibility is in how much, not whether.`,
    },
  },
};

// ── IMPLEMENTATION PERSONAS ───────────────────────────────────────────────────

export const PERSONAS = {
  "Confident Investor": `You're confident in your ability to research, build, and manage your own retirement income strategy. That confidence is earned for a lot of people in this profile — financial literacy, direct investment experience, or a career that kept them close to money and markets.

The risk isn't capability. It's the blind spots that come with managing a complex plan without anyone pushing back. Retirement income planning has specific failure modes — sequence of returns risk, tax drag, healthcare cost timing, Social Security optimization — that don't announce themselves until the damage is already done. A second set of eyes on the architecture, even occasionally, tends to catch things that self-directed planning misses.

A strategist relationship focused on plan design and periodic review fits this profile better than traditional ongoing advisory. The goal isn't to hand over control — it's to make sure the plan holds up under scrutiny before it's too late to adjust.`,

  "Collaborative Partner": `You understand the landscape and you want to be part of building the plan — not just receive one. Collaborative Partners come with financial knowledge and genuine engagement. They want the rationale behind every decision, and they'll push back when something doesn't add up.

This tends to produce the most productive advisory relationships. The client brings knowledge and involvement; the advisor brings specialized depth and a framework built from working through hundreds of retirement scenarios. The dynamic is co-construction, not delegation.

The value here isn't about filling a knowledge gap. It's about applying a rigorous external process to decisions that have permanent consequences — tax efficiency, drawdown sequencing, estate strategy — where the cost of being wrong compounds quietly over years before it becomes visible.`,

  "Strategic Delegator": `You recognize the complexity of retirement income planning and you'd rather have someone qualified handle it than manage it yourself. That's a clear-eyed decision, not a passive one. Many of the most financially sophisticated people operate this way — they understand enough to know what they don't know, and they value their time and energy directed elsewhere.

What matters most for this profile is the quality of the relationship itself. When primary responsibility for financial decisions is delegated, alignment on values, communication style, and long-term goals becomes the foundation. The plan is only as good as the trust and clarity between the client and the person managing it.

This profile works best with an advisor who takes reporting seriously, communicates proactively, and explains decisions without being asked rather than waiting for questions.`,

  "Independent Learner": `You're not fully confident in your own ability to execute a retirement income plan, but you're also not convinced that a professional relationship would actually solve that. That combination usually reflects a lack of exposure to what a well-structured advisory engagement looks like — not a settled preference for going it alone.

The practical risk in this profile is inaction. Retirement income planning has hard deadlines embedded in it — Social Security claiming windows, RMD timelines, Medicare enrollment periods — where delayed or uninformed decisions create permanent costs, not recoverable ones. The consequences of getting those wrong don't show up immediately, which makes it easy to underestimate them.

The most productive path forward is usually education first. Building enough fluency in the core concepts to evaluate options — and evaluate the people who might help — tends to lead somewhere better than staying stuck between two versions of uncertain.`,
};

// ── VIDEO SELECTOR (based on Q29 age range) ──────────────────────────────────

export function getVideoSrc(ageRange) {
  if (ageRange === '68–74' || ageRange === '68-74' || ageRange === '75+') {
    return '/videos/legacy shift.mp4';
  }
  if (
    ageRange === '51–62' || ageRange === '51-62' ||
    ageRange === '62–67' || ageRange === '62-67' ||
    ageRange === '63–67' || ageRange === '63-67'
  ) {
    return '/videos/executive.mp4';
  }
  // Default: Under 50 or unknown
  return '/videos/entrepreneur exit.mp4';
}

// ── TIER LABELS ───────────────────────────────────────────────────────────────

export const TIER_CONFIG = {
  A: {
    label: 'Tier A',
    badge: 'Strategy-Ready',
    heroLine: 'Your income plan is ready to build.',
    color: '#00f0ff',
    ctaText: 'Schedule Your Strategy Session',
    ctaUrl: 'https://calendly.com/adam-kazinec/align-strategy-session',
    ctaSub: 'One conversation. A retirement income blueprint built around you.',
  },
  B: {
    label: 'Tier B',
    badge: 'Discovery-Ready',
    heroLine: 'You\'re closer than you think.',
    color: '#7ec8e3',
    ctaText: 'Book a Discovery Call',
    ctaUrl: 'https://calendly.com/adam-kazinec/align-discovery-call',
    ctaSub: 'Let\'s map out exactly where you are and what comes next.',
  },
  C: {
    label: 'Tier C',
    badge: 'Building Foundations',
    heroLine: 'Every strong retirement starts here.',
    color: '#a0a0a0',
  },
};
