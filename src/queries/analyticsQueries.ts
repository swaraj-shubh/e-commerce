import { pool } from '@/lib/db';

export const topProducts = async () => {
  return pool.query(`
    SELECT p.name, SUM(oi.quantity) AS total_sold
    FROM order_items oi
    JOIN products p ON oi.product_id = p.product_id
    GROUP BY p.name
    ORDER BY total_sold DESC
    LIMIT 5
  `);
};