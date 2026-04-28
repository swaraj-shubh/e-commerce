'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Navbar from '@/components/Navbar';

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      
      if (res.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }
      
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const placeOrder = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      alert('Order placed successfully!');
      fetchCart();
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const totalAmount = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading your cart...</div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button
              onClick={() => router.push('/products')}
              className="btn-primary mt-4"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((c: any) => (
                <div key={c.cart_id} className="card p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
                    <p className="text-gray-600">Quantity: {c.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">₹{c.price * c.quantity}</p>
                    <p className="text-sm text-gray-500">₹{c.price} each</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2 border-b pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 mb-6">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
                <button
                  onClick={placeOrder}
                  disabled={checkoutLoading}
                  className="btn-primary w-full"
                >
                  {checkoutLoading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}