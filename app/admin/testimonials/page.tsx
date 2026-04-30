'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, Edit, Trash2, Eye, EyeOff, Plus, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  company: string;
  icon: string;
  image?: string;
  order: number;
  isActive: boolean;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    comment: '',
    rating: 5,
    company: '',
    icon: '👨‍💼',
    image: '',
    order: 0,
    isActive: true
  });

  const iconOptions = [
    '👨‍💼', '👩‍💼', '👨‍💻', '👩‍🔬', '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀', '👨‍⚕️', '👩‍⚕️',
    '👨‍🏫', '👩‍🏫', '👨‍🌾', '👩‍🌾', '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍🎓', '👩‍🎓'
  ];

  // সব টেস্টিমোনিয়াল ফেচ করুন (অ্যাডমিন ভিউ)
  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials?admin=true');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ইমেজ আপলোড ফাংশন
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image');
      setUploadingImage(false);
    }
  };

  // ইমেজ রিমুভ ফাংশন
  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let response;
      if (editingItem) {
        response = await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem._id, ...formData }),
        });
      } else {
        response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        setModalOpen(false);
        fetchTestimonials();
        alert(editingItem ? '✅ Testimonial updated!' : '✅ Testimonial created!');
      } else {
        const error = await response.json();
        alert('Failed to save: ' + error.error);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const response = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchTestimonials();
        alert('✅ Testimonial deleted!');
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete');
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });
      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
          />
        ))}
      </div>
    );
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Testimonials Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage client reviews and testimonials</p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({
                name: '',
                role: '',
                comment: '',
                rating: 5,
                company: '',
                icon: '👨‍💼',
                image: '',
                order: testimonials.length,
                isActive: true
              });
              setModalOpen(true);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
          >
            <Plus size={18} />
            Add Testimonial
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Testimonials</p>
            <p className="text-2xl font-bold text-gray-800">{testimonials.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Active</p>
            <p className="text-2xl font-bold text-green-600">{testimonials.filter(t => t.isActive).length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Average Rating</p>
            <p className="text-2xl font-bold text-yellow-500">
              {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length || 0).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Testimonials Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500">No testimonials yet. Click "Add Testimonial" to create one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Image/Icon</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Name</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Role</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Company</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Comment</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Rating</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((item) => (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        {item.image ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <span className="text-2xl">{item.icon}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">{item.name}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600 text-sm">{item.role}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600 text-sm">{item.company}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-500 text-sm max-w-xs truncate">{item.comment}</p>
                      </td>
                      <td className="py-3 px-4">
                        {renderStars(item.rating)}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleStatus(item._id, item.isActive)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition ${
                            item.isActive 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {item.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                          {item.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setFormData({
                                name: item.name,
                                role: item.role,
                                comment: item.comment,
                                rating: item.rating,
                                company: item.company,
                                icon: item.icon,
                                image: item.image || '',
                                order: item.order,
                                isActive: item.isActive
                              });
                              setModalOpen(true);
                            }}
                            className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image (Optional)</label>
                  <div className="flex items-center gap-4">
                    {/* Image Preview */}
                    {formData.image ? (
                      <div className="relative">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-purple-500">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-3xl">{formData.icon}</span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                      >
                        <Upload size={18} />
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      </label>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="1"
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        required
                      />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`cursor-pointer transition ${
                              i < formData.rating 
                                ? 'text-yellow-500 fill-yellow-500' 
                                : 'text-gray-300 hover:text-yellow-200'
                            }`}
                            onClick={() => setFormData({ ...formData, rating: i + 1 })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon Selection - only show if no image */}
                {!formData.image && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Fallback) *</label>
                    <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg">
                      {iconOptions.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className={`text-2xl p-2 rounded-lg transition ${
                            formData.icon === icon 
                              ? 'bg-purple-100 ring-2 ring-purple-500' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 resize-none"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    />
                    <p className="text-xs text-gray-400 mt-1">Lower number = Higher priority</p>
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="isActive"
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Active (show on website)
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition font-medium disabled:opacity-50"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}