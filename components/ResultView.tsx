
import React, { useState, useMemo } from 'react';
import { 
  Trophy, Home, ChevronRight, CheckCircle2, XCircle, 
  ChevronDown, ChevronUp, Brain, AlertCircle, Sparkles, 
  Target, Layout, ArrowRight, MessageSquare, Loader2,
  TrendingUp, BookOpen, BarChart3, Activity, FileSearch
} from 'lucide-react';
import { AppView, AIContext, ExamResult } from '../App';
import { OFFICIAL_HOC_LIEU_TEST } from '../data/hocLieuData';
import { FOUNDATION_ENTRY_TEST } from '../data/foundationTestData';

interface ResultViewProps {
  result: ExamResult | null;
  onBackToDashboard: () => void;
  onGoToMistakes: () => void;
  onLogout: () => void;
  onNavigateTo: (view: AppView, context?: AIContext) => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onBackToDashboard, onGoToMistakes, onLogout, onNavigateTo }) => {
  const [showReview, setShowReview] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const testData = useMemo(() => {
    if (!result) return null;
    if (result.isHocLieu) return OFFICIAL_HOC_LIEU_TEST;
    if (result.testTitle?.includes('21 NGÀY')) return FOUNDATION_ENTRY_TEST;
    return OFFICIAL_HOC_LIEU_TEST; 
  }, [result]);

  if (!result || !testData) return null;

  const accuracy = (result.score / result.total) * 100;
  const mistakeCount = result.total - result.score;
  const score10 = result.score * (10 / result.total); 

  const cefr = useMemo(() => {
    if (score10 >= 9) return { level: 'C1', title: 'Advanced', color: 'text-purple-600', bg: 'bg-purple-50', classification: 'Xuất sắc', desc: 'Bạn đã làm chủ được hầu hết các bẫy ngữ pháp và có tư duy đọc hiểu sắc bén. Lộ trình của bạn sẽ tập trung vào tinh chỉnh các sắc thái ngôn ngữ nâng cao.' };
    if (score10 >= 8) return { level: 'B2', title: 'Upper Intermediate', color: 'text-blue-600', bg: 'bg-blue-50', classification: 'Giỏi', desc: 'Nền tảng của bạn rất vững chắc. Chỉ cần cải thiện tốc độ xử lý và độ chính xác ở những phần đọc hiểu dài.' };
    if (score10 >= 7) return { level: 'B1+', title: 'Intermediate Plus', color: 'text-emerald-600', bg: 'bg-emerald-50', classification: 'Khá giỏi', desc: 'Bạn có tư duy ngôn ngữ tốt nhưng vẫn còn một số lỗ hổng ở các chuyên đề ngữ pháp phức tạp.' };
    if (score10 >= 5) return { level: 'B1', title: 'Intermediate', color: 'text-orange-600', bg: 'bg-orange-50', classification: 'Khá', desc: 'Mức độ nhận diện kiến thức khá, nhưng khả năng vận dụng vào các câu hỏi bẫy còn hạn chế.' };
    return { level: 'A2', title: 'Beginner', color: 'text-red-600', bg: 'bg-red-50', classification: 'Mất gốc', desc: 'Bạn cần quay lại xây dựng hệ thống từ vựng cốt lõi và các cấu trúc ngữ pháp căn bản nhất trước khi luyện đề.' };
  }, [score10]);

  // Deep Diagnostic Logic
  const diagnosticData = useMemo(() => {
    const questions = testData.sections.flatMap(s => s.questions);
    const wrongAnswers = Object.entries(result.answers)
      .filter(([id, ans]) => ans !== questions.find(q => q.id === parseInt(id))?.correct)
      .map(([id, ans]) => {
        const q = questions.find(item => item.id === parseInt(id))!;
        return {
          id: q.id,
          stem: (q as any).stem || q.label,
          userAns: ans,
          correctAns: q.correct,
          sectionTitle: testData.sections.find(s => s.questions.some(sq => sq.id === q.id))?.title || ''
        };
      });

    const getCategory = (id: number) => {
      if (id <= 6) return 'Ngữ pháp & Từ vựng căn bản';
      if (id <= 14) return 'Kỹ năng Đọc hiểu chi tiết';
      if (id <= 19) return 'Tư duy Logic & Liên kết câu';
      if (id <= 29) return 'Đọc hiểu suy luận nâng cao';
      return 'Ứng dụng ngôn ngữ & Collocation';
    };

    const getRecommendedLesson = (id: number) => {
      if (id <= 3) return { session: 'Buổi 1-3', topic: 'Danh từ & Mạo từ', advise: 'Xây lại nền tảng về xác định danh từ để tránh sai mạo từ.' };
      if (id <= 14) return { session: 'Buổi 15-18', topic: 'Hệ thống Thì (Tenses)', advise: 'Luyện tập phối hợp thì trong câu phức.' };
      if (id <= 20) return { session: 'Buổi 19-20', topic: 'Mệnh đề quan hệ', advise: 'Phân biệt rõ Who/Which/Whose trong các ngữ cảnh bẫy.' };
      return { session: 'Ebook Reading', topic: 'Critical Reading', advise: 'Sử dụng phương pháp lọc Keyword để tìm thông tin nhanh hơn.' };
    };

    const improvements = wrongAnswers.slice(0, 4).map(w => ({
      ...w,
      recommendation: getRecommendedLesson(w.id)
    }));

    const patternsCount: Record<string, number> = {};
    wrongAnswers.forEach(w => {
      const cat = getCategory(w.id);
      patternsCount[cat] = (patternsCount[cat] || 0) + 1;
    });

    const dominantPattern = Object.entries(patternsCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Kiến thức tổng quát';

    const patterns = [
      {
        title: dominantPattern,
        diagnosis: `Hệ thống nhận thấy bạn sai nhiều nhất ở mảng ${dominantPattern}. Điều này cho thấy bạn đang gặp lỗi tư duy hệ thống (systemic error) chứ không chỉ là lỗi nhầm lẫn nhất thời.`,
        severity: 'High'
      },
      {
        title: 'Tốc độ xử lý câu hỏi',
        diagnosis: result.timeTaken > 2500 ? 'Bạn đang tốn quá nhiều thời gian cho mỗi câu hỏi, dẫn đến áp lực về cuối bài.' : 'Bạn xử lý câu hỏi khá nhanh, nhưng cần cẩn thận hơn để tránh lỗi "sai ngu" do đọc lướt.',
        severity: 'Medium'
      }
    ];

    return { improvements, patterns, dominantPattern, wrongAnswers };
  }, [result, testData]);

  const handleGetRoadmap = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowRoadmap(true);
      setTimeout(() => {
        const element = document.getElementById('personalized-roadmap');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1800);
  };

  const handleStartAITutorIntensive = () => {
    onNavigateTo('ai-tutor', {
      topic: diagnosticData.dominantPattern,
      patternTitle: diagnosticData.dominantPattern,
      diagnosis: diagnosticData.patterns[0].diagnosis,
      mistakes: diagnosticData.wrongAnswers.slice(0, 3).map(w => ({
        id: w.id,
        stem: w.stem,
        userAns: w.userAns,
        correctAns: w.correctAns
      })),
      level: cefr.classification
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-inter pb-40">
      <div className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><BarChart3 size={18} /></div>
             <h2 className="text-lg font-black text-slate-800 tracking-tight">Báo cáo phân tích bài thi</h2>
          </div>
          <button onClick={onBackToDashboard} className="text-slate-400 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 px-4 py-2 rounded-xl transition-all">
            <Home size={16} /> Về Dashboard
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-6 lg:p-12 space-y-12">
        {/* 1. Core Result Header */}
        <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-2xl shadow-slate-200/40 text-center border border-slate-100 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/30 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
           <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                 <div className={`inline-flex items-center gap-2 px-5 py-2 ${cefr.bg} ${cefr.color} rounded-full text-xs font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm`}>
                    <Activity size={14} /> Trình độ: {cefr.classification}
                 </div>
                 <h3 className="text-7xl md:text-8xl font-black text-slate-900 font-poppins tracking-tighter">
                   {score10.toFixed(2)}<span className="text-3xl text-slate-200 font-light ml-2">/10</span>
                 </h3>
                 <p className="text-2xl font-bold text-blue-600 font-poppins italic">{cefr.title} (Level {cefr.level})</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                 {[
                   { label: 'Đúng', val: result.score, color: 'text-emerald-500' },
                   { label: 'Sai/Bỏ qua', val: mistakeCount, color: 'text-red-500' },
                   { label: 'Tỷ lệ', val: `${Math.round(accuracy)}%`, color: 'text-blue-500' },
                   { label: 'Thời gian', val: `${Math.floor(result.timeTaken / 60)}p`, color: 'text-slate-700' }
                 ].map((stat, i) => (
                   <div key={i} className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 shadow-inner group-hover:bg-white transition-colors duration-500">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{stat.label}</p>
                      <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* 2. BIG ACTION BUTTONS - STEP 1 & 2 (NEW ORDER) */}
        <div className="space-y-6">
           {/* Mistake Bank Notification Block (Style from Screenshot 2) */}
           <div className="bg-white border border-[#fff1f1] rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-red-100/30">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-[#fff1f1] rounded-3xl flex items-center justify-center text-red-500 shadow-sm border border-red-50">
                    <Brain size={48} />
                 </div>
                 <div className="text-left space-y-1">
                    <h4 className="text-2xl font-black text-slate-800">Cần xử lý {mistakeCount} lỗi sai</h4>
                    <p className="text-slate-500 text-lg font-medium leading-tight">Lưu vào Ngân hàng lỗi sai để khắc phục hổng kiến thức.</p>
                 </div>
              </div>
              <button 
                onClick={onGoToMistakes} 
                className="w-full md:w-auto py-6 px-14 bg-[#d94436] text-white font-black text-xl rounded-[28px] shadow-2xl shadow-red-200 flex items-center justify-center gap-4 hover:scale-[1.05] active:scale-95 transition-all"
              >
                Ôn tập lỗi sai <ArrowRight size={24} />
              </button>
           </div>

           {/* Big Action Buttons Row */}
           <div className="grid sm:grid-cols-2 gap-6">
              <button 
                onClick={() => setShowReview(!showReview)} 
                className="py-8 bg-white text-slate-600 border border-slate-200 font-black text-2xl rounded-[35px] flex items-center justify-center gap-4 hover:bg-slate-50 transition-all shadow-xl shadow-slate-100/50 group"
              >
                <FileSearch className={`w-8 h-8 transition-transform ${showReview ? 'rotate-180' : ''}`} /> 
                {showReview ? "Ẩn bài giải chi tiết" : "Xem bài giải chi tiết"}
              </button>
              
              <button 
                onClick={onBackToDashboard} 
                className="py-8 bg-[#1e293b] text-white font-black text-2xl rounded-[35px] shadow-2xl shadow-slate-300 flex items-center justify-center gap-4 hover:opacity-95 transition-all"
              >
                <Home className="w-8 h-8" /> Về trang chủ
              </button>
           </div>
        </div>

        {/* 3. STEP 3: PERSONALIZED ROADMAP CALLOUT */}
        <div className="bg-[#e0f2fe] border border-blue-200 rounded-[60px] p-12 md:p-20 text-center space-y-12 shadow-2xl shadow-blue-100/40 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
           <div className="space-y-6 relative z-10">
              <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center text-blue-600 mx-auto shadow-xl shadow-blue-100 mb-6">
                 <Target size={40} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 font-poppins leading-tight">Xây dựng lộ trình <br /> cá nhân hóa 1:1</h3>
              <p className="text-slate-600 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
                 Bước cuối cùng để tối ưu điểm số: Phân tích sâu các lỗi tư duy hệ thống và thiết kế lộ trình học riêng biệt cho bạn.
              </p>
           </div>

           <button 
             onClick={handleGetRoadmap}
             disabled={isGenerating}
             className="w-full max-w-xl mx-auto py-7 bg-blue-600 text-white font-black text-2xl rounded-[35px] shadow-2xl shadow-blue-200 flex items-center justify-center gap-5 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 group"
           >
             {isGenerating ? (
               <><Loader2 className="animate-spin" size={32} /> Đang chẩn đoán chuyên sâu...</>
             ) : (
               <>Nhận lộ trình chẩn đoán ngay <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" /></>
             )}
           </button>
        </div>

        {/* ROADMAP CONTENT AREA */}
        {showRoadmap && (
          <div id="personalized-roadmap" className="space-y-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
             {/* Score & Pattern analysis blocks remain similar but beautifully rendered */}
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shadow-sm"><AlertCircle size={28} /></div>
                   <h4 className="text-3xl font-black text-slate-800 font-poppins">Phân tích lỗi sai hệ thống</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                   {diagnosticData.patterns.map((p, idx) => (
                      <div key={idx} className="bg-white rounded-[45px] p-10 border border-slate-100 shadow-xl shadow-slate-100/50 relative">
                         <div className="absolute top-8 right-8">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${p.severity === 'High' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-orange-50 text-orange-500 border border-orange-100'}`}>
                               Độ ưu tiên: {p.severity}
                            </span>
                         </div>
                         <h5 className="text-2xl font-black text-slate-800 mb-4 font-poppins">{p.title}</h5>
                         <p className="text-slate-500 font-medium leading-[1.8] text-lg italic">
                           "{p.diagnosis}"
                         </p>
                      </div>
                   ))}
                </div>
             </div>

             {/* Strategic Priority Grid */}
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm"><TrendingUp size={28} /></div>
                   <h4 className="text-3xl font-black text-slate-800 font-poppins">Chiến lược cải thiện ưu tiên</h4>
                </div>
                
                <div className="bg-white rounded-[50px] border border-slate-100 shadow-2xl overflow-hidden">
                   <div className="bg-slate-50 px-10 py-6 border-b border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Danh sách bài học đề xuất</span>
                      <span className="text-xs font-bold text-blue-600">Dựa trên 4 lỗi sai trọng tâm nhất</span>
                   </div>
                   <div className="divide-y divide-slate-50">
                      {diagnosticData.improvements.map((item, idx) => (
                         <div key={idx} className="p-10 flex flex-col lg:flex-row gap-8 hover:bg-blue-50/30 transition-all group">
                            <div className="flex items-start gap-6 lg:w-1/3">
                               <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center font-black text-lg shrink-0 border border-red-100">
                                 {item.id}
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.sectionTitle}</p>
                                  <p className="text-slate-800 font-bold leading-tight line-clamp-2">{item.stem}</p>
                               </div>
                            </div>

                            <div className="flex-grow bg-white/50 rounded-3xl p-6 border border-slate-100/50 group-hover:border-blue-200 transition-all">
                               <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600"><BookOpen size={16} /></div>
                                  <h6 className="font-black text-blue-600 text-lg">{item.recommendation.session}: {item.recommendation.topic}</h6>
                               </div>
                               <p className="text-slate-500 font-medium text-sm leading-relaxed mb-4">
                                 {item.recommendation.advise}
                               </p>
                               <button 
                                 onClick={() => onNavigateTo('roadmap')}
                                 className="text-slate-800 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-blue-600 transition-all"
                               >
                                 Mở bài học này <ChevronRight size={14} />
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* AI Tutor Intensive Coaching Mode */}
             <div className="bg-[#00609b] rounded-[60px] p-12 md:p-20 text-white space-y-12 relative overflow-hidden shadow-2xl group/ai">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                   <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-[#00609b] shadow-2xl shrink-0">
                      <MessageSquare size={50} />
                   </div>
                   <div className="space-y-8 flex-grow">
                      <div className="space-y-4">
                         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-400/20 text-blue-100 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-blue-400/30">
                            <Sparkles size={14} /> Academic Advisor
                         </div>
                         <h5 className="text-4xl font-black font-poppins">Coaching tư duy với AI Tutor</h5>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-[40px] p-8 md:p-12 border border-white/10 space-y-8">
                         <p className="text-xl md:text-2xl font-medium leading-[1.8] italic text-blue-50">
                           "Dựa trên phân tích chuyên sâu, mình nhận thấy bạn đang gặp lỗi hệ thống ở mảng <span className="text-white font-black underline underline-offset-8 decoration-blue-400">{diagnosticData.dominantPattern}</span>. Mình đã chuẩn bị một phiên Guided Thinking để giúp bạn xây lại mindset đúng đắn cho các câu {diagnosticData.wrongAnswers.slice(0, 2).map(w => w.id).join(', ')}. Bắt đầu chứ?"
                         </p>
                      </div>

                      <button 
                        onClick={handleStartAITutorIntensive}
                        className="w-full py-7 bg-white text-[#00609b] font-black text-2xl rounded-[32px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
                      >
                         Ôn dạng bài này với AI Tutor <Sparkles size={28} className="text-blue-500 group-hover:rotate-12 transition-transform" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 4. FULL QUESTION REVIEW AREA */}
        {showReview && (
          <div className="space-y-10 animate-in slide-in-from-top duration-700 max-w-4xl mx-auto border-t border-slate-100 pt-16">
             <div className="flex items-center justify-between border-b border-slate-200 pb-8">
                <h4 className="text-3xl font-black text-slate-900 font-poppins">Chi tiết từng câu hỏi</h4>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">Đúng</div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">Sai</div>
                </div>
             </div>

             <div className="space-y-20">
                {testData.sections.map((section) => (
                   <div key={section.id} className="space-y-8">
                      <div className="bg-slate-900 px-6 py-2.5 rounded-xl inline-block shadow-lg">
                         <h5 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">{section.title}</h5>
                      </div>
                      <div className="space-y-12">
                         {section.questions.map((q) => {
                           const userAns = result.answers[q.id];
                           const isCorrect = userAns === q.correct;
                           return (
                             <div key={q.id} className={`bg-white rounded-[45px] p-8 md:p-14 shadow-sm border ${isCorrect ? 'border-emerald-50' : 'border-red-50'} transition-all`}>
                                <div className="space-y-10">
                                   <div className="flex items-start gap-6">
                                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-sm ${isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                         {q.id}
                                      </div>
                                      <div className="space-y-4 flex-grow">
                                        <p className="font-bold text-2xl text-slate-800 leading-relaxed">{(q as any).stem || q.label}</p>
                                      </div>
                                   </div>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {q.options.map(opt => {
                                         const isUserChoice = userAns === opt.key;
                                         const isCorrectChoice = q.correct === opt.key;
                                         let style = "bg-slate-50/50 border-slate-100 text-slate-400";
                                         let icon = null;
                                         if (isCorrectChoice) {
                                           style = "bg-emerald-50 border-emerald-400 text-emerald-700 font-black ring-4 ring-emerald-500/5";
                                           icon = <CheckCircle2 size={24} className="text-emerald-500" />;
                                         } else if (isUserChoice && !isCorrect) {
                                           style = "bg-red-50 border-red-400 text-red-700 font-black ring-4 ring-red-500/5";
                                           icon = <XCircle size={24} className="text-red-500" />;
                                         }
                                         return (
                                           <div key={opt.key} className={`p-6 border rounded-[28px] flex items-center gap-6 transition-all ${style}`}>
                                             <span className="font-black text-2xl w-8">{opt.key}.</span>
                                             <span className="text-lg font-bold flex-grow">{opt.text}</span>
                                             {icon}
                                           </div>
                                         );
                                      })}
                                   </div>
                                   {q.explanation && (
                                     <div className="bg-[#f8fafc] p-10 rounded-[40px] border border-slate-100 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                       <div className="flex items-center gap-2 pb-4 border-b border-slate-200/50">
                                          <Sparkles size={18} className="text-blue-500" fill="currentColor" /><p className="text-[12px] font-black text-blue-500 uppercase tracking-widest">Giải thích tư duy</p>
                                       </div>
                                       <div className="space-y-4">
                                          {q.explanation.split('\n').map((line, i) => {
                                            if (line.includes('✅ Đáp án:')) return <p key={i} className="flex items-center gap-3 text-emerald-600 font-black text-xl"><span>✅</span> {line.replace('✅ ', '')}</p>;
                                            if (line.includes('🔎 Lí do:')) return <p key={i} className="flex items-center gap-3 text-slate-800 font-black text-xl pt-4"><span>🔎</span> {line.replace('🔎 ', '')}</p>;
                                            if (line.includes('✔️')) return <p key={i} className="flex items-start gap-4 text-slate-600 text-lg pl-8 font-medium leading-relaxed"><span>✔️</span> {line.replace('✔️ ', '')}</p>;
                                            if (line.includes('⚠️')) return <p key={i} className="flex items-center gap-4 text-slate-800 font-black text-lg pt-6 border-t border-slate-200/50 mt-6"><span>⚠️</span> {line.replace('⚠️ ', '')}</p>;
                                            if (line.includes('❌')) return <p key={i} className="flex items-start gap-4 text-red-400 text-base pl-8 font-medium italic"><span>❌</span> {line.replace('❌ ', '')}</p>;
                                            return <p key={i} className="text-slate-500 text-lg pl-12 leading-relaxed font-medium">{line}</p>;
                                          })}
                                       </div>
                                     </div>
                                   )}
                                </div>
                             </div>
                           );
                         })}
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}
      </main>

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
      `}</style>
    </div>
  );
};

export default ResultView;
