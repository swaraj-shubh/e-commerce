'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to add products');
      router.push('/login');
      return;
    }

    setLoading(true);
    
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Product added!');
      setForm({ name: '', price: '', stock: '' });
    } else {
      alert(data.error || 'Failed to add product');
    }
    
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <span className="text-2xl">➕</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            </div>
            <p className="text-gray-600 ml-14">
              Fill in the details below to add a new product to your inventory
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Product Information</h2>
              <p className="text-blue-100 text-sm mt-1">All fields are required</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Product Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">📦</span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., Wireless Headphones"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Enter a descriptive name for your product</p>
              </div>

              {/* Price Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-semibold">₹</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    className="pl-8 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Set the selling price in Indian Rupees</p>
              </div>

              {/* Stock Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">📊</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Number of units available in inventory</p>
              </div>

              {/* Preview Section */}
              {(form.name || form.price || form.stock) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{form.name || 'Product Name'}</p>
                      <p className="text-sm text-gray-500">Stock: {form.stock || 0} units</p>
                    </div>
                    <p className="text-xl font-bold text-blue-600">₹{form.price || 0}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.price || !form.stock}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Adding Product...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Add Product</span>
                      <span>➕</span>
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setForm({ name: '', price: '', stock: '' });
                  }}
                  type="button"
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}