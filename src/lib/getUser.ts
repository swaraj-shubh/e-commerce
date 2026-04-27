import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export const getUserFromRequest = (req: NextRequest) => {
  const auth = req.headers.get('authorization');
  if (!auth) return null;

  const token = auth.split(' ')[1];

  try {
    return jwt.verify(token, SECRET) as any;
  } catch {
    return null;
  }
};