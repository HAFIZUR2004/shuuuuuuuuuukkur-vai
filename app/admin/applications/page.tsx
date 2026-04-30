'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Download, Search, RefreshCw, AlertCircle } from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/applications');
      
      if (!res.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await res.json();
      console.log('Fetched applications:', data);
      console.log('Number of applications:', data.length);
      
      setApplications(Array.isArray(data) ? data : []);
      
      if (data.length === 0) {
        console.log('No applications found');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('অ্যাপ্লিকেশন লোড করতে ব্যর্থ হয়েছে');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      app.email?.toLowerCase().includes(search.toLowerCase()) ||
      app.vacancyTitle?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return { text: 'পেন্ডিং', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
      case 'reviewed': return { text: 'রিভিউ করা', class: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'accepted': return { text: 'সিলেক্টেড', class: 'bg-green-100 text-green-700 border-green-200' };
      case 'rejected': return { text: 'রিজেক্টেড', class: 'bg-red-100 text-red-700 border-red-200' };
      default: return { text: status, class: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <AlertCircle className="text-red-600 mx-auto mb-3" size={48} />
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchApplications}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">সব আবেদনপত্র</h1>
          <p className="text-gray-500 mt-1">
            মোট {applications.length} টি আবেদন
          </p>
        </div>
        <button
          onClick={fetchApplications}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <RefreshCw size={16} /> রিফ্রেশ
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="নাম, ইমেইল বা ভ্যাকেন্সি দিয়ে খুঁজুন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">সব স্ট্যাটাস</option>
            <option value="pending">⏳ পেন্ডিং</option>
            <option value="reviewed">👁️ রিভিউ করা</option>
            <option value="accepted">✅ সিলেক্টেড</option>
            <option value="rejected">❌ রিজেক্টেড</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-yellow-700">কোনো আবেদন পাওয়া যায়নি</p>
              <p className="text-sm text-gray-500 mt-2">
                API এন্ডপয়েন্ট চেক করুন: /api/applications
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">নাম</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">ভ্যাকেন্সি</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 hidden md:table-cell">ইমেইল</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 hidden lg:table-cell">ফোন</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">স্ট্যাটাস</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 hidden lg:table-cell">তারিখ</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => {
                  const status = getStatusBadge(app.status);
                  return (
                    <tr key={app._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-800">{app.fullName || 'নাম নেই'}</p>
                          <p className="text-xs text-gray-400 md:hidden mt-1">{app.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                          {app.vacancyTitle || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 hidden md:table-cell">{app.email || '-'}</td>
                      <td className="p-4 text-gray-600 hidden lg:table-cell">{app.phone || '-'}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${status.class}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 text-sm hidden lg:table-cell">
                        {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('bn-BD') : '-'}
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/admin/applications/${app._id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                        >
                          <Eye size={14} /> দেখুন
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}