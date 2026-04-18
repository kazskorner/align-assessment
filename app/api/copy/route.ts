// ============================================================
// /api/copy
// Returns the Neon copy descriptions for a specific set of
// quiz trait results. Called by the results pages on load.
//
// Place this file at: app/api/copy/route.ts
// ============================================================

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getCopyForResult } from '@/lib/quiz-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const engine        = searchParams.get('engine');
  const rhythm        = searchParams.get('rhythm');
  const mindset       = searchParams.get('mindset');
  const spender       = searchParams.get('spender');
  const liquidity     = searchParams.get('liquidity');
  const payoutPattern = searchParams.get('payoutPattern');
  const persona       = searchParams.get('persona');

  // All params required
  if (!engine || !rhythm || !mindset || !spender || !liquidity || !payoutPattern || !persona) {
    return NextResponse.json(
      { error: 'Missing required params: engine, rhythm, mindset, spender, liquidity, payoutPattern, persona' },
      { status: 400 }
    );
  }

  try {
    const copy = await getCopyForResult({
      engine,
      rhythm,
      mindset,
      spender,
      liquidity,
      payoutPattern,
      persona,
    });

    return NextResponse.json(copy, { status: 200 });
  } catch (error) {
    console.error('Copy fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch copy', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
