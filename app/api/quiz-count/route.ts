import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // We count from quiz_responses for the actual number of taken quizzes
    const result = await query('SELECT COUNT(*) as count FROM quiz_responses');
    const actualCount = parseInt(result.rows[0].count, 10) || 0;

    // As per user request: display actual count + 100
    const displayCount = actualCount + 100;

    return NextResponse.json({ count: displayCount });
  } catch (error) {
    console.error('Failed to fetch quiz count:', error);
    // Error fallback: set to 77 as per user request to signal a DB issue
    return NextResponse.json({ count: 77 });
  }
}
