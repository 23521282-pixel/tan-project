
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  Send, Plus, MessageSquare, 
  Sparkles, BookOpen, BrainCircuit, ShieldCheck, 
  ChevronRight, Loader2, Lamp, Zap, Target
} from 'lucide-react';
import { AppView, AIContext } from '../App';
import DashboardHeader from './DashboardHeader';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
  timestamp: Date;
}

interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  date: Date;
}

interface AITutorProps {
  onLogout: () => void; 
  onNavigate: (view: AppView) => void;
  initialContext?: AIContext | null;
  onClearContext?: () => void;
}

const SYSTEM_INSTRUCTION = `
You are "Học tiếng Anh hông?" – a friendly, intelligent, and slightly Gen Z English AI Tutor for the ENGMIND platform. 
Your goal is to transform English from "rules to memorize" into "thinking patterns".

CORE RULES:
1. NEVER GIVE ANSWERS DIRECTLY. 
2. If starting with a "Diagnostic Context" (InitialContext), follow the GUIDED THINKING workflow:
   - Acknowledge the detected mistake pattern (e.g., "Mệnh đề quan hệ").
   - Ask the student how they usually approach this type of question to reveal their flawed mindset.
   - Use analogies and thinking frameworks.
   - If they provide a sample question, ask them to eliminate wrong choices first.
3. Tone: Supportive, motivating, using Vietnamese Gen Z slang naturally (e.g., "khum", "nà", "đỉnk thực sự").
`;

