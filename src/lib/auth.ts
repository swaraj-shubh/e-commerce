import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export const generateToken = (user: any) => {
  return jwt.sign({ user_id: user.user_id, email: user.email }, SECRET, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};