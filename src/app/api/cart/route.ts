import { addToCart, getCart } from '@/queries/orderQueries';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/getUser';

export async function POST(req: Request) {
  const user = getUserFromRequest(req as any);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId } = await req.json();

  await addToCart(user.user_id, productId);

  return NextResponse.json({ message: 'Added' });
}

export async function GET(req: any) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const res = await getCart(user.user_id);
  return NextResponse.json(res.rows);
}