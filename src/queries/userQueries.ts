import { pool } from '@/lib/db';
import bcrypt from 'bcrypt';

export const createUser = async (name: string, email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, email, hashed]
  );
};

export const loginUser = async (email: string, password: string) => {
  const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (res.rows.length === 0) return null;

  const user = res.rows[0];
  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
};