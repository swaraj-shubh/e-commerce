'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('/api/analytics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [router]);

  if (loading) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="text-center text-red-500 mt-10">{error}</div>
      </>
    );
  }

  const totalSold = data.reduce(
    (sum, d) => sum + Number(d.total_sold || 0),
    0
  );

  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Analytics Dashboard</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Top Products */}
          <div className="border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Top Selling Products
            </h3>

            {data.length === 0 ? (
              <p className="text-gray-500">No sales data available</p>
            ) : (
              data.map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b py-3"
                >
                  <span>
                    #{i + 1} {d.name}
                  </span>
                  <span className="font-semibold text-blue-600">
                    {d.total_sold} sold
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          <div className="border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-blue-600">Total Sold</p>
                <p className="text-2xl font-bold">{totalSold}</p>
              </div>

              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm text-green-600">Top Product</p>
                <p className="text-lg font-bold">
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