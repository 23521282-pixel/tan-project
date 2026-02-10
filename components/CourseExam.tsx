
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, Clock, Send, Lamp, List, CheckCircle } from 'lucide-react';
import { ExamResult } from '../App';
import { FOUNDATION_ENTRY_TEST, Question } from '../data/foundationTestData';
import { mistakeStore } from '../data/mistakeStore';

interface CourseExamProps {
  onBack: () => void;
  onLogout: () => void;
  // Fix: Use Omit to match handleExamFinish in App.tsx which handles generating id and createdAt
  onFinish: (result: Omit<ExamResult, 'id' | 'createdAt'>) => void;
}

const CourseExam: React.FC<CourseExamProps> = ({ onBack, onLogout, onFinish }) => {
  const testData = FOUNDATION_ENTRY_TEST;
  const [secondsLeft, setSecondsLeft] = useState(testData.estimatedTime * 60);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);

  const allQuestions = useMemo(() => {
    return testData.sections.flatMap(s => s.questions);
  }, [testData]);

  const handleSubmit = useCallback(() => {
    let score = 0;
    const mistakesToSave: any[] = [];

    allQuestions.forEach(q => {
      const userAns = answers[q.id];
      if (userAns === q.correct) {
        score++;
      } else {
        // Find parent section title for topic fallback if topic is missing in question
        const section = testData.sections.find(s => s.questions.some(sq => sq.id === q.id));
        mistakesToSave.push({
          questionId: q.id,
          stem: q.stem,
          passage: section?.passage,
          options: q.options,
          correctAnswer: q.correct,
          userAnswer: userAns || null,
          explanation: q.explanation,
          topic: section?.title || 'Chung',
          source: testData.title
        });
      }
    });
    
    // Auto-save to Mistake Bank
    if (mistakesToSave.length > 0) {
      mistakeStore.saveMistakes(mistakesToSave);
    }

    onFinish({
      score,
      total: testData.totalQuestions,
      answers,
      timeTaken: (testData.estimatedTime * 60) - secondsLeft,
      testTitle: testData.title
    });
  }, [answers, secondsLeft, testData, allQuestions, onFinish]);

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

  const scrollToQuestion = (id: number) => {
    setActiveQuestionId(id);
    const element = document.getElementById(`question-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-inter">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-100 px-4 py-2.5 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
               <div className="bg-blue-600 p-1 rounded-lg">
                 <Lamp className="text-white w-4 h-4" />
               </div>
              <span className="text-lg font-bold font-poppins text-[#00609b]">ENGMIND</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-blue-50 border border-blue-100 rounded-full px-4 py-2 flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Clock size={16} /> {formatTime(secondsLeft)}
             </div>
             <button onClick={handleSubmit} className="px-6 py-2 bg-[#00609b] text-white font-bold rounded-xl text-sm shadow-md hover:opacity-90 transition-all">Nộp bài</button>
          </div>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-100 p-6 overflow-y-auto">
           <div className="flex items-center gap-2 mb-8 text-slate-800 font-bold uppercase tracking-widest text-xs">
              <List size={16} /> DANH SÁCH 40 CÂU HỎI
           </div>
           
           <div className="space-y-8">
             {testData.sections.map((section) => (
               <div key={section.id} className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{section.title}</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {section.questions.map((q) => (
                      <button 
                        key={q.id}
                        onClick={() => scrollToQuestion(q.id)}
                        className={`w-10 h-10 rounded-xl font-bold text-xs border transition-all ${
                          activeQuestionId === q.id 
                          ? 'bg-[#00609b] text-white border-[#00609b] shadow-md shadow-blue-100' 
                          : answers[q.id] 
                            ? 'bg-blue-50 text-blue-600 border-blue-200' 
                            : 'bg-white text-slate-400 border-slate-100'
                        }`}
                      >
                        {q.id}
                      </button>
                    ))}
                  </div>
               </div>
             ))}
           </div>
        </aside>

        {/* Exam Body */}
        <main className="flex-grow flex flex-col overflow-y-auto bg-slate-50/50 scroll-smooth">
           <div className="p-4 lg:p-12 max-w-5xl mx-auto w-full space-y-16 pb-32">
              <div className="text-center mb-16">
                 <h1 className="text-3xl font-black text-slate-900 mb-2">{testData.title}</h1>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Đề thi đánh giá năng lực đầu vào - Tuần 0</p>
              </div>

              {testData.sections.map((section) => (
                <div key={section.id} className="bg-white rounded-[32px] border border-slate-100 p-8 md:p-12 shadow-sm space-y-10">
                   <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">
                         {section.id}
                      </div>
                      <h2 className="text-xl font-black text-slate-800">{section.title}</h2>
                   </div>

                   <p className="text-slate-500 italic font-medium leading-relaxed border-l-4 border-blue-500 pl-6">
                      {section.instruction}
                   </p>

                   {section.passage && (
                      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed italic whitespace-pre-wrap">
                        {section.passage}
                      </div>
                   )}
                   
                   <div className="space-y-16">
                      {section.questions.map((q) => (
                        <div key={q.id} id={`question-${q.id}`} className={`space-y-6 scroll-mt-40 transition-all duration-500 ${activeQuestionId === q.id ? 'ring-2 ring-blue-500/10 rounded-2xl p-6 bg-blue-50/30' : ''}`}>
                           <div className="space-y-4">
                              <h3 className="text-[#00609b] font-black text-xl flex items-center gap-3">
                                <span className="bg-white px-3 py-1 rounded-lg border border-blue-100">{q.label}:</span>
                                {answers[q.id] && <CheckCircle className="text-emerald-500" size={20} />}
                              </h3>
                              <p className="text-slate-800 font-bold text-lg pl-2 leading-relaxed">
                                {q.stem}
                              </p>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {q.options.map((choice) => (
                                <button 
                                  key={choice.key} 
                                  onClick={() => handleSelect(q.id, choice.key)}
                                  className={`flex items-center gap-6 p-5 border rounded-2xl transition-all text-left ${
                                    answers[q.id] === choice.key 
                                    ? 'bg-white border-blue-500 shadow-lg shadow-blue-100' 
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
              ))}
              
              <div className="pb-10 text-center">
                 <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-200/50 rounded-full text-slate-400 font-bold text-sm">
                    🏁 BẠN ĐÃ ĐI ĐẾN CUỐI ĐỀ THI
                 </div>
              </div>
           </div>
        </main>
      </div>

      {/* Progress Footer */}
      <footer className="bg-white border-t border-slate-200 p-4 fixed bottom-0 left-0 right-0 z-50">
         <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8 px-4">
            <div className="flex-grow flex items-center gap-4">
               <div className="flex-grow h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00609b] transition-all duration-700 ease-out" style={{ width: `${(answeredCount / testData.totalQuestions) * 100}%` }}></div>
               </div>
               <span className="text-xs font-black text-[#00609b] whitespace-nowrap">{answeredCount} / {testData.totalQuestions} ĐÃ LÀM</span>
            </div>
            <button onClick={handleSubmit} className="px-10 py-4 bg-[#00609b] text-white font-black rounded-[20px] shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
               Nộp bài thi <Send size={20} />
            </button>
         </div>
      </footer>
    </div>
  );
};

export default CourseExam;
