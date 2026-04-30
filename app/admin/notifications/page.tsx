'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Mail, Briefcase, UserPlus, Zap, Trash2, 
  CheckCheck, Eye, EyeOff, ArrowLeft, RefreshCw,
  Filter, Calendar, X, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'message' | 'vacancy' | 'system';
  read: boolean;
  createdAt: string;
  link?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: id, read: true })
      });
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAsUnread = async (id: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: id, read: false })
      });
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, read: false } : n
      ));
    } catch (error) {
      console.error('Error marking as unread:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    if (!confirm('নোটিফিকেশন ডিলিট করতে চান?')) return;
    try {
      await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
      setNotifications(prev => prev.filter(n => n.id !== id));
      setSelectedNotifications(prev => prev.filter(pid => pid !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const markMultipleAsRead = async () => {
    for (const id of selectedNotifications) {
      await markAsRead(id);
    }
    setSelectedNotifications([]);
    setSelectMode(false);
  };

  const deleteMultiple = async () => {
    if (!confirm(`${selectedNotifications.length}টি নোটিফিকেশন ডিলিট করতে চান?`)) return;
    for (const id of selectedNotifications) {
      await deleteNotification(id);
    }
    setSelectedNotifications([]);
    setSelectMode(false);
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    for (const id of unreadIds) {
      await markAsRead(id);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'application': return <UserPlus size={18} className="text-green-500" />;
      case 'message': return <Mail size={18} className="text-blue-500" />;
      case 'vacancy': return <Briefcase size={18} className="text-purple-500" />;
      default: return <Zap size={18} className="text-yellow-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      application: 'bg-green-100 text-green-700',
      message: 'bg-blue-100 text-blue-700',
      vacancy: 'bg-purple-100 text-purple-700',
      system: 'bg-yellow-100 text-yellow-700'
    };
    const labels = {
      application: 'আবেদন',
      message: 'মেসেজ',
      vacancy: 'ভ্যাকেন্সি',
      system: 'সিস্টেম'
    };
    return { class: badges[type as keyof typeof badges] || badges.system, label: labels[type as keyof typeof labels] || labels.system };
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread' && notif.read) return false;
    if (filter === 'read' && !notif.read) return false;
    if (typeFilter !== 'all' && notif.type !== typeFilter) return false;
    return true;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    read: notifications.filter(n => n.read).length,
    applications: notifications.filter(n => n.type === 'application').length,
    messages: notifications.filter(n => n.type === 'message').length,
    vacancies: notifications.filter(n => n.type === 'vacancy').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/dashboard" 
            className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              নোটিফিকেশন
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              সব নোটিফিকেশন এখানে দেখুন
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={fetchNotifications}
            className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <RefreshCw size={20} className="text-gray-600" />
          </button>
          {stats.unread > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <CheckCheck size={16} />
              সব পড়া হয়েছে
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">মোট</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Bell size={24} className="text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">অপঠিত</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.unread}</p>
            </div>
            <Clock size={24} className="text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">পঠিত</p>
              <p className="text-2xl font-bold text-green-600">{stats.read}</p>
            </div>
            <CheckCircle size={24} className="text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">আবেদন</p>
              <p className="text-2xl font-bold text-blue-600">{stats.applications}</p>
            </div>
            <UserPlus size={24} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">মেসেজ</p>
              <p className="text-2xl font-bold text-orange-600">{stats.messages}</p>
            </div>
            <Mail size={24} className="text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">ভ্যাকেন্সি</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.vacancies}</p>
            </div>
            <Briefcase size={24} className="text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              সব
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'unread' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              অপঠিত ({stats.unread})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'read' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              পঠিত
            </button>
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">সব টাইপ</option>
            <option value="application">আবেদন</option>
            <option value="message">মেসেজ</option>
            <option value="vacancy">ভ্যাকেন্সি</option>
            <option value="system">সিস্টেম</option>
          </select>

          {selectedNotifications.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={markMultipleAsRead}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition"
              >
                <CheckCheck size={14} />
                পড়া হয়েছে ({selectedNotifications.length})
              </button>
              <button
                onClick={deleteMultiple}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition"
              >
                <Trash2 size={14} />
                ডিলিট
              </button>
              <button
                onClick={() => {
                  setSelectedNotifications([]);
                  setSelectMode(false);
                }}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition"
              >
                বাতিল
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600">কোনো নোটিফিকেশন নেই</h3>
            <p className="text-gray-400 text-sm mt-1">নতুন নোটিফিকেশন আসলে এখানে দেখাবে</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {filteredNotifications.map((notif, idx) => {
                const typeBadge = getTypeBadge(notif.type);
                const isSelected = selectedNotifications.includes(notif.id);
                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`group relative hover:bg-gray-50 transition-all duration-300 ${
                      !notif.read ? 'bg-purple-50/30' : ''
                    } ${isSelected ? 'bg-purple-100/50' : ''}`}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Checkbox for select mode */}
                        {selectMode ? (
                          <div className="flex-shrink-0 pt-1">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedNotifications([...selectedNotifications, notif.id]);
                                } else {
                                  setSelectedNotifications(selectedNotifications.filter(id => id !== notif.id));
                                }
                              }}
                              className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              {getNotificationIcon(notif.type)}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className={`font-semibold ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>
                              {notif.title}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadge.class}`}>
                              {typeBadge.label}
                            </span>
                            {!notif.read && (
                              <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full">
                                নতুন
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${!notif.read ? 'text-gray-700' : 'text-gray-500'} mb-2`}>
                            {notif.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(notif.createdAt).toLocaleString('bn-BD', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        {!selectMode && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notif.read ? (
                              <button
                                onClick={() => markAsRead(notif.id)}
                                className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition"
                                title="পঠিত হিসেবে চিহ্নিত করুন"
                              >
                                <CheckCheck size={16} />
                              </button>
                            ) : (
                              <button
                                onClick={() => markAsUnread(notif.id)}
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                                title="অপঠিত হিসেবে চিহ্নিত করুন"
                              >
                                <EyeOff size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notif.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                              title="ডিলিট করুন"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Link to related content */}
                      {notif.link && !selectMode && (
                        <div className="mt-3 ml-14">
                          <Link
                            href={notif.link}
                            className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
                            onClick={() => markAsRead(notif.id)}
                          >
                            বিস্তারিত দেখুন <ArrowLeft size={12} className="rotate-180" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
        
        {/* Select Mode Toggle */}
        {filteredNotifications.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => {
                setSelectMode(!selectMode);
                if (selectMode) setSelectedNotifications([]);
              }}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition"
            >
              {selectMode ? 'সাধারণ মোডে ফিরুন' : 'একাধিক সিলেক্ট করুন'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}