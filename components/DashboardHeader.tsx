
import React, { useState } from 'react';
import { Lamp, Search, Bell, Menu, X } from 'lucide-react';
import { AppView } from '../App';

interface DashboardHeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeView, onNavigate, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Tổng quan', view: 'dashboard' as AppView },
    { name: 'Lộ trình', view: 'roadmap' as AppView },
    { name: 'Bài học', view: 'dashboard' as AppView },
    { name: 'Ebook & Bản tin', view: 'ebook-newsletter' as AppView },
    { name: 'Test trình độ', view: 'test-hub' as AppView },
    { name: 'Lỗi sai', view: 'mistake-bank' as AppView },
    { name: 'AI Tutor', view: 'ai-tutor' as AppView },
    { name: 'Flashcards', view: 'flashcards' as AppView }
  ];

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 w-full shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          
          {/* LEFT: Logo & Shrinkable Search */}
          <div className="flex items-center gap-4 shrink-0">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => {
                onNavigate('dashboard');
                setIsMobileMenuOpen(false);
              }}
            >
              <div className="bg-[#2563eb] p-1.5 rounded-lg shadow-sm">
                <Lamp className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight font-poppins text-[#00609b] hidden sm:block">ENGMIND</span>
            </div>
            
            {/* Expandable Search Bar */}
            <div className="relative group hidden md:block">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder="Tìm bài học..." 
                className="bg-slate-50 border border-slate-100 rounded-full py-2 pl-10 pr-4 text-sm w-10 focus:w-64 group-hover:w-64 transition-all duration-500 ease-in-out outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 placeholder:opacity-0 focus:placeholder:opacity-100 group-hover:placeholder:opacity-100 font-medium" 
              />
            </div>
          </div>

          {/* CENTER: Main Navigation Menu */}
          <nav className="hidden xl:flex items-center justify-center flex-grow overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button 
                  key={item.name}
                  onClick={() => onNavigate(item.view)}
                  className={`px-3 py-2 text-[14px] font-bold transition-all whitespace-nowrap border-b-2 rounded-t-lg hover:bg-slate-50 ${
                    activeView === item.view || (item.name === 'Tổng quan' && activeView === 'dashboard') 
                    ? 'text-[#2563eb] border-[#2563eb]' 
                    : 'text-slate-500 border-transparent hover:text-[#2563eb]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* RIGHT: User Stats & Identity */}
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1 font-bold text-[14px]">
                <span className="text-slate-400 uppercase tracking-tight">XP</span>
                <span className="text-blue-600">450</span>
              </div>
              <div className="bg-[#e0f7fa] text-[#00bcd4] px-2.5 py-0.5 rounded-md text-[12px] font-black tracking-tighter border border-[#b2ebf2] shadow-sm">
                A1
              </div>
            </div>
            
            <button className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 bg-slate-50 rounded-full border border-slate-100 hidden sm:block">
              <Bell size={18} />
            </button>
            
            <div className="relative group">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-200 border-2 border-white shadow-sm flex items-center justify-center text-[#00609b] font-black cursor-pointer hover:ring-2 hover:ring-blue-100 transition-all">
                D
              </div>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 w-52 overflow-hidden ring-1 ring-black/5">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Tài khoản</p>
                    <p className="text-sm font-bold text-slate-800">Demo User</p>
                  </div>
                  <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">Hồ sơ cá nhân</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">Cài đặt</button>
                  <div className="h-px bg-slate-50 my-1"></div>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>

            <button 
              className="xl:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[64px] bg-white z-[60] overflow-y-auto animate-in fade-in slide-in-from-top duration-300">
          <div className="p-6 space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Tìm bài học, khóa học..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/10 outline-none font-medium" 
              />
            </div>
            
            <nav className="flex flex-col gap-2">
              <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Menu chính</p>
              {navItems.map((item) => (
                <button 
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-5 py-4 rounded-2xl font-bold transition-all ${
                    activeView === item.view || (item.name === 'Tổng quan' && activeView === 'dashboard') 
                    ? 'bg-blue-50 text-[#2563eb] shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-4 mx-4"></div>
              <button 
                onClick={onLogout}
                className="text-left px-5 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-colors"
              >
                Đăng xuất
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
