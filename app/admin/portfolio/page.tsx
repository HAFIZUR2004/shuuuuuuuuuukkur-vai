'use client';

import { useState, useEffect } from 'react';

interface Portfolio {
  _id: string;
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  colorKey: string;
  stats: string;
  image: string;
  imageAlt: string;
  github?: string;
  liveUrl?: string;
}

export default function PortfolioManagement() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [previewError, setPreviewError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tech: '',
    colorKey: 'purple',
    stats: '',
    image: '',
    imageAlt: '',
    github: '',
    liveUrl: '',
  });

  const fetchPortfolios = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const openModal = (item?: Portfolio) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        category: item.category || '',
        description: item.description || '',
        tech: Array.isArray(item.tech) ? item.tech.join(', ') : '',
        colorKey: item.colorKey || 'purple',
        stats: item.stats || '',
        image: item.image || '',
        imageAlt: item.imageAlt || '',
        github: item.github || '',
        liveUrl: item.liveUrl || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        tech: '',
        colorKey: 'purple',
        stats: '',
        image: '',
        imageAlt: '',
        github: '',
        liveUrl: '',
      });
    }
    setPreviewError(false);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description || !formData.image) {
      alert('দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন!');
      return;
    }
    
    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      tech: formData.tech.split(',').map(t => t.trim()).filter(t => t),
      colorKey: formData.colorKey,
      stats: formData.stats,
      image: formData.image.trim(),
      imageAlt: formData.imageAlt || formData.title,
      github: formData.github?.trim() || '',
      liveUrl: formData.liveUrl?.trim() || '',
    };

    try {
      let response;
      
      if (editingItem) {
        const idToUse = editingItem._id || editingItem.id;
        response = await fetch(`/api/portfolio/${idToUse}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setModalOpen(false);
        fetchPortfolios();
        alert(editingItem ? '✅ প্রজেক্ট আপডেট হয়েছে!' : '✅ প্রজেক্ট তৈরি হয়েছে!');
      } else {
        const error = await response.json();
        alert(`সেভ করতে ব্যর্থ হয়েছে: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('সেভ করতে ব্যর্থ হয়েছে');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি এই প্রজেক্ট ডিলিট করতে চান?')) return;
    
    try {
      const response = await fetch(`/api/portfolio/${id}`, { 
        method: 'DELETE' 
      });
      
      if (response.ok) {
        fetchPortfolios();
        alert('✅ প্রজেক্ট ডিলিট হয়েছে!');
      } else {
        const error = await response.json();
        alert(`ডিলিট করতে ব্যর্থ হয়েছে: ${error.error}`);
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">পোর্টফোলিও ম্যানেজমেন্ট</h1>
            <p className="text-gray-500 text-sm mt-1">আপনার সব প্রজেক্ট এখানে দেখুন এবং পরিচালনা করুন</p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
          >
            <span className="text-xl">+</span> নতুন প্রজেক্ট
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">ইমেজ</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">টাইটেল</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">ক্যাটাগরি</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">টেকনোলজি</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((item) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.image?.trim() || 'https://placehold.co/200x200/1a1a2e/ffffff?text=No+Image'}
                          alt={item.imageAlt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/200x200/1a1a2e/ffffff?text=No+Image';
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.colorKey === 'purple' ? 'bg-purple-100 text-purple-600' :
                        item.colorKey === 'cyan' ? 'bg-cyan-100 text-cyan-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tech.slice(0, 2).map((t, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                            {t}
                          </span>
                        ))}
                        {item.tech.length > 2 && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                            +{item.tech.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                        >
                          এডিট
                        </button>
                        <button
                          onClick={() => handleDelete(item._id || item.id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
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
      </div>

      {/* মডাল */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingItem ? '📝 প্রজেক্ট এডিট করুন' : '✨ নতুন প্রজেক্ট তৈরি করুন'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingItem ? 'আপনার প্রজেক্টের তথ্য আপডেট করুন' : 'আপনার নতুন প্রজেক্ট যুক্ত করুন'}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  প্রজেক্ট টাইটেল <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  placeholder="যেমন: ইকমার্স ওয়েবসাইট"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ক্যাটাগরি <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  required
                >
                  <option value="">ক্যাটাগরি সিলেক্ট করুন</option>
                  <option value="Web App">🌐 ওয়েব অ্যাপ</option>
                  <option value="Mobile App">📱 মোবাইল অ্যাপ</option>
                  <option value="E-commerce">🛍️ ই-কমার্স</option>
                  <option value="Portfolio">🎨 পোর্টফোলিও</option>
                  <option value="Dashboard">📊 ড্যাশবোর্ড</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  বর্ণনা <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
                  placeholder="আপনার প্রজেক্টের বিস্তারিত বর্ণনা লিখুন..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  টেকনোলজি সমূহ
                </label>
                <input
                  type="text"
                  value={formData.tech}
                  onChange={(e) => setFormData({...formData, tech: e.target.value})}
                  className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  placeholder="React, Next.js, Tailwind CSS (কমা দিয়ে আলাদা করুন)"
                />
                <p className="text-xs text-gray-500 mt-1">💡 উদাহরণ: React, Node.js, MongoDB</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    রঙের থিম
                  </label>
                  <select
                    value={formData.colorKey}
                    onChange={(e) => setFormData({...formData, colorKey: e.target.value})}
                    className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="purple">🟣 পার্পল</option>
                    <option value="cyan">🔵 সায়ান</option>
                    <option value="blue">💙 ব্লু</option>
                    <option value="emerald">💚 এমারাল্ড</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    স্ট্যাটস (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={formData.stats}
                    onChange={(e) => setFormData({...formData, stats: e.target.value})}
                    className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="যেমন: 1000+ ইউজার"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ইমেজ URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({...formData, image: e.target.value});
                    setPreviewError(false);
                  }}
                  className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/image.jpg অথবা ইমেজের লিংক"
                  required
                />
                
                {/* ইমেজ প্রিভিউ - img ট্যাগ ব্যবহার করে */}
                {formData.image && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">📷 ইমেজ প্রিভিউ:</p>
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                      {!previewError ? (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={() => setPreviewError(true)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
                          ❌ ইমেজ লোড হয়নি
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ইমেজ অল্টারনেট টেক্সট
                </label>
                <input
                  type="text"
                  value={formData.imageAlt}
                  onChange={(e) => setFormData({...formData, imageAlt: e.target.value})}
                  className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="ইমেজের বিবরণ (SEO এর জন্য)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🔗 গিটহাব লিংক
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="https://github.com/username/project"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🌐 লাইভ লিংক
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                    className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-5 border-t border-gray-200 mt-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    {editingItem ? '🔄 আপডেট করুন' : '💾 প্রজেক্ট সেভ করুন'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    ❌ বাতিল করুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}