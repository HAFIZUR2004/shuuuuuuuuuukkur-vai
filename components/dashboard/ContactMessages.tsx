'use client';

import { useEffect, useState } from 'react';
import { Mail, CheckCircle, Clock, Reply, Trash2, Eye } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export default function ContactMessages() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'read' | 'replied') => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'read': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'replied': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <Mail size={12} />;
      case 'read': return <Eye size={12} />;
      case 'replied': return <Reply size={12} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0a0c0f] rounded-xl border border-white/10 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-16 bg-white/10 rounded"></div>
            <div className="h-16 bg-white/10 rounded"></div>
            <div className="h-16 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0c0f] rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">কন্ট্যাক্ট মেসেজ</h2>
            <p className="text-white/40 text-sm mt-1">
              মোট {messages.length}টি মেসেজ | আনরিড: {messages.filter(m => m.status === 'unread').length}
            </p>
          </div>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-[#6c5ce7]/20 text-[#a29bfe] rounded-lg text-sm hover:bg-[#6c5ce7]/30 transition"
          >
            রিফ্রেশ
          </button>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {messages.length === 0 ? (
          <div className="p-12 text-center">
            <Mail size={48} className="mx-auto text-white/20 mb-3" />
            <p className="text-white/40">কোনো মেসেজ নেই</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-4 hover:bg-white/5 transition cursor-pointer ${
                msg.status === 'unread' ? 'bg-[#6c5ce7]/5' : ''
              }`}
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-white">{msg.name}</h3>
                    <span className="text-white/40 text-xs">{msg.email}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border ${getStatusColor(msg.status)} flex items-center gap-1`}>
                      {getStatusIcon(msg.status)}
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mt-1 line-clamp-2">
                    {msg.message}
                  </p>
                  <p className="text-white/30 text-xs mt-2">
                    {new Date(msg.createdAt).toLocaleString('bn-BD')}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  {msg.status === 'unread' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(msg._id, 'read');
                      }}
                      className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition"
                      title="Mark as read"
                    >
                      <Eye size={14} />
                    </button>
                  )}
                  {msg.status !== 'replied' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `mailto:${msg.email}?subject=Reply to your message&body=Dear ${msg.name},%0D%0A%0D%0A`;
                        updateStatus(msg._id, 'replied');
                      }}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition"
                      title="Reply"
                    >
                      <Reply size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-[#0a0c0f] rounded-2xl max-w-2xl w-full border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedMessage.name}</h3>
                  <p className="text-white/40 text-sm">{selectedMessage.email}</p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-white/40 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <p className="text-white/30 text-sm">
                  {new Date(selectedMessage.createdAt).toLocaleString('bn-BD')}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      window.location.href = `mailto:${selectedMessage.email}?subject=Reply to your message&body=Dear ${selectedMessage.name},%0D%0A%0D%0A`;
                      updateStatus(selectedMessage._id, 'replied');
                      setSelectedMessage(null);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white rounded-lg text-sm font-medium"
                  >
                    রিপ্লাই করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}