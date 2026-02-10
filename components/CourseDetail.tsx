
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  FileText, 
  PenTool, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  FileCheck,
  Zap,
  Lock,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { AppView } from '../App';
import DashboardHeader from './DashboardHeader';

interface CourseDetailProps {
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
}

interface Lesson {
  title: string;
  isFree?: boolean;
  views: string;
  isTest?: boolean;
  videoUrl?: string;
  pdfUrl?: string;
  noteUrl?: string;
}

interface Section {
  id: string;
  title: string;
  isTest?: boolean;
  lessons?: Lesson[];
  testInfo?: {
    title: string;
    duration: string;
    questions: string;
    views: string;
  };
}

const CourseDetail: React.FC<CourseDetailProps> = ({ onLogout, onNavigate }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('tuần-1');
  const [activationCode, setActivationCode] = useState('');

  // Helper to convert Drive view link to download link
  const getDownloadLink = (url: string) => {
    if (!url.includes('drive.google.com')) return url;
    const match = url.match(/\/d\/(.+?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url;
  };

  const handleDownload = (url?: string) => {
    if (!url) return;
    const downloadUrl = getDownloadLink(url);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', ''); // Trigger download
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenVideo = (url?: string) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  const curriculum: Section[] = [
    { 
      id: 'test-đầu-khóa', 
      title: 'Buổi 0: Test đầu khóa', 
      isTest: true,
      testInfo: {
        title: 'Test 01: Đánh giá năng lực đầu vào',
        duration: '45 phút',
        questions: '40 câu hỏi',
        views: '3.2k'
      }
    },
    { 
      id: 'tuần-1', 
      title: 'Tuần 1: Danh từ, Mạo từ & Đại từ', 
      lessons: [
        { 
          title: 'Buổi 1: Danh từ (P1)', 
          isFree: true, 
          views: '1,240',
          videoUrl: 'https://www.youtube.com/live/HyUFKHpsFQE',
          pdfUrl: 'https://drive.google.com/file/d/19edeBGjM_CaN9765Ivgs9V31YJHrUuBK/view?usp=sharing',
          noteUrl: 'https://drive.google.com/file/d/1VEm_i1Et9f_7VH2eOQV8Y2xqZsZ0WTWZ/view?usp=sharing'
        },
        { title: 'Buổi 2: Danh từ (P2)', views: '980' },
        { title: 'Buổi 3: Mạo từ', views: '1,050' },
        { title: 'Buổi 4: Lượng từ', views: '870' },
        { title: 'Buổi 5: Đại từ', views: '910' },
        { title: 'Buổi 6: Ôn tập tuần 1', views: '1,120' },
        { title: 'Buổi 7: Test 02 - Tuần 01', isTest: true, views: '2,100' },
      ]
    },
    { 
      id: 'tuần-2', 
      title: 'Tuần 2: Động từ, Tính từ & Trạng từ', 
      lessons: [
        { title: 'Buổi 8: Động từ (P1)', views: '750' },
        { title: 'Buổi 9: Động từ (P2)', views: '640' },
        { title: 'Buổi 10: Các cấp so sánh', views: '820' },
        { title: 'Buổi 11: Tính từ', views: '710' },
        { title: 'Buổi 12: Trạng từ', views: '680' },
        { title: 'Buổi 13: Ôn tập tuần 2', views: '890' },
        { title: 'Buổi 14: Test 03 - Tuần 02', isTest: true, views: '1,850' },
      ]
    },
    { 
      id: 'tuần-3', 
      title: 'Tuần 3: Các thì & Mệnh đề quan hệ', 
      lessons: [
        { title: 'Buổi 15: Các thì đơn', views: '920' },
        { title: 'Buổi 16: Các thì tiếp diễn', views: '880' },
        { title: 'Buổi 17: Các thì hoàn thành', views: '940' },
        { title: 'Buổi 18: Sự phối thì', views: '1,020' },
        { title: 'Buổi 19: Mệnh đề quan hệ', views: '1,150' },
        { title: 'Buổi 20: Ôn tập tuần 3', views: '1,200' },
      ]
    },
    { 
      id: 'test-cuối-khóa', 
      title: 'Buổi 21: Test cuối khóa', 
      isTest: true,
      testInfo: {
        title: 'Test 04: Đánh giá tổng kết lộ trình 21 ngày',
        duration: '60 phút',
        questions: '60 câu hỏi',
        views: '4.5k'
      }
    },
  ];

  const benefits = [
    { icon: <Sparkles className="text-blue-500" />, text: "Lộ trình học cá nhân hóa từng ngày" },
    { icon: <FileCheck className="text-blue-500" />, text: "Tài liệu độc quyền & bộ đề thực chiến" },
    { icon: <Users className="text-blue-500" />, text: "Mentor 8.5+ IELTS hỗ trợ 24/7" },
    { icon: <ShieldCheck className="text-blue-500" />, text: "Cam kết đầu ra bằng văn bản" },
  ];

  const handleActivate = () => {
    if (activationCode.trim()) {
      setIsActivated(true);
    } else {
      alert("Vui lòng nhập mã kích hoạt");
    }
  };

  const renderActivationView = () => (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <button 
        onClick={() => onNavigate('roadmap')}
        className="flex items-center gap-2 text-slate-400 font-bold mb-10 hover:text-blue-600 transition-colors"
      >
        <ChevronLeft size={20} /> Quay lại lộ trình
      </button>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-12 text-center text-white space-y-4">
          <h1 className="text-4xl md:text-5xl font-black font-poppins">Khóa 21 ngày xây nền Tiếng Anh</h1>
          <p className="text-blue-100 text-lg font-medium opacity-90">Hành trình bứt phá nền tảng Tiếng Anh chỉ trong 3 tuần</p>
        </div>

        <div className="p-12 space-y-12">
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  {b.icon}
                </div>
                <span className="font-bold text-slate-700">{b.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-10 rounded-[32px] border border-slate-200 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Kích hoạt khóa học</label>
              <input 
                type="text" 
                placeholder="Nhập mã kích hoạt khóa học"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                className="w-full px-8 py-5 bg-white border-2 border-slate-100 rounded-2xl text-xl font-bold focus:border-blue-500 outline-none transition-all shadow-sm"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleActivate}
                className="flex-grow py-5 bg-blue-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-blue-100 hover:opacity-95 transition-all active:scale-95"
              >
                Kích hoạt khóa học
              </button>
              <button 
                onClick={() => setIsActivated(true)}
                className="flex-grow py-5 bg-white border-2 border-slate-200 text-slate-600 font-bold text-xl rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
              >
                Thử demo ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTestBlock = (title: string, duration: string, questions: string, views: string) => (
    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-purple-50/20 m-4 rounded-2xl border border-purple-100 border-dashed">
       <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-purple-600">
             <Zap size={32} />
          </div>
          <div className="space-y-1">
             <h4 className="text-xl font-black text-slate-800">{title}</h4>
             <p className="text-slate-400 font-bold text-sm">Thời gian: {duration} • {questions}</p>
          </div>
       </div>
       <div className="flex items-center gap-8 text-slate-400">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><FileText size={16} /> Đề bài</div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Eye size={16} /> {views}</div>
          <button 
            onClick={() => onNavigate('course-exam')}
            className="px-10 py-4 bg-purple-600 text-white font-black rounded-xl hover:opacity-90 active:scale-95 transition-all"
          >
            Làm bài
          </button>
       </div>
    </div>
  );

  const renderCurriculumView = () => (
    <div className="max-w-5xl mx-auto py-12 px-6 pb-32">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
           <button 
            onClick={() => setIsActivated(false)}
            className="flex items-center gap-2 text-slate-400 font-bold hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={20} /> Đổi khóa học
          </button>
          <h1 className="text-4xl font-black text-slate-900 font-poppins">Khóa 21 ngày xây nền Tiếng Anh</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 font-bold">
               <Zap className="text-blue-500" size={18} />
               <span>Tiến độ: 0%</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-bold">
               <Clock className="text-blue-500" size={18} />
               <span>Đã học: 0/21 bài</span>
            </div>
          </div>
        </div>
        <button className="px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-100 flex items-center gap-2 hover:opacity-90">
           Tiếp tục học <ArrowRight size={20} />
        </button>
      </div>

      <div className="space-y-4 relative">
        <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 hidden md:block"></div>

        {curriculum.map((section) => (
          <div key={section.id} className="relative">
            <div className={`absolute left-[32px] top-6 w-4 h-4 rounded-full border-4 border-white z-10 hidden md:block ${expandedSection === section.id ? 'bg-blue-500' : 'bg-slate-300'}`}></div>

            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden md:ml-20">
              <button 
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className={`w-full flex items-center justify-between p-6 text-left transition-all ${expandedSection === section.id ? 'bg-blue-50/50' : 'bg-white hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-4">
                  {(section.isTest && !section.lessons) ? (
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                      <FileCheck size={24} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <Sparkles size={24} />
                    </div>
                  )}
                  <h3 className={`text-xl font-black ${expandedSection === section.id ? 'text-blue-700' : 'text-slate-800'}`}>
                    {section.title}
                  </h3>
                </div>
                {expandedSection === section.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {expandedSection === section.id && (
                <div className="p-2 bg-white divide-y divide-slate-50 animate-in slide-in-from-top-2 duration-300">
                  {section.isTest && section.testInfo ? (
                    renderTestBlock(section.testInfo.title, section.testInfo.duration, section.testInfo.questions, section.testInfo.views)
                  ) : (
                    section.lessons?.map((lesson, idx) => (
                      <React.Fragment key={idx}>
                        {lesson.isTest ? (
                           <div className="p-4 bg-purple-50/30 m-2 rounded-2xl border border-purple-100 border-dashed">
                              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600">
                                      <Zap size={20} />
                                   </div>
                                   <h4 className="font-black text-slate-800">{lesson.title}</h4>
                                </div>
                                <button 
                                  onClick={() => onNavigate('course-exam')}
                                  className="px-6 py-2 bg-purple-600 text-white text-xs font-black rounded-lg hover:opacity-90"
                                >
                                  Làm Test
                                </button>
                              </div>
                           </div>
                        ) : (
                          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50 transition-all group cursor-pointer">
                            <div className="flex items-center gap-5 flex-grow">
                               <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all font-black text-sm">
                                  {idx + 1}
                               </div>
                               <div>
                                  <div className="flex items-center gap-3">
                                     <h4 className="text-lg font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{lesson.title}</h4>
                                     {lesson.isFree && <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">FREE</span>}
                                  </div>
                               </div>
                            </div>

                            <div className="flex items-center gap-6 text-slate-400 flex-shrink-0">
                               <button 
                                 onClick={() => handleOpenVideo(lesson.videoUrl)}
                                 className={`flex flex-col items-center gap-1 group/item transition-colors ${lesson.videoUrl ? 'hover:text-blue-500' : 'opacity-20 cursor-not-allowed'}`}
                                 disabled={!lesson.videoUrl}
                               >
                                  <Play size={18} />
                                  <span className="text-[10px] font-black uppercase tracking-tighter">Video</span>
                               </button>
                               <button 
                                 onClick={() => handleDownload(lesson.pdfUrl)}
                                 className={`flex flex-col items-center gap-1 group/item transition-colors ${lesson.pdfUrl ? 'hover:text-blue-500' : 'opacity-20 cursor-not-allowed'}`}
                                 disabled={!lesson.pdfUrl}
                               >
                                  <FileText size={18} />
                                  <span className="text-[10px] font-black uppercase tracking-tighter">Tài liệu</span>
                               </button>
                               <button 
                                 onClick={() => handleDownload(lesson.noteUrl)}
                                 className={`flex flex-col items-center gap-1 group/item transition-colors ${lesson.noteUrl ? 'hover:text-blue-500' : 'opacity-20 cursor-not-allowed'}`}
                                 disabled={!lesson.noteUrl}
                               >
                                  <PenTool size={18} />
                                  <span className="text-[10px] font-black uppercase tracking-tighter">Note</span>
                               </button>
                               <div className="h-8 w-px bg-slate-100 mx-2"></div>
                               <div className="flex items-center gap-1.5 font-bold text-xs opacity-60">
                                  <Eye size={14} /> {lesson.views}
                                </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col font-inter">
      <DashboardHeader activeView="course-detail" onNavigate={onNavigate} onLogout={onLogout} />
      
      <main className="flex-grow">
        {isActivated ? renderCurriculumView() : renderActivationView()}
      </main>
    </div>
  );
};

export default CourseDetail;
