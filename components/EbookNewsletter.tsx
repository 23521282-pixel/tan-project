import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, BookOpen, Volume2, Play, 
  Pause, RotateCcw, FastForward, ExternalLink,
  Book, Sparkles, Filter, Search, Headphones,
  Lamp, MoreVertical, Bookmark, Share2, Loader2
} from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import { AppView } from '../App';
import DashboardHeader from './DashboardHeader';
import { ARTICLES, Article, BilingualParagraph } from '../data/newsData';

type ViewMode = 'list' | 'reader';

// Audio Utils for Gemini TTS
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const EbookNewsletter: React.FC<{ onLogout: () => void; onNavigate: (view: AppView) => void }> = ({ onLogout, onNavigate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const filteredArticles = ARTICLES.filter(art => 
    art.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.titleVi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenReader = (article: Article) => {
    setSelectedArticle(article);
    setCurrentParagraphIdx(0);
    setViewMode('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpeak = async (text: string, lang: 'en' | 'vi') => {
    // Stop any existing audio
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }
    window.speechSynthesis.cancel();
    
    setIsLoadingAudio(true);
    setIsPlaying(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = lang === 'en' 
        ? `Read this English text with a clear, academic Cambridge-style voice: ${text}` 
        : `Đọc đoạn văn bản sau bằng tiếng Việt với giọng nam trầm, ấm và truyền cảm: ${text}`;
      
      const voiceName = lang === 'en' ? 'Kore' : 'Zephyr';

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => {
          setIsPlaying(false);
          currentSourceRef.current = null;
        };
        currentSourceRef.current = source;
        source.start();
        setIsPlaying(true);
        setIsLoadingAudio(false);
      } else {
        setIsLoadingAudio(false);
      }
    } catch (error) {
      console.error("Gemini TTS Error:", error);
      setIsLoadingAudio(false);
      // Fallback
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'vi-VN';
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const handleGlobalPlay = () => {
    if (!selectedArticle) return;
    const currentPara = selectedArticle.paragraphs[currentParagraphIdx];
    handleSpeak(currentPara.en, 'en');
  };

  const handleNextPara = () => {
    if (!selectedArticle) return;
    if (currentParagraphIdx < selectedArticle.paragraphs.length - 1) {
      setCurrentParagraphIdx(prev => prev + 1);
    }
  };

  const handlePrevPara = () => {
    if (currentParagraphIdx > 0) {
      setCurrentParagraphIdx(prev => prev - 1);
    }
  };

  const renderList = () => (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
             <Sparkles size={12} /> Học qua ngữ cảnh
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 font-poppins leading-tight">
            📘 Bản Tin Từ Vựng <br /><span className="text-[#2563eb]">THPTQG</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl">Học từ vựng theo chủ đề qua bài viết song ngữ Anh – Việt. Mỗi bài đọc là một cơ hội rèn luyện tư duy ngôn ngữ.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Tìm chủ đề học..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none w-full sm:w-80 font-medium transition-all"
            />
          </div>
          <button className="bg-[#1e293b] text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-slate-200 flex items-center gap-3 hover:bg-slate-800 active:scale-95 transition-all">
            <Book size={20} /> Ebook Từ Vựng
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredArticles.map(article => (
          <div key={article.id} className="bg-white rounded-[45px] overflow-hidden border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col min-h-[580px] relative">
            <div className="relative h-72 overflow-hidden bg-slate-100">
               <img 
                 src={article.coverImage} 
                 alt={article.titleEn} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                 onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1544648397-52ee3bf82abb?auto=format&fit=crop&q=80&w=800';
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
               <div className="absolute top-6 left-6 flex gap-2">
                 <span className="bg-white/95 backdrop-blur-sm text-blue-600 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {article.level}
                 </span>
                 <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                   {article.category}
                 </span>
               </div>
               <button className="absolute top-6 right-6 p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-xl text-white transition-all">
                 <Bookmark size={18} />
               </button>
            </div>

            <div className="p-10 space-y-6 flex-grow flex flex-col">
               <div className="space-y-3">
                  <h3 className="text-[26px] font-black text-slate-800 leading-[1.3] group-hover:text-blue-600 transition-colors h-20 line-clamp-2">
                    {article.titleEn}
                  </h3>
                  <p className="text-slate-400 font-bold text-base leading-relaxed line-clamp-2">
                    {article.titleVi}
                  </p>
               </div>

               <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4 mt-auto">
                 <button 
                  onClick={() => window.open(article.externalLink, '_blank')}
                  className="py-4.5 bg-slate-50 text-slate-600 font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm group/btn"
                 >
                   <ExternalLink size={18} className="group-hover/btn:rotate-12 transition-transform" /> Đọc bài
                 </button>
                 <button 
                  onClick={() => handleOpenReader(article)}
                  className="py-4.5 bg-[#2563eb] text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:opacity-90 shadow-xl shadow-blue-200 transition-all text-sm group/btn"
                 >
                   <Headphones size={18} className="group-hover/btn:scale-110 transition-transform" /> Nghe đọc
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="py-20 text-center space-y-4">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
             <Search size={40} />
           </div>
           <p className="text-slate-400 font-bold text-lg">Hông tìm thấy bản tin nào phù hợp...</p>
        </div>
      )}
    </div>
  );

  const renderReader = () => {
    if (!selectedArticle) return null;
    return (
      <div className="min-h-screen bg-white font-inter pb-40">
        <div className="sticky top-[64px] lg:top-[80px] z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-5 px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => { setViewMode('list'); window.speechSynthesis.cancel(); if(currentSourceRef.current) currentSourceRef.current.stop(); }}
              className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2 font-bold text-sm"
            >
              <ChevronLeft size={20} /> <span className="hidden sm:inline">Quay lại</span>
            </button>
            <div className="text-center px-4">
              <h2 className="text-base md:text-xl font-black text-slate-900 truncate max-w-[180px] sm:max-w-md font-poppins">{selectedArticle.titleEn}</h2>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">{selectedArticle.category} • {selectedArticle.level}</p>
            </div>
            <div className="flex gap-2">
               <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all">
                  <Share2 size={18} />
               </button>
               <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all">
                  <MoreVertical size={18} />
               </button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16 space-y-24">
          <div className="text-center space-y-6 pb-12 border-b border-slate-50">
             <div className="inline-block px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-[0.2em]">Bilingual Article</div>
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight font-poppins">{selectedArticle.titleEn}</h1>
             <p className="text-xl md:text-2xl font-bold text-slate-400 italic font-poppins">{selectedArticle.titleVi}</p>
          </div>

          {selectedArticle.paragraphs.map((para, idx) => (
            <div 
              key={idx} 
              id={`para-${idx}`}
              className={`space-y-8 group transition-all duration-700 relative ${currentParagraphIdx === idx ? 'scale-[1.03] translate-x-2' : 'opacity-60 blur-[0.5px] grayscale-[0.2]'}`}
            >
              {/* EN Paragraph */}
              <div className="relative">
                <div className={`absolute -left-12 top-0 h-full w-1.5 rounded-full transition-all duration-500 ${currentParagraphIdx === idx ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                <div className="flex items-start gap-8">
                   <button 
                    onClick={() => {
                        setCurrentParagraphIdx(idx);
                        handleSpeak(para.en, 'en');
                    }}
                    disabled={isLoadingAudio}
                    className={`w-14 h-14 rounded-[22px] flex items-center justify-center shadow-lg shrink-0 transition-all duration-500 ${currentParagraphIdx === idx ? 'bg-blue-600 text-white shadow-blue-200 rotate-6 scale-110' : 'bg-slate-50 text-slate-300 hover:bg-blue-50 hover:text-blue-500'}`}
                   >
                     {isLoadingAudio && currentParagraphIdx === idx ? <Loader2 className="animate-spin" size={28} /> : <Volume2 size={28} />}
                   </button>
                   <p className={`text-2xl md:text-[28px] font-bold leading-[1.7] text-slate-800 font-inter ${currentParagraphIdx === idx ? 'text-slate-900 drop-shadow-sm' : ''}`}>
                     {para.en}
                   </p>
                </div>
              </div>

              {/* VI Paragraph */}
              <div className="pl-22 ml-[88px] md:ml-[92px] flex items-start gap-6">
                <button 
                  onClick={() => {
                    setCurrentParagraphIdx(idx);
                    handleSpeak(para.vi, 'vi');
                  }}
                  disabled={isLoadingAudio}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${currentParagraphIdx === idx ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm' : 'bg-slate-50 text-slate-300 hover:bg-emerald-50 hover:text-emerald-500'}`}
                  title="Nghe tiếng Việt"
                >
                  {isLoadingAudio && currentParagraphIdx === idx ? <Loader2 className="animate-spin" size={20} /> : <Volume2 size={20} />}
                </button>
                <p className="text-xl md:text-2xl font-medium leading-[1.7] text-slate-400/80 italic font-inter border-l-2 border-slate-100 pl-8 transition-colors group-hover:text-slate-500">
                  {para.vi}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-32 text-center">
             <div className="inline-flex items-center gap-4 px-10 py-4 bg-slate-50 rounded-full text-slate-400 font-black text-xs uppercase tracking-[0.3em] border border-slate-100 shadow-sm">
                <Sparkles size={18} className="text-blue-400 animate-pulse" /> FINISHED READING
             </div>
             <div className="mt-12">
                <button 
                    onClick={() => { setViewMode('list'); window.speechSynthesis.cancel(); if(currentSourceRef.current) currentSourceRef.current.stop(); }}
                    className="px-10 py-5 bg-slate-900 text-white font-black rounded-3xl shadow-xl hover:opacity-90 transition-all active:scale-95"
                >
                    Khám phá bài đọc khác
                </button>
             </div>
          </div>
        </div>

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl bg-white/80 backdrop-blur-2xl border border-slate-100/50 rounded-[45px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.2)] p-5 flex items-center gap-8 animate-in slide-in-from-bottom duration-1000">
           <div className="flex flex-col items-center gap-2 pl-6 shrink-0">
              <span className="text-[10px] font-black text-blue-600 tracking-tighter uppercase">Progress</span>
              <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-800">{currentParagraphIdx + 1}</span>
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                      style={{ width: `${((currentParagraphIdx + 1) / selectedArticle.paragraphs.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{selectedArticle.paragraphs.length}</span>
              </div>
           </div>

           <div className="flex items-center justify-center flex-grow gap-8 border-l border-slate-100 pl-8">
              <button 
                onClick={handlePrevPara}
                className="p-4 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all disabled:opacity-10"
                disabled={currentParagraphIdx === 0}
              >
                <RotateCcw size={28} className="transform -scale-x-100" />
              </button>
              
              <button 
                onClick={handleGlobalPlay}
                disabled={isLoadingAudio}
                className="w-20 h-20 bg-blue-600 text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-300 hover:scale-110 active:scale-95 transition-all group/play disabled:opacity-50"
              >
                {isLoadingAudio ? <Loader2 className="animate-spin" size={40} /> : (isPlaying ? <Pause size={40} fill="white" /> : <Play size={40} fill="white" className="ml-1 group-hover/play:scale-110 transition-transform" />)}
              </button>

              <button 
                onClick={handleNextPara}
                className="p-4 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all disabled:opacity-10"
                disabled={currentParagraphIdx === selectedArticle.paragraphs.length - 1}
              >
                <FastForward size={28} />
              </button>
           </div>

           <div className="pr-6 shrink-0 hidden sm:block">
             <div className="w-14 h-14 bg-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-lg">
               <Headphones size={28} />
             </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col font-inter">
      {viewMode === 'list' && <DashboardHeader activeView="ebook-newsletter" onNavigate={onNavigate} onLogout={onLogout} />}
      
      <main className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
        {viewMode === 'list' ? renderList() : renderReader()}
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .py-4\.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
      `}</style>
    </div>
  );
};

export default EbookNewsletter;