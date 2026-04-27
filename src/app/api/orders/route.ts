import { placeOrder, getOrders } from '@/queries/orderQueries';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/getUser';

export async function POST(req: Request) {
  const user = getUserFromRequest(req as any);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await placeOrder(user.user_id);

  return NextResponse.json({ message: 'Order placed' });
}

export async function GET(req: any) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const res = await getOrders(user.user_id);
  return NextResponse.json(res.rows);
}