const AITutor: React.FC<AITutorProps> = ({ onLogout, onNavigate, initialContext, onClearContext }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isIntensiveMode, setIsIntensiveMode] = useState(false);
  const [chatHistory] = useState<ChatHistoryItem[]>([
    { id: '1', title: 'Giải thích Present Perfect', lastMessage: 'Hành động xảy ra trong quá khứ...', date: new Date() },
    { id: '2', title: 'Dạng bài Cloze Test', lastMessage: 'Dạng hay gặp trong đề thi...', date: new Date(Date.now() - 86400000) }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Handle Initial Diagnostic Context (Academic Advisor Mode)
  useEffect(() => {
    if (initialContext) {
      const startIntensiveSession = async () => {
        setIsLoading(true);
        setIsIntensiveMode(true);
        
        // Build a detailed prompt based on diagnostic data
        const prompt = `[DIAGNOSTIC SESSION]
Student Level: ${initialContext.level}
Detected Pattern Weakness: ${initialContext.patternTitle}
Diagnostic Diagnosis: ${initialContext.diagnosis}
Mistake Samples: ${initialContext.mistakes.map(m => `Câu: "${m.stem}" | Bạn chọn: ${m.userAns} | Đúng: ${m.correctAns}`).join('; ')}

Action: Please start an intensive guided thinking session. Acknowledge these specific mistakes and the pattern. Instead of teaching, ask the student: "Khi gặp dạng bài này, bạn thường dựa vào đâu để chọn đáp án?" to analyze their current mindset.`;
        
        const userMsg: Message = { role: 'user', parts: [{ text: "Bắt đầu phiên ôn tập chuyên sâu dựa trên kết quả bài test vừa rồi nha!" }], timestamp: new Date() };
        setMessages([userMsg]);
        
        try {
           const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
           const response = await ai.models.generateContent({
             model: 'gemini-3-flash-preview',
             contents: [{ role: 'user', parts: [{ text: prompt }] }],
             config: { systemInstruction: SYSTEM_INSTRUCTION }
           });
           
           if (response.text) {
             setMessages(prev => [...prev, { role: 'model', parts: [{ text: response.text! }], timestamp: new Date() }]);
           }
        } catch (e) {
           console.error(e);
        } finally {
           setIsLoading(false);
           if (onClearContext) onClearContext();
        }
      };
      startIntensiveSession();
    }
  }, [initialContext]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: input }],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = 'gemini-3-flash-preview';
      
      const contents = messages.concat(userMessage).map(m => ({
        role: m.role,
        parts: m.parts
      }));

      const stream = await ai.models.generateContentStream({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      let fullText = "";
      const assistantMessage: Message = {
        role: 'model',
        parts: [{ text: "" }],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      for await (const chunk of stream) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => {
            const newMsgs = [...prev];
            if (newMsgs.length > 0) {
              newMsgs[newMsgs.length - 1] = {
                ...newMsgs[newMsgs.length - 1],
                parts: [{ text: fullText }]
              };
            }
            return newMsgs;
          });
        }
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: "Oops, mình gặp chút trục trặc khi kết nối. Bạn thử lại nha!" }],
        timestamp: new Date()
      }]);
      setInput(currentInput);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (text: string) => {
    setInput(text);
    if (inputRef.current) inputRef.current.focus();
  };

  const startNewChat = () => {
    setMessages([]);
    setIsIntensiveMode(false);
  };

  const suggestedPrompts = [
    { text: "Giải thích Hiện tại hoàn thành", icon: <BrainCircuit size={16} /> },
    { text: "Phân biệt 'a' và 'the'", icon: <Sparkles size={16} /> },
    { text: "Luyện đề THPTQG dạng Cloze", icon: <BookOpen size={16} /> },
    { text: "Sửa lỗi câu này: 'I have see him yesterday'", icon: <ShieldCheck size={16} /> }
  ];

  return (
    <div className="min-h-full bg-[#fcfdfe] flex flex-col font-inter">
      <DashboardHeader activeView="ai-tutor" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-100 shadow-sm">
          <div className="p-6">
            <button 
              onClick={startNewChat}
              className="w-full py-4 bg-blue-50 text-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 border border-blue-100 hover:bg-blue-100 transition-all active:scale-95 shadow-sm"
            >
              <Plus size={20} /> Chat mới
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto px-4 space-y-6">
            <div className="space-y-4">
              <p className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hôm nay</p>
              {chatHistory.map(chat => (
                <div key={chat.id} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer group transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={16} className="text-slate-300 group-hover:text-blue-500" />
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold text-slate-700 truncate">{chat.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {isIntensiveMode && (
               <div className="p-4 bg-[#00609b] rounded-2xl text-white space-y-3 shadow-lg mx-2 border border-blue-400/30">
                  <div className="flex items-center gap-2">
                     <Target size={16} className="text-blue-200" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Intensive Mode</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed opacity-90">
                     AI đang tập trung giúp bạn bứt phá tư duy lỗi sai hệ thống.
                  </p>
               </div>
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-grow flex flex-col relative bg-slate-50/30">
          <div 
            ref={scrollRef}
            className="flex-grow h-[calc(100vh-250px)] overflow-y-auto p-4 lg:p-10 space-y-10 scroll-smooth no-scrollbar"
          >
            {messages.length === 0 ? (
              <div className="max-w-3xl mx-auto py-20 text-center space-y-12">
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="w-24 h-24 bg-blue-600 rounded-[30px] flex items-center justify-center text-white mx-auto shadow-2xl shadow-blue-200 mb-8 animate-bounce-slow">
                    <Lamp size={48} />
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 font-poppins">Học tiếng Anh hông?</h1>
                  <p className="text-slate-500 font-medium text-lg">Hỏi mình bất cứ điều gì về tư duy giải đề hoặc ngữ pháp nà.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {suggestedPrompts.map((p, i) => (
                    <button 
                      key={i}
                      onClick={() => handlePromptClick(p.text)}
                      className="p-6 bg-white border border-slate-100 rounded-[28px] shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {p.icon}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{p.text}</span>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-8 pb-10">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                    <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center text-white font-black shadow-lg ${
                        m.role === 'user' ? 'bg-[#00609b]' : 'bg-blue-600'
                      }`}>
                        {m.role === 'user' ? 'D' : <Zap size={20} />}
                      </div>
                      <div className={`p-6 rounded-[32px] shadow-xl border ${
                        m.role === 'user' 
                        ? 'bg-[#00609b] text-white border-blue-800 rounded-tr-none' 
                        : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'
                      }`}>
                        <div className="prose prose-sm md:prose-base max-w-none prose-slate">
                          <p className="whitespace-pre-wrap leading-relaxed text-[15px] md:text-base">
                            {m.parts[0].text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-in fade-in duration-300">
                    <div className="flex gap-4 max-w-[85%]">
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 shrink-0 border border-blue-200">
                         <Loader2 size={20} className="animate-spin" />
                      </div>
                      <div className="bg-white/50 px-6 py-4 rounded-full border border-slate-100 italic text-slate-400 text-sm">
                         AI đang tư duy bài làm của bạn...
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-6 bg-white/80 backdrop-blur-md border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <form 
                onSubmit={handleSendMessage}
                className="relative bg-slate-50 border border-slate-200 rounded-[35px] p-2.5 pr-4 shadow-inner flex items-center focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500/30 transition-all"
              >
                <textarea 
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Tiếp tục phiên coaching tư duy tại đây..." 
                  className="flex-grow bg-transparent border-none focus:ring-0 text-slate-700 font-medium text-sm md:text-base resize-none py-3 px-6 h-12 md:h-14 max-h-40 outline-none"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    input.trim() && !isLoading 
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-300 hover:scale-110 active:scale-95' 
                    : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AITutor;
