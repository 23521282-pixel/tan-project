
import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronLeft, Clock, Send, Lamp } from 'lucide-react';
import { ExamResult } from '../App';

interface Question {
  id: number;
  label: string;
  options: { key: string; text: string }[];
  correct: string;
}

interface ExamData {
  id: string;
  title: string;
  passage: string;
  instruction: string;
  questions: Question[];
}

const SAMPLE_EXAM: ExamData = {
  id: 'thpt-2025-01',
  title: 'Đề Thi THPT Quốc Gia 2025 - Tiếng Anh',
  instruction: 'Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks from 1 to 6.',
  passage: "Taking place from July 25th to 29th at the International Centre for Exhibition in Hanoi, the Vietnam International Art Exhibition 2025 will showcase over 100 famous galleries (1) ______ are derived from global art capitals alongside Vietnam's (2) ______ art institutions. Visitors will gain exposure to a wide (3) ______ of oil paintings, sculptures, digital art, and mixed media, blending traditional and contemporary styles. The event will also feature live art demonstrations and insightful discussions (4) ______ by famous artists and curators, offering a deeper understanding of modern artistic trends. This exhibition is a unique opportunity for (5) ______, investors, and art enthusiasts to discover emerging talents and (6) ______ some artworks. Don't miss this incredible celebration of artistic expression!",
  questions: [
    {
      id: 1,
      label: 'Câu 1',
      correct: 'D',
      options: [
        { key: 'A', text: 'whose' },
        { key: 'B', text: 'whom' },
        { key: 'C', text: 'who' },
        { key: 'D', text: 'which' }
      ]
    },
    {
      id: 2,
      label: 'Câu 2',
      correct: 'B',
      options: [
        { key: 'A', text: 'flying' },
        { key: 'B', text: 'leading' },
        { key: 'C', text: 'heading' },
        { key: 'D', text: 'rating' }
      ]
    }
    // ... more questions can be added here
  ]
};

interface ExamInterfaceProps {
  onBack: () => void;
  onLogout: () => void;
  // Fix: Use Omit to match handleExamFinish in App.tsx which handles generating id and createdAt
  onFinish: (result: Omit<ExamResult, 'id' | 'createdAt'>) => void;
}

const ExamInterface: React.FC<ExamInterfaceProps> = ({ onBack, onLogout, onFinish }) => {
  const [secondsLeft, setSecondsLeft] = useState(3000); // 50 minutes
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const handleSubmit = useCallback(() => {
    let score = 0;
    SAMPLE_EXAM.questions.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    });
    
    onFinish({
      score,
      total: SAMPLE_EXAM.questions.length,
      answers,
      timeTaken: 3000 - secondsLeft
    });
  }, [answers, secondsLeft, onFinish]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelect = (qId: number, key: string) => {
    setAnswers(prev => ({ ...prev, [qId]: key }));
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-slate-100/30 flex flex-col font-inter">
      {/* Product Navbar */}
      <header className="bg-white border-b border-slate-100 px-4 py-2.5 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
               <div className="bg-blue-600 p-1 rounded-lg">
                 <Lamp className="text-white w-4 h-4" />
               </div>
              <span className="text-lg font-bold font-poppins text-[#00609b]">ENGMIND</span>
            </div>
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-3 h-3" />
              <input type="text" placeholder="Tìm khóa học, bài học, chủ đề..." className="bg-slate-50 border border-slate-100 rounded-full py-2 pl-9 pr-6 text-xs w-64 focus:ring-1 focus:ring-blue-500/10 outline-none" />
            </div>
          </div>
          <nav className="hidden xl:flex items-center gap-6 text-slate-500 text-xs font-medium">
            <span className="cursor-pointer">Tổng quan</span>
            <span className="cursor-pointer">Lộ trình</span>
            <span className="cursor-pointer">Bài học</span>
            <span className="cursor-pointer">Bản Tin</span>
            <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-bold cursor-pointer">Test trình độ</span>
            <span className="cursor-pointer">Lỗi sai</span>
            <span className="px-4 py-1.5 border border-slate-200 rounded-lg cursor-pointer">AI Tutor</span>
            <span className="cursor-pointer">Flashcards</span>
          </nav>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-slate-400">XP <span className="text-blue-600">450</span></span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#00609b]">D</div>
          </div>
        </div>
      </header>

      {/* Exam Status Bar */}
      <div className="bg-[#f8fafc] px-6 py-4 border-b border-slate-200 sticky top-[56px] z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-4">
             <span className="text-slate-500 font-bold text-sm truncate max-w-[200px] md:max-w-none">{SAMPLE_EXAM.title}</span>
             <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 whitespace-nowrap">
               {answeredCount}/{SAMPLE_EXAM.questions.length} câu đã trả lời
             </span>
           </div>
           <div className="flex items-center gap-4">
             <div className="bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Clock size={16} /> {formatTime(secondsLeft)}
             </div>
             <button onClick={handleSubmit} className="px-6 py-2 bg-[#00609b] text-white font-bold rounded-xl text-sm shadow-md hover:bg-[#004d7c] transition-colors">Nộp bài</button>
           </div>
        </div>
      </div>

      <main className="flex-grow p-4 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="bg-white rounded-[32px] border border-slate-200/50 p-6 md:p-14 shadow-xl shadow-slate-200/10">
            <p className="text-slate-800 italic text-base md:text-lg leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-4">
              {SAMPLE_EXAM.instruction}
            </p>

            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              ✍️ Vietnam International Art Exhibition 2025
            </h2>

            <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100 text-slate-600 text-base md:text-lg leading-[1.8] mb-12 select-none">
               {SAMPLE_EXAM.passage}
            </div>

            <div className="space-y-16">
              {SAMPLE_EXAM.questions.map((q, idx) => (
                <div key={q.id} className="space-y-6">
                  <h3 className="text-[#00609b] font-extrabold text-lg flex items-center gap-2">
                    <span className="bg-blue-50 px-3 py-1 rounded-lg">{q.label}:</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.options.map((choice) => (
                      <button 
                        key={choice.key} 
                        onClick={() => handleSelect(q.id, choice.key)}
                        className={`flex items-center gap-6 p-5 border rounded-2xl transition-all text-left ${
                          answers[q.id] === choice.key 
                          ? 'bg-blue-50 border-blue-400 shadow-sm' 
                          : 'bg-white border-slate-100 hover:border-blue-200'
                        }`}
                      >
                        <span className={`font-black text-lg w-6 ${answers[q.id] === choice.key ? 'text-blue-600' : 'text-slate-400'}`}>
                          {choice.key}.
                        </span>
                        <span className={`font-bold text-lg ${answers[q.id] === choice.key ? 'text-blue-900' : 'text-slate-600'}`}>
                          {choice.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-10 text-center text-slate-400 text-sm font-medium">
             --- Hết đề thi ---
          </div>
        </div>
      </main>

      {/* Sticky Action Footer */}
      <div className="bg-white/90 backdrop-blur-md border-t border-slate-200 p-6 flex justify-center sticky bottom-0 z-50">
        <div className="max-w-5xl w-full flex justify-between items-center gap-4">
           <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 flex items-center gap-2 transition-colors">
             <ChevronLeft size={18} /> Quay lại
           </button>
           <button onClick={handleSubmit} className="px-12 py-3 bg-[#00609b] text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:opacity-90 transition-all flex items-center gap-2">
             Nộp bài thi <Send size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;
