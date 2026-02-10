
import React from 'react';
import { Lamp } from 'lucide-react';

interface HeaderProps {
  onOpenLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenLogin }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Lamp className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight font-poppins text-blue-900">ENGMIND</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Trang chủ</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Câu chuyện thương hiệu</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Lộ trình học</a>
          <button 
            onClick={onOpenLogin}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Kích hoạt tài khoản
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
