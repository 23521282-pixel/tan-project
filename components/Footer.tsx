import React, { useState } from 'react';
import { MapPin, Phone, Mail, X } from 'lucide-react';

const Footer: React.FC = () => {
  const [isQrZoomed, setIsQrZoomed] = useState(false);

  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://zalo.me/0349997126";

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-12 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 items-start mb-12">
          
          {/* Left: Socials & Courses */}
          <div className="space-y-8">
            <div className="flex gap-4">
              {/* Facebook Icon - Squircle Style */}
              <a 
                href="https://www.facebook.com/profile.php?id=61578750355329&locale=vi_VN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#0081c9] rounded-[22px] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-sm"
                title="Facebook"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>

              {/* TikTok Icon - Squircle Style (Fixed path) */}
              <a 
                href="https://www.tiktok.com/@hoctienganhhongne?lang=vi-VN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#0081c9] rounded-[22px] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-sm"
                title="TikTok"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.023c1.792 0 3.441.513 4.838 1.402a6.484 6.484 0 0 1-1.071 3.193 4.037 4.037 0 0 0-2.458-.834c-.033 0-.066.002-.1.004V7.91c.033-.001.066-.002.1-.002a6.386 6.386 0 0 1 4.542 1.889c1.196 1.196 1.888 2.822 1.888 4.543 0 1.72-.692 3.346-1.888 4.542a6.386 6.386 0 0 1-4.542 1.889 6.386 6.386 0 0 1-4.543-1.889C7.757 17.686 7.065 16.06 7.065 14.34c0-1.288.388-2.485 1.054-3.483l.01-.015 1.705 1.705c-.476.543-.769 1.254-.769 2.033a4.342 4.342 0 1 0 8.684 0 4.331 4.331 0 0 0-1.272-3.07 4.331 4.331 0 0 0-3.07-1.272c-.034 0-.067.001-.1.002V3.79c.033-.001.066-.002.1-.002a6.48 6.48 0 0 1 4.12 1.488 8.482 8.482 0 0 0 1.408-4.475h-2.001c0 1.258-.456 2.41-1.214 3.303a6.46 6.46 0 0 1-4.639-1.319c-.31-.22-.596-.465-.853-.734A6.476 6.476 0 0 1 12.525.023z" />
                </svg>
              </a>

              {/* YouTube Icon - Squircle Style (Fixed solid path) */}
              <a 
                href="https://www.youtube.com/@hoctienganhhong_ne" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#0081c9] rounded-[22px] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-sm"
                title="YouTube"
              >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l7 4-7 4z" />
                </svg>
              </a>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-black text-blue-900 uppercase tracking-tight">Khóa học</h4>
              <ul className="space-y-3 text-slate-500 text-sm font-medium">
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Khóa 21 ngày XÂY NỀN
                </li>
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Khóa 3 tháng Từ VỰNG - NGỮ PHÁP - ĐỌC HIỂU
                </li>
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Khóa luyện đề sớm LỘ TRÌNH CÁ NHÂN HÓA
                </li>
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Khóa toàn diện HỌC TỚI KHI THI
                </li>
                <li className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Nhóm EBOOK MỖI NGÀY
                </li>
              </ul>
            </div>
          </div>

          {/* Center: QR & Tư vấn thêm */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h4 className="text-blue-600 font-black text-xl mb-1">Tư vấn thêm</h4>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">NHẤN ĐỂ PHÓNG TO QR</p>
            </div>
            <div 
              onClick={() => setIsQrZoomed(true)}
              className="bg-slate-50 p-5 rounded-[36px] border border-slate-100 cursor-zoom-in hover:scale-105 transition-transform group shadow-sm"
            >
              <img 
                src={qrUrl} 
                alt="Zalo QR" 
                className="w-28 h-28 object-contain mix-blend-multiply opacity-90 group-hover:opacity-100" 
              />
            </div>
          </div>

          {/* Right: Liên hệ công việc */}
          <div className="space-y-6 md:pl-8">
            <h4 className="text-lg font-black text-blue-900 uppercase tracking-tight">Liên hệ công việc</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <p className="text-sm text-slate-600 font-semibold">Thành phố Hồ Chí Minh, Việt Nam</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <p className="text-sm text-slate-600 font-semibold">0349 997 126</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <p className="text-sm text-slate-600 font-semibold truncate">notricksjustthinking@gmail.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Divider and Copyright */}
        <div className="pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-[11px] font-bold tracking-[0.2em] uppercase">
            © 2026 ENGMIND. Built with <span className="text-red-500">❤️</span> in Vietnam.
          </p>
        </div>
      </div>

      {/* QR Zoom Modal */}
      {isQrZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300"
          onClick={() => setIsQrZoomed(false)}
        >
          <div 
            className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center gap-6 relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-center items-center relative mb-2">
              <h3 className="text-2xl font-black text-slate-900 font-poppins">Kết nối Zalo</h3>
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors p-1"
                onClick={() => setIsQrZoomed(false)}
              >
                <X size={28} strokeWidth={3} />
              </button>
            </div>
            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 flex items-center justify-center">
              <img 
                src={qrUrl} 
                alt="Enlarged QR" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain mix-blend-multiply"
              />
            </div>
            <div className="text-center pt-2">
               <p className="text-slate-500 font-bold text-lg">Quét mã để được tư vấn trực tiếp</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;