import { pool } from '@/lib/db';

export const getProducts = async () => {
  return pool.query(`SELECT * FROM products`);
};

export const addProduct = async (name: string, price: number, stock: number) => {
  return pool.query(`
    INSERT INTO products (name, price, stock)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [name, price, stock]);
};