
import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, RotateCcw, Search as SearchIcon, 
  AlertCircle, Calendar, ArrowRight, Sparkles, Brain,
  XCircle, Check, X, Bookmark, Layout
} from 'lucide-react';
import { AppView } from '../App';
import DashboardHeader from './DashboardHeader';
import { mistakeStore, MistakeRecord } from '../data/mistakeStore';

interface MistakeBankProps {
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
}

const MistakeBank: React.FC<MistakeBankProps> = ({ onLogout, onNavigate }) => {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [showReviewedOnly, setShowReviewedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const refreshData = () => {
    setMistakes(mistakeStore.getMistakes());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const summary = useMemo(() => {
    const unreviewed = mistakes.filter(m => m.status === 'unreviewed').length;
    const reviewed = mistakes.filter(m => m.status === 'reviewed').length;
    return { unreviewed, reviewed, total: mistakes.length };
  }, [mistakes]);

  const topics = useMemo(() => {
    const all = mistakes.map(m => m.topic);
    return ['all', ...Array.from(new Set(all))];
  }, [mistakes]);

  const filteredList = useMemo(() => {
    return mistakes
      .filter(m => showReviewedOnly ? m.status === 'reviewed' : m.status === 'unreviewed')
      .filter(m => filterTopic === 'all' ? true : m.topic === filterTopic)
      .filter(m => m.stem.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [mistakes, filterTopic, showReviewedOnly, searchQuery]);

  const handleToggleStatus = (id: string) => {
    mistakeStore.toggleStatus(id);
    refreshData();
  };

  const handleStudySource = (topic: string) => {
    // Điều hướng sang lộ trình và giả định scroll đến bài tương ứng
    onNavigate('roadmap');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-inter">
      <DashboardHeader activeView="mistake-bank" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-grow p-4 lg:p-10 max-w-6xl mx-auto w-full space-y-8 pb-32">
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[11px] font-black uppercase tracking-wider border border-red-100 shadow-sm">
               <Brain size={14} /> Hệ thống chống sai ngu
            </div>
            <h1 className="text-4xl font-black text-slate-900 font-poppins tracking-tight">Ngân hàng Lỗi sai</h1>
            <p className="text-slate-500 font-medium">Học từ chính những sai lầm để không bao giờ lặp lại.</p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-white border border-slate-100 px-6 py-4 rounded-[24px] shadow-sm text-center min-w-[100px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Chưa ôn</p>
                <p className="text-2xl font-black text-red-500">{summary.unreviewed}</p>
             </div>
             <div className="bg-white border border-slate-100 px-6 py-4 rounded-[24px] shadow-sm text-center min-w-[100px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Đã ôn</p>
                <p className="text-2xl font-black text-emerald-500">{summary.reviewed}</p>
             </div>
             <div className="bg-white border border-slate-100 px-6 py-4 rounded-[24px] shadow-sm text-center min-w-[100px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng</p>
                <p className="text-2xl font-black text-slate-800">{summary.total}</p>
             </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex flex-wrap items-center gap-5">
           <div className="relative flex-grow min-w-[240px]">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm nội dung câu hỏi đã sai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500/10 outline-none font-medium text-sm transition-all"
              />
           </div>

           <div className="flex items-center gap-4">
              <select 
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="bg-slate-50 border-none rounded-2xl px-6 py-3.5 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-blue-500/10 outline-none cursor-pointer appearance-none"
              >
                {topics.map(t => (
                  <option key={t} value={t}>{t === 'all' ? 'Tất cả chủ đề' : t}</option>
                ))}
              </select>

              <button 
                onClick={() => setShowReviewedOnly(!showReviewedOnly)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  showReviewedOnly 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Bookmark size={18} fill={showReviewedOnly ? "white" : "none"} />
                Hiện câu đã ôn
              </button>
           </div>
        </div>

        {/* Question List */}
        <div className="space-y-10">
           {filteredList.length > 0 ? (
             filteredList.map((m) => (
               <div key={m.id} className={`bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden transition-all duration-500 relative group ${m.status === 'reviewed' ? 'opacity-70 grayscale-[0.2]' : 'hover:shadow-xl hover:shadow-slate-200/50'}`}>
                  {/* Status Ribbon for Reviewed Mode */}
                  {m.status === 'reviewed' && (
                    <div className="absolute top-0 right-0 px-6 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-3xl shadow-sm z-10 flex items-center gap-2">
                       <CheckCircle2 size={14} /> ĐÃ ÔN TẬP
                    </div>
                  )}

                  <div className="p-8 md:p-12 space-y-8">
                     {/* Topic & Meta */}
                     <div className="flex justify-between items-center">
                        <div className="flex gap-2.5 flex-wrap">
                           <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest border border-blue-100">{m.topic}</span>
                           <span className="bg-slate-100 text-slate-400 text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest">{m.source}</span>
                           <span className="text-slate-300 text-[10px] font-bold flex items-center gap-1.5 ml-2"><Calendar size={12} /> {new Date(m.createdAt).toLocaleDateString()}</span>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="space-y-5">
                        <h2 className="text-2xl font-bold text-slate-800 leading-relaxed font-poppins">
                           {m.stem}
                        </h2>
                        {m.passage && (
                           <div className="p-6 bg-slate-50/80 rounded-[24px] border border-slate-100 text-slate-600 text-sm italic leading-relaxed border-l-4 border-blue-400">
                              {m.passage}
                           </div>
                        )}
                     </div>

                     {/* Options Display - Mandatory 4 Options */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {m.options.map(opt => {
                           const isUserAns = m.userAnswer === opt.key;
                           const isCorrect = m.correctAnswer === opt.key;
                           
                           let style = "bg-white border-slate-100 text-slate-400";
                           let icon = null;
                           
                           if (isCorrect) {
                             style = "bg-emerald-50 border-emerald-300 text-emerald-700 font-bold ring-4 ring-emerald-500/5 shadow-sm";
                             icon = <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />;
                           } else if (isUserAns) {
                             style = "bg-red-50 border-red-300 text-red-700 font-bold ring-4 ring-red-500/5 shadow-sm";
                             icon = <XCircle size={20} className="text-red-500 shrink-0" />;
                           }

                           return (
                             <div key={opt.key} className={`p-5 border rounded-2xl flex items-center gap-4 transition-all ${style}`}>
                                <span className="font-black text-lg w-6">{opt.key}.</span>
                                <span className="text-base flex-grow">{opt.text}</span>
                                {icon}
                             </div>
                           );
                        })}
                     </div>

                     {/* WRONG SELECTION SUMMARY BOX (Matching Screenshot 1) */}
                     {m.userAnswer && (
                       <div className="bg-[#fff1f1] border border-[#ffe4e4] rounded-[28px] p-6 flex items-center gap-5 shadow-sm animate-in fade-in slide-in-from-left-2">
                          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-500 border border-red-50 shrink-0">
                             <X size={28} strokeWidth={3} />
                          </div>
                          <div className="space-y-0.5">
                             <p className="text-[#ff7e7e] text-[11px] font-black uppercase tracking-[0.15em] leading-none mb-1">Bạn đã chọn:</p>
                             <p className="text-slate-800 font-black text-xl leading-none">
                                {m.userAnswer}. {m.options.find(o => o.key === m.userAnswer)?.text}
                             </p>
                          </div>
                       </div>
                     )}

                     {/* Explanation Section */}
                     {m.explanation && (
                        <div className="bg-[#f0f9ff]/50 p-8 rounded-[36px] border border-blue-100 space-y-5">
                           <div className="flex items-center gap-2 pb-3 border-b border-blue-100/50">
                              <Sparkles size={16} className="text-blue-500" fill="currentColor" />
                              <p className="text-[11px] font-black text-blue-500 uppercase tracking-[0.25em]">Giải thích chi tiết</p>
                           </div>
                           <div className="space-y-4">
                              {m.explanation.split('\n').map((line, i) => {
                                if (line.includes('✅')) return <p key={i} className="flex items-center gap-3 text-emerald-600 font-black text-base"><span>✅</span> {line.replace('✅ ', '')}</p>;
                                if (line.includes('🔎')) return <p key={i} className="flex items-center gap-3 text-slate-800 font-black text-base pt-3 border-t border-slate-100/50"><span>🔎</span> {line.replace('🔎 ', '')}</p>;
                                if (line.includes('✔️')) return <p key={i} className="flex items-start gap-3 text-slate-600 text-sm pl-8 font-medium leading-relaxed"><span>✔️</span> {line.replace('✔️ ', '')}</p>;
                                if (line.includes('⚠️')) return <p key={i} className="flex items-center gap-3 text-slate-800 font-black text-sm pt-4 border-t border-slate-100/50"><span>⚠️</span> {line.replace('⚠️ ', '')}</p>;
                                if (line.includes('❌')) return <p key={i} className="flex items-start gap-3 text-red-400 text-xs pl-8 font-medium italic"><span>❌</span> {line.replace('❌ ', '')}</p>;
                                return <p key={i} className="text-slate-500 text-sm pl-12 leading-relaxed font-medium">{line}</p>;
                              })}
                           </div>
                        </div>
                     )}

                     {/* Footer Actions */}
                     <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3 text-slate-400">
                           <Layout size={16} />
                           <p className="text-xs font-bold uppercase tracking-widest">
                              {m.userAnswer ? `Lỗi sai: ${m.userAnswer} ↔ ${m.correctAnswer}` : 'Bạn đã bỏ trống câu này'}
                           </p>
                        </div>
                        <div className="flex gap-4 w-full sm:w-auto">
                           <button 
                             onClick={() => handleStudySource(m.topic)}
                             className="flex-1 sm:flex-none px-8 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black text-sm hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group/btn"
                           >
                              Ôn lại bài <RotateCcw size={16} className="group-hover/btn:rotate-[-45deg] transition-transform" />
                           </button>
                           
                           <button 
                             onClick={() => handleToggleStatus(m.id)}
                             className={`flex-1 sm:flex-none px-10 py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-3 ${
                               m.status === 'unreviewed' 
                               ? 'bg-[#00609b] text-white shadow-blue-200 hover:opacity-95' 
                               : 'bg-emerald-500 text-white shadow-emerald-200 hover:opacity-95'
                             }`}
                           >
                             {m.status === 'unreviewed' ? (
                               <>Đã ôn <Check size={18} strokeWidth={3} /></>
                             ) : (
                               <>Chưa ôn <RotateCcw size={18} /></>
                             )}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
             ))
           ) : (
             <div className="py-24 text-center space-y-8 bg-white rounded-[60px] border border-slate-100 shadow-sm animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-200">
                   <AlertCircle size={48} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black text-slate-800">Mọi thứ đều ổn!</h3>
                   <p className="text-slate-400 font-medium max-w-xs mx-auto">
                      {showReviewedOnly 
                        ? 'Bạn chưa đánh dấu hoàn thành ôn tập câu nào.' 
                        : 'Không có lỗi sai nào cần xử lý lúc này. Hãy tiếp tục duy trì phong độ nhé!'}
                   </p>
                </div>
                <button 
                  onClick={() => onNavigate('test-hub')}
                  className="px-12 py-4.5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:scale-105 transition-all inline-flex items-center gap-3 text-lg"
                >
                   Luyện đề nâng trình <ArrowRight size={22} />
                </button>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default MistakeBank;
