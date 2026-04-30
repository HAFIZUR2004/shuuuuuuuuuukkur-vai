'use client';

import { useState, useEffect } from 'react';

interface Vacancy {
  _id?: string;
  id: string;
  tags: string[];
  title: string;
  desc: string;
  stack: string[];
  salary?: string;
  featured: boolean;
  color: string;
  department: string;
}

export default function VacancyManagement() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState({
    tags: '',
    title: '',
    desc: '',
    stack: '',
    salary: '',
    featured: false,
    color: '#6c5ce7',
    department: 'Engineering',
  });

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/vacancies');
      const data = await res.json();
      console.log('Fetched data:', data);
      setVacancies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
      setVacancies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      title: formData.title,
      desc: formData.desc,
      stack: formData.stack.split(',').map(s => s.trim()).filter(s => s),
      salary: formData.salary,
      featured: formData.featured,
      color: formData.color,
      department: formData.department,
    };

    if (!payload.title || !payload.desc || payload.tags.length === 0 || payload.stack.length === 0) {
      alert('দয়া করে সব ফিল্ড পূরণ করুন!');
      return;
    }

    try {
      let response;
      if (editingVacancy) {
        const id = editingVacancy._id || editingVacancy.id;
        response = await fetch(`/api/vacancies/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('/api/vacancies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setModalOpen(false);
        fetchVacancies();
        alert(editingVacancy ? '✅ ভ্যাকেন্সি আপডেট হয়েছে!' : '✅ ভ্যাকেন্সি তৈরি হয়েছে!');
        setFormData({
          tags: '',
          title: '',
          desc: '',
          stack: '',
          salary: '',
          featured: false,
          color: '#6c5ce7',
          department: 'Engineering',
        });
        setEditingVacancy(null);
      } else {
        const error = await response.json();
        alert(error.error || 'সেভ করতে ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('সেভ করতে ব্যর্থ হয়েছে');
    }
  };

  const handleDelete = async (vacancy: Vacancy) => {
    if (!confirm('আপনি কি এই ভ্যাকেন্সি ডিলিট করতে চান?')) return;
    
    try {
      const id = vacancy._id || vacancy.id;
      const response = await fetch(`/api/vacancies/${id}`, { 
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchVacancies();
        alert('✅ ভ্যাকেন্সি ডিলিট হয়েছে!');
      } else {
        const error = await response.json();
        alert(error.error || 'ডিলিট করতে ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('ডিলিট করতে ব্যর্থ হয়েছে');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ভ্যাকেন্সি ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm mt-1">
            {vacancies.length === 0 ? 'কোনো ভ্যাকেন্সি নেই' : `মোট ${vacancies.length} টি ভ্যাকেন্সি`}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingVacancy(null);
            setFormData({
              tags: '',
              title: '',
              desc: '',
              stack: '',
              salary: '',
              featured: false,
              color: '#6c5ce7',
              department: 'Engineering',
            });
            setModalOpen(true);
          }}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
        >
          <span className="text-xl">+</span> নতুন ভ্যাকেন্সি
        </button>
      </div>

      {vacancies.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">কোনো ভ্যাকেন্সি নেই</p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            প্রথম ভ্যাকেন্সি তৈরি করুন
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">টাইটেল</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">ডিপার্টমেন্ট</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">ট্যাগস</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">টেক স্ট্যাক</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">ফিচার্ড</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {vacancies.map((item) => (
                  <tr key={item._id || item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{item.desc}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-600">
                        {item.department}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.slice(0, 2).map((t, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.stack?.slice(0, 2).map((s, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-blue-50 rounded text-blue-600">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {item.featured && (
                        <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-600">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingVacancy(item);
                            setFormData({
                              tags: item.tags?.join(', ') || '',
                              title: item.title,
                              desc: item.desc,
                              stack: item.stack?.join(', ') || '',
                              salary: item.salary || '',
                              featured: item.featured,
                              color: item.color,
                              department: item.department,
                            });
                            setModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600"
                        >
                          এডিট
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                        >
                          ডিলিট
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* মডাল - সম্পূর্ণ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {editingVacancy ? 'ভ্যাকেন্সি এডিট করুন' : 'নতুন ভ্যাকেন্সি তৈরি করুন'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">টাইটেল *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  placeholder="যেমন: সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বর্ণনা *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  placeholder="চাকরির বিস্তারিত বিবরণ লিখুন..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ট্যাগস * (কমা দিয়ে)</label>
                <input
                  type="text"
                  required
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  placeholder="Remote, Full-time, Urgent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">টেক স্ট্যাক * (কমা দিয়ে)</label>
                <input
                  type="text"
                  required
                  value={formData.stack}
                  onChange={(e) => setFormData({...formData, stack: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ডিপার্টমেন্ট</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  >
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>HR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">স্যালারি</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                    placeholder="$50k - $70k"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-700">ফিচার্ড ভ্যাকেন্সি</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">রং</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg"
                >
                  {editingVacancy ? 'আপডেট' : 'সেভ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}