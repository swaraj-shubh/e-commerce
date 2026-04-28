'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      <div className="h-[calc(100vh-64px)] bg-gray-50 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 h-full">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            {/* Header Section - Compact */}
            <div className="mb-4 sm:mb-6 flex-shrink-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-blue-100 rounded-lg p-2 sm:p-3">
                  <span className="text-xl sm:text-2xl">➕</span>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Product</h1>
                  <p className="text-sm text-gray-600 hidden sm:block">Fill in the details below to add a new product</p>
                </div>
              </div>
            </div>

            {/* Main Content - Takes remaining height */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-0">
              {/* Form Card - Scrollable if needed */}
              <div className="flex-1 bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Product Information</h2>
                  <p className="text-blue-100 text-xs sm:text-sm">All fields are required</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-5">
                    {/* Product Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Product Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400 text-base sm:text-lg">📦</span>
                        </div>
                        <input
                          type="text"
                          placeholder="e.g., Wireless Headphones"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="pl-9 sm:pl-10 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Price Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Price (₹)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400 font-semibold text-base sm:text-lg">₹</span>
                        </div>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={form.price}
                          onChange={e => setForm({ ...form, price: e.target.value })}
                          className="pl-7 sm:pl-8 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Stock Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Stock Quantity
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400 text-base sm:text-lg">📊</span>
                        </div>
                        <input
                          type="number"
                          placeholder="0"
                          value={form.stock}
                          onChange={e => setForm({ ...form, stock: e.target.value })}
                          className="pl-9 sm:pl-10 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Action Buttons - Compact */}
                    <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                      <button
                        onClick={handleSubmit}
                        disabled={loading || !form.name || !form.price || !form.stock}
                        className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Adding...</span>
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
                        className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Panel - Tips & Preview */}
              <div className="lg:w-80 flex-shrink-0 space-y-4 sm:space-y-6">
                {/* Preview Card - Only show when there's data */}
                {(form.name || form.price || form.stock) && (
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 sm:px-6 py-2 sm:py-3">
                      <h3 className="text-sm sm:text-base font-semibold text-white">Live Preview</h3>
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="space-y-2">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Product</p>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                            {form.name || 'Product Name'}
                          </p>
                        </div>
                        <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3">
                          <div>
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="text-lg sm:text-xl font-bold text-blue-600">₹{form.price || 0}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Stock</p>
                            <p className="text-sm sm:text-base font-semibold text-gray-700">{form.stock || 0} units</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}