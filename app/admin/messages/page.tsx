'use client';

import ContactMessages from '@/components/dashboard/ContactMessages';

export default function MessagesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">কন্ট্যাক্ট মেসেজ</h1>
        <p className="text-gray-500 text-sm mt-1">আপনার কাছে আসা সব মেসেজ এখানে দেখুন</p>
      </div>
      <ContactMessages />
    </div>
  );
}