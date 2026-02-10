
import React, { useMemo } from 'react';
import { AppView } from '../App';
import DashboardHeader from './DashboardHeader';
import { Brain, AlertCircle, ArrowRight } from 'lucide-react';
import { mistakeStore } from '../data/mistakeStore';

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onNavigate }) => {
  const mistakeStats = useMemo(() => mistakeStore.getSummary(), []);

  return (
    <div className="min-h-full bg-[#fcfcfc] flex flex-col font-inter">
      <DashboardHeader activeView="dashboard" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-grow p-6 lg:p-12 space-y-10 max-w-[1400px] mx-auto w-full pb-20">
        
        {/* Welcome Profile Card */}
        <div className="bg-[#f2f2f2] rounded-[50px] p-8 md:p-14 flex flex-col md:flex-row gap-10 items-center">
          <div className="relative shrink-0">
             <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#d1d5db] via-[#e5e7eb] to-[#9ca3af] flex items-center justify-center border-[8px] border-white shadow-2xl relative">
                <span className="text-5xl font-black text-[#2563eb] drop-shadow-sm">A1</span>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
             </div>
          </div>

          <div className="space-y-6 flex-grow text-center md:text-left">
            <div>
              <h2 className="text-3xl font-black text-slate-800 mb-2 font-poppins">
                Chào mừng, Demo User! <span role="img" aria-label="wave">👋</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium">
                Bạn đang ở trình độ <span className="text-[#2563eb] font-bold">Beginner</span>. Chỉ còn 15% nữa là lên A2.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/90 backdrop-blur rounded-[30px] p-6 text-center shadow-sm border border-white">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Streak</p>
                <p className="text-2xl font-black text-slate-800">3 Ngày</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-[30px] p-6 text-center shadow-sm border border-white">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">XP</p>
                <p className="text-2xl font-black text-slate-800">450</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-[30px] p-6 text-center shadow-sm border border-white">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Rank</p>
                <p className="text-2xl font-black text-slate-800">#12</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-[30px] p-6 text-center shadow-sm border border-white">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Học kỳ</p>
                <p className="text-2xl font-black text-slate-800">K2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Ready for Challenge Card */}
           <div className="lg:col-span-2 bg-[#e9eff7] rounded-[50px] p-8 md:p-12 flex flex-col justify-center">
              <div className="bg-white/80 backdrop-blur-md rounded-[40px] p-10 w-full space-y-8 border border-white/50">
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-[#003d73] tracking-tight">Sẵn sàng thử thách?</h3>
                  <p className="text-[#2b6be3] font-bold text-lg opacity-80">
                    Đề thi THPT mới nhất vừa được cập nhật. Thử sức ngay để cập nhật bảng xếp hạng!
                  </p>
                </div>
                <button 
                  onClick={() => onNavigate('test-hub')}
                  className="w-full py-6 bg-gradient-to-r from-[#2b6be3] to-[#3b82f6] text-white font-black text-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(43,107,227,0.5)] hover:shadow-[0_25px_70px_-15px_rgba(43,107,227,0.6)] transition-all transform active:scale-[0.98]"
                >
                  Bắt đầu luyện đề
                </button>
              </div>
           </div>

           {/* Mistake Bank Preview Card */}
           <div className="bg-[#fff1f1] rounded-[50px] p-8 md:p-10 border border-red-50 flex flex-col space-y-8">
              <div className="space-y-4">
                 <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-red-500 shadow-sm shadow-red-100">
                    <Brain size={32} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-800 font-poppins">Lỗ hổng kiến thức</h3>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed">
                   Bạn đang có <span className="text-red-600 font-black">{mistakeStats.unreviewed} câu hỏi</span> làm sai chưa được ôn tập lại.
                 </p>
              </div>

              <div className="flex-grow flex flex-col justify-end">
                 <div className="bg-white/60 p-5 rounded-3xl border border-white mb-6">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                       <span>Tiến độ ôn tập</span>
                       <span>{mistakeStats.total > 0 ? Math.round((mistakeStats.reviewed / mistakeStats.total) * 100) : 0}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: `${mistakeStats.total > 0 ? (mistakeStats.reviewed / mistakeStats.total) * 100 : 0}%` }}></div>
                    </div>
                 </div>

                 <button 
                   onClick={() => onNavigate('mistake-bank')}
                   className="w-full py-5 bg-white border-2 border-red-100 text-red-600 font-black rounded-3xl hover:bg-red-50 transition-all flex items-center justify-center gap-2 group"
                 >
                    Vào Ngân hàng lỗi sai <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
