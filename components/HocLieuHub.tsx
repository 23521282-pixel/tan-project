
import React from 'react';
import { ChevronLeft, ArrowRight, BookOpen, Clock, CheckCircle, GraduationCap, List, Sparkles } from 'lucide-react';
import { OFFICIAL_HOC_LIEU_TEST } from '../data/hocLieuData';
import DashboardHeader from './DashboardHeader';
import { AppView } from '../App';

interface HocLieuHubProps {
  onBack: () => void;
  onStartTest: (id: number) => void;
  onLogout: () => void;
}

const HocLieuHub: React.FC<HocLieuHubProps> = ({ onBack, onStartTest, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col font-inter">
      <DashboardHeader activeView="test-hub" onNavigate={(view: AppView) => {
        if (view === 'dashboard') onBack();
      }} onLogout={onLogout} />

      <main className="flex-grow p-6 lg:p-16 max-w-[1200px] mx-auto w-full">
        <div className="mb-14">
           <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold mb-6 hover:text-blue-600 transition-colors group">
             <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Quay lại Hub Test
           </button>
           <h1 className="text-5xl font-black text-slate-900 mb-3 font-poppins">HỌC LIỆU WEBSITE</h1>
           <p className="text-slate-500 text-xl font-medium">Hệ thống bài test tư duy – đọc hiểu học thuật độc quyền ENGMIND.</p>
        </div>

        <div className="max-w-4xl">
           <div className="bg-white rounded-[50px] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0 group-hover:scale-110 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                 <div className="w-28 h-28 bg-[#2563eb] rounded-[40px] flex items-center justify-center text-white shadow-2xl shadow-blue-200 shrink-0 transform -rotate-3 group-hover:rotate-0 transition-transform">
                    <GraduationCap size={56} />
                 </div>
                 
                 <div className="space-y-8 flex-grow">
                    <div>
                       <div className="flex items-center gap-4 mb-5">
                          <span className="bg-blue-600 text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-blue-100">Official Test</span>
                          <div className="h-5 w-px bg-slate-200"></div>
                          <span className="text-slate-400 text-sm font-bold">Kỳ thi K2026</span>
                       </div>
                       <h2 className="text-4xl font-black text-slate-900 mb-5 leading-tight">{OFFICIAL_HOC_LIEU_TEST.title}</h2>
                       <p className="text-slate-500 text-lg leading-relaxed font-medium">
                          {OFFICIAL_HOC_LIEU_TEST.description}
                       </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-4">
                       <div className="flex items-center gap-4">
                          <div className="bg-emerald-50 p-2.5 rounded-xl">
                            <CheckCircle className="text-emerald-500" size={24} />
                          </div>
                          <div>
                             <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Số câu hỏi</p>
                             <p className="text-xl font-black text-slate-800">{OFFICIAL_HOC_LIEU_TEST.totalQuestions} câu</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="bg-blue-50 p-2.5 rounded-xl">
                            <Clock className="text-blue-500" size={24} />
                          </div>
                          <div>
                             <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Thời gian</p>
                             <p className="text-xl font-black text-slate-800">{OFFICIAL_HOC_LIEU_TEST.estimatedTime} phút</p>
                          </div>
                       </div>
                    </div>

                    <div className="pt-10 flex flex-col sm:flex-row gap-5">
                       <button 
                         onClick={() => onStartTest(OFFICIAL_HOC_LIEU_TEST.id)}
                         className="px-14 py-6 bg-[#2563eb] text-white font-black text-xl rounded-[28px] shadow-2xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
                       >
                         Bắt đầu làm bài <ArrowRight size={28} />
                       </button>
                       <button className="px-10 py-6 bg-slate-50 text-slate-500 font-bold rounded-[28px] hover:bg-slate-100 transition-all border border-slate-100">
                          Xem đề cương
                       </button>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Cấp độ mục tiêu", val: "B1 - C1", icon: <BookOpen size={20} />, color: "text-blue-500" },
                { label: "Cấu trúc bài thi", val: "6 Phần Tư Duy", icon: <List size={20} />, color: "text-purple-500" },
                { label: "Công nghệ chấm", val: "AI Evaluation", icon: <Sparkles size={20} />, color: "text-emerald-500" }
              ].map((info, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[32px] flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                   <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center ${info.color} shadow-inner`}>
                      {info.icon}
                   </div>
                   <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{info.label}</p>
                      <p className="text-base font-black text-slate-800">{info.val}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
};

export default HocLieuHub;
