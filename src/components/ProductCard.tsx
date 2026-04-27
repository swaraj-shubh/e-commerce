'use client';
import { useState } from 'react';

export default function ProductCard({ product, onAdd }: any) {
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await onAdd(product.product_id);
    setAdding(false);
  };

  return (
    <div className="card overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="bg-gradient-to-br from-blue-50 to-gray-100 h-48 flex items-center justify-center">
        <div className="text-6xl">📦</div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        <button
          onClick={handleAdd}
          disabled={adding}
          className="btn-primary w-full flex justify-center items-center space-x-2"
        >
          <span>{adding ? 'Adding...' : 'Add to Cart'}</span>
          <span>{!adding && '🛒'}</span>
        </button>
      </div>
    </div>
  );
}