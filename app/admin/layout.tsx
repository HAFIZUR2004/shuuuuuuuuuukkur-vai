'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Briefcase, 
  MessageSquare,
  Menu,
  Mail,
  X,
  Users,
  Settings
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/admin/dashboard', name: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { path: '/admin/portfolio', name: 'পোর্টফোলিও', icon: FolderOpen },
    { path: '/admin/vacancies', name: 'ভ্যাকেন্সি', icon: Briefcase },
    { path: '/admin/testimonials', name: 'টেস্টিমোনিয়াল', icon: MessageSquare },
    { path: '/admin/applications', name: 'আবেদনপত্র', icon: Users },
    { path: '/admin/messages', name: 'মেসেজ', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          
          {/* CLICKABLE TITLE */}
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
              অ্যাডমিন প্যানেল
            </h1>
          </Link>

          <p className="text-xs text-gray-500 mt-1">
            Grow Business Solutions
          </p>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon size={18} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}