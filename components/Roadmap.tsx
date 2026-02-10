
import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Library,
  Layers,
  Zap
} from 'lucide-react';
import { AppView } from '../App';
import DashboardHeader from './DashboardHeader';

interface RoadmapProps {
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ onLogout, onNavigate }) => {
  const [expandedVocab, setExpandedVocab] = useState<string | null>(null);
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null);

  const vocabTopics = [
    { 
      id: 'food', 
      title: 'Food & Drink', 
      levels: [
        { level: 'B1', items: ['Món ăn thường ngày', 'Đồ uống phổ biến'] },
        { level: 'B2', items: ['Ẩm thực quốc tế'] }
      ]
    },
    { id: 'travel', title: 'Travel & Tourism', levels: [{ level: 'B1', items: ['Phương tiện đi lại'] }] },
    { id: 'edu', title: 'Education', levels: [{ level: 'B1-B2', items: ['Trường học & Học tập'] }] },
    { id: 'tech', title: 'Technology & AI', levels: [{ level: 'B2-C1', items: ['Thế giới số'] }] },
    { id: 'env', title: 'Environment & Climate Change', levels: [{ level: 'B1-B2', items: ['Bảo vệ hành tinh'] }] },
    { id: 'health', title: 'Health', levels: [{ level: 'B1', items: ['Sức khỏe & Lối sống'] }] },
    { id: 'social', title: 'Social Issues', levels: [{ level: 'C1', items: ['Các vấn đề xã hội'] }] },
    { id: 'culture', title: 'Culture & Traditions', levels: [{ level: 'B2', items: ['Văn hóa thế giới'] }] },
  ];

  const grammarTopics = [
    { id: 'reported', title: 'Câu gián tiếp (Reported Speech)', desc: 'Tường thuật câu nói, câu hỏi, mệnh lệnh' },
    { id: 'relative', title: 'Mệnh đề quan hệ (Relative Clauses)', desc: 'Who, whom, which, that, whose; rút gọn mệnh đề' },
    { id: 'compare', title: 'So sánh (Comparisons)', desc: 'So sánh hơn, nhất, bằng; so sánh kép' },
    { id: 'modals', title: 'Động từ khuyết thiếu (Modal Verbs)', desc: 'can, could, may, must... (suy đoán & nghĩa vụ)' },
    { id: 'gerund', title: 'Danh động từ & Động từ nguyên mẫu', desc: 'V-ing / to V / bare V; các cấu trúc bẫy' },
    { id: 'subject-verb', title: 'Sự hòa hợp chủ ngữ – động từ', desc: 'Chủ ngữ đặc biệt, tập hợp, either...or' },
  ];

  const courses = [
    { id: '21day', title: 'Khóa 21 ngày xây nền Tiếng Anh', desc: 'Nền tảng vững chắc với từ vựng cốt lõi và ngữ pháp cơ bản.' },
    { id: 'integrated', title: 'Khóa tích hợp từ vựng – ngữ pháp – đọc hiểu', desc: 'Học tích hợp giúp nắm vững kiến thức tự nhiên.' },
    { id: 'exam-prep', title: 'Khóa thực chiến, luyện đề sớm', desc: 'Làm quen áp lực phòng thi và các dạng đề thực tế.' },
    { id: 'anti-error', title: 'Khóa trọng tâm trúng tủ & chống sai ngu', desc: 'Khắc phục lỗi sai thường gặp để tối đa hóa điểm số.' },
    { id: 'advanced', title: 'Khóa bổ trợ nâng cao (9+)', desc: 'Dành cho mục tiêu điểm 9+ với tư duy band cao.' },
    { id: 'lifetime', title: 'Khóa luyện thi toàn diện học đến khi thi', desc: 'Lộ trình dài hạn cam kết đầu ra, hỗ trợ 24/7.' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col font-inter">
      <DashboardHeader activeView="roadmap" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="flex-grow p-6 lg:p-16 max-w-[1500px] mx-auto w-full space-y-12 pb-32">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
             <Layers size={14} /> Hệ thống lộ trình
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 font-poppins">Lộ trình học tập</h1>
          <p className="text-slate-500 text-lg font-medium">
            Khám phá hành trình học tiếng Anh với 3 trụ cột: <span className="text-blue-600">Từ vựng</span>, <span className="text-emerald-600">Ngữ pháp</span> và <span className="text-purple-600">Khóa học toàn diện</span>
          </p>
        </div>

        {/* 3 Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Vocabulary */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 space-y-8 flex flex-col min-h-[800px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                <Library size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 font-poppins">Từ vựng</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chủ đề & Cấp độ</p>
              </div>
            </div>

            <div className="space-y-4">
              {vocabTopics.map((topic) => (
                <div key={topic.id} className="border border-slate-50 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setExpandedVocab(expandedVocab === topic.id ? null : topic.id)}
                    className={`w-full flex items-center justify-between p-5 text-left transition-all ${expandedVocab === topic.id ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                  >
                    <span className="font-bold">{topic.title}</span>
                    {expandedVocab === topic.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {expandedVocab === topic.id && (
                    <div className="p-4 bg-white space-y-6 animate-in slide-in-from-top-2 duration-300">
                      {topic.levels.map((lvl, idx) => (
                        <div key={idx} className="space-y-3">
                          <div className="flex items-center gap-2">
                             <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase">{lvl.level}</span>
                             <div className="h-px bg-blue-100 flex-grow"></div>
                          </div>
                          <div className="grid gap-2">
                            {lvl.items.map((item, i) => (
                              <button 
                                key={i}
                                onClick={() => onNavigate('flashcards')}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-all text-sm font-semibold group"
                              >
                                {item}
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Grammar */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 space-y-8 flex flex-col min-h-[800px]">
             <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                <Bookmark size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 font-poppins">Ngữ pháp</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chuyên đề trọng tâm</p>
              </div>
            </div>

            <div className="space-y-4">
              {grammarTopics.map((topic) => (
                <div key={topic.id} className="border border-slate-50 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setExpandedGrammar(expandedGrammar === topic.id ? null : topic.id)}
                    className={`w-full p-5 text-left transition-all ${expandedGrammar === topic.id ? 'bg-emerald-50' : 'bg-white hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-bold ${expandedGrammar === topic.id ? 'text-emerald-700' : 'text-slate-700'}`}>{topic.title}</span>
                      {expandedGrammar === topic.id ? <ChevronUp size={20} className="text-emerald-500" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </div>
                    <p className={`text-xs font-medium ${expandedGrammar === topic.id ? 'text-emerald-600/70' : 'text-slate-400'}`}>{topic.desc}</p>
                  </button>
                  
                  {expandedGrammar === topic.id && (
                    <div className="p-5 bg-white space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        Bạn sẽ được học qua các video bài giảng chi tiết, bài tập vận dụng thực tế và AI Tutor giải đáp thắc mắc ngay lập tức.
                      </p>
                      <button className="w-full py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
                        Bắt đầu bài học <Sparkles size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Courses */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 space-y-8 flex flex-col min-h-[800px]">
             <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm">
                <GraduationCap size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 font-poppins">Khóa học</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hành trình toàn diện</p>
              </div>
            </div>

            <div className="space-y-4">
              {courses.map((course, idx) => (
                <div 
                  key={idx} 
                  onClick={() => course.id === '21day' ? onNavigate('course-detail') : null}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-purple-200 hover:bg-white hover:shadow-xl hover:shadow-purple-100 transition-all group cursor-pointer"
                >
                  <h3 className="text-lg font-black text-slate-800 mb-2 group-hover:text-purple-600 transition-colors leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {course.desc}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-8 border-t border-slate-50">
              <div className="bg-purple-600 rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-purple-200">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                  <Zap size={16} className="fill-white" /> Ưu đãi giới hạn
                </div>
                <p className="text-sm font-bold opacity-90 leading-relaxed">Giảm ngay 20% khi đăng ký lộ trình Toàn diện trong tháng này!</p>
                <button className="w-full py-3 bg-white text-purple-600 font-black rounded-xl hover:bg-purple-50 transition-colors">
                  Tư vấn lộ trình
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer info section */}
        <div className="bg-blue-600 rounded-[50px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 text-white shadow-2xl shadow-blue-200">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[32px] flex items-center justify-center shrink-0">
             <CheckCircle2 size={56} />
          </div>
          <div className="space-y-4 text-center md:text-left flex-grow">
            <h3 className="text-3xl font-black font-poppins">Lộ trình được cá nhân hóa 100%</h3>
            <p className="text-blue-50 text-lg font-medium opacity-80 max-w-2xl">
              Dựa vào kết quả bài Test trình độ, ENGMIND sẽ tự động đánh dấu các chuyên đề bạn còn yếu trên lộ trình này để ưu tiên ôn luyện.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('test-hub')}
            className="px-10 py-5 bg-white text-blue-600 font-black text-xl rounded-3xl hover:bg-blue-50 active:scale-95 transition-all shadow-xl whitespace-nowrap"
          >
            Làm Test ngay
          </button>
        </div>

      </main>
    </div>
  );
};

export default Roadmap;
