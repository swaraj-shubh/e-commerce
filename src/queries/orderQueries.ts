import { pool } from '@/lib/db';

export const addToCart = async (userId: number, productId: number) => {
  return pool.query(`
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES ($1, $2, 1)
  `, [userId, productId]);
};

export const getCart = async (userId: number) => {
  return pool.query(`
    SELECT c.cart_id, p.name, p.price, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.product_id
    WHERE c.user_id = $1
  `, [userId]);
};

export const placeOrder = async (userId: number) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const cartItems = await client.query(`
      SELECT c.product_id, c.quantity, p.price
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.user_id = $1
    `, [userId]);

    let total = 0;
    cartItems.rows.forEach(i => total += i.quantity * i.price);

    const order = await client.query(`
      INSERT INTO orders (user_id, total_amount)
      VALUES ($1, $2)
      RETURNING order_id
    `, [userId, total]);

    const orderId = order.rows[0].order_id;

    for (let item of cartItems.rows) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES ($1, $2, $3)
      `, [orderId, item.product_id, item.quantity]);
    }

    await client.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

export const getOrders = async (userId: number) => {
  return pool.query(`
    SELECT o.order_id, o.total_amount, o.created_at
    FROM orders o
    WHERE o.user_id = $1
    ORDER BY o.created_at DESC
  `, [userId]);
};