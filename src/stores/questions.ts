import create from 'zustand';
import { Question } from '@/features/quiz/types';

type QuestionStore = {
  questions: Question[];
  addQuestion: (question: Question) => void;
};

export const useQuestionStore = create<QuestionStore>((set) => ({
  questions: [],
  addQuestion: (question) => { 
    set((state) => ({
      questions: [
        ...state.questions,
        { ...question },
      ]
    }))},
  deleteEverything: () => set({}, true), 
}));
                                                      
