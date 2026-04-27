'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('/api/analytics');
        
        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              {data.length === 0 ? (
                <p className="text-gray-500">No sales data available</p>
              ) : (
                data.map((d: any, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-gray-400">#{i + 1}</span>
                      <span className="font-medium text-gray-900">{d.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">{d.total_sold} sold</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium">Total Products Sold</p>
                <p className="text-2xl font-bold text-blue-900">
                  {data.reduce((sum: number, d: any) => sum + d.total_sold, 0)}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium">Top Product</p>
                <p className="text-lg font-bold text-green-900">
                  {data[0]?.name || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}