'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, FolderOpen, Briefcase, MessageSquare, Users, Clock, 
  CheckCircle, XCircle, TrendingUp, ArrowRight, Bell, 
  Search, RefreshCw, UserPlus, FileText, Calendar, Activity,
  Mail, Zap, X
} from 'lucide-react';

// Define types
interface Application {
  _id: string;
  fullName: string;
  vacancyTitle: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  [key: string]: any;
}

interface Vacancy {
  _id: string;
  title: string;
  [key: string]: any;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export default function DashboardPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
    fetchNotifications();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, vacsRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/vacancies')
      ]);
      const apps = await appsRes.json();
      const vacs = await vacsRes.json();
      setApplications(Array.isArray(apps) ? apps : []);
      setVacancies(Array.isArray(vacs) ? vacs : []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      const notificationsData = Array.isArray(data) ? data : [];
      setNotifications(notificationsData);
      const unread = notificationsData.filter((n: any) => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    await fetchNotifications();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId, read: true })
      });
      setNotifications((prev: any[]) => prev.map((n: any) => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount((prev: number) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAllAsRead = async () => {
    for (const notif of notifications) {
      if (!notif.read) {
        await markAsRead(notif.id);
      }
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'application': return <UserPlus size={16} className="text-green-500" />;
      case 'message': return <Mail size={16} className="text-blue-500" />;
      case 'vacancy': return <Briefcase size={16} className="text-purple-500" />;
      default: return <Zap size={16} className="text-yellow-500" />;
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a: any) => a.status === 'pending').length,
    reviewed: applications.filter((a: any) => a.status === 'reviewed').length,
    accepted: applications.filter((a: any) => a.status === 'accepted').length,
    rejected: applications.filter((a: any) => a.status === 'rejected').length,
    vacancies: vacancies.length,
  };

  const filteredApplications = applications.filter((app: any) => {
    const matchesSearch = app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.vacancyTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statCards = [
    { label: 'মোট আবেদন', value: stats.total, icon: Users, color: 'blue', change: '+12%', bgGradient: 'from-blue-500 to-blue-600' },
    { label: 'পেন্ডিং', value: stats.pending, icon: Clock, color: 'yellow', change: '+3%', bgGradient: 'from-yellow-500 to-yellow-600' },
    { label: 'রিভিউ করা', value: stats.reviewed, icon: Eye, color: 'purple', change: '+5%', bgGradient: 'from-purple-500 to-purple-600' },
    { label: 'সিলেক্টেড', value: stats.accepted, icon: CheckCircle, color: 'green', change: '+8%', bgGradient: 'from-green-500 to-green-600' },
    { label: 'রিজেক্টেড', value: stats.rejected, icon: XCircle, color: 'red', change: '-2%', bgGradient: 'from-red-500 to-red-600' },
    { label: 'ভ্যাকেন্সি', value: stats.vacancies, icon: Briefcase, color: 'orange', change: '+4%', bgGradient: 'from-orange-500 to-orange-600' },
  ];

  const quickActions = [
    { title: 'নতুন ভ্যাকেন্সি', icon: Briefcase, href: '/admin/vacancies', gradient: 'from-purple-600 to-pink-600', description: 'চাকরির বিজ্ঞপ্তি তৈরি করুন' },
    { title: 'সব আবেদন', icon: Users, href: '/admin/applications', gradient: 'from-blue-600 to-cyan-600', description: 'সকল আবেদন দেখুন' },
    { title: 'পোর্টফোলিও', icon: FolderOpen, href: '/admin/portfolio', gradient: 'from-emerald-600 to-teal-600', description: 'প্রকল্প যুক্ত করুন' },
    { title: 'মেসেজ', icon: MessageSquare, href: '/admin/messages', gradient: 'from-orange-600 to-red-600', description: 'সকল মেসেজ দেখুন' },
  ];

  const getStatusBadge = (status: string) => {
    const statuses: any = {
      pending: { label: 'পেন্ডিং', class: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
      reviewed: { label: 'রিভিউ করা', class: 'bg-purple-100 text-purple-700 border-purple-200', icon: Eye },
      accepted: { label: 'সিলেক্টেড', class: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      rejected: { label: 'রিজেক্টেড', class: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
    };
    return statuses[status] || statuses.pending;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw size={48} className="text-purple-600" />
        </motion.div>
        <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            ড্যাশবোর্ড
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 mt-1 text-sm md:text-base"
          >
            স্বাগতম! আপনার প্ল্যাটফর্মের সম্পূর্ণ সামারি এখানে দেখুন
          </motion.p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <RefreshCw size={20} className={`text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          
          {/* Notification Button */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100"
                >
                  <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">নোটিফিকেশন</h3>
                    <div className="flex gap-3">
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                        >
                          <CheckCircle size={12} />
                          সব পড়া হয়েছে
                        </button>
                      )}
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-400">
                        <Bell size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">কোনো নোটিফিকেশন নেই</p>
                      </div>
                    ) : (
                      notifications.map((notif: any) => (
                        <div 
                          key={notif.id}
                          className={`p-4 border-b hover:bg-gray-50 transition cursor-pointer ${!notif.read ? 'bg-purple-50/30' : ''}`}
                          onClick={() => {
                            markAsRead(notif.id);
                            setShowNotifications(false);
                            if (notif.link) {
                              window.location.href = notif.link;
                            }
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {new Date(notif.createdAt).toLocaleString('bn-BD', { 
                                  hour: '2-digit', 
                                  minute: '2-digit',
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <div className="p-3 bg-gray-50 text-center border-t">
                      <Link 
                        href="/admin/notifications" 
                        className="text-xs text-purple-600 hover:text-purple-700"
                        onClick={() => setShowNotifications(false)}
                      >
                        সব নোটিফিকেশন দেখুন
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AD</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.bgGradient}`} />
            <div className="p-4 md:p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.bgGradient} bg-opacity-10`}>
                  <stat.icon size={22} className={`text-${stat.color}-600`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <TrendingUp size={16} className="text-gray-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">দ্রুত অ্যাকশন</h2>
          <Link href="/admin/all-actions" className="text-purple-600 text-sm hover:text-purple-700 flex items-center gap-1">
            সব দেখুন <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickActions.map((action, idx) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={action.href} className="block group">
                <div className={`relative overflow-hidden bg-gradient-to-r ${action.gradient} rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <action.icon size={32} className="text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-semibold text-lg mb-1">{action.title}</h3>
                  <p className="text-white/70 text-sm">{action.description}</p>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Applications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">সর্বশেষ আবেদন</h2>
              <p className="text-gray-500 text-sm mt-1">মোট {applications.length}টি আবেদনের মধ্যে সর্বশেষ ৫টি</p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
              >
                <option value="all">সব স্ট্যাটাস</option>
                <option value="pending">পেন্ডিং</option>
                <option value="reviewed">রিভিউ করা</option>
                <option value="accepted">সিলেক্টেড</option>
                <option value="rejected">রিজেক্টেড</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 text-gray-600 text-sm font-medium">আবেদনকারী</th>
                <th className="text-left p-4 text-gray-600 text-sm font-medium hidden md:table-cell">ভ্যাকেন্সি</th>
                <th className="text-left p-4 text-gray-600 text-sm font-medium">স্ট্যাটাস</th>
                <th className="text-left p-4 text-gray-600 text-sm font-medium hidden lg:table-cell">তারিখ</th>
                <th className="text-left p-4 text-gray-600 text-sm font-medium">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredApplications.slice(0, 5).map((app: any, idx: number) => {
                  const status = getStatusBadge(app.status);
                  const StatusIcon = status.icon;
                  return (
                    <motion.tr
                      key={app._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-50 hover:bg-purple-50/30 transition-colors duration-300"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-800">{app.fullName || 'নাম নেই'}</p>
                          <p className="text-xs text-gray-400 md:hidden mt-1">{app.vacancyTitle}</p>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                          <Briefcase size={12} />
                          {app.vacancyTitle}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.class}`}>
                          <StatusIcon size={12} />
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                          <Calendar size={14} />
                          {new Date(app.appliedAt).toLocaleDateString('bn-BD')}
                        </div>
                      </td>
                      <td className="p-4">
                        <Link 
                          href={`/admin/applications/${app._id}`} 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow"
                        >
                          <Eye size={14} />
                          দেখুন
                        </Link>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-12">
                    <div className="flex flex-col items-center gap-3">
                      <FileText size={48} className="text-gray-300" />
                      <p className="text-gray-400">কোনো আবেদন নেই</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
           </table>
        </div>

        {applications.length > 5 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <Link 
              href="/admin/applications" 
              className="flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium transition"
            >
              সব আবেদন দেখুন <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </motion.div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">সাম্প্রতিক কার্যকলাপ</h3>
            <Activity size={18} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {applications.slice(0, 3).map((app: any) => (
              <div key={app._id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <UserPlus size={14} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{app.fullName}</span> একটি নতুন আবেদন জমা দিয়েছেন
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{app.vacancyTitle}</p>
                </div>
                <span className="text-xs text-gray-400">{new Date(app.appliedAt).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-4 md:p-6 text-white"
        >
          <h3 className="font-semibold mb-4">দ্রুত পরিসংখ্যান</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/70 text-sm">কনভার্সন রেট</p>
              <p className="text-2xl font-bold">{stats.total ? ((stats.accepted / stats.total) * 100).toFixed(1) : 0}%</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">অ্যাপ্রুভাল রেট</p>
              <p className="text-2xl font-bold">{stats.reviewed ? ((stats.accepted / stats.reviewed) * 100).toFixed(1) : 0}%</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">পেন্ডিং রেসপন্স</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">অ্যাক্টিভ ভ্যাকেন্সি</p>
              <p className="text-2xl font-bold">{stats.vacancies}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}