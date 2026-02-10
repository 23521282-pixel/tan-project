
import React from 'react';
import { ClipboardCheck, Map, Rocket } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Làm test xếp lớp",
      desc: "Xác định trình độ CEFR chỉ trong 5 phút",
      icon: <ClipboardCheck className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "Nhận lộ trình riêng",
      desc: "Từ vựng, Ngữ pháp, Khóa học theo level của bạn",
      icon: <Map className="w-8 h-8 text-indigo-600" />,
      color: "bg-indigo-50"
    },
    {
      id: 3,
      title: "Luyện tập mỗi ngày",
      desc: "Bản tin từ vựng, Quiz, Flashcards + AI Tutor",
      icon: <Rocket className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-50"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cách hoạt động</h2>
          <p className="text-lg text-slate-500">Chỉ 3 bước để bắt đầu hành trình học tiếng Anh hiệu quả</p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-12 lg:gap-24">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-slate-200 -z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-white`}>
                {step.icon}
              </div>
              <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-8 h-8 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-sm font-bold text-slate-400">
                {step.id}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-slate-500 max-w-[200px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
