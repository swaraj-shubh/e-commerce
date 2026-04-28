'use client';
import { useEffect, useState } from 'react';
// import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const addToCart = async (productId: number) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        return;
      }

      if (res.ok) {
        alert('Added to cart!');
      }
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading products...</div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <ProductCard key={p.product_id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
}