import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Volume2, Play, List, Brain, ChevronLeft, 
  X, Check, RotateCcw, Search as SearchIcon,
  BookOpen, Sparkles, Filter, Trophy, Loader2,
  Plus, Globe, Lock, Image as ImageIcon, Trash2, GripVertical, CheckCircle
} from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import { AppView } from '../App';
import DashboardHeader from './DashboardHeader';
import { FLASHCARD_SETS, FlashcardSet, Flashcard } from '../data/flashcardData';

type ViewMode = 'overview' | 'study' | 'game' | 'list' | 'result' | 'create';

interface NewFlashcardDraft {
  term: string;
  definition: string;
}

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

const FlashCards: React.FC<{ onLogout: () => void; onNavigate: (view: AppView) => void }> = ({ onLogout, onNavigate }) => {
  const [sets, setSets] = useState<FlashcardSet[]>(() => {
    const saved = localStorage.getItem('user_flashcard_sets');
    if (saved) {
      try {
        const customSets = JSON.parse(saved);
        return [...customSets, ...FLASHCARD_SETS];
      } catch (e) {
        return FLASHCARD_SETS;
      }
    }
    return FLASHCARD_SETS;
  });
  
  const [currentSet, setCurrentSet] = useState<FlashcardSet>(FLASHCARD_SETS[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCards, setNewCards] = useState<NewFlashcardDraft[]>([
    { term: '', definition: '' },
    { term: '', definition: '' }
  ]);
  const [isPublic, setIsPublic] = useState(true);

  const [userProgress, setUserProgress] = useState<Record<string, 'new' | 'learning' | 'mastered'>>({});
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyStats, setStudyStats] = useState({ mastered: 0, learning: 0 });
  const [aiSummary, setAiSummary] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [gameCards, setGameCards] = useState<{ id: string, text: string, type: 'word' | 'meaning', matched: boolean, selected: boolean }[]>([]);
  const [firstSelection, setFirstSelection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const audioContextRef = useRef<AudioContext | null>(null);

  const filteredSets = useMemo(() => {
    return sets.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.category.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [sets, searchTerm]);

  useEffect(() => {
    const customOnly = sets.filter(s => s.id.startsWith('custom-'));
    localStorage.setItem('user_flashcard_sets', JSON.stringify(customOnly));
  }, [sets]);

  const speak = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Pronounce clearly like a Cambridge Dictionary: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
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
        source.onended = () => setIsSpeaking(false);
        source.start();
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error("Gemini TTS Error:", error);
      setIsSpeaking(false);
      // Fallback to basic TTS if API fails
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartStudy = (set: FlashcardSet) => {
    setCurrentSet(set);
    setCurrentCardIdx(0);
    setIsFlipped(false);
    setStudyStats({ mastered: 0, learning: 0 });
    setViewMode('study');
  };

  const handleStudyAction = (mastered: boolean) => {
    const card = currentSet.cards[currentCardIdx];
    setUserProgress(prev => ({ ...prev, [card.id]: mastered ? 'mastered' : 'learning' }));
    setStudyStats(prev => ({
      mastered: prev.mastered + (mastered ? 1 : 0),
      learning: prev.learning + (mastered ? 0 : 1)
    }));

    if (currentCardIdx < currentSet.cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentCardIdx(prev => prev + 1), 150);
    } else {
      finishStudySession();
    }
  };

  const finishStudySession = async () => {
    setViewMode('result');
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Bạn là "Học tiếng Anh hông?". Học sinh vừa hoàn thành bộ Flashcard "${currentSet.title}" (${currentSet.level}). Kết quả: Đã nhớ ${studyStats.mastered} từ, chưa nhớ ${studyStats.learning} từ. Hãy viết 1 câu tóm tắt tiến độ cực ngắn, thân thiện, Gen Z để khích lệ học sinh nha.`,
      });
      setAiSummary(response.text || 'Làm tốt lắm! Hãy tiếp tục duy trì đà này nhé!');
    } catch (e) {
      setAiSummary('Làm tốt lắm! Hãy tiếp tục ôn luyện để nâng cao vốn từ nha!');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleStartGame = (set: FlashcardSet) => {
    setCurrentSet(set);
    const items = set.cards.slice(0, 8).flatMap(c => [
      { id: c.id, text: c.word, type: 'word' as const, matched: false, selected: false },
      { id: c.id, text: c.meaning, type: 'meaning' as const, matched: false, selected: false }
    ]);
    setGameCards(items.sort(() => Math.random() - 0.5));
    setFirstSelection(null);
    setViewMode('game');
  };

  const handleSelectGameCard = (index: number) => {
    if (gameCards[index].matched || gameCards[index].selected) return;

    const newCards = [...gameCards];
    newCards[index].selected = true;
    setGameCards(newCards);

    if (firstSelection === null) {
      setFirstSelection(index);
    } else {
      const first = gameCards[firstSelection];
      const second = gameCards[index];

      if (first.id === second.id && first.type !== second.type) {
        setTimeout(() => {
          setGameCards(prev => prev.map((c, i) => 
            (i === firstSelection || i === index) ? { ...c, matched: true, selected: false } : c
          ));
          setFirstSelection(null);
        }, 300);
      } else {
        setTimeout(() => {
          setGameCards(prev => prev.map((c, i) => 
            (i === firstSelection || i === index) ? { ...c, selected: false } : c
          ));
          setFirstSelection(null);
        }, 500);
      }
    }
  };

  const addNewCardDraft = () => {
    setNewCards([...newCards, { term: '', definition: '' }]);
  };

  const updateCardDraft = (index: number, field: 'term' | 'definition', value: string) => {
    const updated = [...newCards];
    updated[index][field] = value;
    setNewCards(updated);
  };

  const removeCardDraft = (index: number) => {
    if (newCards.length <= 1) return;
    setNewCards(newCards.filter((_, i) => i !== index));
  };

  const handleCreateSet = () => {
    if (!newTitle.trim()) {
      alert("Vui lòng nhập tiêu đề học phần");
      return;
    }

    const createdSet: FlashcardSet = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      category: 'Custom',
      level: 'My Level',
      cards: newCards
        .filter(c => c.term.trim() && c.definition.trim())
        .map((c, idx) => ({
          id: `c-custom-${idx}-${Date.now()}`,
          word: c.term,
          meaning: c.definition,
          ipa: '',
          example: '',
          status: 'new'
        }))
    };

    if (createdSet.cards.length === 0) {
      alert("Vui lòng thêm ít nhất 1 thẻ có đủ thuật ngữ và định nghĩa");
      return;
    }

    setSets([createdSet, ...sets]);
    setNewTitle('');
    setNewDesc('');
    setNewCards([{ term: '', definition: '' }, { term: '', definition: '' }]);
    setViewMode('overview');
  };

  const handleDeleteSet = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa bộ thẻ này không?")) {
      setSets(prev => prev.filter(s => s.id !== id));
    }
  };

  const renderOverview = () => (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 font-poppins">Flash Cards</h1>
          <p className="text-slate-500 text-lg font-medium">Chọn bộ thẻ để bắt đầu hành trình ghi nhớ từ vựng.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm chủ đề..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/10 outline-none w-full sm:w-80"
            />
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl px-6 py-3 flex items-center gap-3 shadow-sm">
             <Trophy className="text-yellow-500" />
             <div className="whitespace-nowrap">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Chuỗi học</p>
                <p className="text-lg font-black text-slate-800 leading-none">5 Ngày</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        <button 
          onClick={() => setViewMode('create')}
          className="bg-[#f8fafc] rounded-[45px] p-10 border-4 border-dashed border-blue-100 flex flex-col items-center justify-center text-center gap-6 group hover:border-blue-400 transition-all hover:bg-white"
        >
          <div className="w-20 h-20 bg-blue-600 rounded-[30px] flex items-center justify-center text-white shadow-xl shadow-blue-100 group-hover:scale-110 transition-transform">
            <Plus size={40} strokeWidth={3} />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800">Tự tạo bộ thẻ</h3>
            <p className="text-slate-400 font-medium">Xây dựng kho từ vựng cá nhân của bạn</p>
          </div>
        </button>

        {filteredSets.map((set) => {
          const masteredCount = set.cards.filter(c => userProgress[c.id] === 'mastered').length;
          const learningCount = set.cards.filter(c => userProgress[c.id] === 'learning').length;
          const progress = (masteredCount / set.cards.length) * 100;
          const isUserCreated = set.id.startsWith('custom-');
          
          return (
            <div key={set.id} className="bg-white rounded-[45px] p-10 border border-slate-50 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col">
              <div className="relative z-10 space-y-8 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest">{set.level}</span>
                      {isUserCreated && (
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-1 border border-emerald-100">
                          <CheckCircle size={12} /> Do bạn tạo
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors pt-2">{set.title}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <BookOpen className="text-blue-100 w-12 h-12" />
                    {isUserCreated && (
                      <button 
                        onClick={(e) => handleDeleteSet(set.id, e)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Xóa bộ thẻ"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>{set.cards.length} Thẻ</span>
                    <span>{Math.round(progress)}% Đã thuộc</span>
                  </div>
                  <div className="h-4 bg-slate-50 rounded-full overflow-hidden flex shadow-inner">
                    <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                    <div className="h-full bg-blue-400 transition-all duration-1000" style={{ width: `${(learningCount / set.cards.length) * 100}%` }}></div>
                  </div>
                  <div className="flex gap-6 text-[11px] font-bold">
                    <span className="text-emerald-500 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> {masteredCount} Đã nhớ</span>
                    <span className="text-blue-500 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-50"></div> {learningCount} Đang học</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={() => handleStartStudy(set)}
                    className="py-5 bg-[#2563eb] text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:opacity-95 active:scale-95 transition-all shadow-xl shadow-blue-200"
                  >
                    <Play size={20} fill="currentColor" /> Học bài
                  </button>
                  <button 
                    onClick={() => handleStartGame(set)}
                    className="py-5 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-3xl flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    <Sparkles size={20} className="text-purple-500" /> Ghép cặp
                  </button>
                </div>
                
                <button 
                  onClick={() => { setCurrentSet(set); setViewMode('list'); }}
                  className="w-full py-4 text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <List size={18} /> Danh sách từ vựng
                </button>
              </div>
              <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-50/40 rounded-full blur-3xl -z-0"></div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black text-slate-900 font-poppins">Tạo một học phần mới</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setViewMode('overview')}
            className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
          >
            Hủy
          </button>
          <button 
            onClick={handleCreateSet}
            className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-100 hover:opacity-90 transition-all active:scale-95"
          >
            Tạo
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsPublic(!isPublic)}
             className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
           >
             {isPublic ? <Globe size={16} className="text-blue-500" /> : <Lock size={16} className="text-slate-400" />}
             {isPublic ? 'Công khai' : 'Riêng tư'}
           </button>
        </div>

        <div className="space-y-6 max-w-4xl">
           <div className="space-y-2">
             <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tiêu đề</label>
             <input 
               type="text" 
               placeholder='Nhập tiêu đề, ví dụ "Tiếng Anh chuyên ngành"' 
               value={newTitle}
               onChange={(e) => setNewTitle(e.target.value)}
               className="w-full px-8 py-5 bg-white border-2 border-slate-100 rounded-3xl text-xl font-bold text-slate-800 placeholder:text-slate-300 focus:border-blue-500 outline-none transition-all shadow-sm"
             />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả</label>
             <textarea 
               placeholder='Thêm mô tả (không bắt buộc)...' 
               value={newDesc}
               onChange={(e) => setNewDesc(e.target.value)}
               rows={2}
               className="w-full px-8 py-5 bg-white border-2 border-slate-100 rounded-3xl text-lg font-medium text-slate-600 placeholder:text-slate-300 focus:border-blue-500 outline-none transition-all shadow-sm resize-none"
             />
           </div>
        </div>

        <div className="flex items-center justify-between max-w-4xl pt-6">
           <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-all">
                <Plus size={18} /> Nhập
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-all opacity-50 cursor-not-allowed">
                <Plus size={18} /> Thêm sơ đồ <Lock size={14} />
              </button>
           </div>
        </div>

        <div className="space-y-6 max-w-6xl">
           {newCards.map((card, idx) => (
             <div key={idx} className="bg-white rounded-[40px] p-8 border-2 border-slate-50 shadow-sm relative group hover:border-blue-200 transition-all">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                  <span className="text-xl font-black text-slate-300">{idx + 1}</span>
                  <div className="flex items-center gap-4 text-slate-300">
                    <GripVertical size={20} className="cursor-move" />
                    <button 
                      onClick={() => removeCardDraft(idx)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-10">
                   <div className="space-y-3">
                      <input 
                        type="text" 
                        value={card.term}
                        onChange={(e) => updateCardDraft(idx, 'term', e.target.value)}
                        placeholder="Nhập thuật ngữ..."
                        className="w-full text-xl font-bold text-slate-800 bg-slate-50 px-6 py-4 rounded-2xl outline-none focus:bg-white border border-transparent focus:border-blue-400 transition-all"
                      />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">THUẬT NGỮ</span>
                   </div>
                   <div className="space-y-3">
                      <input 
                        type="text" 
                        value={card.definition}
                        onChange={(e) => updateCardDraft(idx, 'definition', e.target.value)}
                        placeholder="Nhập định nghĩa..."
                        className="w-full text-xl font-bold text-slate-800 bg-slate-50 px-6 py-4 rounded-2xl outline-none focus:bg-white border border-transparent focus:border-blue-400 transition-all"
                      />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ĐỊNH NGHĨA</span>
                   </div>
                   <div className="flex items-center justify-center">
                      <button className="w-32 h-32 border-4 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-blue-500 hover:border-blue-200 transition-all group/img">
                         <ImageIcon size={32} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Hình ảnh</span>
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="max-w-6xl flex justify-center pt-8">
           <button 
             onClick={addNewCardDraft}
             className="px-12 py-5 bg-[#f0f4f8] text-slate-600 font-black text-lg rounded-3xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95 shadow-sm"
           >
             Thêm thẻ
           </button>
        </div>

        <div className="max-w-6xl flex justify-end pt-12">
           <button 
             onClick={handleCreateSet}
             className="px-16 py-6 bg-blue-600 text-white font-black text-2xl rounded-[35px] shadow-2xl shadow-blue-200 hover:opacity-90 transition-all active:scale-95"
           >
             Tạo học phần
           </button>
        </div>
      </div>
    </div>
  );

  const renderStudy = () => {
    const card = currentSet.cards[currentCardIdx];
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-[#f8fafc] pb-24">
        <div className="max-w-xl w-full space-y-12">
          <div className="flex items-center justify-between">
            <button onClick={() => setViewMode('overview')} className="text-slate-400 font-bold flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ChevronLeft /> Quay lại
            </button>
            <div className="px-5 py-2 bg-white border border-slate-100 rounded-full text-slate-400 font-black tracking-widest text-[10px] uppercase shadow-sm">
              {currentCardIdx + 1} / {currentSet.cards.length} THẺ
            </div>
          </div>

          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="group perspective-1000 h-[450px] cursor-pointer"
          >
            <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 backface-hidden bg-white border border-slate-100 rounded-[60px] shadow-2xl flex flex-col items-center justify-center p-12 text-center space-y-8">
                <div className={`w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner transition-all ${isSpeaking ? 'animate-pulse scale-110' : ''}`}>
                   {isSpeaking ? <Loader2 className="animate-spin" size={40} /> : <Volume2 size={40} />}
                </div>
                <div className="space-y-4">
                   <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tight font-poppins">{card.word}</h2>
                   <p className="text-2xl font-bold text-blue-500 font-mono tracking-widest">{card.ipa}</p>
                </div>
                <div className="pt-10 flex flex-col items-center gap-4">
                   <p className="text-slate-300 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">Nhấn để xem nghĩa</p>
                   <button 
                     onClick={(e) => { e.stopPropagation(); speak(card.word); }}
                     disabled={isSpeaking}
                     className={`p-5 bg-blue-600 text-white rounded-full hover:scale-110 active:scale-90 transition-all shadow-2xl shadow-blue-300 disabled:opacity-50`}
                   >
                     {isSpeaking ? <Loader2 size={28} className="animate-spin" /> : <Volume2 size={28} />}
                   </button>
                </div>
              </div>

              <div className="absolute inset-0 backface-hidden bg-white border-4 border-blue-500 rounded-[60px] shadow-2xl flex flex-col items-center justify-center p-12 text-center space-y-10 rotate-y-180 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
                 <div className="space-y-3">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Nghĩa tiếng Việt</p>
                    <h3 className="text-5xl font-black text-blue-600 leading-tight">{card.meaning}</h3>
                 </div>
                 <div className="bg-slate-50 rounded-[30px] p-8 w-full border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Ví dụ</p>
                    <p className="text-lg text-slate-700 font-bold italic leading-relaxed">"{card.example}"</p>
                 </div>
                 <button 
                    onClick={(e) => { e.stopPropagation(); speak(card.example); }}
                    disabled={isSpeaking}
                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2 text-xs font-bold"
                 >
                   {isSpeaking ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={16} />} Nghe ví dụ
                 </button>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <button 
              onClick={() => handleStudyAction(false)}
              className="flex-1 py-7 bg-white border-2 border-slate-100 text-slate-400 font-black text-xl rounded-[35px] flex items-center justify-center gap-4 hover:border-red-500 hover:text-red-500 transition-all shadow-sm active:scale-95"
            >
              <X size={32} /> Chưa nhớ
            </button>
            <button 
              onClick={() => handleStudyAction(true)}
              className="flex-1 py-7 bg-[#2563eb] text-white font-black text-xl rounded-[35px] flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-blue-300 active:scale-95 transition-all"
            >
              <Check size={32} /> Đã thuộc ✓
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderGame = () => {
    const isFinished = gameCards.length > 0 && gameCards.every(c => c.matched);
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-blue-50/10 pb-24">
        <div className="max-w-5xl w-full space-y-12">
          <div className="flex items-center justify-between">
            <button onClick={() => setViewMode('overview')} className="text-slate-400 font-bold flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ChevronLeft /> Thoát trò chơi
            </button>
            <div className="text-center">
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight font-poppins">Matching Game</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Ghép từ vựng với nghĩa tương ứng</p>
            </div>
            <div className="w-24"></div>
          </div>

          {isFinished ? (
            <div className="bg-white rounded-[60px] p-16 md:p-24 text-center shadow-2xl border border-slate-100 space-y-10 animate-in zoom-in duration-700 max-w-3xl mx-auto">
               <div className="w-28 h-28 bg-yellow-400 rounded-[35px] flex items-center justify-center text-white mx-auto shadow-2xl shadow-yellow-200 animate-bounce-slow">
                  <Trophy size={56} />
               </div>
               <div className="space-y-4">
                  <h3 className="text-4xl font-black text-slate-900 font-poppins">Phản xạ tuyệt vời!</h3>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button onClick={() => handleStartGame(currentSet)} className="px-12 py-5 bg-blue-600 text-white font-black text-lg rounded-3xl hover:opacity-90 transition-all shadow-xl shadow-blue-100">
                    Chơi lại lượt mới
                  </button>
                  <button onClick={() => setViewMode('overview')} className="px-12 py-5 bg-slate-50 text-slate-600 font-bold text-lg rounded-3xl hover:bg-slate-100 transition-all border border-slate-100">
                    Về danh mục
                  </button>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {gameCards.map((card, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSelectGameCard(idx)}
                  className={`h-36 md:h-44 rounded-[40px] p-6 flex items-center justify-center text-center font-bold text-lg md:text-xl transition-all border-4 shadow-sm ${
                    card.matched 
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-600 opacity-50 scale-95 pointer-events-none' 
                    : card.selected 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-2xl scale-105 rotate-2' 
                      : 'bg-white border-slate-50 text-slate-700 hover:border-blue-400 hover:scale-105 active:scale-95'
                  }`}
                >
                  {card.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderList = () => (
    <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-10 animate-in fade-in duration-500 pb-24">
      <div className="flex items-center justify-between">
        <button onClick={() => setViewMode('overview')} className="text-slate-400 font-bold flex items-center gap-2 hover:text-blue-600 transition-colors">
          <ChevronLeft /> Quay lại
        </button>
      </div>

      <div className="bg-white rounded-[50px] border border-slate-50 shadow-sm overflow-hidden border-b-8 border-b-blue-600">
        <div className="p-10 md:p-14 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
              <h2 className="text-4xl font-black text-slate-900 font-poppins">{currentSet.title}</h2>
              <p className="text-blue-600 font-black mt-2 tracking-[0.2em] uppercase text-xs">Cấp độ mục tiêu: {currentSet.level}</p>
           </div>
           <button 
                onClick={() => handleStartStudy(currentSet)}
                className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-100 hover:opacity-90"
              >
                <Play size={18} fill="currentColor" /> Học ngay
           </button>
        </div>
        <div className="divide-y divide-slate-50">
          {currentSet.cards.map(card => (
            <div key={card.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => speak(card.word)}
                  disabled={isSpeaking}
                  className="w-14 h-14 bg-blue-50 rounded-[20px] flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
                >
                  {isSpeaking ? <Loader2 className="animate-spin" size={24} /> : <Volume2 size={24} />}
                </button>
                <div className="space-y-1">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-slate-900">{card.word}</span>
                  </div>
                  <p className="text-slate-500 font-medium text-lg leading-none">{card.meaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="flex-grow flex flex-col items-center justify-center p-6 bg-[#f8fafc] text-center pb-24">
      <div className="max-w-2xl w-full bg-white rounded-[70px] p-16 md:p-24 shadow-2xl border border-slate-50 space-y-12 animate-in slide-in-from-bottom duration-1000">
         <div className="space-y-6">
            <div className="w-28 h-28 bg-emerald-500 rounded-[40px] flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-200 animate-bounce-slow transform rotate-6">
               <Trophy size={60} />
            </div>
            <h2 className="text-5xl font-black text-slate-900 font-poppins tracking-tight">Xong lượt học!</h2>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => handleStartStudy(currentSet)}
              className="py-6 bg-blue-600 text-white font-black text-xl rounded-[35px] shadow-2xl shadow-blue-200 hover:opacity-90 active:scale-95 transition-all"
            >
              Ôn tập lại bộ này
            </button>
            <button 
              onClick={() => setViewMode('overview')}
              className="py-6 bg-slate-50 text-slate-600 font-bold text-xl rounded-[35px] hover:bg-slate-100 active:scale-95 transition-all border border-slate-100"
            >
              Về trang chủ
            </button>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-full bg-[#fcfdfe] flex flex-col font-inter">
      <DashboardHeader activeView="flashcards" onNavigate={onNavigate} onLogout={onLogout} />
      
      <main className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
        {viewMode === 'overview' && renderOverview()}
        {viewMode === 'study' && renderStudy()}
        {viewMode === 'game' && renderGame()}
        {viewMode === 'list' && renderList()}
        {viewMode === 'result' && renderResult()}
        {viewMode === 'create' && renderCreate()}
      </main>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
    </div>
  );
};

export default FlashCards;