
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import KnowledgeSystem from './components/KnowledgeSystem';
import ConsultForm from './components/ConsultForm';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import LevelTestSelection from './components/LevelTestSelection';
import ExamInterface from './components/ExamInterface';
import ResultView from './components/ResultView';
import HocLieuHub from './components/HocLieuHub';
import HocLieuExam from './components/HocLieuExam';
import AITutor from './components/AITutor';
import FlashCards from './components/FlashCards';
import EbookNewsletter from './components/EbookNewsletter';
import Roadmap from './components/Roadmap';
import CourseDetail from './components/CourseDetail';
import CourseExam from './components/CourseExam';
import MistakeBank from './components/MistakeBank';

export type AppView = 'landing' | 'dashboard' | 'test-hub' | 'exam' | 'result' | 'hoc-lieu-hub' | 'hoc-lieu-exam' | 'ai-tutor' | 'flashcards' | 'ebook-newsletter' | 'roadmap' | 'course-detail' | 'course-exam' | 'mistake-bank';

export interface ExamResult {
  id: string;
  score: number;
  total: number;
  answers: Record<number, string>;
  timeTaken: number;
  testTitle?: string;
  isHocLieu?: boolean;
  createdAt: string;
}

export interface AIContext {
  topic: string;
  patternTitle: string;
  diagnosis: string;
  mistakes: { id: number; stem: string; userAns: string; correctAns: string }[];
  level: string;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [view, setView] = useState<AppView>('landing');
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);
  const [selectedHocLieuId, setSelectedHocLieuId] = useState<number | null>(null);
  const [aiContext, setAiContext] = useState<AIContext | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('engmind_exam_history');
    if (saved) {
      try {
        setExamHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('landing');
  };

  const navigateTo = (newView: AppView, context?: AIContext) => {
    if (context) setAiContext(context);
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExamFinish = (resultData: Omit<ExamResult, 'id' | 'createdAt'>) => {
    const newResult: ExamResult = {
      ...resultData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    
    const updatedHistory = [newResult, ...examHistory];
    setExamHistory(updatedHistory);
    localStorage.setItem('engmind_exam_history', JSON.stringify(updatedHistory));
    
    setLastResult(newResult);
    setView('result');
  };

  const viewOldResult = (result: ExamResult) => {
    setLastResult(result);
    setView('result');
  };

  const startHocLieu = (id: number) => {
    setSelectedHocLieuId(id);
    setView('hoc-lieu-exam');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Hero onOpenLogin={() => setShowLoginModal(true)} />
          <HowItWorks />
          <KnowledgeSystem />
          <ConsultForm />
        </>
      );
    }

    switch (view) {
      case 'test-hub':
        return (
          <LevelTestSelection 
            onBack={() => setView('dashboard')} 
            onStartExam={() => setView('exam')} 
            onLogout={handleLogout} 
            onGoToHocLieu={() => setView('hoc-lieu-hub')} 
            history={examHistory}
            onViewResult={viewOldResult}
          />
        );
      case 'hoc-lieu-hub':
        return <HocLieuHub onBack={() => setView('test-hub')} onStartTest={startHocLieu} onLogout={handleLogout} />;
      case 'hoc-lieu-exam':
        return selectedHocLieuId ? (
          <HocLieuExam 
            testId={selectedHocLieuId} 
            onFinish={handleExamFinish} 
            onBack={() => setView('hoc-lieu-hub')} 
            onLogout={handleLogout} 
          />
        ) : null;
      case 'exam':
        return <ExamInterface onFinish={handleExamFinish} onBack={() => setView('test-hub')} onLogout={handleLogout} />;
      case 'course-exam':
        return <CourseExam onFinish={handleExamFinish} onBack={() => setView('course-detail')} onLogout={handleLogout} />;
      case 'result':
        return <ResultView result={lastResult} onBackToDashboard={() => setView('dashboard')} onGoToMistakes={() => setView('mistake-bank')} onLogout={handleLogout} onNavigateTo={navigateTo} />;
      case 'ai-tutor':
        return <AITutor onLogout={handleLogout} onNavigate={navigateTo} initialContext={aiContext} onClearContext={() => setAiContext(null)} />;
      case 'flashcards':
        return <FlashCards onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'ebook-newsletter':
        return <EbookNewsletter onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'roadmap':
        return <Roadmap onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'course-detail':
        return <CourseDetail onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'mistake-bank':
        return <MistakeBank onLogout={handleLogout} onNavigate={navigateTo} />;
      default:
        return <Dashboard onLogout={handleLogout} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isLoggedIn && <Header onOpenLogin={() => setShowLoginModal(true)} />}
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onSuccess={handleLoginSuccess} 
        />
      )}
    </div>
  );
};

export default App;
