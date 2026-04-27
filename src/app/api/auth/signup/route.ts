import { createUser } from '@/queries/userQueries';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const user = await createUser(name, email, password);
  return NextResponse.json(user.rows[0]);
}