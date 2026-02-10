
import React from 'react';
import { ArrowRight, Zap, GraduationCap, History, Calendar, Clock, ChevronRight, Trophy } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import { AppView, ExamResult } from '../App';

interface LevelTestSelectionProps {
  onBack: () => void;
  onStartExam: () => void;
  onLogout: () => void;
  onGoToHocLieu: () => void;
  history: ExamResult[];
  onViewResult: (result: ExamResult) => void;
}

const LevelTestSelection: React.FC<LevelTestSelectionProps> = ({ 
  onBack, 
  onStartExam, 
  onLogout, 
  onGoToHocLieu, 
  history,
  onViewResult
}) => {
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col font-inter">
      <DashboardHeader activeView="test-hub" onNavigate={(view: AppView) => {
        if (view === 'dashboard') onBack();
      }} onLogout={onLogout} />

      <main className="flex-grow py-16 px-6 max-w-7xl mx-auto w-full space-y-24">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black text-slate-900 font-poppins tracking-tight">Khu vực Kiểm tra</h2>
          <p className="text-slate-400 font-medium text-xl">Đo lường năng lực và lưu trữ hành trình tiến bộ của bạn</p>
        </div>

        {/* Main Selection Cards */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Card 1: Periodic Test */}
          <div className="bg-white rounded-[50px] border border-slate-100 p-12 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-start text-left relative overflow-hidden ring-1 ring-slate-50">
            <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 mb-10 shadow-sm border border-white">
               <Zap className="w-8 h-8 fill-blue-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Kiểm tra định kỳ</h3>
            <p className="text-slate-500 text-xl leading-relaxed mb-12 font-medium">
              Bài test chẩn đoán 20 câu để xác định lại level CEFR và tinh chỉnh lộ trình học cá nhân hóa.
            </p>
            <div className="flex items-center gap-8 text-sm font-black text-slate-400 mb-12 uppercase tracking-widest">
              <span className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">📚 20 câu hỏi</span>
              <span className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">⏱ ~10 phút</span>
            </div>
            <button 
              onClick={onStartExam} 
              className="px-10 py-5 bg-blue-600 text-white rounded-[22px] font-black text-xl flex items-center gap-3 shadow-xl shadow-blue-200 hover:scale-105 transition-all active:scale-95"
            >
              Bắt đầu bài thi <ArrowRight size={26} />
            </button>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50/40 rounded-full blur-3xl -z-0"></div>
          </div>

          {/* Card 2: THPT QG Mock Exam */}
          <div className="bg-white rounded-[50px] border border-slate-100 p-12 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-start text-left relative overflow-hidden ring-1 ring-slate-50">
             <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center text-purple-600 mb-10 shadow-sm border border-white">
               <GraduationCap className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-3xl font-black text-slate-900">Luyện đề THPT QG</h3>
              <span className="bg-purple-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg shadow-purple-100 animate-pulse">Hot</span>
            </div>
            <p className="text-slate-500 text-xl leading-relaxed mb-12 font-medium">
              Đề thi mô phỏng 100% cấu trúc thực tế của Bộ GD-ĐT với độ khó phân hóa từ cơ bản đến 9+.
            </p>
            <div className="flex items-center gap-8 text-sm font-black text-slate-400 mb-12 uppercase tracking-widest">
              <span className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">📝 40 câu hỏi</span>
              <span className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">⏱ 50 phút</span>
            </div>
            <button 
              onClick={onGoToHocLieu} 
              className="px-10 py-5 bg-purple-600 text-white rounded-[22px] font-black text-xl flex items-center gap-3 shadow-xl shadow-purple-200 hover:scale-105 transition-all active:scale-95"
            >
              Làm đề ngay <ArrowRight size={26} />
            </button>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-50/40 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>

        {/* EXAM HISTORY SECTION (NEW) */}
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
           <div className="flex items-center justify-between border-b border-slate-100 pb-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                    <History size={24} />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black text-slate-800 font-poppins tracking-tight">Lịch sử luyện đề</h4>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Theo dõi sự tiến bộ theo thời gian</p>
                 </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                 <Trophy size={18} />
                 <span className="text-sm font-black uppercase tracking-widest">Highest Score: {history.length > 0 ? Math.max(...history.map(h => h.score * (10 / h.total))).toFixed(1) : 0}/10</span>
              </div>
           </div>

           {history.length > 0 ? (
             <div className="grid gap-4">
                {history.map((record) => {
                   const finalScore = record.score * (10 / record.total);
                   return (
                      <button 
                        key={record.id}
                        onClick={() => onViewResult(record)}
                        className="bg-white p-6 md:p-8 rounded-[35px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col md:flex-row items-center justify-between gap-8 text-left"
                      >
                         <div className="flex items-center gap-8 flex-grow">
                            <div className={`w-16 h-16 rounded-[22px] flex flex-col items-center justify-center shadow-inner ${finalScore >= 8 ? 'bg-emerald-50 text-emerald-600' : finalScore >= 5 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-500'}`}>
                               <span className="text-2xl font-black">{finalScore.toFixed(1)}</span>
                               <span className="text-[10px] font-black uppercase">Điểm</span>
                            </div>
                            <div className="space-y-1">
                               <h5 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{record.testTitle || 'Bài kiểm tra định kỳ'}</h5>
                               <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold text-sm">
                                  <span className="flex items-center gap-2"><Calendar size={14} /> {formatDate(record.createdAt)}</span>
                                  <span className="flex items-center gap-2"><Clock size={14} /> {Math.floor(record.timeTaken / 60)} phút</span>
                                  <span className="flex items-center gap-2">✅ {record.score}/{record.total} Câu đúng</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-xs px-6 py-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                            Xem phân tích <ChevronRight size={18} />
                         </div>
                      </button>
                   );
                })}
             </div>
           ) : (
             <div className="py-24 bg-white rounded-[50px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                   <History size={40} />
                </div>
                <div className="space-y-2">
                   <p className="text-xl font-black text-slate-400">Bạn chưa làm bài kiểm tra nào.</p>
                   <p className="text-slate-300 font-medium">Kết quả luyện tập sẽ được lưu giữ tại đây để bạn tiện theo dõi.</p>
                </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default LevelTestSelection;
