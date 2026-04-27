import { getProducts, addProduct } from '@/queries/productQueries';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await getProducts();
  return NextResponse.json(res.rows);
}

export async function POST(req: Request) {
  const { name, price, stock } = await req.json();
  const product = await addProduct(name, price, stock);
  return NextResponse.json(product.rows[0]);
}