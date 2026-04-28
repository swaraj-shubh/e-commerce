import { getProducts, addProduct } from '@/queries/productQueries';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/getUser';

export async function GET() {
  const res = await getProducts();
  return NextResponse.json(res.rows);
}

// export async function POST(req: Request) {
//   const { name, price, stock } = await req.json();
//   const product = await addProduct(name, price, stock);
//   return NextResponse.json(product.rows[0]);
// }

export async function POST(req: Request) {
  const user = getUserFromRequest(req as any);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, price, stock } = await req.json();

  if (!name || !price || !stock) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const product = await addProduct(name, price, stock);

  return NextResponse.json(product.rows[0]);
}