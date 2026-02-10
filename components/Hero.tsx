
import React, { useState, useEffect } from 'react';
import { Check, Lamp, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenLogin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenLogin }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 135,
    hours: 7,
    minutes: 39,
    seconds: 17
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 hero-gradient min-h-[85vh] flex items-center">
      <div className="container mx-auto px-4 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side */}
        <div className="space-y-10 z-10">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight text-slate-900 font-outfit uppercase tracking-tight">
              Học Tiếng Anh Bằng <br />
              <span className="text-blue-600">Phương Pháp Tư Duy</span>
            </h1>
            
            {/* List items with checkmarks based on Image 1 */}
            <div className="space-y-8 py-4">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border border-blue-50">
                  <Check className="text-blue-500 w-6 h-6" strokeWidth={3} />
                </div>
                <span className="text-lg md:text-xl text-slate-500 font-medium leading-snug">
                  Lộ trình cá nhân hóa xuyên suốt theo dữ liệu lỗi sai dựa trên trình độ CEFR
                </span>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border border-blue-50">
                  <Check className="text-blue-500 w-6 h-6" strokeWidth={3} />
                </div>
                <span className="text-lg md:text-xl text-slate-500 font-medium leading-snug">
                  Đề thi THPTQG thực tế + giải thích chi tiết
                </span>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border border-blue-50">
                  <Check className="text-blue-500 w-6 h-6" strokeWidth={3} />
                </div>
                <span className="text-lg md:text-xl text-slate-500 font-medium leading-snug">
                  Flashcards thông minh với spaced repetition
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <button 
              onClick={onOpenLogin}
              className="px-10 py-5 bg-blue-600 text-white rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
            >
              Dùng thử ngay
            </button>
            <button className="px-10 py-5 bg-white text-blue-600 border-2 border-blue-50 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-sm">
              Xem tính năng
            </button>
          </div>

          <div className="inline-flex items-center gap-4 p-5 bg-white/80 backdrop-blur-md border border-white rounded-[24px] shadow-xl shadow-slate-200/50">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-1">Tài khoản Demo</span>
              <div className="flex gap-6">
                <span className="text-sm font-bold text-slate-700">User: <span className="text-blue-600">demo_user</span></span>
                <span className="text-sm font-bold text-slate-700">Pass: <span className="text-blue-600">demo123</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex flex-col items-center lg:items-end pr-4">
          <div className="relative w-full max-w-lg lg:max-w-none text-center lg:text-right">
            {/* Background Watermark Text */}
            <h2 className="text-8xl lg:text-[160px] font-black text-blue-900/[0.03] select-none absolute -top-24 -right-10 font-outfit tracking-tighter uppercase">
              ENGMIND
            </h2>
            
            <div className="relative inline-block space-y-3 mb-12">
              <h3 className="text-6xl lg:text-[100px] font-black text-blue-900 font-outfit tracking-tighter leading-none">ENGMIND</h3>
              <p className="text-2xl lg:text-3xl font-medium text-slate-500 italic tracking-[0.1em] font-outfit opacity-80 uppercase">English as a Thinking Skill</p>
            </div>
            
            <div className="mt-4 flex justify-center lg:justify-end relative">
                <div className="w-80 h-80 bg-blue-400/10 rounded-full blur-[100px] absolute top-1/2 left-1/2 lg:left-auto lg:right-20 -translate-x-1/2 -translate-y-1/2"></div>
                <Lamp className="w-64 h-64 text-blue-600/10 drop-shadow-[0_0_50px_rgba(37,99,235,0.1)] relative z-10" />
            </div>

            {/* Countdown Card */}
            <div className="mt-16 bg-white/95 backdrop-blur-xl p-8 rounded-[40px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] border border-white max-w-sm ml-auto relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
              <div className="absolute -top-3 left-8 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-100">
                Đếm ngược kỳ thi
              </div>
              <p className="text-center text-slate-800 font-black text-2xl mb-6 mt-4 font-outfit">THPTQG 2026</p>
              
              <div className="flex justify-between gap-3">
                <div className="flex-1 bg-slate-50/80 rounded-[24px] p-4 text-center border border-slate-100 group-hover:bg-white transition-colors duration-500">
                  <span className="block text-3xl font-black text-blue-600 font-outfit">{timeLeft.days}</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Ngày</span>
                </div>
                <div className="flex-1 bg-slate-50/80 rounded-[24px] p-4 text-center border border-slate-100 group-hover:bg-white transition-colors duration-500">
                  <span className="block text-3xl font-black text-blue-600 font-outfit">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Giờ</span>
                </div>
                <div className="flex-1 bg-slate-50/80 rounded-[24px] p-4 text-center border border-slate-100 group-hover:bg-white transition-colors duration-500">
                  <span className="block text-3xl font-black text-blue-600 font-outfit">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Phút</span>
                </div>
                <div className="flex-1 bg-slate-50/80 rounded-[24px] p-4 text-center border border-slate-100 group-hover:bg-white transition-colors duration-500">
                  <span className="block text-3xl font-black text-orange-500 font-outfit">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Giây</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;