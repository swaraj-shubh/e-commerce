import { topProducts } from '@/queries/analyticsQueries';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await topProducts();
  return NextResponse.json(res.rows);
}