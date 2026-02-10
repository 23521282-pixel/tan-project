
import React from 'react';
import { BookOpen, Sparkles, GraduationCap } from 'lucide-react';

const KnowledgeSystem: React.FC = () => {
  const vocabTopics = [
    { name: "Food & Drink", level: "B1–B2" },
    { name: "Travel & Tourism", level: "B1–C1" },
    { name: "Education", level: "B1–B2" },
    { name: "Technology & AI", level: "B2–C1" },
    { name: "Environment & Climate", level: "B1–B2" },
    { name: "Health", level: "B1–B2" }
  ];

  const grammarTopics = [
    "Reported Speech",
    "Relative Clauses",
    "Comparisons",
    "Modal Verbs",
    "Gerund & Infinitive",
    "Subject–Verb Agreement"
  ];

  const courses = [
    "21-day foundation course",
    "Integrated vocab-grammar-reading",
    "Early practice course",
    "Exam-focused course"
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hệ Thống Kiến Thức Toàn Diện</h2>
          <p className="text-lg text-slate-500">Xây dựng tư duy ngôn ngữ vững chắc với 3 trụ cột cốt lõi</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Column 1: Vocabulary */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Vocabulary</h3>
            </div>
            <ul className="space-y-4 flex-grow">
              {vocabTopics.map((topic, idx) => (
                <li key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-all">
                  <span className="text-slate-700 font-medium">{topic.name}</span>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">{topic.level}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Grammar (Highlight) */}
          <div className="bg-emerald-500 p-8 rounded-3xl shadow-xl shadow-emerald-200 border border-emerald-400 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Grammar</h3>
            </div>
            <ul className="space-y-4 flex-grow">
              {grammarTopics.map((topic, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/90 font-semibold text-lg">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  {topic}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-white/20 text-center">
              <button className="w-full py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-colors">
                Luyện tập ngay
              </button>
            </div>
          </div>

          {/* Column 3: Courses */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Courses</h3>
            </div>
            <ul className="space-y-6 flex-grow">
              {courses.map((course, idx) => (
                <li key={idx} className="relative pl-6 pb-6 border-l-2 border-blue-50 last:border-0 last:pb-0">
                  <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-blue-100 border-4 border-white"></div>
                  <span className="text-slate-700 font-bold block">{course}</span>
                  <span className="text-sm text-slate-400">Professional training program</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KnowledgeSystem;
