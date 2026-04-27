import { loginUser } from '@/queries/userQueries';
import { generateToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await loginUser(email, password);

  if (!user) return NextResponse.json({ error: 'Invalid' }, { status: 401 });

  const token = generateToken(user);
  return NextResponse.json({ token });
}