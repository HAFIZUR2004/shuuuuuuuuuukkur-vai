'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  Calendar, 
  Globe, 
  User, 
  FileText,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

// Font Awesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

interface Application {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  currentCompany: string;
  portfolio: string;
  linkedin: string;
  github: string;
  coverLetter: string;
  vacancyTitle: string;
  vacancyId: string;
  resumePath: string;
  status: string;
  appliedAt: string;
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching application with ID:', id);
      
      const res = await fetch(`/api/applications/${id}`);
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('অ্যাপ্লিকেশন পাওয়া যায়নি');
        }
        throw new Error('Failed to fetch application');
      }
      
      const data = await res.json();
      console.log('Fetched application:', data);
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
      setError(error instanceof Error ? error.message : 'অ্যাপ্লিকেশন লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: string) => {
    if (!confirm(`স্ট্যাটাস "${status}" এ পরিবর্তন করতে চান?`)) return;
    
    try {
      setUpdating(true);
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (res.ok) {
        setApplication(prev => prev ? { ...prev, status } : null);
        alert('✅ স্ট্যাটাস আপডেট হয়েছে');
      } else {
        const error = await res.json();
        alert(error.error || 'স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'reviewed': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'accepted': return 'bg-green-100 text-green-700 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return '⏳ পেন্ডিং';
      case 'reviewed': return '👁️ রিভিউ করা';
      case 'accepted': return '✅ সিলেক্টেড';
      case 'rejected': return '❌ রিজেক্টেড';
      default: return status;
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

  if (error || !application) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600">{error || 'অ্যাপ্লিকেশন পাওয়া যায়নি'}</p>
          <Link 
            href="/admin/applications" 
            className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            অ্যাপ্লিকেশন লিস্টে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ব্যাক বাটন */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/applications" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={20} /> সব অ্যাপ্লিকেশনে ফিরে যান
        </Link>
        <button
          onClick={() => window.print()}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
        >
          🖨️ প্রিন্ট করুন
        </button>
      </div>

      {/* হেডার কার্ড */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{application.fullName}</h1>
                  <p className="text-gray-500">আবেদন করেছেন: {application.vacancyTitle}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={application.status}
                onChange={(e) => updateStatus(e.target.value)}
                disabled={updating}
                className={`px-4 py-2 rounded-lg border font-medium cursor-pointer ${getStatusColor(application.status)}`}
              >
                <option value="pending">⏳ পেন্ডিং</option>
                <option value="reviewed">👁️ রিভিউ করা</option>
                <option value="accepted">✅ সিলেক্টেড</option>
                <option value="rejected">❌ রিজেক্টেড</option>
              </select>
              
              {application.resumePath && (
                <a
                  href={application.resumePath}
                  download
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 transition"
                >
                  <Download size={16} /> রেসিউম ডাউনলোড
                </a>
              )}
            </div>
          </div>
        </div>

        {/* স্ট্যাটাস বার */}
        <div className="px-6 py-3 bg-gray-50 border-b flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              application.status === 'accepted' ? 'bg-green-500' :
              application.status === 'rejected' ? 'bg-red-500' :
              application.status === 'reviewed' ? 'bg-purple-500' : 'bg-yellow-500'
            }`} />
            <span className="text-sm text-gray-600">বর্তমান স্ট্যাটাস: {getStatusText(application.status)}</span>
          </div>
          <div className="w-px h-4 bg-gray-300 hidden sm:block" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} />
            <span>আবেদনের তারিখ: {new Date(application.appliedAt).toLocaleString('bn-BD')}</span>
          </div>
        </div>
      </div>

      {/* ব্যক্তিগত তথ্য */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
          <User size={18} className="text-purple-600" /> ব্যক্তিগত তথ্য
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-start gap-3">
            <Mail className="text-gray-400 mt-0.5" size={18} />
            <div>
              <p className="text-xs text-gray-500">ইমেইল</p>
              <a href={`mailto:${application.email}`} className="text-gray-800 hover:text-purple-600">
                {application.email}
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="text-gray-400 mt-0.5" size={18} />
            <div>
              <p className="text-xs text-gray-500">ফোন নম্বর</p>
              <p className="text-gray-800">{application.phone || 'প্রদান করা হয়নি'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Briefcase className="text-gray-400 mt-0.5" size={18} />
            <div>
              <p className="text-xs text-gray-500">মোট অভিজ্ঞতা</p>
              <p className="text-gray-800">{application.experience || 'প্রদান করা হয়নি'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Building className="text-gray-400 mt-0.5" size={18} />
            <div>
              <p className="text-xs text-gray-500">বর্তমান কোম্পানি</p>
              <p className="text-gray-800">{application.currentCompany || 'প্রদান করা হয়নি'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* লিংকসমূহ */}
      {(application.portfolio || application.linkedin || application.github) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
            <Globe size={18} className="text-purple-600" /> অনলাইন প্রোফাইল
          </h2>
          <div className="space-y-3">
            {application.portfolio && (
              <a href={application.portfolio} target="_blank" rel="noopener noreferrer" 
                className="flex items-center gap-3 text-blue-600 hover:underline break-all">
                <Globe size={18} className="flex-shrink-0" />
                <span>পোর্টফোলিও: {application.portfolio}</span>
              </a>
            )}
            {application.linkedin && (
              <a href={application.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:underline break-all">
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 flex-shrink-0 text-[#0077b5]" />
                <span>লিংকডইন: {application.linkedin}</span>
              </a>
            )}
            {application.github && (
              <a href={application.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:underline break-all">
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5 flex-shrink-0" />
                <span>গিটহাব: {application.github}</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* কভার লেটার */}
      {application.coverLetter && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
            <FileText size={18} className="text-purple-600" /> কভার লেটার
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {application.coverLetter}
            </p>
          </div>
        </div>
      )}

      {/* অ্যাকশন বাটন */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
        <button
          onClick={() => updateStatus('accepted')}
          disabled={updating || application.status === 'accepted'}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle size={18} /> সিলেক্ট করুন
        </button>
        <button
          onClick={() => updateStatus('rejected')}
          disabled={updating || application.status === 'rejected'}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <XCircle size={18} /> রিজেক্ট করুন
        </button>
        <button
          onClick={() => updateStatus('reviewed')}
          disabled={updating || application.status === 'reviewed'}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Eye size={18} /> রিভিউ হিসেবে চিহ্নিত করুন
        </button>
      </div>
    </div>
  );
}