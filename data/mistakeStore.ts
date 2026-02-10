
export interface MistakeRecord {
  id: string;
  questionId: number;
  stem: string;
  passage?: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation?: string;
  topic: string;
  source: string;
  status: 'unreviewed' | 'reviewed';
  createdAt: string;
}

const STORAGE_KEY = 'engmind_mistake_bank';

export const mistakeStore = {
  getMistakes: (): MistakeRecord[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveMistakes: (newMistakes: Omit<MistakeRecord, 'id' | 'status' | 'createdAt'>[]) => {
    const current = mistakeStore.getMistakes();
    const formatted: MistakeRecord[] = newMistakes.map(m => ({
      ...m,
      id: Math.random().toString(36).substr(2, 9),
      status: 'unreviewed',
      createdAt: new Date().toISOString()
    }));
    
    const filteredCurrent = current.filter(existing => 
      !formatted.some(f => f.questionId === existing.questionId && f.source === existing.source && existing.status === 'unreviewed')
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...formatted, ...filteredCurrent]));
  },

  // Đổi trạng thái linh hoạt
  toggleStatus: (id: string) => {
    const current = mistakeStore.getMistakes();
    const updated = current.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === 'unreviewed' ? 'reviewed' : 'unreviewed' } as MistakeRecord;
      }
      return m;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  getSummary: () => {
    const current = mistakeStore.getMistakes();
    const unreviewed = current.filter(m => m.status === 'unreviewed').length;
    const reviewed = current.filter(m => m.status === 'reviewed').length;
    return {
      unreviewed,
      reviewed,
      total: current.length
    };
  }
};
